"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../../common/vendor.js");
const components_ipViewComponents_core_message_MessageCenter = require("../../components/ipViewComponents/core/message/MessageCenter.js");
const constants_WSConstants = require("../../constants/WSConstants.js");
class STTConnect {
  constructor() {
    __publicField(this, "socketTask");
    __publicField(this, "url");
    __publicField(this, "status");
    __publicField(this, "lockReconnect");
    __publicField(this, "timeout");
    __publicField(this, "timeoutObj");
    __publicField(this, "reconnectTimeOutObj");
  }
  initRequest(url, time) {
    this.status = null;
    this.lockReconnect = false;
    this.url = url;
    this.timeout = time;
    this.timeoutObj = null;
    this.reconnectTimeOutObj = null;
    this.socketTask = common_vendor.index.connectSocket({
      url: this.url,
      //接口地址。
      success: () => {
        console.log("STT:连接成功");
        return this.socketTask;
      }
    });
    this.socketTask.onOpen((res) => {
      console.log(res, "STT:连接打开");
      clearTimeout(this.reconnectTimeOutObj);
      this.start();
    });
    this.socketTask.onClose((res) => {
      console.log(res, "STT:连接关闭");
      this.reconnect();
    });
    this.socketTask.onError((res) => {
      console.log(res, "STT:连接错误");
      this.reconnect();
    });
    this.socketTask.onMessage((res) => {
      var _a;
      this.reset();
      console.log(res, "STT:pong");
      let msg = JSON.parse(res.data);
      if (((_a = msg == null ? void 0 : msg.result) == null ? void 0 : _a.type) !== "heart") {
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("sttMessage", msg);
      }
    });
  }
  send(value) {
    this.socketTask.send({
      data: value,
      success: () => {
      }
    });
  }
  // reset和start方法主要用来控制心跳的定时。
  reset() {
    clearTimeout(this.timeoutObj);
    this.start();
  }
  start() {
    this.timeoutObj = setTimeout(() => {
      console.log("STT:ping");
      let _json = { "type": constants_WSConstants.SocketCmd.HEART };
      let parseStr = JSON.stringify(_json);
      this.socketTask.send({
        data: parseStr
      });
    }, this.timeout);
  }
  // 重连
  reconnect() {
    if (this.lockReconnect) {
      return;
    }
    this.lockReconnect = true;
    console.log("STT:准备重连");
    this.reconnectTimeOutObj = setTimeout(() => {
      this.initRequest(this.url, this.timeout);
      this.lockReconnect = false;
    }, 1e3);
  }
  // 手动关闭
  close() {
    this.socketTask.close();
  }
}
var stt = new STTConnect();
exports.stt = stt;
