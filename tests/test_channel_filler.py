from app.enums import AttributeName
from app.fillers import PhoneChannelFiller
from app.phone import ChannelCHM25, Phone, ChannelMode
from app.schemas import ScreenUpdated, AttributeUpdated


def test_channel_filler():
    phone = Phone([])

    channel_filler = PhoneChannelFiller(phone)

    screen_updated = ScreenUpdated(name="CHANNEL_EDITOR", attributes=[
        AttributeUpdated(name=AttributeName.NAME, value='test'),
        AttributeUpdated(name=AttributeName.FREQUENCY, value=25),
        AttributeUpdated(name=AttributeName.DOUBLE_FREQUENCY, value=False),
        AttributeUpdated(name=AttributeName.FREQUENCY, value=50),
        AttributeUpdated(name=AttributeName.CHANNEL_MODE, value=ChannelMode.CHM25),
        AttributeUpdated(name=AttributeName.CTCSS, value=True),
        AttributeUpdated(name='test', value=True),
    ])
    channel_filler.fill(screen_updated)
