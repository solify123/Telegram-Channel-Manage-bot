import TelegramBot, { Message, ChatJoinRequest } from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;

const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});

console.log(`🤖 BOT is started 🤖`);
bot.onText(/\/start/, (msg: Message) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Welcome!👍`);
});

// Auto-approve join requests - listens for chat_join_request events
bot.on('chat_join_request', async (request: ChatJoinRequest) => {
  const chatId = request.chat.id;
  const userId = request.from.id;
  const userName = request.from.first_name || request.from.username || 'Unknown';

  console.log(`📥 Join request received from user ${userId} (${userName}) in chat ${chatId}`);

  try {
    await bot.approveChatJoinRequest(chatId, userId);
    console.log(`✅ Auto-approved join request from user ${userId} (${userName}) in chat ${chatId}`);
  } catch (error: any) {
    console.error(`❌ Error approving join request for user ${userId}:`, error.message);
  }
});