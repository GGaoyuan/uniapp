"use strict";
const common_vendor = require("../../common/vendor.js");
const reviewStatusBar = () => "../../components/review-status-bar.js";
const _sfc_main = {
  components: {
    reviewStatusBar
  },
  data() {
    console.log("script:data");
    return {
      value: 0,
      range: [{
        "value": 0,
        "text": "篮球"
      }, {
        "value": 1,
        "text": "足球"
      }, {
        "value": 2,
        "text": "游泳"
      }],
      dataLoaded: false,
      dataSource: []
    };
  },
  onLoad() {
    console.log("script:onLoad");
  },
  onReady() {
    console.log("script:onReady");
    this.loadList();
  },
  methods: {
    loadList() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        this.dataLoaded = true;
        common_vendor.index.hideLoading();
        for (var i = 0; i < 2; i++) {
          const data = {
            id: i
          };
          this.dataSource.push(data);
        }
        console.log("loadList complete");
      }, 500);
    },
    onLeftListItemTap(number) {
      console.log("onLeftListItemTap");
    },
    onRightListItemTap(value) {
      console.log("onRightListItemTap");
    }
  }
};
if (!Array) {
  const _component_review_status_bar = common_vendor.resolveComponent("review-status-bar");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_component_review_status_bar + _easycom_uni_data_checkbox2 + _easycom_uni_section2)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.change),
    b: common_vendor.o(($event) => $data.value = $event),
    c: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.value
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e5415738"], ["__file", "/Users/zz/HBuilderX/host_app/pages/testpage/testpage.vue"]]);
wx.createPage(MiniProgramPage);
