"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../../common/vendor.js");
const net_websocket_STTConnect = require("../../net/websocket/STTConnect.js");
class IseClass {
  constructor() {
    // 音频流数据
    __publicField(this, "audioDataList", []);
    __publicField(this, "handlerInterval");
    __publicField(this, "isEnd", false);
  }
  // private transWorker = new TranscodeWorker();
  /**
   * 添加语音数据
   * @param frameBuffer 帧数据
   */
  pushAudioData(frameBuffer) {
    if (frameBuffer) {
      this.audioDataList.push(frameBuffer);
    }
    if (!this.handlerInterval) {
      this.sendAudioData();
    }
  }
  // mergeArrayBuffers() {
  //   let totalLength = 0;
  //   for (const buffer of this.audioDataList) {
  //     totalLength += buffer.byteLength;
  //   }
  //   const mergedBuffer = new ArrayBuffer(totalLength);
  //   const uint8Array = new Uint8Array(mergedBuffer);
  //   let offset = 0;
  //   for (const buffer of this.audioDataList) {
  //     const sourceArray = new Uint8Array(buffer);
  //     uint8Array.set(sourceArray, offset);
  //     offset += sourceArray.length;
  //   }
  //   this.sendData = mergedBuffer;
  //   return mergedBuffer;
  // }
  /**
   * 发送语音数据
   */
  sendAudioData() {
    const audioData = this.audioDataList.splice(0, 1);
    this.send(audioData[0]);
    this.handlerInterval = setInterval(() => {
      if (!net_websocket_STTConnect.stt) {
        return this.clearHandlerInterval();
      }
      if (this.audioDataList.length === 0 && this.isEnd) {
        console.log("bytes 全部发送完毕");
        ise.send(JSON.stringify({ type: 1 }));
        this.clearHandlerInterval();
        return;
      }
      if (this.audioDataList.length) {
        const audioData2 = this.audioDataList.splice(0, 1);
        this.send(audioData2[0]);
      }
    }, 50);
  }
  endPushAudioData() {
    this.isEnd = true;
  }
  send(msg) {
    if (typeof msg === "string") {
      console.log("send type");
      net_websocket_STTConnect.stt.send(msg);
    } else {
      console.log("send msg", msg && msg.byteLength || "null");
      net_websocket_STTConnect.stt && msg.byteLength > 0 && net_websocket_STTConnect.stt.send(msg);
    }
  }
  clearHandlerInterval() {
    this.isEnd = false;
    if (this.handlerInterval) {
      clearInterval(this.handlerInterval);
      this.handlerInterval = null;
    }
  }
  toBase64(buffer) {
    return common_vendor.index.arrayBufferToBase64(buffer);
  }
}
var ise = new IseClass();
exports.ise = ise;
