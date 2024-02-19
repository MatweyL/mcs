from service.domain_v2.channel import Channel
from service.domain_v2.direction import Direction
from service.domain_v2.phone import Phone
from service.domain_v2.session import Session
from service.domain_v2.user import User
from service.mapper_v2.mapper import SessionMapper, PhoneMapper, DirectionMapper, ChannelMapper, UserMapper

channel_mapper = ChannelMapper()
direction_mapper = DirectionMapper()
phone_mapper = PhoneMapper(channel_mapper, direction_mapper)
session_mapper = SessionMapper(phone_mapper)

user_mapper = UserMapper()


def test_session_map_to_entity():
    # GIVEN
    channel = Channel()
    channel.mode = 'CHM25'
    channel.uid = '1'
    channel.name = 'channel'

    direction = Direction()
    direction.name = 'direction'
    direction.uid = '2'

    phone = Phone()
    phone.channels = [channel]
    phone.directions = [direction]

    session = Session()
    session.date = 'date'
    session.uid = '3'
    session.title = 'title'
    session.user_uid = 'user_uid'
    session.phone = phone

    # WHEN
    entity = session_mapper.map_to_entity(session)

    # THEN
    assert entity['date'] == 'date'
    assert entity['uid'] == '3'
    assert entity['title'] == 'title'
    assert entity['user_uid'] == 'user_uid'

    phone_entity = entity['phone']
    direction_entity = phone_entity['directions'][0]
    assert direction_entity['name'] == 'direction'
    assert direction_entity['uid'] == '2'

    channel = phone_entity['channels'][0]
    assert channel['mode'] == 'CHM25'
    assert channel['uid'] == '1'
    assert channel['name'] == 'channel'


def test_user_map_to_entity():
    # GIVEN
    user = User()

    user.uid = 'uid'
    user.name = 'name'
    user.group = 'group'
    user.surname = 'surname'
    user.password = 'password'
    user.patronymic = 'patronymic'

    # WHEN
    entity = user_mapper.map_to_entity(user)

    # THEN
    assert entity['uid'] == 'uid'
    assert entity['name'] == 'name'
    assert entity['group'] == 'group'
    assert entity['surname'] == 'surname'
    assert entity['password'] == 'password'
    assert entity['patronymic'] == 'patronymic'


def test_user_map_to_domain():
    # GIVEN
    entity = dict()
    entity['uid'] = 'uid'
    entity['name'] = 'name'
    entity['group'] = 'group'
    entity['surname'] = 'surname'
    entity['password'] = 'password'
    entity['patronymic'] = 'patronymic'

    # WHEN
    user = user_mapper.map_to_domain(entity)

    # THEN
    assert user.uid == 'uid'
    assert user.name == 'name'
    assert user.group == 'group'
    assert user.surname == 'surname'
    assert user.password == 'password'
    assert user.patronymic == 'patronymic'
