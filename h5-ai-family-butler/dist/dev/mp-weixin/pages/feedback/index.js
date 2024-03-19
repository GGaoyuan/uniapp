"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
const api_feedback = require("../../api/feedback.js");
const config_env = require("../../config/env.js");
const utils_platform = require("../../utils/platform.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../utils/request.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/serviceLoading.js");
require("../../components/ipViewComponents/core/message/MessageCenter.js");
require("../../components/ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage((res) => {
      return {
        title: "AI亲情提醒",
        path: `pages/main/index`,
        imageUrl: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/share-img/share-img.png"
      };
    });
    const apiBaseUrl = utils_platform.isH5 && utils_platform.isDevelopment ? "/api" : config_env.env.apiBaseUrl;
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    common_vendor.watch(
      () => imageValue,
      (newVal, oldVal) => {
        if (newVal) {
          console.log(newVal);
        } else {
          console.log(oldVal);
        }
      }
    );
    const userFeedBack = common_vendor.reactive({
      screenshots: []
    });
    const imageValue = common_vendor.ref({});
    let allFileTempPaths = common_vendor.reactive([]);
    let allFileServePaths = common_vendor.reactive([]);
    const delImg = (ind) => {
      allFileTempPaths.splice(ind, 1);
      allFileServePaths.splice(ind, 1);
    };
    const uploadImage = () => {
      console.log("触发了uploadImage方法");
      common_vendor.index.chooseImage({
        count: 1,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"],
        //从相册选择
        success: function(chooseImageRes) {
          console.log(chooseImageRes, "选择的文件");
          let tempFiles = chooseImageRes.tempFiles;
          let tempFilePaths = chooseImageRes.tempFilePaths;
          for (var i = 0; i < tempFiles.length; i++) {
            publicUpload(tempFiles[i], tempFilePaths[i]);
          }
        }
      });
    };
    const publicUpload = (file, filePath) => {
      console.log(file, filePath, "要上传 的内容");
      common_vendor.index.uploadFile({
        url: apiBaseUrl + "/api/file/up",
        filePath,
        name: "file",
        //对应后台接口参数名
        method: "POST",
        header: {
          Authorization: common_vendor.index.getStorageSync("token")
        },
        formData: {
          //要上传的文件
          file
        },
        complete(res) {
          console.log(res, "这儿");
          if (res.statusCode >= 200 && res.statusCode < 400) {
            let responseDate = JSON.parse(res.data);
            console.log(responseDate, "结果");
            if (responseDate.code === 200) {
              if (responseDate.data) {
                allFileTempPaths.push(filePath);
                allFileServePaths.push(responseDate.data);
                console.log(allFileTempPaths, allFileServePaths, "所有值");
                common_vendor.index.showToast({
                  title: "提交成功"
                });
                utils_router.back(-1);
              }
            }
          }
        },
        fail(error) {
          console.log(error);
          common_vendor.index.showToast({
            icon: "error",
            title: "图片上传失败!"
          });
        }
      });
    };
    async function nagetProfileDatame() {
      await api_feedback.feedback.feedbackSave(userFeedBack);
    }
    function confirm() {
      userFeedBack.screenshots = allFileServePaths;
      nagetProfileDatame();
    }
    return (_ctx, _cache) => {
      return {
        a: userFeedBack.content,
        b: common_vendor.o(($event) => userFeedBack.content = $event.detail.value),
        c: common_vendor.f(common_vendor.unref(allFileTempPaths), (item, ind, i0) => {
          return {
            a: common_vendor.o(($event) => delImg(ind), item),
            b: item,
            c: item
          };
        }),
        d: common_assets._imports_0,
        e: common_assets._imports_1,
        f: common_vendor.o(uploadImage),
        g: userFeedBack.phone,
        h: common_vendor.o(($event) => userFeedBack.phone = $event.detail.value),
        i: common_vendor.o(($event) => confirm())
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-3aa1718d"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/feedback/index.vue"]]);
wx.createPage(MiniProgramPage);
