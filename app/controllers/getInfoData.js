const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
const info = require("../api/info");
const timestampToTime = require("../../utils/timestampToTime");

const getInfoData = async (qid) => {
  let infoRes = await info(qid);
  if (infoRes.data.code === 200) {
    var htmlTemplate = fs.readFileSync("./template/info.html").toString();
  } else {
    return false;
  }

  let imgBuffer = await nodeHtmlToImage({
    html: htmlTemplate,
    type: "jpeg",
    quality: 100,
    content: {
      infoData: infoRes.data.data,
      infoList: infoRes.data.data.type,
      lastDateTime: timestampToTime(infoRes.data.data.lastDateTime),
    },
  });
  return imgBuffer;
};

module.exports = getInfoData;
