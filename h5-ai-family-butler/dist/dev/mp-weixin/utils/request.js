"use strict";
const common_vendor = require("../common/vendor.js");
const utils_platform = require("./platform.js");
const utils_router = require("./router.js");
const config_commonParams = require("../config/commonParams.js");
const config_env = require("../config/env.js");
const config_serviceLoading = require("../config/serviceLoading.js");
const components_ipViewComponents_core_message_MessageCenter = require("../components/ipViewComponents/core/message/MessageCenter.js");
const constants_MainPageConstants = require("../constants/MainPageConstants.js");
function reject(err, cb) {
  const { errmsg = "系统错误", errno = -1 } = err;
  switch (errno) {
    case 1e4:
      utils_router.forward("login");
      break;
    default:
      common_vendor.index.showToast({
        title: errmsg,
        icon: "none"
      });
      components_ipViewComponents_core_message_MessageCenter.messageCenter.dispatch("playAnimate", constants_MainPageConstants.AniType.ERROR);
      break;
  }
  if (cb)
    cb(err);
}
const apiBaseUrl = utils_platform.isH5 && utils_platform.isDevelopment ? "/api" : config_env.env.apiBaseUrl;
function baseRequest(method, url, data) {
  return new Promise((resolve, _reject) => {
    config_serviceLoading.showLoading(data.isLoading);
    delete data.isLoading;
    let responseDate;
    common_vendor.index.request({
      url: apiBaseUrl + url,
      method,
      timeout: 2e4,
      header: {
        "content-type": "application/json; charset=utf-8",
        Authorization: common_vendor.index.getStorageSync("token")
        // method === 'GET'
        //   ? 'application/json; charset=utf-8'
        //   : 'application/x-www-form-urlencoded'
      },
      data,
      // success: (res: any) => {
      //   // if (res.statusCode >= 200 && res.statusCode < 400) {
      //   //   if (res.data.code === 200) {
      //   //     responseDate = res.data;
      //   //   } else {
      //   //     reject(res.data);
      //   //   }
      //   // } else {
      //   //   reject(
      //   //     {
      //   //       errno: -1,
      //   //       errmsg: '错误'
      //   //     },
      //   //     _reject
      //   //   );
      //   // }
      // },
      fail: () => {
        reject(
          {
            errno: -1,
            errmsg: "网络不给力，请检查你的网络设置~"
          },
          _reject
        );
      },
      complete: (res) => {
        var _a;
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (res.data.code === 200) {
            responseDate = res.data.data;
            resolve(responseDate);
          } else {
            reject(
              {
                errno: -1,
                errmsg: `${(_a = res.data) == null ? void 0 : _a.msg}` || "错误"
              },
              _reject
            );
          }
        } else {
          reject(
            {
              errno: -1,
              errmsg: "错误"
            },
            _reject
          );
        }
        config_serviceLoading.hideLoading();
      }
    });
  });
}
const http = {
  get: (api, params) => baseRequest("GET", api, {
    ...config_commonParams.getCommonParams(),
    ...params
  }),
  post: (api, params) => baseRequest("POST", api, {
    ...config_commonParams.getCommonParams(),
    ...params
  })
};
exports.http = http;
