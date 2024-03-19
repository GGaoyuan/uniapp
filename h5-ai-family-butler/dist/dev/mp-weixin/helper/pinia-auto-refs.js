"use strict";
const store_app = require("../store/app.js");
const store_setup = require("../store/setup.js");
const store_test = require("../store/test.js");
const store_user = require("../store/user.js");
const common_vendor = require("../common/vendor.js");
const storeExports = {
  app: store_app.appStore,
  setup: store_setup.setupStore,
  test: store_test.testStore,
  user: store_user.userStore
};
function useStore(storeName) {
  const store = storeExports[storeName]();
  const storeRefs = common_vendor.storeToRefs(store);
  return { ...store, ...storeRefs };
}
exports.useStore = useStore;
