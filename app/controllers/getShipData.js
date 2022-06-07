const fs = require("fs");
const findUserId = require("../api/findUserId");
const findShipId = require("../api/findShipId");
const personalShip = require("../api/personalShip");
const timestampToTime = require("../../utils/timestampToTime");
const drawImg = require("../../utils/drawImg");

const getShipData = async (server, id, shipName) => {
  if (server != "QQ") {
    let findIdRes = await findUserId(server, id);
    if (findIdRes.data.code === 200) {
      id = findIdRes.data.data.accountId;
    } else {
      return false;
    }
  }

  let findShipIdRes = await findShipId(shipName);
  let shipIdArr, personalShipRes;
  if (findShipIdRes.data.code === 200 && findShipIdRes.data.data.length != 0) {
    shipIdArr = await findShipIdRes.data.data;
    for (let i = 0; i < shipIdArr.length; i++) {
      personalShipRes = await personalShip(server, id, shipIdArr[i].id);
      if (
        personalShipRes.data.code === 200 &&
        personalShipRes.data.data.shipInfo.battles != 0
      ) {
        let htmlTemplate = fs.readFileSync("./template/ship.html").toString();
        let content = {
          personalShipData: personalShipRes.data.data,
          lastDateTime: timestampToTime(
            personalShipRes.data.data.shipInfo.lastBattlesTime
          ),
        };
        return drawImg(htmlTemplate, content);
      }
    }
    return false;
  } else {
    return false;
  }
};

module.exports = getShipData;
