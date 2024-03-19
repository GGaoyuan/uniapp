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
class AIConnect {
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
        return this.socketTask;
      }
    });
    this.socketTask.onOpen((res) => {
      clearTimeout(this.reconnectTimeOutObj);
      this.start();
    });
    this.socketTask.onClose((res) => {
      this.reconnect();
    });
    this.socketTask.onError((res) => {
      this.reconnect();
    });
    this.socketTask.onMessage((res) => {
      this.reset();
      setTimeout(() => {
        let msg = JSON.parse(res.data);
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("wsMessage", msg);
      }, 500);
    });
  }
  send(value, type) {
    let _json = {
      "msg": value,
      "socketCmd": type,
      "socketMsgType": constants_WSConstants.SocketMsgType.INPUT
    };
    let jsonStr = JSON.stringify(_json);
    return new Promise((resovle, reject) => {
      this.socketTask.send({
        data: jsonStr,
        success: () => {
          resovle("AI: 发送成功");
        }
      });
    });
  }
  // reset和start方法主要用来控制心跳的定时。
  reset() {
    clearTimeout(this.timeoutObj);
    this.start();
  }
  start() {
    this.timeoutObj = setTimeout(() => {
      let _json = { "msg": "ping", "socketCmd": constants_WSConstants.SocketCmd.PING, "socketMsgType": constants_WSConstants.SocketMsgType.INPUT };
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
var ws = new AIConnect();
exports.ws = ws;
