import pytest

from service.domain.phone import Phone


@pytest.fixture()
def phone():
    return Phone()
