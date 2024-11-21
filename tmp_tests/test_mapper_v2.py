from service.domain.channel import Channel
from service.domain.direction import Direction
from service.domain.phone import Phone
from service.domain.pprch import PPRCH
from service.domain.session import Session
from service.domain.user import User
from service.mapper.mapper import SessionMapper, PhoneMapper, DirectionMapper, ChannelMapper, StudentMapper, PPRCHMapper

channel_mapper = ChannelMapper()
direction_mapper = DirectionMapper()
pprch_mapper = PPRCHMapper()
phone_mapper = PhoneMapper(channel_mapper, direction_mapper, pprch_mapper)
session_mapper = SessionMapper(phone_mapper, None)

user_mapper = StudentMapper()


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


def test_pprch_to_entity():
    # GIVEN
    pprch = PPRCH(uid='uid',
                  lower=100,
                  higher=2000)

    # WHEN
    entity = pprch_mapper.map_to_entity(pprch)
    # THEN
    assert entity['uid'] == 'uid'
    assert entity['lower'] == 100
    assert entity['higher'] == 2000


def test_pprch_to_domain():
    # GIVEN
    entity = dict(uid='uid',
                  lower=100,
                  higher=2000)

    # WHEN
    pprch = pprch_mapper.map_to_domain(entity)
    # THEN
    assert pprch.uid == 'uid'
    assert pprch.lower == 100
    assert pprch.higher == 2000
