"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
const api_myFamily = require("../../api/my-family.js");
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
if (!Math) {
  (Character + selectSex)();
}
const Character = () => "../../components/character/index.js";
const selectSex = () => "../../components/selectSex/index.js";
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
    common_vendor.ref(null);
    const cVisible = common_vendor.ref(false);
    const sVisible = common_vendor.ref(false);
    const currentRole = common_vendor.ref({});
    const vipStatus = common_vendor.ref(-1);
    const resMemberData = common_vendor.ref({});
    const userInfo = common_vendor.ref({});
    const nowSex = common_vendor.ref(null);
    async function getFamilyData() {
      const res = await api_myFamily.myFamily.getRelationList({});
      resMemberData.value = res;
      console.log(resMemberData.value, "我是家庭列表");
    }
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    common_vendor.onShow(() => {
      checkToken();
      getFamilyData();
    });
    function checkToken() {
      common_vendor.index.getStorage({
        key: "userInfo",
        success: (res) => {
          userInfo.value = res.data;
          vipStatus.value = res.data.vipStatus;
          nowSex.value = res.data.userInfoVO.sex;
          console.log(nowSex.value, "查询用户信息");
        },
        fail: () => {
          console.log("查询失败");
        }
      });
    }
    function showPopup() {
      console.log();
      if (nowSex.value !== null) {
        cVisible.value = true;
      } else {
        sVisible.value = true;
      }
    }
    function addConfirm(val) {
      console.log(val, "确认返回");
      cVisible.value = false;
      currentRole.value = {};
      getFamilyData();
    }
    function close(val) {
      cVisible.value = false;
      currentRole.value = {};
      console.log(val, "关闭返回");
    }
    const sClose = () => {
      sVisible.value = false;
    };
    const changeSex = (val) => {
      nowSex.value = val;
      userInfo.value.userInfoVO.sex = nowSex.value;
      common_vendor.index.setStorageSync("userInfo", userInfo.value);
      sVisible.value = false;
      cVisible.value = true;
    };
    function goMemberBenefits() {
      utils_router.forward("memberBenefits");
    }
    const editFamilyInfo = (data) => {
      currentRole.value = data;
      cVisible.value = true;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: vipStatus.value === 0
      }, vipStatus.value === 0 ? {
        b: common_vendor.o(($event) => goMemberBenefits())
      } : {}, {
        c: common_vendor.t(resMemberData.value.remindNumberUsed),
        d: common_vendor.t(resMemberData.value.remindNumberTotal),
        e: common_vendor.f(resMemberData.value.apiFindUserRelationList, (item, index, i0) => {
          return {
            a: item.headImage,
            b: common_vendor.t(item.typeName),
            c: common_vendor.t(item.phone),
            d: common_vendor.o(($event) => editFamilyInfo(item), index),
            e: index
          };
        }),
        f: common_vendor.o(($event) => showPopup()),
        g: common_vendor.o(addConfirm),
        h: common_vendor.o(close),
        i: common_vendor.p({
          visible: cVisible.value,
          data: currentRole.value
        }),
        j: common_vendor.o(sClose),
        k: common_vendor.o(changeSex),
        l: common_vendor.p({
          visible: sVisible.value,
          sex: nowSex.value
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-737a43c1"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/my-family/index.vue"]]);
wx.createPage(MiniProgramPage);
