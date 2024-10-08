from service.domain.channel import Channel
from service.domain.direction import Direction
from service.domain.phone import Phone
from service.domain.session import Session
from service.domain.user import User
from service.mapper_v2.mapper import SessionMapper, PhoneMapper, DirectionMapper, ChannelMapper, UserMapper

channel_mapper = ChannelMapper()
direction_mapper = DirectionMapper()
phone_mapper = PhoneMapper(channel_mapper, direction_mapper)
session_mapper = SessionMapper(phone_mapper, None)

user_mapper = UserMapper()


def test_session_map_to_entity():
    # GIVEN
    channel = Channel()
    channel.mode = 'CHM25'
    channel.uid = '1'
    channel.name = 'channel'
    channel.forbidden_send = True
    channel.frequency = True
    channel.ctcss = 'CTCSS'
    channel.double_frequency = 'double'

    direction = Direction()
    direction.name = 'direction'
    direction.uid = '2'
    direction.channel = 'channel_uid'
    direction.forbidden_send = True
    direction.tone_call = True
    direction.scan_list = '4567'
    direction.economizer = 'economizer'

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
    assert direction_entity['channel_uid'] == 'channel_uid'
    assert direction_entity['forbidden_send']
    assert direction_entity['tone_call']
    assert direction_entity['economizer'] == 'economizer'
    assert direction_entity['scan_list'] == '4567'

    channel = phone_entity['channels'][0]
    assert channel['mode'] == 'CHM25'
    assert channel['uid'] == '1'
    assert channel['name'] == 'channel'
    assert channel['forbidden_send']
    assert channel['double_frequency'] == 'double'
    assert channel['frequency']
    assert channel['ctcss'] == 'CTCSS'


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
