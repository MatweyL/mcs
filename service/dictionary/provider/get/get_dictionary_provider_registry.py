from typing import List

from service.dictionary.provider.get.get_dictionary_provider import DictionaryProviderInterface


class GetDictionaryProviderRegistry:

    def __init__(self, providers: List[DictionaryProviderInterface],
                 default_provider: DictionaryProviderInterface):
        self._providers = providers
        self._default_provider = default_provider

    def get_provider(self, dictionary_type: str):
        for provider in self._providers:
            if provider.get_dictionary_type() == dictionary_type:
                return provider
        return self._default_provider
