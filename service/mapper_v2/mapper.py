from abc import abstractmethod
from typing import TypeVar

from service.domain_v2.channel import Channel
from service.domain_v2.direction import Direction
from service.domain_v2.phone import Phone
from service.domain_v2.session import Session

D = TypeVar('D')
E = TypeVar('E')


class Mapper:
    @abstractmethod
    def map_to_domain(self, entity: E) -> D:
        pass

    @abstractmethod
    def map_to_entity(self, domain: D) -> E:
        pass


class SessionMapper(Mapper):
    def __init__(self, phone_mapper: 'PhoneMapper'):
        self.phone_mapper = phone_mapper

    def map_to_domain(self, entity: E) -> Phone:
        phone = Phone()

        phone.uid = entity['uid']
        phone.title = entity['title']
        phone.date = entity['date']
        phone.user_uid = entity['user_uid']
        phone.phone = self.phone_mapper.map_to_domain(entity['channel'])

        return phone

    def map_to_entity(self, session: Session) -> E:
        entity = dict()

        entity['uid'] = session.uid
        entity['title'] = session.title
        entity['date'] = session.date
        entity['user_uid'] = session.user_uid
        entity['phone'] = self.phone_mapper.map_to_entity(session.phone)

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

        return direction

    def map_to_entity(self, direction: Direction) -> E:
        entity = {}

        entity['uid'] = direction.uid
        entity['name'] = direction.name

        return entity


class ChannelMapper(Mapper):
    def map_to_domain(self, entity: E) -> Channel:
        channel = Channel()

        channel.uid = entity['uid']
        channel.mode = entity['mode']
        channel.name = entity['name']

        return channel

    def map_to_entity(self, channel: Channel) -> E:
        entity = dict()

        entity['uid'] = channel.uid
        entity['mode'] = channel.mode
        entity['name'] = channel.name

        return entity
