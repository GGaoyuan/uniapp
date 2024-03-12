"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  // setup() {
  // 	const dataSource = ref([]),
  // 	return { dataSource };
  // },
  components: {},
  data() {
    return {
      dataSource: [],
      //localData: ajson.data,
      dataLoaded: false
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
        const json = JSON.stringify(require("../../static/data/testjson.js").reviewData);
        const list = JSON.parse(json)["list"];
        console.log("list:" + list);
        common_vendor.index.hideLoading();
        for (var i = 0; i < 20; i++) {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.dataSource.length == 0 && $data.dataLoaded
  }, $data.dataSource.length == 0 && $data.dataLoaded ? {} : {}, {
    b: $data.dataSource.length != 0 && $data.dataLoaded
  }, $data.dataSource.length != 0 && $data.dataLoaded ? {
    c: common_vendor.f($data.dataSource, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.onLeftListItemTap("8848"), item.id),
        b: common_vendor.o(($event) => $options.onRightListItemTap("aaaaaaa"), item.id),
        c: item.id
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7018a65d"], ["__file", "/Users/zz/HBuilderX/host_app/pages/review/review.vue"]]);
wx.createPage(MiniProgramPage);
