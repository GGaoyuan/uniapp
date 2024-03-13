"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  applyItem();
}
const applyItem = () => "./components/moto-apply-item.js";
const _sfc_main = {
  __name: "moto",
  setup(__props) {
    let dataSource = common_vendor.ref([]);
    let dataLoaded = common_vendor.ref(false);
    const ListMsg = {
      name: "Xiaoma",
      age: "18",
      gender: "Boy"
    };
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
            motoType: data["motoType"],
            status: data["status"],
            motoColor: data["motoColor"],
            motoBrand: data["motoBrand"],
            motoNumber: data["motoNumber"]
          };
          dataSource.value.push(model);
        }
        common_vendor.index.hideLoading();
        console.log("loadList complete");
      }, 500);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(dataSource).length == 0 && common_vendor.unref(dataLoaded)
      }, common_vendor.unref(dataSource).length == 0 && common_vendor.unref(dataLoaded) ? {} : {}, {
        b: common_vendor.unref(dataSource).length != 0 && common_vendor.unref(dataLoaded)
      }, common_vendor.unref(dataSource).length != 0 && common_vendor.unref(dataLoaded) ? {
        c: common_vendor.f(common_vendor.unref(dataSource), (item, k0, i0) => {
          return {
            a: item.id,
            b: "8c279833-0-" + i0
          };
        }),
        d: common_vendor.p({
          list: ListMsg
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8c279833"], ["__file", "/Users/zz/HBuilderX/user_app/pages/moto/moto.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
