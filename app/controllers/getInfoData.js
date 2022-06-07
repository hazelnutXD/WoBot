const fs = require("fs");
const info = require("../api/info");
const findUserId = require("../api/findUserId");
const timestampToTime = require("../../utils/timestampToTime");
const drawImg = require("../../utils/drawImg");

const getInfoData = async (server, id) => {
  if (server != "QQ") {
    let findIdRes = await findUserId(server, id);
    if (findIdRes.data.code === 200) {
      id = findIdRes.data.data.accountId;
    } else {
      return false;
    }
  }

  let infoRes = await info(server, id);
  if (infoRes.data.code === 200) {
    let htmlTemplate = fs.readFileSync("./template/info.html").toString();
    let content = {
      infoData: infoRes.data.data,
      infoList: infoRes.data.data.type,
      lastDateTime: timestampToTime(infoRes.data.data.lastDateTime),
    };
    return drawImg(htmlTemplate, content);
  } else {
    return false;
  }
};

module.exports = getInfoData;
