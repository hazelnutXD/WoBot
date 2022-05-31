const { createClient, segment } = require("oicq");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/config.env",
});
const order = require("./core/order");
const account = process.env.QQ_account;
const client = createClient(account);

client.on("system.online", () => console.log("Logged in!"));
client.on("message", (e) => {
  order(e, segment);
});

client
  .on("system.login.qrcode", function (e) {
    //扫码后按回车登录
    process.stdin.once("data", () => {
      this.login();
    });
  })
  .login();
