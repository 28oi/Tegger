from fastapi import APIRouter, Body
from parser_v2 import bot

router = APIRouter(prefix="/bot")


@router.get("/")
async def health_check():
    if bot.client and bot.client.is_connected():
        return {"status" : 200}
    return {"status" : 500}


@router.post("send_msg")
async def send_msg(chat_id : int = Body(...), message : str = Body(...)):
    try:
        await bot.send_message(chat_id, message)
        return {"status" : 200, "msg" : message}
    except Exception as e:
        print(e)
        return {"status" : 500}

    