const axios = require("axios");

module.exports.config = {
  name: "TAHA-AI",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TAHA-BABU",
  description: "Simple AI using Llama 3.1 via OpenRouter",
  commandCategory: "ai",
  usages: "[text]",
  cooldowns: 2,
};

/* 🔑 API CONFIGURATION */
const OPENROUTER_API_KEY = "f69abaab-1f92-40be-b5c8-d056d483cee2"; // Apna API key yahan lagayein
const SYSTEM_PROMPT = `Tum "TAHA-AI" ho. Creator: TAHA-BABU. Tone: Caring, sweet, and short (1-2 lines).`;

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const prompt = args.join(" ");

  if (!prompt) return api.sendMessage("Boliye, main aapki kya madad kar sakta hoon? 😌❤️", threadID, messageID);

  // Reaction and Typing indicator
  if (api.setMessageReaction) api.setMessageReaction("⌛", messageID, () => {}, true);
  
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.8
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let reply = res.data?.choices?.[0]?.message?.content || "Main abhi samajh nahi paa raha hoon 😅";

    api.sendMessage(reply, threadID, messageID);
    if (api.setMessageReaction) api.setMessageReaction("✅", messageID, () => {}, true);

  } catch (err) {
    console.error("AI Error:", err.message);
    api.sendMessage("Server busy hai, thodi der baad try karein. ❌", threadID, messageID);
    if (api.setMessageReaction) api.setMessageReaction("❌", messageID, () => {}, true);
  }
};
