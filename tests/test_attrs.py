from service.domain.session import Training


def test_training():
    t = Training(kind='TEST')
    assert 'TEST' == t.kind
    assert 'TEST' == t
