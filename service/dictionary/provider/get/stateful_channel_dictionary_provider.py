from service.dictionary.provider.get.get_dictionary_provider import DictionaryProviderInterface
from service.domain_v2.session import Session


class StatefulChannelDictionaryProvider(DictionaryProviderInterface):

    def provide(self, session: Session, dictionary_type: str):
        phone = session.phone
        dictionary_values = []
        dictionary = dict(dictionaryName="CHANNEL",
                          dictionaryValues=dictionary_values)
        for channel in phone.channels:
            dictionary_values.append(dict(name=channel.name, value=channel.uid, ))
        dictionary_values.append({
                "value": "IDLE",
                "name": "Idle (не задано)"
            }, )
        return dictionary

    def get_dictionary_type(self) -> str:
        return "CHANNEL"
