const fs = require("fs");
const bindId = require("../app/controllers/bindId");
const getRecentData = require("../app/controllers/getRecentData");
const getInfoData = require("../app/controllers/getInfoData");
const getShipData = require("../app/controllers/getShipData");

const order = async (e, segment) => {
  let isOrder =
    e.message[0].type === "text" && e.message[0].text.split(" ")[0] === "wws";
  if (isOrder) {
    let qid = e.sender.user_id;
    let order = e.message[0].text.split(" ")[1];
    let server, nickname, day, imgBuffer;

    switch (order) {
      case "set":
        server = e.message[0].text.split(" ")[2];
        nickname = e.message[0].text.split(" ")[3];
        e.reply(await bindId(qid, server, nickname), true);
        break;
      case "me":
        switch (e.message[0].text.split(" ")[2]) {
          case "recent":
            day = e.message[0].text.split(" ")[3] || 7;
            imgBuffer = await getRecentData("QQ", qid, day);
            e.reply(
              imgBuffer != false
                ? segment.image(imgBuffer)
                : `没有找到账号近${day}天的数据`
            );
            break;
          case "info":
            imgBuffer = await getInfoData("QQ", qid);
            e.reply(
              imgBuffer != false
                ? segment.image(imgBuffer)
                : `没有找到账号相关数据`
            );
            break;
          case "ship":
            let shipName = e.message[0].text.split(" ")[3];
            imgBuffer = await getShipData("QQ", qid, shipName);
            e.reply(
              imgBuffer != false
                ? segment.image(imgBuffer)
                : `没有找到该船信息或服务器忙碌`
            );
            break;
          default:
            e.reply("指令错误，请查看wws help", true);
        }
        break;
      case "asia" || "eu" || "na" || "ru" || "cn":
        server = e.message[0].text.split(" ")[1];
        nickname = e.message[0].text.split(" ")[2];
        switch (e.message[0].text.split(" ")[3]) {
          case "recent":
            day = e.message[0].text.split(" ")[4] || 7;
            imgBuffer = await getRecentData(server, nickname, day);
            e.reply(
              imgBuffer != false
                ? segment.image(imgBuffer)
                : `没有找到账号近${day}天的数据`
            );
            break;
          case "info":
            imgBuffer = await getInfoData(server, nickname);
            e.reply(
              imgBuffer != false
                ? segment.image(imgBuffer)
                : `没有找到账号相关数据`
            );
            break;
          case "ship":
            let shipName = e.message[0].text.split(" ")[4];
            imgBuffer = await getShipData(server, nickname, shipName);
            e.reply(
              imgBuffer != false
                ? segment.image(imgBuffer)
                : `没有找到该船信息或服务器忙碌`
            );
            break;
          default:
            e.reply("指令错误，请查看wws help", true);
        }
        break;
      case "help":
        let helpMsg = fs.readFileSync("./assets/txt/help.txt").toString();
        e.reply(helpMsg);
        break;
      default:
        e.reply("指令错误，请查看wws help", true);
    }
  } else {
    return false;
  }
};

module.exports = order;
