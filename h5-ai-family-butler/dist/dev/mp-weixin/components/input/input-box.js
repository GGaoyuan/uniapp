"use strict";
const common_vendor = require("../../common/vendor.js");
const components_ipViewComponents_core_message_MessageCenter = require("../ipViewComponents/core/message/MessageCenter.js");
const constants_MessageContants = require("../../constants/MessageContants.js");
const net_websocket_AIConnect = require("../../net/websocket/AIConnect.js");
const constants_WSConstants = require("../../constants/WSConstants.js");
const utils_recordUtils = require("../../utils/recordUtils.js");
require("../ipViewComponents/core/utils/pools/ObjectPool.js");
if (!Math) {
  uniRecord();
}
const uniRecord = () => "../record/uni-record.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "input-box",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const recordPlayerPopup = common_vendor.ref(false);
    const message = common_vendor.ref("");
    let isLogin2 = false;
    common_vendor.onMounted(() => {
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("addMessage", addMessageHandler, this);
    });
    common_vendor.watch(
      () => message,
      (newVal, oldVal) => {
      }
    );
    const showUseMc = common_vendor.ref(true);
    function focusEvent(event) {
      showUseMc.value = true;
    }
    function getFocus(e) {
      showUseMc.value = false;
      console.log("getFocus");
      console.log(message.value, "message");
    }
    function addMessageHandler(msg) {
      message.value = msg;
    }
    function useMC() {
      utils_recordUtils.checkRecord(() => {
        recordPlayerPopup.value = true;
      });
    }
    function onUpload(e) {
      recordPlayerPopup.value = false;
      addMessageHandler(e && e.length ? e : "");
    }
    function sendMessage(e) {
      let userVO = common_vendor.index.getStorageSync("userInfo");
      if (userVO && userVO.userInfoVO) {
        isLogin2 = true;
      } else {
        isLogin2 = false;
      }
      if (isLogin2) {
        if (message.value.length) {
          components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("messageList", message.value, constants_MessageContants.MessageType.USER);
          components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("messageList", "LOADING", constants_MessageContants.MessageType.LOADING);
          net_websocket_AIConnect.ws.send(message.value, constants_WSConstants.SocketCmd.CHAT);
          message.value = "";
        }
      } else {
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("loginPopupVisible", true);
      }
    }
    function createFinishPopup() {
      let userVO = common_vendor.index.getStorageSync("userInfo");
      if (userVO && userVO.userInfoVO) {
        isLogin2 = true;
      } else {
        isLogin2 = false;
      }
      if (isLogin2) {
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("messageFinish", null);
      } else {
        components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("loginPopupVisible", true);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(createFinishPopup),
        b: common_vendor.o(($event) => getFocus()),
        c: common_vendor.o(($event) => focusEvent()),
        d: common_vendor.unref(message),
        e: common_vendor.o(($event) => common_vendor.isRef(message) ? message.value = $event.detail.value : null),
        f: !common_vendor.unref(showUseMc) && common_vendor.unref(message).length > 0
      }, !common_vendor.unref(showUseMc) && common_vendor.unref(message).length > 0 ? {} : {
        g: common_vendor.o(useMC)
      }, {
        h: common_vendor.o(sendMessage),
        i: common_vendor.unref(message).length ? "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_send_1.png" : "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_send_2.png",
        j: common_vendor.unref(message),
        k: common_vendor.unref(message),
        l: common_vendor.o(onUpload),
        m: common_vendor.p({
          maximum: 60,
          visible: common_vendor.unref(recordPlayerPopup)
        }),
        n: common_vendor.unref(recordPlayerPopup)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2881456"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/input/input-box.vue"]]);
wx.createComponent(Component);
