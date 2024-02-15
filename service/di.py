from service.common.utils import get_root_path
from service.core.processor.default_processor import DefaultProcessor
from service.core.registry import ScreenProcessorRegistry
from service.domain.phone import Phone
from service.screen.impl.use_case import SaveScreenUseCaseImpl, GetScreenUseCaseImpl
from service.screen.screen_endpoint import ScreenEndpoint
from service.services.channel_list.processor import ChannelListScreenProcessor, DumbScreenProcessor, \
    ChannelEditorScreenProcessor
from service.services.channels.manager import ChannelsManager
from service.services.phone_objects_saver import PhoneObjectsSaver
from service.services.screens.filler import ScreenFiller
from service.services.screens.manager import ScreensManager
from service.services.screens.manager_v2 import ScreensManagerV2
from service.services.screens.phone_storage import InMemoryPhoneStorage
from service.services.screens.screens_storage import FileSystemScreensStorage

phone = Phone([])
screen_filler = ScreenFiller()

screens_dir_path = get_root_path().joinpath('mcs-ui/public/screen')  # TODO: migrate to storage (mongo, redis, pg)

screens_storage = FileSystemScreensStorage(screens_dir_path)
channels_manager = ChannelsManager(phone)
screens_manager = ScreensManager(phone, screen_filler, screens_storage)
screen_manager_map = {"CHANNEL_EDITOR": channels_manager}
screens_data_saver = PhoneObjectsSaver(screen_manager_map)

processors = [
    ChannelListScreenProcessor("CHANNEL_LIST"),
    ChannelEditorScreenProcessor("CHANNEL_EDITOR"),
    DumbScreenProcessor("PPRCH_FREQUENCY_PLAN"),
    DumbScreenProcessor("SERVICE_MENU"),
    DumbScreenProcessor("MAIN_SCREEN"),
]

phone_storage = InMemoryPhoneStorage()

default_screen_processor = DefaultProcessor()
screen_processor_registry = ScreenProcessorRegistry(processors, default_screen_processor)
screens_manager_v2 = ScreensManagerV2(screen_processor_registry, phone_storage, screens_storage)

save_screen_use_case = SaveScreenUseCaseImpl(screens_manager_v2)
get_screen_use_case = GetScreenUseCaseImpl(screens_manager_v2)

screen_endpoint = ScreenEndpoint(
    save_screen_use_case,
    get_screen_use_case
)
