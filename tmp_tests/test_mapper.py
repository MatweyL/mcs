from service.common.mapper import Mapper
from service.session.models import Session, Channel
from service.user.models import User
from service.user.use_case import RegisterUserRq

name = "name"
surname = "surname"
patronymic = "patronymic"
group = "group"
password = "password"


def test_mapping():
    # GIVEN
    mapper = Mapper()

    request = RegisterUserRq(
        name=name,
        surname=surname,
        patronymic=patronymic,
        group=group,
        password=password
    )

    # WHEN
    actual = mapper.map(request, User)

    # THEN
    assert isinstance(actual, User)
    assert actual.name == name
    assert actual.surname == surname
    assert actual.patronymic == patronymic
    assert actual.group == group
    assert actual.password == password


def test_mapping_to_dict():
    # GIVEN
    mapper = Mapper()

    user = User()
    user.name = name
    user.surname = surname
    user.patronymic = patronymic
    user.group = group
    user.password = password

    # WHEN
    actual = mapper.map(user, dict)

    # THEN
    assert isinstance(actual, dict)
    assert actual['name'] == name
    assert actual['surname'] == surname
    assert actual['patronymic'] == patronymic
    assert actual['group'] == group
    assert actual['password'] == password


def test_mapping_from_dict():
    # GIVEN
    mapper = Mapper()

    user_dict = {
        'name': name,
        'surname': surname,
        'patronymic': patronymic,
        'group': group,
        'password': password
    }

    # WHEN
    actual = mapper.map(user_dict, User)

    # THEN
    assert isinstance(actual, User)
    assert actual.name == name
    assert actual.surname == surname
    assert actual.patronymic == patronymic
    assert actual.group == group
    assert actual.password == password


def test_mapping_to_dict_recursively():
    # GIVEN
    mapper = Mapper()

    channel = Channel()
    channel.mode = 'MODE'

    session = Session()
    session.date = '123'
    session.title = 'title'
    session.channels = [channel]

    # WHEN
    actual = mapper.map(session, dict)

    # THEN
    print(actual)
