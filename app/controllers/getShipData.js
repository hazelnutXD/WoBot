const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
const findShipId = require("../api/findShipId");
const personalShip = require("../api/personalShip");
const timestampToTime = require("../../utils/timestampToTime");

const getShipData = async (qid, shipName) => {
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

    let personalShipRes = await personalShip(qid, shipId);
    if (personalShipRes.data.code != 500) {
      var htmlTemplate = fs.readFileSync("./template/ship.html").toString();
    } else {
      return false;
    }

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
  } catch (error) {
    return error;
  }
};

module.exports = getShipData;
