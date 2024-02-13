from service.core.registry import ScreenProcessorRegistry
from service.core.storage import PhoneStorageInterface
from service.services.base import ScreensStorageInterface


class ScreensManagerV3:

    def __init__(self,
                 get_registry: ScreenProcessorRegistry,
                 save_registry: ScreenProcessorRegistry,
                 phone_storage: PhoneStorageInterface,
                 screen_storage: ScreensStorageInterface):
        self._get_registry = get_registry
        self._save_registry = save_registry
        self._phone_storage = phone_storage
        self._screen_storage = screen_storage

    def get(self, screen_name: str, context: Dict[str, Any]):
        phone = self._phone_storage.load_phone(None)
        screen_template = self._screen_storage.get(screen_name)
        processor = self._get_registry.get(screen_name)

        return processor.get(phone, screen_template, context)

    def save(self, screen_model: ScreenValues):
        phone = self._phone_storage.load_phone(None)
        processor = self._save_registry.get(screen_model.name)

        processor.save(phone, screen_model)
        self._phone_storage.save_phone(phone)
