"use strict";
const common_vendor = require("../../common/vendor.js");
const api_reminder = require("../../api/reminder.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
const utils_dateTools = require("../../utils/dateTools.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../../components/ipViewComponents/core/message/MessageCenter.js");
require("../../components/ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (reminderSet + _easycom_uni_popup)();
}
const reminderSet = () => "../../components/reminderSet.js";
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "detail",
  setup(__props) {
    common_vendor.onShareAppMessage((res) => {
      return {
        title: "AI亲情提醒",
        path: `pages/main/index`,
        imageUrl: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/share-img/share-img.png"
      };
    });
    const statusMap = {
      0: { title: "待处理", icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/info.png" },
      1: { title: "已接听", icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/success.png" },
      2: { title: "未接听", icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/fail.png" },
      3: { title: "执行中", icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/info.png" },
      4: { title: "系统提醒失败", icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/fail.png" },
      5: { title: "提醒失败，已超出可用提醒次数", icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/fail.png" }
    };
    const wayMap = {
      0: "微信提醒",
      1: "短信提醒",
      2: "语音提醒",
      3: "视频提醒"
    };
    const taskInfo = common_vendor.ref({});
    const setVisible = common_vendor.ref(false);
    const getTaskInfo = async (pageQuery, doCounting = true) => {
      const req = {
        id: pageQuery.id,
        reminderTime: decodeURIComponent(pageQuery.reminderTime),
        taskId: pageQuery.taskId
      };
      taskInfo.value = await api_reminder.reminder.getFindTaskInfo(req);
      if (taskInfo.value.operateStatus === 0) {
        if (doCounting)
          getCutDowning();
      }
    };
    const delFn = () => {
      const req = {
        taskId: taskInfo.value.taskId,
        operationRange: taskInfo.value.operationRange || 0,
        id: taskInfo.value.id,
        currentReminderTime: taskInfo.value.reminderTime
      };
      api_reminder.reminder.delTask(req).then(() => {
        common_vendor.index.showToast({
          title: "删除成功"
        });
        utils_router.back(1);
      });
    };
    const showReminerSet = () => {
      setVisible.value = true;
    };
    const closeReminderSet = () => {
      setVisible.value = false;
    };
    const confirmReminderSet = (data) => {
      let id = null;
      if (typeof data === "number") {
        id = data;
      } else {
        id = data.id;
      }
      const { pageQuery } = hooks_useInit.useInit();
      getTaskInfo({ ...pageQuery, id });
      setVisible.value = false;
    };
    const popupRef = common_vendor.ref(null);
    const delRemind = () => {
      if (taskInfo.value.reminderType !== 0) {
        popupRef.value.open();
      } else {
        delFn();
      }
    };
    const rangeConfirm = (type) => {
      if (type === "once") {
        taskInfo.value.operationRange = 0;
      } else {
        taskInfo.value.operationRange = 1;
      }
      popupRef.value.close();
      delFn();
    };
    let timer = null;
    const cutDown = common_vendor.ref("");
    const getCutDowning = () => {
      cutDown.value = utils_dateTools.getCutdown(taskInfo.value.reminderTime);
      if (cutDown.value.includes("剩余")) {
        return;
      }
      timer = setInterval(() => {
        if (cutDown.value === "0时0分0秒") {
          clearInterval(timer);
          const { pageQuery } = hooks_useInit.useInit();
          getTaskInfo(pageQuery, false);
          return;
        }
        cutDown.value = utils_dateTools.getCutdown(taskInfo.value.reminderTime);
      }, 1e3);
    };
    common_vendor.onLoad(() => {
    });
    common_vendor.onMounted(() => {
      const { pageQuery } = hooks_useInit.useInit();
      getTaskInfo(pageQuery);
    });
    common_vendor.onUnmounted(() => {
      clearInterval(timer);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: statusMap[taskInfo.value.operateStatus]
      }, statusMap[taskInfo.value.operateStatus] ? common_vendor.e({
        b: statusMap[taskInfo.value.operateStatus].icon,
        c: common_vendor.t(taskInfo.value.way === 1 && taskInfo.value.operateStatus === 1 ? "已通知" : statusMap[taskInfo.value.operateStatus].title),
        d: !taskInfo.value.operateStatus
      }, !taskInfo.value.operateStatus ? {
        e: common_vendor.t(cutDown.value)
      } : {}) : {}, {
        f: common_vendor.t(taskInfo.value.content),
        g: taskInfo.value.answer
      }, taskInfo.value.answer ? {
        h: common_vendor.t(taskInfo.value.answer)
      } : {}, {
        i: common_vendor.n(`status${taskInfo.value.operateStatus}`),
        j: taskInfo.value.userRelation
      }, taskInfo.value.userRelation ? {
        k: taskInfo.value.userRelation.headImage,
        l: common_vendor.t(taskInfo.value.userRelation.typeName)
      } : {}, {
        m: common_vendor.t(wayMap[taskInfo.value.way]),
        n: common_vendor.t(taskInfo.value.reminderType === 0 ? "单次提醒" : taskInfo.value.cycleTypeName),
        o: common_vendor.t(taskInfo.value.reminderTime),
        p: taskInfo.value.reminderType !== 0
      }, taskInfo.value.reminderType !== 0 ? {
        q: common_vendor.t(taskInfo.value.nextReminderTime)
      } : {}, {
        r: common_vendor.o(delRemind),
        s: taskInfo.value.operateStatus !== 3
      }, taskInfo.value.operateStatus !== 3 ? {
        t: common_vendor.t(taskInfo.value.operateStatus !== 0 ? "重新打开" : "编辑"),
        v: common_vendor.o(showReminerSet)
      } : {}, {
        w: common_vendor.o(closeReminderSet),
        x: common_vendor.o(confirmReminderSet),
        y: common_vendor.p({
          data: taskInfo.value,
          visible: setVisible.value
        }),
        z: common_vendor.n(taskInfo.value.operationRange === 0 ? "active" : ""),
        A: common_vendor.o(($event) => rangeConfirm("once")),
        B: common_vendor.n(taskInfo.value.operationRange === 1 ? "active" : ""),
        C: common_vendor.o(($event) => rangeConfirm("all")),
        D: common_vendor.sr(popupRef, "b2bfd21c-1", {
          "k": "popupRef"
        }),
        E: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-b2bfd21c"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/remind/detail.vue"]]);
wx.createPage(MiniProgramPage);
