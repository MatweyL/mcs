from abc import abstractmethod
from datetime import datetime
from typing import TypeVar

from service.domain.channel import Channel
from service.domain.direction import Direction
from service.domain.group import Group
from service.domain.phone import Phone
from service.domain.session import Session, SessionAttempt, SessionStatus, SessionType
from service.domain.user import User

D = TypeVar('D')
E = TypeVar('E', bound=dict)


class Mapper:
    @abstractmethod
    def map_to_domain(self, entity: E) -> D:
        pass

    @abstractmethod
    def map_to_entity(self, domain: D) -> E:
        pass


class SessionMapper(Mapper):
    def __init__(self, phone_mapper: 'PhoneMapper', session_attempt_mapper: 'SessionAttemptMapper'):
        self.phone_mapper = phone_mapper
        self.session_attempt_mapper = session_attempt_mapper

    def map_to_domain(self, entity: E) -> Session:
        session = Session()

        session.uid = entity['uid']
        session.title = entity['title']
        session.date = entity['date']
        session.user_uid = entity['user_uid']
        session.phone = self.phone_mapper.map_to_domain(entity['phone'])
        session.status = entity.get('status', SessionStatus.READY)
        if entity.get('attempts'):
            session.attempts = [self.session_attempt_mapper.map_to_domain(attempt) for attempt in entity['attempts']]
        session.training = entity.get('training')
        session.type = entity.get('type', SessionType.FREE)
        session.active_direction = entity.get('active_direction')

        return session

    def map_to_entity(self, session: Session) -> E:
        entity = dict()

        entity['uid'] = session.uid
        entity['title'] = session.title
        entity['date'] = session.date
        entity['user_uid'] = session.user_uid
        entity['phone'] = self.phone_mapper.map_to_entity(session.phone)
        entity['status'] = session.status
        entity['attempts'] = [self.session_attempt_mapper.map_to_entity(attempt) for attempt in session.attempts]
        entity['training'] = session.training
        entity['type'] = session.type
        entity['active_direction'] = session.active_direction
        return entity


class PhoneMapper(Mapper):
    def __init__(self,
                 channel_mapper: 'ChannelMapper',
                 direction_mapper: 'DirectionMapper'):
        self.direction_mapper = direction_mapper
        self.channel_mapper = channel_mapper

    def map_to_domain(self, entity: E) -> D:
        phone = Phone()
        phone.channels = [self.channel_mapper.map_to_domain(c) for c in entity['channels']]
        phone.directions = [self.direction_mapper.map_to_domain(d) for d in entity['directions']]

        return phone

    def map_to_entity(self, phone: Phone) -> E:
        entity = dict()
        entity['channels'] = [self.channel_mapper.map_to_entity(c) for c in phone.channels]
        entity['directions'] = [self.direction_mapper.map_to_entity(d) for d in phone.directions]

        return entity


class DirectionMapper(Mapper):

    def map_to_domain(self, entity: E) -> Direction:
        direction = Direction()

        direction.uid = entity['uid']
        direction.name = entity['name']
        direction.channel = entity.get('channel_uid')
        direction.forbidden_send = entity.get('forbidden_send')
        direction.tone_call = entity.get('tone_call')
        direction.scan_list = entity.get('scan_list')
        direction.economizer = entity.get('economizer')

        return direction

    def map_to_entity(self, direction: Direction) -> E:
        entity = dict()

        entity['uid'] = direction.uid
        entity['name'] = direction.name
        entity['channel_uid'] = direction.channel
        entity['forbidden_send'] = direction.forbidden_send
        entity['tone_call'] = direction.tone_call
        entity['scan_list'] = direction.scan_list
        entity['economizer'] = direction.economizer

        return entity


class ChannelMapper(Mapper):
    def map_to_domain(self, entity: E) -> Channel:
        channel = Channel()

        channel.uid = entity['uid']
        channel.mode = entity['mode']
        channel.name = entity['name']
        channel.double_frequency = entity.get('double_frequency')
        channel.frequency = entity.get('frequency')
        channel.ctcss = entity.get('ctcss')
        channel.forbidden_send = entity.get('forbidden_send')

        return channel

    def map_to_entity(self, channel: Channel) -> E:
        entity = dict()

        entity['uid'] = channel.uid
        entity['mode'] = channel.mode
        entity['name'] = channel.name
        entity['forbidden_send'] = channel.forbidden_send
        entity['ctcss'] = channel.ctcss
        entity['frequency'] = channel.frequency
        entity['double_frequency'] = channel.double_frequency

        return entity


class UserMapper(Mapper):
    def map_to_domain(self, entity: dict) -> User:
        user = User()

        user.uid = entity['uid']
        user.name = entity['name']
        user.group = entity['group']
        user.surname = entity['surname']
        user.password = entity['password']
        user.patronymic = entity['patronymic']

        return user

    def map_to_entity(self, user: User) -> dict:
        entity = dict()

        entity['uid'] = user.uid
        entity['name'] = user.name
        entity['group'] = user.group
        entity['surname'] = user.surname
        entity['password'] = user.password
        entity['patronymic'] = user.patronymic

        return entity


class GroupMapper(Mapper):
    def map_to_domain(self, entity: dict) -> Group:
        group = Group()

        group.uid = entity['uid']
        group.name = entity['name']

        return group

    def map_to_entity(self, group: Group) -> dict:
        entity = dict()

        entity['uid'] = group.uid
        entity['name'] = group.name

        return entity


class SessionAttemptMapper(Mapper):

    def map_to_domain(self, entity: E) -> D:
        session_attempt = SessionAttempt()
        session_attempt.started = datetime.fromisoformat(entity['started'])
        if session_attempt.finished:
            session_attempt.finished = datetime.fromisoformat(entity['finished'])
        return session_attempt

    def map_to_entity(self, domain: SessionAttempt) -> E:
        entity = dict(started=domain.started,
                      finished=domain.finished)
        return entity
