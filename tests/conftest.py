import pytest

from app.phone import Phone


@pytest.fixture()
def phone():
    return Phone([])
