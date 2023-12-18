from typing import Dict, Any

from service.schemas.screen import ScreenUpdated
from service.services.base import ScreensStorageInterface, PhoneStorageInterface
from service.services.registry import ScreenProcessorRegistry


class ScreensManagerV2:

    def __init__(self,
                 registry: ScreenProcessorRegistry,
                 phone_storage: PhoneStorageInterface,
                 screen_storage: ScreensStorageInterface):
        self.registry = registry
        self.phone_storage = phone_storage
        self.screen_storage = screen_storage

    def get(self, screen_name: str, context: Dict[str, Any]):
        phone = self.phone_storage.load_phone(None)
        screen_template = self.screen_storage.get(screen_name)
        processor = self.registry.get(screen_name)

        return processor.get(phone, screen_template, context)

    def save(self, screen_model: ScreenUpdated):
        phone = self.phone_storage.load_phone(None)
        processor = self.registry.get(screen_model.name)

        processor.save(phone, screen_model)
        self.phone_storage.save_phone(phone)
