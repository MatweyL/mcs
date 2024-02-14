from service.domain.phone import Phone
from service.services.base import PhoneStorageInterface


class InMemoryPhoneStorage(PhoneStorageInterface):

    def __init__(self) -> None:
        self.phone = Phone([])

    def load_phone(self, uid: str = None) -> Phone:
        return self.phone

    def save_phone(self, phone: Phone):
        self.phone = phone
