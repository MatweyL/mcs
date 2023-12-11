import uvicorn
from fastapi import FastAPI

from service.common.logs import logger
from service.schemas.phone import Phone
from service.schemas.screen import ScreenUpdated
from service.services.facades.channel import ChannelFacade
from service.services.facades_router import FacadesRouter
from service.services.fillers import ScreenFiller

app = FastAPI()
phone = Phone([])
screen_filler = ScreenFiller()
screen_facade_map = {"CHANNEL_EDITOR": ChannelFacade(phone)}
screen_path_map = {'CHANNEL_EDITOR': 'mcs-ui/public/screen/CHANNEL_EDITOR/screen.json'}
screen_manager = FacadesRouter(phone, screen_filler, screen_facade_map, screen_path_map)


@app.get('/dictionary/{dictionary_name}')
async def get_dictionary(dictionary_name: str):
    pass


@app.get('/screen')
async def get_screen(screen_name: str, id: str = None):
    try:
        is_new_screen = not id
        if is_new_screen:
            logger.info('new screen will created')
            return screen_manager.get(screen_name)
        logger.info('existed screen will filled')
        return screen_manager.get_filled(screen_name, id)
    except BaseException as e:
        logger.exception(e)


@app.post('/screen')
async def save_screen(screen_updated: ScreenUpdated):
    screen_manager.save(screen_updated)
    return 201


if __name__ == "__main__":
    host = 'localhost'
    port = 8080
    logger.info(f'started http://{host}:{port}/docs')
    uvicorn.run(app, host=host, port=port)
