const request = require("../../utils/request");

const personalShip = (shipName) => {
  return request({
    url: `/public/wows/encyclopedia/ship/search?shipName=${encodeURI(
      shipName
    )}`,
  });
};

module.exports = personalShip;
