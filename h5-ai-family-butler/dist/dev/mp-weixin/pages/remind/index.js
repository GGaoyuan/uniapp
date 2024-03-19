"use strict";
const common_vendor = require("../../common/vendor.js");
const api_reminder = require("../../api/reminder.js");
const common_assets = require("../../common/assets.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../utils/router.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
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
if (!Math) {
  (navBar + schedule)();
}
const schedule = () => "../../components/schedule/index.js";
const navBar = () => "../../components/nav-bar/index.js";
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
    const currentRoleIndex = common_vendor.ref(0);
    const currentRole = common_vendor.ref({});
    const defaultRoleList = [{ typeName: "全部", id: "", headImage: common_assets.allPng }];
    const roleList = common_vendor.ref([]);
    const changeRole = (item, index) => {
      if (currentRoleIndex.value === index)
        return;
      currentRoleIndex.value = index;
      currentRole.value = item;
      if (taskType.value.type === "list") {
        taskList.value = [];
        currentPage.value = 1;
        getTaskByListFn(statusIndex.value, true);
      } else {
        getTask();
        getFestival();
      }
    };
    const taskData = common_vendor.ref({});
    const taskList = common_vendor.ref([]);
    const dateList = common_vendor.ref([]);
    const getTask = async () => {
      if (!dateList.value.length)
        return;
      const req = {
        userRelationId: currentRole.value.id,
        startTime: dateList.value.length && `${dateList.value[0].dateStr} 00:00:00`,
        endTime: dateList.value.length && `${dateList.value[dateList.value.length - 1].dateStr} 23:59:59`
      };
      taskData.value = await api_reminder.reminder.getListTaskInfoGroupByDay(req);
    };
    const festivalData = common_vendor.ref([]);
    const getFestival = async () => {
      if (!dateList.value[0])
        return;
      const req = {
        startTime: dateList.value[0].dateStr,
        endTime: dateList.value[dateList.value.length - 1].dateStr
      };
      festivalData.value = await api_reminder.reminder.startAndEndDate(req);
    };
    const getUserRelationListFn = () => {
      api_reminder.reminder.getRelationList().then((res) => {
        roleList.value = [...defaultRoleList, ...res.apiFindUserRelationList];
        currentRole.value = roleList.value[currentRoleIndex.value];
      });
    };
    const dayInit = (data) => {
      console.log(data, "获取按日分类的一周的数据");
      dateList.value = data;
      getTask();
      getFestival();
    };
    const changeDate = (_dateList) => {
      console.log(_dateList, "==========改变时间区间========");
      dateList.value = _dateList;
      currentPage.value = 1;
      getTask();
      getFestival();
    };
    const statusIndex = common_vendor.ref();
    const noMore = common_vendor.ref(false);
    const currentPage = common_vendor.ref(1);
    const getTaskByListFn = async (index, isReload = false) => {
      if (statusIndex.value !== index || isReload) {
        taskList.value = [];
        noMore.value = false;
        currentPage.value = 1;
      }
      statusIndex.value = index;
      if (noMore.value)
        return;
      const res = await api_reminder.reminder.getListTaskInfo({
        operateStatus: index,
        toUserRelationId: currentRole.value.id || void 0,
        pageSize: 10,
        currentPage: currentPage.value
      });
      taskList.value = [...taskList.value, ...res];
      currentPage.value++;
      if (res.length === 0) {
        noMore.value = true;
      }
    };
    const taskType = common_vendor.ref({});
    const changeType = (item, type) => {
      taskType.value = { ...item };
      taskType.value.type = type;
    };
    const customBarH = getApp().globalData.customBarH;
    common_vendor.onMounted(() => {
    });
    common_vendor.onShow(() => {
      getUserRelationListFn();
      getTask();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "提醒记录"
        }),
        b: common_vendor.f(roleList.value, (item, index, i0) => {
          return {
            a: item.headImage,
            b: common_vendor.t(item.typeName),
            c: index,
            d: common_vendor.n(currentRoleIndex.value === index ? "active" : ""),
            e: common_vendor.o(($event) => changeRole(item, index), index)
          };
        }),
        c: common_vendor.o(changeType),
        d: common_vendor.o(changeDate),
        e: common_vendor.o(dayInit),
        f: common_vendor.o(getTaskByListFn),
        g: common_vendor.p({
          ["task-array"]: taskList.value,
          ["task-data"]: taskData.value,
          ["festival-data"]: festivalData.value,
          extra: currentRole.value
        }),
        h: `${common_vendor.unref(customBarH)}px`,
        i: common_vendor.n(taskType.value.type === "week" || taskType.value.type === "month" ? "content-white" : "")
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-83957df3"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/remind/index.vue"]]);
wx.createPage(MiniProgramPage);
