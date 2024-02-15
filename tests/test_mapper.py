from service.common.mapper import Mapper
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
