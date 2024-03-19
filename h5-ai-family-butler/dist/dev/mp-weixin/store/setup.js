"use strict";
const common_vendor = require("../common/vendor.js");
const setupStore = common_vendor.defineStore(
  "setup",
  () => {
    const name = common_vendor.ref("allen");
    const token = common_vendor.ref("token...");
    const fullName = common_vendor.computed(() => {
      return `${name.value} ttk`;
    });
    const updateName = (val) => {
      name.value = val;
    };
    return {
      name,
      token,
      fullName,
      updateName
    };
  },
  {
    persist: {
      enabled: true
    }
  }
);
exports.setupStore = setupStore;
