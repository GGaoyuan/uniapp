"use strict";
const common_vendor = require("../../common/vendor.js");
const components_ipViewComponents_core_message_MessageCenter = require("../ipViewComponents/core/message/MessageCenter.js");
require("../../uni_modules/lime-shared/exif/index.js");
const uni_modules_limeShared_sleep_index = require("../../uni_modules/lime-shared/sleep/index.js");
require("../ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../uni_modules/lime-shared/base64ToArrayBuffer/index.js");
require("../../uni_modules/lime-shared/pathToBase64/index.js");
require("../../uni_modules/lime-shared/isBase64/index.js");
require("../../uni_modules/lime-shared/isString/index.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "message-selectTips-popup",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const animation = common_vendor.index.createAnimation({
      timingFunction: "ease"
      // transformOrigin: "0 100%",
      // duration: 3000,
      // timingFunction: "ease-out",
      // delay: 3000
    });
    const showpic = common_vendor.ref(null);
    const hidepic = common_vendor.ref(null);
    const tipAniType = common_vendor.ref(1);
    common_vendor.ref({});
    const selectTypeId = common_vendor.ref(0);
    const sendType = common_vendor.ref(0);
    common_vendor.watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal) {
          popupShow();
        } else {
          popupClose();
        }
      }
    );
    const selectIndex = common_vendor.ref(0);
    const prompts = common_vendor.reactive({
      tabbarList: [],
      promptList: []
    });
    const popupRef = common_vendor.ref(null);
    const popupShow = () => {
      popupRef.value.open();
    };
    const popupClose = () => {
      selectTypeId.value = -1;
      popupRef.value.close();
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("closeMessageSelectPopup");
    };
    common_vendor.ref(0);
    const cscrollLeft = common_vendor.ref(0);
    let _this = common_vendor.getCurrentInstance();
    function scrollView(e) {
      console.log(e, "scrollView");
    }
    function getPrompts(index) {
      if (prompts.tabbarList.length) {
        selectIndex.value = index;
        prompts.promptList = [...prompts.tabbarList[index].copyWritingConfigList];
        getPicIndex();
        tipAniType.value = 0;
        uni_modules_limeShared_sleep_index.sleep(1e3);
        tipAniType.value = 1;
        const query = common_vendor.index.createSelectorQuery().in(_this);
        let container = query.select("#popup-box-content");
        query.selectAll(".popup-box-content-tabbar-item").boundingClientRect((data) => {
          let _width = 0;
          for (let i = 0; i < index; i++) {
            _width += data[i].width;
          }
          console.log(data, "datadatadata===", _width);
          const _clientWidth = common_vendor.index.getSystemInfoSync().windowWidth / 2;
          if (_width > _clientWidth - 50) {
            cscrollLeft.value = _width + data[index].width / 2 - _clientWidth;
            console.log(cscrollLeft.value, "scrollLeft.value", _clientWidth);
          } else {
            cscrollLeft.value = 0;
          }
        }).exec();
        container.scrollOffset({
          scrollLeft: cscrollLeft.value
        });
      }
    }
    function getPicIndex() {
      console.log("selectIndex.value", selectIndex.value);
    }
    function changePompts(data, type) {
      if (data) {
        prompts.tabbarList = [...data];
        if (sendType.value === 1) {
          let index = prompts.tabbarList.findIndex((item) => item.id === selectTypeId.value);
          if (index === -1) {
            index = 0;
          }
          ckeckTypeId(index);
        } else {
          getPrompts(0);
        }
      }
    }
    const selectTypeChange = (data) => {
      selectIndex.value = prompts.tabbarList.findIndex((item) => item.id === selectTypeId.value);
      sendType.value = 1;
      selectTypeId.value = data;
    };
    const ckeckTypeId = (index) => {
      selectIndex.value = prompts.tabbarList.findIndex((item) => item.id === selectTypeId.value);
      prompts.promptList = [...prompts.tabbarList[index].copyWritingConfigList];
      if (selectIndex.value == -1) {
        selectIndex.value = 0;
      }
      getPicIndex();
      tipAniType.value = 0;
      uni_modules_limeShared_sleep_index.sleep(1e3);
      tipAniType.value = 1;
    };
    function addPrompt(prompt) {
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("addMessage", prompt);
      popupClose();
    }
    common_vendor.onMounted(() => {
      if (props.visible) {
        popupShow();
      }
      animation.opacity(1).step({ duration: 3e3, delay: 1e3 });
      showpic.value = animation.export();
      animation.opacity(0).step({ duration: 3e3, delay: 1e3 });
      hidepic.value = animation.export();
      tipAniType.value = 1;
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("sendPrompts", changePompts, this);
      components_ipViewComponents_core_message_MessageCenter.messageCenter.listen("sendType", selectTypeChange, this);
    });
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.o(popupClose),
        b: (_a = common_vendor.unref(prompts).tabbarList[common_vendor.unref(selectIndex)]) == null ? void 0 : _a.tagPicture,
        c: common_vendor.unref(tipAniType) === 1 ? common_vendor.unref(showpic) : common_vendor.unref(hidepic),
        d: common_vendor.f(common_vendor.unref(prompts).tabbarList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.typeName),
            b: common_vendor.n(index === common_vendor.unref(selectIndex) ? "tabbar-text-select" : "tabbar-text"),
            c: index,
            d: common_vendor.n(index === common_vendor.unref(selectIndex) ? "popup-box-content-tabbar-select" : "popup-box-content-tabbar"),
            e: common_vendor.o(($event) => getPrompts(index), index)
          };
        }),
        e: common_vendor.o(scrollView),
        f: common_vendor.unref(cscrollLeft),
        g: common_vendor.s(common_vendor.unref(prompts).tabbarList.length > 0 && common_vendor.unref(selectIndex) == common_vendor.unref(prompts).tabbarList.length - 1 ? "padding-right: 38rpx" : ""),
        h: common_vendor.f(common_vendor.unref(prompts).promptList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.copywriting),
            b: common_vendor.o(($event) => addPrompt(item.copywriting), index),
            c: index,
            d: common_vendor.s(index == 0 ? "margin-top: 35rpx" : "")
          };
        }),
        i: common_vendor.sr(popupRef, "227854b8-0", {
          "k": "popupRef"
        }),
        j: common_vendor.o(popupClose),
        k: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false,
          ["mask-background-color"]: 0
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-227854b8"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/message/message-selectTips-popup.vue"]]);
wx.createComponent(Component);
