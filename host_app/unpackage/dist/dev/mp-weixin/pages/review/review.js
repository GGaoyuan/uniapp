"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "review",
  setup(__props) {
    let dataSource = common_vendor.ref([]);
    let dataLoaded = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      console.log("script:onLoad");
    });
    common_vendor.onReady(() => {
      console.log("script:onReady");
      loadList();
    });
    function loadList() {
      console.log("loadList");
      common_vendor.index.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        dataLoaded.value = true;
        const json = JSON.stringify(require("../../static/data/testjson.js").reviewData);
        const resArr = JSON.parse(json)["list"];
        for (let index = 0; index < resArr.length; index++) {
          let data = resArr[index];
          const model = {
            status: data["status"]
          };
          dataSource.value.push(model);
          console.log(model);
        }
        common_vendor.index.hideLoading();
        console.log("loadList complete");
      }, 500);
    }
    function onLeftListItemTap(number) {
      console.log("onLeftListItemTap");
    }
    function onRightListItemTap(value) {
      console.log("onRightListItemTap");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(dataSource).length == 0 && common_vendor.unref(dataLoaded)
      }, common_vendor.unref(dataSource).length == 0 && common_vendor.unref(dataLoaded) ? {} : {}, {
        b: common_vendor.unref(dataSource).length != 0 && common_vendor.unref(dataLoaded)
      }, common_vendor.unref(dataSource).length != 0 && common_vendor.unref(dataLoaded) ? {
        c: common_vendor.f(common_vendor.unref(dataSource), (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => onLeftListItemTap(), item.id),
            b: common_vendor.o(($event) => onRightListItemTap(), item.id),
            c: item.id
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7018a65d"], ["__file", "/Users/zz/HBuilderX/host_app/pages/review/review.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
