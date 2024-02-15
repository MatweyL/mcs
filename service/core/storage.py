from abc import abstractmethod

from service.domain.phone import Phone


class PhoneStorageInterface:

    @abstractmethod
    def load_phone(self, uid: str = None) -> Phone:
        pass

    @abstractmethod
    def save_phone(self, phone: Phone):
        pass


class InMemoryPhoneStorage(PhoneStorageInterface):

    def __init__(self) -> None:
        self.phone = Phone([])

    def load_phone(self, uid: str = None) -> Phone:
        return self.phone

    def save_phone(self, phone: Phone):
        self.phone = phone
