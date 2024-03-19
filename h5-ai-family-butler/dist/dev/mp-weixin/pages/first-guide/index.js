"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  _easycom_uni_swiper_dot2();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  _easycom_uni_swiper_dot();
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
    const info = [
      {
        colorClass: "uni-bg-red",
        url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
        content: "内容 A"
      },
      {
        colorClass: "uni-bg-green",
        url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
        content: "内容 B"
      },
      {
        colorClass: "uni-bg-blue",
        url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
        content: "内容 C"
      }
    ];
    const contentList = [
      {
        url: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/header-img-1.png",
        contentHeader: "您好，我是AI亲情提醒助手",
        contentDetail: "我能够帮您创建提醒任务，并在约定的时间通过语音、视频等方式提醒您或您的家人。"
      },
      {
        url: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/header-img-2.png",
        contentHeader: "查看我的使用说明",
        contentDetail: "点击下方的新手引导和场景体验，您可以了解如何使用我更加高效地管理您的时间和任务。"
      },
      {
        url: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/header-img-3.png",
        contentHeader: "快速开始",
        contentDetail: "当然，您也可以点击 “立即进入”直接开始创建任务哦！"
      }
    ];
    const current = common_vendor.ref(0);
    const mode = "default";
    const dotsStyles = [
      {
        backgroundColor: "#D9D9D9",
        color: "#fff",
        selectedBackgroundColor: "#272727",
        borderRadius: "6rpx"
      },
      {
        backgroundColor: "#D9D9D9",
        color: "#fff",
        selectedBackgroundColor: "#272727",
        borderRadius: "6rpx"
      },
      {
        backgroundColor: "#D9D9D9",
        color: "#fff",
        selectedBackgroundColor: "#272727",
        borderRadius: "6rpx"
      }
    ];
    const swiperDotIndex = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    const goMain = () => {
      utils_router.forward("index");
    };
    const goGuide = () => {
      utils_router.forward("guide");
    };
    const swiperChange = (e) => {
      current.value = e.detail.current;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(contentList, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.contentHeader),
            c: common_vendor.t(item.contentDetail),
            d: common_vendor.n("swiper-item" + index),
            e: index
          };
        }),
        b: swiperDotIndex.value,
        c: common_vendor.o(swiperChange),
        d: common_vendor.p({
          info,
          current: current.value,
          mode,
          ["dots-styles"]: dotsStyles,
          field: "content"
        }),
        e: common_vendor.o(($event) => goMain()),
        f: common_vendor.o(($event) => goGuide()),
        g: common_vendor.o(($event) => goMain())
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-56a905fc"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/first-guide/index.vue"]]);
wx.createPage(MiniProgramPage);
