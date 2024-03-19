"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const components_ipViewComponents_core_utils_pools_ObjectPool = require("../utils/pools/ObjectPool.js");
class MessageCenter {
  constructor() {
    __publicField(this, "dict");
    __publicField(this, "eVec");
    __publicField(this, "lastRunTime");
    this.dict = {};
    this.eVec = new Array();
    this.lastRunTime = 0;
  }
  /**
   * 添加消息监听 
   * @param type 消息唯一标识
   * @param listener 侦听函数
      * @param listenerObj 侦听函数所属对象
   * 
   */
  listen(type, listener, listenerObj) {
    var arr = this.dict[type];
    if (arr == null) {
      arr = new Array();
      this.dict[type] = arr;
    }
    var i = 0;
    var len = arr.length;
    for (i; i < len; i++) {
      if (arr[i][0] == listener && arr[i][1] == listenerObj) {
        return;
      }
    }
    arr.push([listener, listenerObj]);
  }
  /**
   * 移除消息监听 
   * @param type 消息唯一标识
      * @param listener 侦听函数
      * @param listenerObj 侦听函数所属对象
   */
  unlisten(type, listener, listenerObj) {
    var arr = this.dict[type];
    if (arr == null) {
      return;
    }
    var i = 0;
    var len = arr.length;
    for (i; i < len; i++) {
      if (arr[i][0] == listener && arr[i][1] == listenerObj) {
        arr.splice(i, 1);
        break;
      }
    }
    if (arr.length == 0) {
      this.dict[type] = null;
      delete this.dict[type];
    }
  }
  /**
   * 触发消息 
   * @param type 消息唯一标识
   * @param param 消息参数
   * 
   */
  dispatch(type, ...param) {
    if (this.dict[type] == null) {
      return;
    }
    var vo = components_ipViewComponents_core_utils_pools_ObjectPool.objectPool.pop(MessageVo);
    vo.type = type;
    vo.param = param;
    this.eVec.push(vo);
  }
  /**
   * 运行 
   * 
   */
  run() {
    var currTime = new Date().getTime();
    var inSleep = currTime - this.lastRunTime > 100;
    this.lastRunTime = currTime;
    if (inSleep) {
      while (this.eVec.length > 0) {
        this.dealMsg(this.eVec.shift());
      }
    } else {
      while (this.eVec.length > 0) {
        this.dealMsg(this.eVec.shift());
        if (new Date().getTime() - currTime > 5) {
          break;
        }
      }
    }
  }
  /**
   * 处理一条消息
   * @param msgVo
   */
  dealMsg(msgVo) {
    var listeners = this.dict[msgVo.type];
    var i = 0;
    var len = listeners.length;
    var listener = null;
    while (i < len) {
      listener = listeners[i];
      listener[0].apply(listener[1], msgVo.param);
      i++;
    }
    msgVo.dispose();
    components_ipViewComponents_core_utils_pools_ObjectPool.objectPool.push(msgVo);
  }
}
class MessageVo {
  constructor() {
    __publicField(this, "type");
    __publicField(this, "param");
  }
  dispose() {
    this.type = null;
    this.param = null;
  }
}
var messageCenter = new MessageCenter();
exports.messageCenter = messageCenter;
