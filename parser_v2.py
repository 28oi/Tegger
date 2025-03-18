import os
import asyncio
from telethon import TelegramClient, events
from dotenv import load_dotenv
 

load_dotenv()


API_ID = os.getenv("API_ID")
API_HASH = os.getenv("API_HASH")
BOT_TOKEN = os.getenv("TOKEN_BOT")


class ParserV2(TelegramClient):
    def __init__(
        self, 
        session: str = "Bot_session", 
        api_id: str = API_ID,
        api_hash: str = API_HASH,
        system_version: str = "4.16.30-vxCUSTOM",
        bot_token : str = BOT_TOKEN
    ) -> None:
        self._session = session
        self._api_id = api_id
        self._api_hash = api_hash
        self._system_version = system_version
        self.bot_token = bot_token
        self._client = None

    @property
    def client(self) -> TelegramClient | None:
        return self._client
    
    @client.setter
    def client(self, set_value: TelegramClient) -> None:
        self._client = set_value

    async def initialize_client(self) -> TelegramClient:
        """Инициализирует клиент"""
        try:
            client = TelegramClient(
                session=self._session,
                api_id=self._api_id,
                api_hash=self._api_hash,
                system_version=self._system_version,
            )
            await client.start(bot_token=self.bot_token)
            return client
        except Exception as e:
            print(f"Ошибка при инициализации клиента: {e}")
            raise

    async def close_client_stream(self):
        if self.client and self.client.is_connected():
            await self.client.disconnect()

    async def open_client_stream(self):
        """Открывает соединение с Telegram API и регистрирует обработчики"""
        if not self.client:
            self.client = await self.initialize_client()

        # Регистрация обработчиков событий
        @self.client.on(events.NewMessage(pattern=r"#all"))
        async def handle_new_message(event):
            """Обработчик новых сообщений"""
            try:
                sender = await event.get_sender()
                chat = await event.get_chat()
                users = await self.get_chat_user(chat_id=chat.id)
                message = " ".join(users)
                await event.respond(message)
            except Exception as e:
                print(e)


    async def get_chat_user(self, chat_id : int):
        """Получает список участников чата по ссылке"""
        try:
            users : list[str] = []
            chat = await self.client.get_entity(chat_id)
            if not hasattr(chat, "title"):
                return
            async for user in self.client.iter_participants(chat):
               users.append("@"+str(user.username))
            return users
        finally:
            pass

    async def get_chat_admin(self, chat_id : int):
        pass

# Запуск асинхронной функции
if __name__ == "__main__":
    p = ParserV2()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(p.open_client_stream())
    try:
        print("Обработка событий...")
        loop.run_forever()
    except KeyboardInterrupt:
        print("Прерывание работы")
    finally:
        print("Завершение работы")
        loop.run_until_complete(p.close_client_stream())