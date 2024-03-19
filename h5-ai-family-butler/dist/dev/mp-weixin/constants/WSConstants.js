"use strict";
var SocketMsgType = /* @__PURE__ */ ((SocketMsgType2) => {
  SocketMsgType2["INPUT"] = "INPUT";
  SocketMsgType2["ROBOT"] = "ROBOT";
  return SocketMsgType2;
})(SocketMsgType || {});
var SocketCmd = /* @__PURE__ */ ((SocketCmd2) => {
  SocketCmd2["PING"] = "PING";
  SocketCmd2["PONG"] = "PONG";
  SocketCmd2["CHAT"] = "CHAT";
  SocketCmd2["FINISH"] = "FINISH";
  SocketCmd2["LOADING"] = "LOADING";
  SocketCmd2["RECONNECTION"] = "RECONNECTION";
  SocketCmd2["CLOSE"] = "CLOSE";
  SocketCmd2["ERROR"] = "ERROR";
  SocketCmd2["HEART"] = "heart";
  SocketCmd2["STTFINISH"] = "1";
  return SocketCmd2;
})(SocketCmd || {});
exports.SocketCmd = SocketCmd;
exports.SocketMsgType = SocketMsgType;
