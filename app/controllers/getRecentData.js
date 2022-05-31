const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
const recent = require("../api/recent");
const timestampToTime = require("../../utils/timestampToTime");

const getRecentData = async (qid, day) => {
  let recentRes = await recent(qid, day);
  if (recentRes.data.code === 200) {
    var htmlTemplate = fs.readFileSync("./template/recent.html").toString();
  } else {
    return false;
  }

  let imgBuffer = await nodeHtmlToImage({
    html: htmlTemplate,
    type: "jpeg",
    quality: 100,
    content: {
      recentData: recentRes.data.data,
      recentList: recentRes.data.data.recentList,
      recordTime: timestampToTime(recentRes.data.data.recordTime),
    },
  });
  return imgBuffer;
};

module.exports = getRecentData;
