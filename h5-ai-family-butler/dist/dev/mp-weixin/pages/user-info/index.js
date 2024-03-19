"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
const api_profile = require("../../api/profile.js");
require("../../utils/shared.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../utils/router.js");
require("../../utils/urlMap.js");
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
  (common_vendor.unref(editHeader) + selectSex)();
}
const editHeader = () => "../../components/edit-header/index.js";
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
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    common_vendor.onMounted(() => {
      getUserInfo();
      getPlugin();
    });
    const userInfo = common_vendor.ref({});
    const totalUserInfo = common_vendor.ref({});
    const editVisible = common_vendor.ref(false);
    const nowSex = common_vendor.ref(null);
    const sVisible = common_vendor.ref(false);
    const isRequestBack = common_vendor.ref(false);
    async function getUserInfo() {
      const res = await api_profile.profile.findHomePageUserInfo({});
      totalUserInfo.value = res;
      userInfo.value = res == null ? void 0 : res.userInfoVO;
      nowSex.value = userInfo.value.sex;
      console.log(nowSex.value, "我是查询到的性别");
      isRequestBack.value = true;
    }
    const sClose = () => {
      sVisible.value = false;
    };
    const changeSex = (val) => {
      nowSex.value = val;
      totalUserInfo.value.userInfoVO.sex = nowSex.value;
      common_vendor.index.setStorageSync("userInfo", totalUserInfo.value);
      getUserInfo();
      sVisible.value = false;
    };
    const removeAllLoginInfo = () => {
      common_vendor.index.clearStorage();
      getPlugin().clearMiguCache();
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    const getPlugin = () => {
      var _a;
      let _plugin;
      if (!_plugin) {
        _plugin = requirePlugin("myPlugin");
        (_a = _plugin.setOptions) == null ? void 0 : _a.call(_plugin, {
          requestDomain: "https://passport.migu.cn",
          sourceId: "220055",
          skin: "music",
          protocols: [
            ["服务协议", "/pages/protocol"],
            ["隐私政策", "/pages/privacy"]
          ]
        });
      }
      return _plugin;
    };
    const goEditHeader = () => {
      console.log("进入事件");
      editVisible.value = true;
    };
    const goEditSex = () => {
      sVisible.value = true;
    };
    const editStauts = (res) => {
      console.log(res, "我是返回");
    };
    const editPopupClose = (rs) => {
      editVisible.value = false;
      getUserInfo();
      console.log("我是关闭");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value.avatar,
        b: common_vendor.o(($event) => goEditHeader()),
        c: common_vendor.t(userInfo.value.sex === 0 ? "女" : "男"),
        d: common_vendor.o(($event) => goEditSex()),
        e: common_vendor.t(userInfo.value.phone),
        f: common_vendor.o(($event) => removeAllLoginInfo()),
        g: common_vendor.o(editStauts),
        h: common_vendor.o(editPopupClose),
        i: common_vendor.p({
          visible: editVisible.value
        }),
        j: isRequestBack.value
      }, isRequestBack.value ? {
        k: common_vendor.o(sClose),
        l: common_vendor.o(changeSex),
        m: common_vendor.p({
          visible: sVisible.value,
          sex: nowSex.value
        })
      } : {});
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-3a24f47a"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/user-info/index.vue"]]);
wx.createPage(MiniProgramPage);
