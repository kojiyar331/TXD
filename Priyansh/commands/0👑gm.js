const fs = require("fs");
module.exports.config = {
  name: "gm",
    version: "2.1.1",
  hasPermssion: 0,
  credits: "PRINCE RAJPUT", 
  description: "Just Respond",
  commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users, Currencies, args, utils, client, global }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("gm") ||
     react.includes("Gm") ||
     react.includes("Morning") ||
react.includes("morning")) {
    var msg = {
        body: `
☆ ᕱ⑅ᕱ
ପ(„• ༝ •„)ଓ
┏━∪∪━━━━━━━━━━━━━┓
 ⋆☀︎.˖˳ 𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 ⋆⋆˖⋆☀︎.
┗━━━━━━━━━━━━━━━━┛  

  ☀️✨🫵🏻ـــــــــــــﮩ٨ـ❤️️⋆`,attachment: fs.createReadStream(__dirname + `/noprefix/gm.jpg`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("☔", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }
