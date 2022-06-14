const roll = require("../api/roll");

const getRollData = async () => {
  let rollRes = await roll();
  if (rollRes.data.code === 200) {
    let slotsList = rollRes.data.data.slotsList;
    let dataList = slotsList.splice(0, 10);
    let txt = "";
    dataList.forEach((item, index) => {
      txt += index + 1 + "." + item.name + " x " + item.amount + "\n";
    });
    return txt;
  } else {
    return "服务器忙碌请稍后重试";
  }
};

module.exports = getRollData;
