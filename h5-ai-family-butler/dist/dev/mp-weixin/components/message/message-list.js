"use strict";
const common_vendor = require("../../common/vendor.js");
const components_ipViewComponents_core_message_MessageCenter = require("../ipViewComponents/core/message/MessageCenter.js");
const constants_WSConstants = require("../../constants/WSConstants.js");
const constants_MessageContants = require("../../constants/MessageContants.js");
const api_main = require("../../api/main.js");
require("../../utils/urlMap.js");
require("../ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../utils/router.js");
require("../../utils/shared.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../../constants/MainPageConstants.js");
const __unplugin_components_0 = () => "../wyb-noticeBar/wyb-noticeBar.js";
if (!Array) {
  const _easycom_wyb_noticeBar2 = __unplugin_components_0;
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  (_easycom_wyb_noticeBar2 + _easycom_uni_transition2)();
}
const _easycom_wyb_noticeBar = () => "../wyb-noticeBar/wyb-noticeBar.js";
const _easycom_uni_transition = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.js";
if (!Math) {
  (_easycom_wyb_noticeBar + _easycom_uni_transition)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "message-list",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const messageList = common_vendor.reactive({
      messages: [
        // {
        //   content: '今天天气不错3',
        //   type: MessageType.SYSTEM_POPUP,
        //   index: 0
        // },
        // {
        //   content: '今天天气不错svsv3',
        //   type: MessageType.SYSTEM_POPUP,
        //   index: 1
        // }
      ],
      prompts: []
    });
    const tabId = common_vendor.ref(-1);
    const listHeight = common_vendor.ref(0);
    const mainTitle = common_vendor.ref("");
    const mainContent = common_vendor.ref("");
    const socketBack = common_vendor.ref(true);
    const testValue = common_vendor.ref(10);
    const recommendList = common_vendor.ref([]);
    let test = setInterval(() => {
      testValue.value--;
      if (testValue.value === 0) {
        clearInterval(test);
      }
    }, 1e3);
    common_vendor.onMounted(() => {
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("messageScrollHeight", scrollHeightHandler, this);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("messageList", messageHandler, this);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("mainPageMessageTip", mainPageMessageTipHandler, this);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("wsMessage", wsMessageHandler, this);
      gettRecommendInfo();
    });
    function scrollHeightHandler(e) {
      listHeight.value = e;
    }
    function messageHandler(e, type) {
      console.log(e, type, "messageHandlermessageHandler", constants_MessageContants.MessageType.SYSTEM_POPUP);
      if (mainTitle.value.length) {
        mainTitle.value = "";
      }
      let arr = [
        ...messageList.messages
      ];
      arr.push({
        content: e,
        type,
        index: arr.length
      });
      messageList.messages = arr;
      console.log(messageList.messages, messageList, "messageList.messages");
      tabId.value = arr[arr.length - 1].index;
    }
    function mainPageMessageTipHandler(data) {
      mainTitle.value = data.tipTitle;
      mainContent.value = data.tipContent.length ? data.tipContent.replace(/\n/g, "<br/>") : "";
      if (data.prompts && data.prompts) {
        let prompts = data.prompts.splice(0, 2);
        messageList.prompts = [...prompts];
      }
    }
    function wsMessageHandler(message) {
      switch (message.socketCmd) {
        case constants_WSConstants.SocketCmd.CHAT:
          messageList.messages = messageList.messages.filter((item) => item.content !== "LOADING");
          messageHandler(message.msg, constants_MessageContants.MessageType.ROBOT);
          break;
        case constants_WSConstants.SocketCmd.FINISH:
          messageList.messages = messageList.messages.filter((item) => item.content !== "LOADING");
          components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("messageFinish", message.msg || null);
          break;
      }
    }
    function getReminderType(type) {
      switch (type) {
        case 0:
          return "单次";
        case 1:
          return "周期";
        default:
          return "未设置";
      }
    }
    function getWay(type) {
      switch (type) {
        case 0:
          return "微信";
        case 1:
          return "短信";
        case 2:
          return "音频外呼";
        case 3:
          return "视频外呼";
        default:
          return "未设置";
      }
    }
    const gettRecommendInfo = async () => {
      const res = await api_main.main.getRecommendList({});
      console.log(res, "我是接受数据");
      recommendList.value = res;
      console.log(recommendList.value, "我是推荐列表");
    };
    const tipTypeChange = async (id) => {
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("sendType", id);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("messageTipList");
    };
    const goMember = () => {
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("messageTipList");
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return {
        a: common_vendor.p({
          text: ["你好，我是您的AI亲情提醒助手", "您可以文字或语音发送类似如下内容", "明天8点提醒妈妈去医院复查", ""],
          type: "vert",
          bgColor: "rgba(255,255,255,0.0)",
          color: "#FFFFFF",
          ["show-more"]: false,
          ["show-icon"]: false,
          ["font-size"]: "30"
        }),
        b: common_vendor.unref(recommendList).length && ((_a = common_vendor.unref(recommendList)[0]) == null ? void 0 : _a.homePictureUrl) ? common_vendor.unref(recommendList)[0].homePictureUrl : "",
        c: common_vendor.o(($event) => tipTypeChange(common_vendor.unref(recommendList)[0].id)),
        d: common_vendor.unref(recommendList).length && ((_b = common_vendor.unref(recommendList)[1]) == null ? void 0 : _b.homePictureUrl) ? common_vendor.unref(recommendList)[1].homePictureUrl : "",
        e: common_vendor.o(($event) => tipTypeChange(common_vendor.unref(recommendList)[1].id)),
        f: common_vendor.unref(recommendList).length && ((_c = common_vendor.unref(recommendList)[2]) == null ? void 0 : _c.homePictureUrl) ? common_vendor.unref(recommendList)[2].homePictureUrl : "",
        g: common_vendor.o(($event) => tipTypeChange(common_vendor.unref(recommendList)[2].id)),
        h: common_vendor.unref(recommendList).length && ((_d = common_vendor.unref(recommendList)[3]) == null ? void 0 : _d.homePictureUrl) ? common_vendor.unref(recommendList)[3].homePictureUrl : "",
        i: common_vendor.o(($event) => tipTypeChange(common_vendor.unref(recommendList)[3].id)),
        j: common_vendor.o(($event) => goMember()),
        k: common_vendor.unref(mainTitle).length,
        l: common_vendor.f(common_vendor.unref(messageList).messages, (item, k0, i0) => {
          var _a2, _b2, _c2, _d2, _e, _f, _g, _h, _i;
          return common_vendor.e({
            a: common_vendor.t(item.content),
            b: item.type === common_vendor.unref(constants_MessageContants.MessageType).USER,
            c: "tab" + item.index,
            d: "10287a0d-1-" + i0,
            e: common_vendor.p({
              ["mode-class"]: "fade",
              show: true,
              id: "tab" + item.index
            })
          }, common_vendor.unref(socketBack) ? {
            f: item.type === common_vendor.unref(constants_MessageContants.MessageType).LOADING,
            g: "tab" + item.index,
            h: "10287a0d-2-" + i0,
            i: common_vendor.p({
              ["mode-class"]: "fade",
              show: true,
              id: "tab" + item.index
            })
          } : {}, {
            j: common_vendor.t(item.content),
            k: item.type === common_vendor.unref(constants_MessageContants.MessageType).ROBOT,
            l: "tab" + item.index,
            m: "10287a0d-3-" + i0,
            n: common_vendor.p({
              ["mode-class"]: "fade",
              show: true,
              id: "tab" + item.index
            }),
            o: common_vendor.t(item.content),
            p: item.type === common_vendor.unref(constants_MessageContants.MessageType).SYSTEM_LOADING,
            q: ((_b2 = (_a2 = item == null ? void 0 : item.content) == null ? void 0 : _a2.userRelation) == null ? void 0 : _b2.headImage) || "",
            r: common_vendor.t(((_c2 = item == null ? void 0 : item.content) == null ? void 0 : _c2.toUserAccount) || ((_e = (_d2 = item == null ? void 0 : item.content) == null ? void 0 : _d2.userRelation) == null ? void 0 : _e.typeName) || "未设置"),
            s: common_vendor.t(getWay((_f = item == null ? void 0 : item.content) == null ? void 0 : _f.way)),
            t: common_vendor.t(getReminderType((_g = item == null ? void 0 : item.content) == null ? void 0 : _g.reminderType)),
            v: common_vendor.t(((_h = item == null ? void 0 : item.content) == null ? void 0 : _h.reminderTime) || "未设置"),
            w: common_vendor.t(((_i = item == null ? void 0 : item.content) == null ? void 0 : _i.content) || "未设置提醒内容"),
            x: item.type === common_vendor.unref(constants_MessageContants.MessageType).SYSTEM_POPUP,
            y: "tab" + item.index,
            z: "10287a0d-4-" + i0,
            A: common_vendor.p({
              ["mode-class"]: "fade",
              show: true,
              id: "tab" + item.index
            }),
            B: item.index
          });
        }),
        m: common_vendor.unref(socketBack),
        n: !common_vendor.unref(mainTitle).length,
        o: common_vendor.unref(listHeight) + "rpx",
        p: "tab" + common_vendor.unref(tabId)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-10287a0d"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/message/message-list.vue"]]);
wx.createComponent(Component);
