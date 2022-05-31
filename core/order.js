const bindId = require("../app/controllers/bindId");
const getRecentData = require("../app/controllers/getRecentData");
const getInfoData = require("../app/controllers/getInfoData");
const getShipData = require("../app/controllers/getShipData");

const order = async (e, segment) => {
  let isOrder =
    e.message[0].type == "text" && e.message[0].text.split(" ")[0] === "wws";
  if (isOrder) {
    let qid = e.sender.user_id;
    let order = e.message[0].text.split(" ")[1];
    let imgBuffer;
    switch (order) {
      case "set":
        let nickname = e.message[0].text.split(" ")[2];
        let server = e.message[0].text.split(" ")[3] || "asia";
        e.reply(await bindId(qid, server, nickname), true);
        break;
      case "recent":
        let day = e.message[0].text.split(" ")[2] || 7;
        imgBuffer = await getRecentData(qid, day);
        e.reply(
          imgBuffer != false
            ? segment.image(imgBuffer)
            : `没有找到账号近${day}天的数据`
        );
        break;
      case "info":
        imgBuffer = await getInfoData(qid);
        e.reply(
          imgBuffer != false ? segment.image(imgBuffer) : `没有找到账号相关数据`
        );
        break;
      case "ship":
        let shipName = e.message[0].text.split(" ")[2];
        imgBuffer = await getShipData(qid, shipName);
        e.reply(
          imgBuffer != false
            ? segment.image(imgBuffer)
            : `没有找到该船信息或服务器忙碌`
        );
        break;
      case "help":
        let helpMsg =
          "帮助：[ ] 内为可选填参数" +
          "\n" +
          "\n" +
          "绑定账号：" +
          "\n" +
          "wws set 游戏昵称 [服务器]" +
          "\n" +
          "\n" +
          "近期战绩：" +
          "\n" +
          "wws recent [天数]" +
          "\n" +
          "\n" +
          "个人总体：" +
          "\n" +
          "wws info" +
          "\n" +
          "\n" +
          "单船战绩：" +
          "\n" +
          "wws ship 船名";
        e.reply(helpMsg);
        break;
      default:
        e.reply("傻宝", true);
    }
  } else {
    return false;
  }
};

module.exports = order;
