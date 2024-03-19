"use strict";
const common_vendor = require("../common/vendor.js");
const useTitle = () => {
  let oldValue = "Hello";
  let newValue = "Word";
  const title = common_vendor.ref(oldValue);
  function changeTitle() {
    oldValue = title.value;
    title.value = newValue;
    newValue = oldValue;
  }
  return {
    title,
    changeTitle
  };
};
exports.useTitle = useTitle;
