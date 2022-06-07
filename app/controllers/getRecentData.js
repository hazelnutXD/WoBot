const fs = require("fs");
const recent = require("../api/recent");
const findUserId = require("../api/findUserId");
const timestampToTime = require("../../utils/timestampToTime");
const drawImg = require("../../utils/drawImg");

const getRecentData = async (server, id, day) => {
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
      recentList: recentRes.data.data.shipData[0].shipData.filter((item) => {
        return item.shipInfo.shipId != -1;
      }),
      recordTime: timestampToTime(
        recentRes.data.data.shipData[0].recordDateTime
      ),
    };
    return drawImg(htmlTemplate, content);
  } else {
    return false;
  }
};

module.exports = getRecentData;
