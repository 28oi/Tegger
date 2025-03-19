import asyncio
import uvicorn
from fastapi import FastAPI
from telethon import events
from parser_v2 import bot
from routert import router


app = FastAPI()


@app.on_event("startup")
async def start_app():
    print("start server")
    await bot.open_client_stream()
    bot.client.add_event_handler(bot.cmd_all, events.NewMessage(pattern="#all"))
    print("secsesfull start")


@app.on_event("shutdown")
async def stop_app():
    print("stop server")
    try: 
        await bot.close_client_stream()
    except Exception as e:
        print(f"Error while closing client stream: {e}")
    finally:
        print("secsesfull stop")


if __name__ == "__main__":
    app.include_router(router)
    uvicorn.run(app, port=8000, host="0.0.0.0")
