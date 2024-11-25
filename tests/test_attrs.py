import json

from service.core.session.training_factory.training_factory import UTK2TrainingFactoryStrategy
from service.domain.channel import Channel, ChannelMode
from service.domain.session import Training
from service.domain.training import TrainingType
from service.mapper.mapper import TrainingMapper


def test_training():
    t = Training(kind='TEST')
    assert 'TEST' == t.kind
    assert 'TEST' == t

def test_training_v2():
    t = Training(kind=TrainingType.UTK1)
    assert 'UTK1' == t.kind.name

def test_training_v3():
    type = TrainingType.UTK1
    assert 'UTK1' == type.value

def test_enum():
    print(ChannelMode.CHM50.title)

def test_factory_training():
    factory = UTK2TrainingFactoryStrategy()

    t = factory.create(dict(channel_name='КР1', frequency=100500))
    training_mapper = TrainingMapper()
    entity = training_mapper.map_to_entity(t)
    with open('test.json', 'w', encoding='utf-8') as json_file:
        json.dump(entity, json_file, ensure_ascii=False, indent=2, default=str)
