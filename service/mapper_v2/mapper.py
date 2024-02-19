from abc import abstractmethod
from typing import TypeVar

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

    def map_to_domain(self, entity: E) -> D:
        d = D()
        d.uid = entity['uid']
        d.title = entity['title']
        d.date = entity['date']
        d.user_uid = entity['user_uid']
        d.phone = self.phone_mapper.map_to_domain(entity['channel'])

        return d

    def map_to_entity(self, session: Session) -> E:
        entity = {}
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
        d = D()
        d.channels = self.channel_mapper.map_to_domain(entity['channels'])
        entity['channels'] = self.channel_mapper.map_to_domain()

    def map_to_entity(self, domain: Phone) -> E:
        pass


class DirectionMapper(Mapper):

    def map_to_domain(self, entity: E) -> D:

        pass

    def map_to_entity(self, domain: D) -> E:
        pass


class ChannelMapper(Mapper):
    def map_to_domain(self, entity: E) -> D:
        pass

    def map_to_entity(self, domain: D) -> E:
        pass
