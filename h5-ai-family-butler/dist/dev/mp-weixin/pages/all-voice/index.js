"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
const api_allVoice = require("../../api/all-voice.js");
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
if (!Array) {
  const _easycom_l_circle2 = common_vendor.resolveComponent("l-circle");
  _easycom_l_circle2();
}
const _easycom_l_circle = () => "../../uni_modules/lime-circle/components/l-circle/l-circle.js";
if (!Math) {
  _easycom_l_circle();
}
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage((res) => {
      return {
        title: "AI亲情提醒",
        path: `pages/main/index`,
        imageUrl: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/share-img/share-img.png"
      };
    });
    const videoList = common_vendor.ref([
      { name: "111", id: "1", target: 100 },
      { name: "222", id: "2", target: 70 },
      { name: "333", id: "3", target: 80 }
    ]);
    const target = common_vendor.ref(0);
    const modelVale = common_vendor.ref(0);
    const isPlayVideo = common_vendor.ref(false);
    const nowPlay = common_vendor.ref(0);
    const nowSelect = common_vendor.ref(-1);
    const selectData = common_vendor.ref({});
    const innerAudioContext = common_vendor.index.createInnerAudioContext();
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    common_vendor.onMounted(() => {
      getVoiceList();
    });
    common_vendor.onBeforeUnmount(() => {
      console.log("执行销毁");
      innerAudioContext.destroy();
    });
    const selectDataChange = async (item, index, str) => {
      nowSelect.value = index;
      selectData.value = item;
      console.log(selectData.value, str, "strstrstr");
    };
    const getVoiceList = async () => {
      const res = await api_allVoice.allVoice.getVoiceList({});
      videoList.value = res;
      console.log(res, "视频列表");
    };
    const saveSelectVoice = async () => {
      const res = await api_allVoice.allVoice.saveOrUpdate({
        id: selectData.value.id
      });
      utils_router.back(-1);
      console.log(res, "视频列表");
    };
    const initVoice = (item, index, status) => {
      console.log(item.audioExamples);
      console.log(innerAudioContext, "我是音频对象");
      nowPlay.value = index;
      innerAudioContext.src = item.audioExamples;
      innerAudioContext.onCanplay(() => {
        const getTime = setInterval(() => {
          if (innerAudioContext.duration !== 0) {
            clearInterval(getTime);
          }
        }, 500);
      });
      let proportion = 0;
      innerAudioContext.onTimeUpdate((data) => {
        proportion = innerAudioContext.currentTime / innerAudioContext.duration;
        target.value = 100 * proportion;
      });
      if (status === "play") {
        innerAudioContext.play();
        isPlayVideo.value = true;
        selectDataChange(item, index, "内部");
      } else {
        innerAudioContext.stop();
        isPlayVideo.value = false;
      }
    };
    common_vendor.onBeforeUnmount(() => {
      innerAudioContext.stop();
      console.log("执行暂停");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(videoList.value, (item, index, i0) => {
          return common_vendor.e({
            a: !isPlayVideo.value || nowPlay.value !== index
          }, !isPlayVideo.value || nowPlay.value !== index ? {
            b: common_vendor.o(($event) => initVoice(item, index, "play"), index)
          } : {}, {
            c: isPlayVideo.value && nowPlay.value === index
          }, isPlayVideo.value && nowPlay.value === index ? {
            d: common_vendor.o(($event) => initVoice(item, index, "close"), index),
            e: "9014b63b-0-" + i0,
            f: common_vendor.o(($event) => modelVale.value = $event, index),
            g: common_vendor.p({
              percent: target.value,
              size: "70rpx",
              strokeColor: "#ffffff",
              current: modelVale.value
            })
          } : {}, {
            h: nowSelect.value === index
          }, nowSelect.value === index ? {} : {}, {
            i: "url(" + item.speakerAvatar + ")",
            j: index,
            k: common_vendor.o(($event) => selectDataChange(item, index, "外部"), index),
            l: nowSelect.value === index ? 1 : ""
          });
        }),
        b: common_vendor.o(($event) => saveSelectVoice())
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-9014b63b"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/all-voice/index.vue"]]);
wx.createPage(MiniProgramPage);
