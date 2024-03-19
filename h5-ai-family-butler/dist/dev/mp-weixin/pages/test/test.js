"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apiTest = require("../../api/apiTest.js");
const config_commonParams = require("../../config/commonParams.js");
const hooks_useInit = require("../../hooks/useInit.js");
const hooks_useTitle = require("../../hooks/useTitle.js");
const utils_router = require("../../utils/router.js");
const utils_uniAsync = require("../../utils/uniAsync.js");
const helper_piniaAutoRefs = require("../../helper/pinia-auto-refs.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../../components/ipViewComponents/core/message/MessageCenter.js");
require("../../components/ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
const __unplugin_components_0 = () => "../../components/pullList.js";
if (!Array) {
  const _component_pullList = __unplugin_components_0;
  _component_pullList();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "test",
  setup(__props) {
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    const { title, changeTitle } = hooks_useTitle.useTitle();
    const { name, fullName, updateName } = helper_piniaAutoRefs.useStore("test");
    async function getTest() {
      const getTest2 = await api_apiTest.apiTest.getTest({ a: 1 });
      if (!getTest2) {
        common_vendor.index.showToast({
          title: "自定义异常处理"
        });
        return;
      }
      console.log(getTest2, "getTest");
    }
    async function postTest() {
      const postTest2 = await api_apiTest.apiTest.postTest({ a: 1 });
      if (!postTest2)
        return;
      console.log(postTest2, "postTest");
    }
    function getCommonParam() {
      console.log(config_commonParams.getCommonParams());
    }
    function setCommonParam() {
      config_commonParams.setCommonParams({ channel: "test" });
      getCommonParam();
    }
    async function uniAsyncTest() {
      const systemInfo = await utils_uniAsync.uniAsync.getSystemInfo();
      console.log(systemInfo, "systemInfo");
    }
    function onScrollToLower() {
      console.log("自定义 onScrollToLower");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(name)),
        b: common_vendor.t(common_vendor.unref(fullName)),
        c: common_vendor.o(($event) => common_vendor.unref(updateName)("newName")),
        d: common_vendor.t(common_vendor.unref(title)),
        e: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(changeTitle) && common_vendor.unref(changeTitle)(...args)
        ),
        f: common_vendor.o(getTest),
        g: common_vendor.o(postTest),
        h: common_vendor.o(getCommonParam),
        i: common_vendor.o(setCommonParam),
        j: common_vendor.o(uniAsyncTest),
        k: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(utils_router.onUrlPage) && common_vendor.unref(utils_router.onUrlPage)(...args)
        ),
        l: common_vendor.f(30, (i, k0, i0) => {
          return {
            a: i
          };
        }),
        m: common_vendor.p({
          ["on-scroll-to-lower"]: onScrollToLower
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
