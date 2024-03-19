"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
const api_allVideo = require("../../api/all-video.js");
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
    common_vendor.onShareAppMessage((res) => {
      return {
        title: "AI亲情提醒",
        path: `pages/main/index`,
        imageUrl: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/share-img/share-img.png"
      };
    });
    const target = common_vendor.ref(0);
    common_vendor.ref(0);
    const isPlayVideo = common_vendor.ref(false);
    const nowPlay = common_vendor.ref(0);
    const videoList = common_vendor.ref([]);
    common_vendor.ref({});
    const nowSelect = common_vendor.ref(-1);
    const selectData = common_vendor.ref({});
    const nowPlayVideo = common_vendor.ref(null);
    common_vendor.ref(0);
    const totalTime = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    common_vendor.onMounted(() => {
      getVideoInfo();
      nowPlayVideo.value = common_vendor.index.createVideoContext("video");
      console.log(nowPlayVideo.value, "我是video DOM");
    });
    const selectChange = (item, index) => {
      console.log("进入change事件");
      nowSelect.value = index;
      selectData.value = item;
    };
    async function getVideoInfo() {
      const res = await api_allVideo.allVideo.getVideoList({});
      videoList.value = res;
      console.log(videoList.value, "我是数据返回");
    }
    const saveSelectVideo = async () => {
      const res = await api_allVideo.allVideo.saveOrUpdate({
        id: selectData.value.id
      });
      utils_router.back(-1);
      console.log(res, "我是保存返回");
    };
    const playTimeUpdate = (data) => {
      let sile = data.detail.currentTime / data.detail.duration;
      target.value = sile * 100;
    };
    const loadEnd = (data) => {
      console.log(data);
      isPlayVideo.value = false;
      totalTime.value = data.detail.duration;
    };
    const stopVideo = () => {
      console.log("进入停止事件");
      nowPlayVideo.value.pause();
      isPlayVideo.value = false;
    };
    function playvideo(item, index) {
      nowSelect.value = index;
      nowPlay.value = index;
      isPlayVideo.value = true;
      setTimeout(() => {
        console.log(nowPlayVideo.value, "当前视频对象");
        nowPlayVideo.value.play();
        nowPlayVideo.value.requestFullScreen();
      }, 500);
    }
    common_vendor.ref(false);
    const quitFullScreen = (data) => {
      console.log(data, "退出全屏播放");
      if (!data.detail.fullScreen) {
        stopVideo();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(videoList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.videoAvatar,
            b: nowSelect.value === index
          }, nowSelect.value === index ? {
            c: item.videoExamples,
            d: common_vendor.o(
              //@ts-ignore
              (...args) => _ctx.videoPlay && _ctx.videoPlay(...args),
              index
            ),
            e: common_vendor.o(
              //@ts-ignore
              (...args) => _ctx.videoPause && _ctx.videoPause(...args),
              index
            ),
            f: common_vendor.o(
              //@ts-ignore
              (...args) => _ctx.videoEnd && _ctx.videoEnd(...args),
              index
            ),
            g: common_vendor.o(loadEnd, index),
            h: common_vendor.o(playTimeUpdate, index),
            i: common_vendor.o(quitFullScreen, index)
          } : {}, {
            j: common_vendor.o(($event) => playvideo(item, index), index),
            k: nowSelect.value === index
          }, nowSelect.value === index ? {} : {}, {
            l: index,
            m: common_vendor.o(($event) => selectChange(item, index), index),
            n: nowSelect.value === index ? 1 : ""
          });
        }),
        b: common_vendor.o(($event) => saveSelectVideo())
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-8eb097d1"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/all-video/index.vue"]]);
wx.createPage(MiniProgramPage);
