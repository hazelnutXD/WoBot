const nodeHtmlToImage = require("node-html-to-image");

const drawImg = async (htmlTemplate, content) => {
  let imgBuffer = await nodeHtmlToImage({
    html: htmlTemplate,
    type: "jpeg",
    quality: 100,
    content,
  });
  return imgBuffer;
};

module.exports = drawImg;
