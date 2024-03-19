"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
const api_memberBenefits = require("../../api/member-benefits.js");
const api_profile = require("../../api/profile.js");
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
const __unplugin_components_0 = () => "../../components/wyb-noticeBar/wyb-noticeBar.js";
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_wyb_noticeBar2 = __unplugin_components_0;
  (_easycom_uni_swiper_dot2 + _easycom_wyb_noticeBar2)();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_wyb_noticeBar = () => "../../components/wyb-noticeBar/wyb-noticeBar.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_wyb_noticeBar)();
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
    common_vendor.reactive([
      { name: "2元包", id: "1", msg: "" },
      { name: "5元包", id: "2", url: "../../static/profile/member-img.png" },
      { name: "10元包", id: "3", url: "../../static/profile/member-img.png" }
    ]);
    const packageList = common_vendor.ref([]);
    function change(e) {
      nowSelect.value = e.detail.current;
      current.value = e.detail.current;
    }
    common_vendor.ref(-1);
    common_vendor.ref(-1);
    const current = common_vendor.ref(0);
    const mode = common_vendor.ref("default");
    const dotsStyles = common_vendor.reactive({
      backgroundColor: "rgba(255, 255, 255, .3)",
      border: "1px rgba(255, 255, 255, .3) solid",
      color: "#fff",
      selectedBackgroundColor: "rgba(255, 255, 255, 1)",
      selectedBorder: "0px rgba(255, 255, 255, .9) solid"
    });
    const swiperDotIndex = common_vendor.ref(0);
    const isSelectAgreeMent = common_vendor.ref(true);
    common_vendor.ref(0);
    common_vendor.ref(false);
    const vipBenefitInfo = common_vendor.ref({});
    const nowSelect = common_vendor.ref(0);
    const userInfo = common_vendor.ref({});
    const vipStatus = common_vendor.ref(-1);
    const isRequest = common_vendor.ref(false);
    const rightList = common_vendor.ref([
      {
        messageCount: "30条",
        voiceCount: "50条",
        videoCount: "10条",
        personCount: "5人"
      },
      {
        messageCount: "50条",
        voiceCount: "70条",
        videoCount: "20条",
        personCount: "10人"
      },
      {
        messageCount: "100条",
        voiceCount: "100条",
        videoCount: "30条",
        personCount: "10人"
      }
    ]);
    const packageText = ["乐享包", "畅享包", "尊享包"];
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    async function getUserInfo() {
      var _a;
      userInfo.value = await api_profile.profile.findHomePageUserInfo({});
      vipStatus.value = (_a = userInfo.value) == null ? void 0 : _a.vipStatus;
      console.log(vipStatus.value, "我是会员状态");
      common_vendor.index.setStorageSync("userInfo", userInfo.value);
      console.log(userInfo.value, "我是用户信息");
      isRequest.value = true;
    }
    async function getVipInfo() {
      const res = await api_memberBenefits.memberBenefits.getVipInfo({});
      vipBenefitInfo.value = JSON.parse(JSON.stringify(res));
      console.log(vipBenefitInfo.value, "获取权益中心数据");
      packageList.value = vipBenefitInfo.value;
      console.log(packageList.value, "我是商品数据");
      const resArr = JSON.parse(JSON.stringify(packageList.value));
      console.log(resArr, "131231");
      for (let index = 0; index < resArr.length; index++) {
        console.log(index, "1123");
        console.log(resArr[index].apiProductConfig.status);
        if (resArr[index].apiProductConfig.status === 1) {
          console.log(index, "进入循环");
          nowSelect.value = index;
        }
      }
    }
    const selectPackChange = (item, index) => {
      nowSelect.value = index;
      console.log(nowSelect.value, vipStatus.value);
      swiperChange(index);
    };
    const swiperChange = (index) => {
      console.log(swiperDotIndex.value, "我是swiperIndex");
      swiperDotIndex.value = index;
    };
    const goPay = async (data) => {
      if (!isSelectAgreeMent.value) {
        common_vendor.index.showToast({
          title: "请勾选会员协议",
          icon: "error"
        });
      }
      let productId = packageList.value[nowSelect.value].apiProductConfig.id;
      utils_router.forward("migu-pay", {
        productId
      });
      getUserInfo();
    };
    common_vendor.onShow(() => {
      getUserInfo();
      getVipInfo();
      selectPackChange({}, 0);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isRequest.value
      }, isRequest.value ? common_vendor.e({
        b: userInfo.value.userInfoVO.avatar,
        c: vipStatus.value === 0
      }, vipStatus.value === 0 ? {} : {}, {
        d: vipStatus.value !== 0
      }, vipStatus.value !== 0 ? {} : {}, {
        e: common_vendor.t(userInfo.value.userInfoVO.phone),
        f: vipStatus.value === 0
      }, vipStatus.value === 0 ? {} : {}, {
        g: vipStatus.value !== 0
      }, vipStatus.value !== 0 ? {} : {}, {
        h: nowSelect.value < 0
      }, nowSelect.value < 0 ? {} : {}, {
        i: nowSelect.value === 0
      }, nowSelect.value === 0 ? {} : {}, {
        j: nowSelect.value === 1
      }, nowSelect.value === 1 ? {} : {}, {
        k: nowSelect.value === 2
      }, nowSelect.value === 2 ? {} : {}, {
        l: common_vendor.f(rightList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.messageCount),
            b: common_vendor.t(item.voiceCount),
            c: common_vendor.t(item.videoCount),
            d: common_vendor.t(item.personCount),
            e: common_vendor.n("swiper-item" + index),
            f: index
          };
        }),
        m: common_vendor.o(change),
        n: swiperDotIndex.value,
        o: common_vendor.p({
          field: "content",
          info: _ctx.info,
          current: current.value,
          mode: mode.value,
          ["dots-styles"]: dotsStyles
        }),
        p: common_vendor.p({
          text: ["开通会员享受更多提醒次数及提醒人数，已是会员用户也可以退定原会员权益后开通高级别会员增加权益内容！"],
          ["space-const"]: 320,
          bgColor: "#F5F5F5",
          color: "#272727",
          ["show-more"]: false,
          ["show-icon"]: false
        }),
        q: common_vendor.f(packageList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.apiProductConfig.status === 1
          }, item.apiProductConfig.status === 1 ? {} : {}, {
            b: common_vendor.t(packageText[index]),
            c: common_vendor.t(item.apiProductConfig.price / 100),
            d: index,
            e: nowSelect.value === index ? 1 : "",
            f: common_vendor.o(($event) => selectPackChange(item, index), index)
          });
        }),
        r: vipStatus.value === 0
      }, vipStatus.value === 0 ? {
        s: common_vendor.n(isSelectAgreeMent.value ? "" : "not-vip"),
        t: common_vendor.o(($event) => goPay())
      } : {}, {
        v: vipStatus.value !== 0
      }, vipStatus.value !== 0 ? {} : {}, {
        w: vipStatus.value === 0 || nowSelect.value + 1 !== vipStatus.value ? 1 : "",
        x: nowSelect.value + 1 == vipStatus.value && vipStatus.value === 1 ? 1 : "",
        y: nowSelect.value + 1 == vipStatus.value && vipStatus.value === 2 ? 1 : "",
        z: nowSelect.value + 1 == vipStatus.value && vipStatus.value === 3 ? 1 : ""
      }) : {});
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-42037bc4"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/member-benefits/index.vue"]]);
wx.createPage(MiniProgramPage);
