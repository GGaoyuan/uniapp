"use strict";
const common_vendor = require("../common/vendor.js");
const testStore = common_vendor.defineStore({
  id: "test",
  persist: {
    // 开启持久化
    enabled: true,
    H5Storage: window == null ? void 0 : window.localStorage,
    strategies: [
      {
        key: "test",
        storage: window == null ? void 0 : window.sessionStorage
      }
    ]
  },
  state: () => {
    return {
      name: "张三",
      token: "token..."
    };
  },
  getters: {
    fullName: (state) => {
      return `${state.name}丰`;
    }
  },
  actions: {
    updateName(name) {
      this.name = name;
    }
  }
});
exports.testStore = testStore;
