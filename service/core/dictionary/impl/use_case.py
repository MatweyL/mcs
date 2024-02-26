from service.core.dictionary.provider.get.get_dictionary_provider_registry import GetDictionaryProviderRegistry
from service.core.dictionary.use_case import GetDictionaryUseCase, GetDictionaryRq
from service.core.session.repo import SessionRepo


class GetDictionaryUseCaseImpl(GetDictionaryUseCase):

    def __init__(self, session_repo: SessionRepo,
                 registry: GetDictionaryProviderRegistry,):
        self._session_repo = session_repo
        self._registry = registry

    def apply(self, request: GetDictionaryRq) -> dict:
        provider = self._registry.get_provider(request.dictionary_type)  # stateless (files storage) / statefull (??

        session_id = request.session_id
        session = self._session_repo.get_session(session_id)

        return provider.provide(session, request.dictionary_type)
