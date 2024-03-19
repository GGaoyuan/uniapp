"use strict";
const common_vendor = require("../../common/vendor.js");
const components_record_IseComponent = require("./IseComponent.js");
const components_ipViewComponents_core_message_MessageCenter = require("../ipViewComponents/core/message/MessageCenter.js");
const common_assets = require("../../common/assets.js");
require("../../net/websocket/STTConnect.js");
require("../../constants/WSConstants.js");
require("../ipViewComponents/core/utils/pools/ObjectPool.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "uni-record",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    maximum: {
      type: Number,
      default: 15
    }
  },
  emits: [
    "confirm"
  ],
  setup(__props, { emit: emits }) {
    const props = __props;
    const recorderManager = common_vendor.index.getRecorderManager();
    const recorderText = common_vendor.ref("");
    const playStatus = common_vendor.ref(false);
    const finish = common_vendor.ref(false);
    const timer = common_vendor.ref(null);
    const showTop = common_vendor.ref(false);
    common_vendor.watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal) {
          popupShow();
        } else {
          popupClose();
        }
      }
    );
    common_vendor.ref(null);
    const popupRef = common_vendor.ref(null);
    const popupShow = () => {
      popupRef.value.open();
      playStatus.value = false;
      recorderText.value = "";
      showTop.value = false;
    };
    const popupClose = () => {
      popupRef.value.close();
      emits("confirm", recorderText.value);
    };
    common_vendor.index.createSelectorQuery();
    common_vendor.onMounted(() => {
      if (props.visible) {
        popupShow();
      }
      recorderManager.onStart(() => {
        recorderText.value = "";
      });
      recorderManager.onStop(({ tempFilePath }) => {
        clearInterval(timer.value);
        finish.value = true;
        playStatus.value = false;
        showTop.value = true;
      });
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("sttMessage", sttMessageHandler, this);
    });
    function sttMessageHandler(e) {
      var _a;
      console.log("sttMessageHandler", e);
      if (e.retCode === "000000") {
        if ((_a = e == null ? void 0 : e.result) == null ? void 0 : _a.text) {
          recorderText.value = e.result.text;
        }
      }
    }
    function confirm() {
      console.log("完成");
      popupClose();
    }
    function cancel() {
      console.log("cancel");
      showTop.value = false;
    }
    function onEndRecoder() {
      console.log("onEndRecoder");
      recorderManager.stop();
      setTimeout(() => {
        console.log("延时发送结束指令 endPushAudioData");
        components_record_IseComponent.ise.endPushAudioData();
      }, 500);
    }
    function onStartRecoder() {
      playStatus.value = true;
      showTop.value = false;
      recorderManager.start({
        duration: props.maximum * 1e3,
        audioSource: "auto",
        sampleRate: 16e3,
        encodeBitRate: 96e3,
        numberOfChannels: 1,
        frameSize: 2,
        // format: 'mp3',
        format: "PCM"
      });
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer, isLastFrame } = res;
        components_record_IseComponent.ise.pushAudioData(frameBuffer);
        if (isLastFrame) {
          console.log("结束录制消息 ");
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !showTop.value
      }, !showTop.value ? {
        b: common_vendor.t(playStatus.value ? "松开完成录制" : "长按录制语音")
      } : {}, {
        c: showTop.value
      }, showTop.value ? {
        d: common_vendor.t(recorderText.value)
      } : {}, {
        e: !showTop.value
      }, !showTop.value ? {
        f: common_vendor.unref(common_assets.animateWave),
        g: playStatus.value
      } : {}, {
        h: !showTop.value
      }, !showTop.value ? {
        i: common_vendor.unref(common_assets.voice),
        j: common_vendor.o(onStartRecoder),
        k: common_vendor.o(onEndRecoder),
        l: common_vendor.s(!playStatus.value ? "opacity: 1" : "opacity: 0.2")
      } : {}, {
        m: showTop.value
      }, showTop.value ? {
        n: common_vendor.o(cancel),
        o: common_vendor.o(confirm)
      } : {}, {
        p: common_vendor.sr(popupRef, "b55259d6-0", {
          "k": "popupRef"
        }),
        q: common_vendor.o(popupClose),
        r: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false,
          ["mask-background-color"]: 0
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/record/uni-record.vue"]]);
wx.createComponent(Component);
