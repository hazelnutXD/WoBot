const fs = require("fs");
const recent = require("../api/recent");
const findUserId = require("../api/findUserId");
const timestampToTime = require("../../utils/timestampToTime");
const drawImg = require("../../utils/drawImg");

const getRecentData = async (mode, server, id, day) => {
  if (server != "QQ") {
    let findIdRes = await findUserId(server, id);
    if (findIdRes.data.code === 200) {
      id = findIdRes.data.data.accountId;
    } else {
      return false;
    }
  }

  let recentRes = await recent(server, id, day);
  if (recentRes.data.code === 200) {
    let htmlTemplate = fs.readFileSync("./template/recent.html").toString();
    let content = {
      recentData: recentRes.data.data,
      pvpInfo: recentRes.data.data.shipData[0].pvpInfo,
      rankInfo: recentRes.data.data.shipData[0].rankInfo,
      pvpRecentList: recentRes.data.data.shipData[0].shipData.filter((item) => {
        return item.shipInfo.shipId != -1;
      }),
      rankRecentList: recentRes.data.data.shipData[0].shipData.filter(
        (item) => {
          return item.rankSolo.shipId != -1;
        }
      ),
      recordTime: timestampToTime(
        recentRes.data.data.shipData[0].recordDateTime
      ),
    };
    switch (mode) {
      case "pvp":
        htmlTemplate = fs.readFileSync("./template/recent.html").toString();
        break;
      case "rank":
        htmlTemplate = fs.readFileSync("./template/rank.html").toString();
        break;
    }
    return drawImg(htmlTemplate, content);
  } else {
    return false;
  }
};

module.exports = getRecentData;
