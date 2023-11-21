import pytest

from app.phone import Channel, ChannelMode
from service.services.exceptions import NoChannelWithIdException
from service.services.facades.channel import ChannelGetter


def test_get(phone):
    channel_chm25 = Channel(channel_id='2', channel_mode=ChannelMode.CHM25)
    phone.add_channel(channel_chm25)
    channel_getter = ChannelGetter(phone)
    with pytest.raises(NoChannelWithIdException):
        channel_getter.get('1')
    channel = channel_getter.get(channel_chm25.channel_id)
    assert channel.channel_id == channel_chm25.channel_id
    assert channel.channel_mode == channel_chm25.channel_mode
