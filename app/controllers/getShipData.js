const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
const findUserId = require("../api/findUserId");
const findShipId = require("../api/findShipId");
const personalShip = require("../api/personalShip");
const timestampToTime = require("../../utils/timestampToTime");

const getShipData = async (server, id, shipName) => {
  if (server != "QQ") {
    let findIdRes = await findUserId(server, id);
    if (findIdRes.data.code === 200) {
      id = findIdRes.data.data.accountId;
    } else {
      return false;
    }
  }

  try {
    let findShipIdRes = await findShipId(shipName);
    let shipId;
    if (
      findShipIdRes.data.code === 200 &&
      findShipIdRes.data.data.length != 0
    ) {
      shipId = await findShipIdRes.data.data[0].id;
    } else {
      return false;
    }

    let personalShipRes = await personalShip(server, id, shipId);
    if (personalShipRes.data.code == 200) {
      let htmlTemplate = fs.readFileSync("./template/ship.html").toString();
      let imgBuffer = await nodeHtmlToImage({
        html: htmlTemplate,
        type: "jpeg",
        quality: 100,
        content: {
          personalShipData: personalShipRes.data.data,
          lastDateTime: timestampToTime(
            personalShipRes.data.data.shipInfo.lastBattlesTime
          ),
        },
      });
      return imgBuffer;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = getShipData;
