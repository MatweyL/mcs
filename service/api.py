import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from service.common.logs import logger
from service.common.utils import get_root_path
from service.domain.phone import Phone
from service.schemas.screen import ScreenUpdated
from service.services.channel_list.processor import ChannelListScreenProcessor, DumbScreenProcessor, \
    ChannelEditorScreenProcessor
from service.services.channels.manager import ChannelsManager
from service.services.phone_objects_saver import PhoneObjectsSaver
from service.services.registry import ScreenProcessorRegistry
from service.services.screens.filler import ScreenFiller
from service.services.screens.manager import ScreensManager
from service.services.screens.manager_v2 import ScreensManagerV2
from service.services.screens.phone_storage import InMemoryPhoneStorage
from service.services.screens.screens_storage import FileSystemScreensStorage

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
screen_processor_registry = ScreenProcessorRegistry(processors)
screens_manager_v2 = ScreensManagerV2(screen_processor_registry, phone_storage, screens_storage)


@app.get('/dictionary/{dictionary_name}')
async def get_dictionary(dictionary_name: str):  # TODO: обсудить реализацию
    pass


@app.get('/screen')
async def get_screen(screen_name: str, element_uid: str = None):
    try:
        return screens_manager_v2.get(screen_name, {"id": element_uid})
    except BaseException as e:
        logger.exception(e)


@app.post('/screen')
async def save_screen(screen_model: ScreenUpdated):
    try:
        screens_manager_v2.save(screen_model)
    except BaseException as e:
        logger.exception(e)
        raise e
    else:
        return 201


@app.get('/screen-v1')
async def get_screen(screen_name: str, element_uid: str = None):
    try:
        is_new_screen = not element_uid
        if is_new_screen:
            logger.info('new screen will created')
            return screens_manager.get(screen_name)
        logger.info('existed screen will filled')
        return screens_manager.get_filled(screen_name, element_uid)
    except BaseException as e:
        logger.exception(e)


@app.post('/screen-v1')
async def save_screen(screen_updated: ScreenUpdated):
    try:
        screens_data_saver.save(screen_updated)
    except BaseException as e:
        logger.exception(e)
        raise e
    else:
        return 201


@app.get('/channels')
async def get_phone_channels():
    return phone.iter_channels()


if __name__ == "__main__":
    host = 'localhost'  # TODO: put to config
    port = 8080  # TODO: put to config
    logger.info(f'started http://{host}:{port}/docs')
    uvicorn.run(app, host=host, port=port)
