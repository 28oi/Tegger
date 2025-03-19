import asyncio
import uvicorn
from fastapi import FastAPI, Request
from telethon import events

from parser_v2 import bot, WEBHOOK_URL, WEBHOOK_PATH
from routert import router


app = FastAPI()


@app.on_event("startup")
async def start_app():
    try:
        print("start server")
        await bot.open_client_stream()
        await bot.setup_webhook(WEBHOOK_URL)
        print("secsesfull start")
    except Exception as e:
        print(e)


@app.on_event("shutdown")
async def stop_app():
    print("stop server")
    try: 
        await bot.close_client_stream()
        await bot.delete_webhook()
    except Exception as e:
        print(f"Error while closing client stream: {e}")
    finally:
        print("secsesfull stop")


@app.post(WEBHOOK_PATH)
async def webhook_handler(request: Request):
    data = await request.json()
    print("Received data:", data)  # Логирование входящих данных
    try:
        update = bot.create_update_from_data(data)
        await bot.client._dispatch_event(update)
        print("Dispatched update:", update)
    except Exception as e:
        print(f"Error processing update: {e}")
    return {"status": 200}


@bot.on(events.NewMessage(pattern="#all"))
async def command_all(event):
    print("Worck")
    try:
        chat = await event.get_chat()
        users = await bot.get_chat_user(chat_id=chat.id)
        message = " ".join(users)
        await event.respond(message)
    except Exception as e:
        print(f"Ошибка в обработчике команды /all: {e}")


@bot.on(events.NewMessage(pattern="#help"))
async def command_help(event):
    try:
        message : str = """Это бот помощник в нем реализованы различные функции для работы с группой Telegram
        \nДоступные команды:\n#all\n#help
        \nКонтакт разработчика: @dmetro365"""
        await event.respond(message)
    except Exception as e:
        print(f"Ошибка в обработчике команды /all: {e}")


if __name__ == "__main__":
    app.include_router(router)
    uvicorn.run(app, port=8000, host="0.0.0.0")
