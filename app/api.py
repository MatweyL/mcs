import uvicorn
from fastapi import FastAPI, HTTPException, Request

from app.fillers import ScreenChannelEditorFiller
from app.logs import logger
from app.phone import Phone, ChannelMode
from app.schemas import Screen
from app.services import ScreenBuilder
from app.utils import get_screens_path

app = FastAPI()
phone = Phone([])
screen_builder = ScreenBuilder(get_screens_path())
screen_channel_editor_filler = ScreenChannelEditorFiller(phone)


@app.get('/screen', response_model=Screen)
async def get_screen(name: str, channel_mode: ChannelMode = None):
    try:
        screen = screen_builder.build(name)
        filled_screen = screen_channel_editor_filler.fill(screen, channel_mode)
        return filled_screen
    except BaseException as e:
        logger.exception(e)
        raise HTTPException(status_code=404)


@app.put('/screen')
async def process_screen(request: Request):
    try:
        screen_raw = await request.body()
    except BaseException as e:
        logger.exception(e)
        raise HTTPException(status_code=400)


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8080)
