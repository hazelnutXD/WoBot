# WoBot

舰游自助查询 Bot

## 简介

这是一个基于 Nodejs 实现的舰游相关 QQ 自助查询机器人

## 功能

### wows 相关

- 绑定账号

  wws set 游戏昵称 [服务器]

- 查看近期战绩

  wws recent [天数(数字 1-7)]

- 个人总体

  wws info

- 单船战绩

  wws ship 船名

## 安装与使用

1. 安装依赖

   ```bash
   npm i
   ```

2. 修改 `config.js` 文件中的 QQ 账号与 token

3. 运行

   ```bash
   npm run start
   ```

## 其他

更多功能将在后续更新中上线...
