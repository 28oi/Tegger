from fastapi import APIRouter, Body, Request
from parser_v2 import bot, BOT_TOKEN


router = APIRouter(prefix="/bot")


@router.get("/")
async def health_check():
    if bot.client and bot.client.is_connected():
        return {"status" : 200}
    return {"status" : 500}

    