"use strict";
const common_vendor = require("../common/vendor.js");
function checkRecord(funcObj) {
  common_vendor.index.getSetting({
    success(res) {
      if (!res.authSetting["scope.record"]) {
        common_vendor.index.authorize({
          scope: "scope.record",
          success() {
            console.log("startRecord", res.authSetting);
            funcObj && funcObj();
          }
        });
        if (res.authSetting["scope.record"] == false) {
          common_vendor.index.openSetting({
            success(res2) {
              console.log("scope.record == false  success", res2.authSetting);
            }
          });
        }
      } else if (res.authSetting["scope.record"] == true) {
        console.log("scope.record == true");
        funcObj && funcObj();
      }
    }
  });
}
exports.checkRecord = checkRecord;
