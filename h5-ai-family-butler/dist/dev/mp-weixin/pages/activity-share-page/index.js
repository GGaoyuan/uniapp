"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_router = require("../../utils/router.js");
const api_activityPage = require("../../api/activity-page.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../../components/ipViewComponents/core/message/MessageCenter.js");
require("../../components/ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad((option) => {
      console.log(option, "我是入参");
      templateId.value = option.templateId;
      isShare.value = option.share;
      getShareInfo();
    });
    common_vendor.onMounted(() => {
      if (isShare.value === "false") {
        setTimeout(() => {
          common_vendor.index.showToast({
            title: "设置成功"
          });
        }, 100);
      }
    });
    common_vendor.onShow(() => {
      innerAudioContext.play();
      console.log("执行播放");
    });
    const innerAudioContext = common_vendor.index.createInnerAudioContext();
    innerAudioContext.src = "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/music/new-year-music.mp3";
    const isPlayMusic = common_vendor.ref(true);
    const playStatusChange = () => {
      if (isPlayMusic.value) {
        isPlayMusic.value = false;
        innerAudioContext.pause();
      } else {
        isPlayMusic.value = true;
        innerAudioContext.play();
      }
    };
    common_vendor.onBeforeUnmount(() => {
      innerAudioContext.stop();
      console.log("执行暂停");
    });
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref("");
    const id = common_vendor.ref("12312312313");
    const templateId = common_vendor.ref("");
    const isShare = common_vendor.ref("");
    let templateImage = common_vendor.ref({});
    const getShareInfo = () => {
      api_activityPage.activity.share({
        templateId: templateId.value
      }).then((res) => {
        templateImage.value = res;
        console.log(templateImage.value, "我是分享回调");
      });
    };
    const goSetClipBoard = () => {
      common_vendor.index.setClipboardData({
        data: "快过年了，我给你留了一段心声， 注意接听1253077的电话",
        // 设置要复制的文本内容
        success(res) {
          console.log("成功复制到剪贴板");
        },
        fail(err) {
          console.error("复制失败", err);
        }
      });
    };
    common_vendor.onShareAppMessage((res) => {
      id.value = "321321321321321";
      return {
        title: "2024新春说给爸妈的话",
        path: `pages/activity-share-page/index?templateId=${templateId.value}&share=true`
      };
    });
    const goActivity = () => {
      utils_router.forward("activity-page");
    };
    const goHomePage = () => {
      utils_router.forward("index");
    };
    const goMyWish = () => {
      utils_router.forward("activity-h5-page", {
        goType: "wish"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isPlayMusic.value
      }, isPlayMusic.value ? {
        b: common_vendor.o(($event) => playStatusChange())
      } : {}, {
        c: !isPlayMusic.value
      }, !isPlayMusic.value ? {
        d: common_vendor.o(($event) => playStatusChange())
      } : {}, {
        e: isPlayMusic.value ? 1 : "",
        f: common_vendor.o(($event) => goMyWish()),
        g: common_vendor.unref(templateImage),
        h: common_vendor.o(($event) => goSetClipBoard()),
        i: !isShare.value
      }, !isShare.value ? {} : {}, {
        j: isShare.value
      }, isShare.value ? {
        k: common_vendor.o(($event) => goActivity())
      } : {}, {
        l: common_vendor.o(($event) => goHomePage())
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-9267ed99"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/activity-share-page/index.vue"]]);
wx.createPage(MiniProgramPage);
