"use strict";
const common_vendor = require("../common/vendor.js");
const api_reminder = require("../api/reminder.js");
require("../utils/request.js");
require("../utils/platform.js");
require("../utils/router.js");
require("../utils/shared.js");
require("../utils/urlMap.js");
require("../config/commonParams.js");
require("../helper/pinia-auto-refs.js");
require("../store/app.js");
require("../store/setup.js");
require("../store/test.js");
require("../store/user.js");
require("../config/env.js");
require("../config/serviceLoading.js");
require("./ipViewComponents/core/message/MessageCenter.js");
require("./ipViewComponents/core/utils/pools/ObjectPool.js");
require("../constants/MainPageConstants.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup + Character)();
}
const Character = () => "./character/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "reminderSet",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      // 提醒详情数据
      type: Object,
      default: () => ({})
    }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: emits }) {
    const props = __props;
    common_vendor.watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal) {
          dialogShow();
        }
      }
    );
    const date = new Date();
    const years = [];
    const year = common_vendor.ref(date.getFullYear());
    const months = [];
    const month = common_vendor.ref(date.getMonth() + 1);
    const days = [];
    const day = common_vendor.ref(date.getDate());
    const hours = [];
    const hour = common_vendor.ref(date.getHours());
    const minutes = [];
    const minute = common_vendor.ref(date.getMinutes());
    for (let i = date.getFullYear(); i <= date.getFullYear() + 50; i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    for (let i = 1; i <= 23; i++) {
      hours.push(i);
    }
    for (let i = 0; i <= 59; i++) {
      minutes.push(i);
    }
    const defaultTime = [
      0,
      month.value - 1,
      day.value - 1,
      hour.value - 1,
      minutes.value - 1
    ];
    const timeValue = common_vendor.ref(defaultTime);
    const indicatorStyle = `font-weight: 700;`;
    const propsData = {
      ...props.data,
      currentReminderTime: void 0
    };
    const defaultRemindData = common_vendor.reactive(propsData);
    const remindData = common_vendor.ref(propsData);
    const targetList = common_vendor.ref([]);
    const getTargetFn = async () => {
      const res = await api_reminder.reminder.getRelationList({});
      targetList.value = res.apiFindUserRelationList;
    };
    const remainObj = common_vendor.ref({});
    const getWaysRemain = async () => {
      remainObj.value = await api_reminder.reminder.getReminderWay();
    };
    const waysMap = common_vendor.reactive({
      2: {
        name: "语音提醒",
        icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/ring.png",
        id: "1",
        type: "ring",
        remainKey: "remindVoiceRemaining"
      },
      3: {
        name: "视频提醒",
        icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/video.png",
        id: "2",
        type: "video",
        remainKey: "remindVideoRemaining"
      },
      1: {
        name: "短信提醒",
        icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/sm.png",
        reside: 10,
        id: "3",
        type: "sm",
        remainKey: "remindSmsRemaining"
      },
      0: {
        name: "微信提醒",
        icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/wechat.png",
        id: "4",
        type: "wechat",
        remainKey: "remindWechatRemaining"
      }
    });
    const reminderWays = common_vendor.reactive([
      {
        name: "语音提醒",
        icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/ring.png",
        id: "1",
        type: 2,
        remainKey: "remindVoiceRemaining"
      },
      {
        name: "视频提醒",
        icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/video.png",
        id: "2",
        type: 3,
        remainKey: "remindVideoRemaining"
      },
      {
        name: "短信提醒",
        icon: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/sm.png",
        reside: 10,
        id: "3",
        type: 1,
        remainKey: "remindSmsRemaining"
      }
      // {
      //   name: '微信提醒',
      //   icon: wechatPng,
      //   id: '4',
      //   type: 0,
      //   remainKey: 'remindWechatRemaining'
      // }
    ]);
    const getDefautTime = () => {
      if (remindData.value.reminderTime) {
        const timeArr = remindData.value.reminderTime.split(" ");
        const time1Arr = timeArr[0].split("-");
        const time2Arr = timeArr[1].split(":");
        const yearIndex = years.indexOf(Number(time1Arr[0]));
        const monthIndex = months.indexOf(Number(time1Arr[1]));
        const dayIndex = days.indexOf(Number(time1Arr[2]));
        const hourIndex = hours.indexOf(Number(time2Arr[0]));
        const minuteIndex = minutes.indexOf(Number(time2Arr[1]));
        const secondIndex = minutes.indexOf(Number(time2Arr[2]));
        timeValue.value = [
          yearIndex,
          monthIndex,
          dayIndex,
          hourIndex,
          minuteIndex,
          secondIndex
        ];
      }
    };
    const changeTimeFn = (e) => {
      const _date = new Date();
      let val = [
        0,
        date.getMonth(),
        _date.getDate() - 1,
        _date.getHours() - 1,
        _date.getMinutes()
      ];
      if (e) {
        val = e.detail.value;
      }
      year.value = years[val[0]];
      month.value = months[val[1]];
      day.value = days[val[2]];
      hour.value = hours[val[3]];
      minute.value = minutes[val[4]];
      const dateStr = common_vendor.dayjs(
        `${year.value}-${month.value}-${day.value} ${hour.value}:${minute.value}`
      ).format("YYYY-MM-DD HH:mm:ss");
      console.log(dateStr, "=================dateStr");
      timeValue.value = val;
      remindData.value.currentReminderTime = dateStr;
      remindData.value.reminderTime = dateStr;
    };
    const changeWaysFn = (item) => {
      if (remainObj.value[item.remainKey] === 0) {
        common_vendor.index.showToast({
          title: "次数已用完",
          icon: "error"
        });
        return;
      }
      remindData.value.way = item.type;
    };
    const changeTargeFn = (item) => {
      remindData.value.typeName = item.typeName;
      remindData.value.toUserRelationId = item.id;
      remindData.value.headImage = item.headImage;
    };
    const popupRef = common_vendor.ref(null);
    const popupType = common_vendor.ref("");
    const openPopup = async (type) => {
      switch (type) {
        case "target":
          getTargetFn();
          break;
        case "way":
          getWaysRemain();
          break;
        case "cycle":
          await getCycleFn();
          changeCycleFn();
          break;
        case "time":
          getDefautTime();
          if (!remindData.value.reminderTime) {
            changeTimeFn();
          }
          break;
      }
      popupRef.value.open();
      popupType.value = type;
    };
    const cycleList = common_vendor.ref([]);
    const defaultCycleIndex = [0];
    const cycleIndex = common_vendor.ref(defaultCycleIndex);
    const getCycleFn = async () => {
      cycleList.value = await api_reminder.reminder.getListReminderCycle({});
      const _index = cycleList.value.findIndex((ele) => {
        return ele.id === remindData.value.cycleTypeId;
      });
      if (_index > -1) {
        cycleIndex.value = [_index];
      } else {
        cycleIndex.value = [0];
      }
    };
    const changeCycleFn = (event) => {
      let index = cycleIndex.value[0];
      if (event) {
        index = event.detail.value[0] || 0;
        cycleIndex.value = event.detail.value;
      }
      const item = cycleList.value[index];
      remindData.value.reminderType = item.cycleType === "单次提醒" ? 0 : 1;
      remindData.value.cycleTypeId = item.id;
      remindData.value.cycleTypeName = item.cycleType;
    };
    const closePopup = (type) => {
      switch (type) {
        case "target":
          remindData.value.typeName = defaultRemindData.value.typeName;
          remindData.value.toUserRelationId = defaultRemindData.value.toUserRelationId;
          remindData.value.headImage = defaultRemindData.value.headImage;
          break;
        case "way":
          remindData.value.way = defaultRemindData.value.way;
          break;
        case "cycle":
          remindData.value.reminderType = defaultRemindData.value.reminderTypes;
          remindData.value.cycleTypeId = defaultRemindData.value.cycleTypeId;
          remindData.value.cycleTypeName = defaultRemindData.value.cycleTypeName;
          cycleIndex.value = defaultCycleIndex;
          break;
        case "time":
          remindData.value.currentReminderTime = defaultRemindData.value.reminderTime;
          remindData.value.reminderTime = defaultRemindData.value.reminderTime;
          timeValue.value = defaultTime;
          break;
      }
      popupRef.value.close();
    };
    const confirmFn = (type) => {
      switch (type) {
        case "target":
          defaultRemindData.value.typeName = remindData.value.typeName;
          defaultRemindData.value.toUserRelationId = remindData.value.toUserRelationId;
          break;
        case "way":
          defaultRemindData.value.way = remindData.value.way;
          break;
        case "cycle":
          defaultRemindData.value.reminderType = remindData.value.reminderType;
          defaultRemindData.value.cycleTypeId = remindData.value.cycleTypeId;
          defaultRemindData.value.cycleTypeName = remindData.value.cycleTypeName;
          break;
        case "time":
          defaultRemindData.value.currentReminderTime = remindData.value.reminderTime;
          defaultRemindData.value.reminderTime = remindData.value.reminderTime;
          break;
      }
      popupRef.value.close();
    };
    const dialogRef = common_vendor.ref(null);
    const dialogShow = () => {
      dialogRef.value.open();
      const propsData2 = {
        ...props.data,
        toUserRelationId: props.data.userRelation && props.data.userRelation.id,
        typeName: props.data.userRelation && props.data.userRelation.typeName,
        headImage: props.data.userRelation && props.data.userRelation.headImage,
        currentReminderTime: void 0
        // ...props.data.userRelation
      };
      if (props.data.userRelation && props.data.userRelation.state === 2) {
        propsData2.toUserRelationId = void 0;
        propsData2.typeName = void 0;
        propsData2.headImage = void 0;
      }
      defaultRemindData.value = { ...propsData2 };
      remindData.value = { ...propsData2 };
    };
    const dialogClose = () => {
      emits("cancel");
      remindData.value = { ...props.data };
      defaultRemindData.value = { ...props.data };
      dialogRef.value.close();
    };
    const confirmAble = common_vendor.computed(() => {
      return remindData.value.toUserRelationId && remindData.value.way && remindData.value.cycleTypeId && remindData.value.reminderTime && remindData.value.content;
    });
    const dialogConfirm = async () => {
      if (!confirmAble.value) {
        return;
      }
      dialogRef.value.close();
      const isUpdate = props.data.operateStatus === 0;
      const confirmApiFn = isUpdate ? api_reminder.reminder.updateTask : api_reminder.reminder.saveTask;
      if (props.data && props.data.taskId && props.data.operateStatus === 0 && props.data.reminderType !== 0) {
        openPopup("range");
        rangeType.value = "update";
        return;
      }
      const updateReq = {
        toUserRelationId: remindData.value.toUserRelationId || remindData.value.userRelation.id,
        way: remindData.value.way,
        reminderType: remindData.value.reminderType,
        cycleTypeId: remindData.value.cycleTypeId,
        content: remindData.value.content,
        reminderTime: remindData.value.reminderTime,
        taskId: remindData.value.taskId,
        operationRange: remindData.value.operationRange || 0,
        id: remindData.value.id,
        currentReminderTime: remindData.value.currentReminderTime || remindData.value.reminderTime
      };
      const addReq = {
        toUserRelationId: remindData.value.toUserRelationId || remindData.value.userRelation.id,
        way: remindData.value.way,
        reminderType: remindData.value.reminderType,
        cycleTypeId: remindData.value.cycleTypeId,
        content: remindData.value.content,
        reminderTime: remindData.value.reminderTime
        // taskId: remindData.value.taskId
        // operationRange: 0,
        // id: remindData.value.id,
        // currentReminderTime:
        //   remindData.value.currentReminderTime || remindData.value.reminderTime
      };
      const req = isUpdate ? updateReq : addReq;
      confirmApiFn(req).then((res) => {
        emits("confirm", res);
      }).catch((e) => {
        dialogClose();
      });
    };
    const addOrUpdateRemindFn = async () => {
      let confirmApiFn = api_reminder.reminder.saveTask;
      if (props.data && props.data.taskId && props.data.operateStatus === 0) {
        confirmApiFn = api_reminder.reminder.updateTask;
      }
      const req = {
        toUserRelationId: remindData.value.toUserRelationId || remindData.value.userRelation.id,
        way: remindData.value.way,
        reminderType: remindData.value.reminderType,
        cycleTypeId: remindData.value.cycleTypeId,
        content: remindData.value.content,
        reminderTime: remindData.value.reminderTime,
        taskId: remindData.value.taskId,
        operationRange: remindData.value.operationRange,
        id: remindData.value.id,
        currentReminderTime: remindData.value.currentReminderTime || remindData.value.reminderTime
      };
      confirmApiFn(req).then((res) => {
        emits("confirm", res);
      }).catch((e) => {
        dialogClose();
      });
    };
    const rangeType = common_vendor.ref("update");
    const rangeDesc = {
      del: {
        title: "此为重复提醒，请确认删除？",
        once: "仅删除本次提醒",
        all: "删除所有将来提醒"
      },
      update: {
        title: "此为重复提醒，请确认修改？",
        once: "仅针对本次提醒修改",
        all: "针对所有将来提醒修改"
      }
    };
    const rangeSelectType = common_vendor.ref("");
    const rangeConfirm = async (type) => {
      rangeSelectType.value = type;
      if (type === "once") {
        remindData.value.operationRange = 0;
      } else {
        remindData.value.operationRange = 1;
      }
      await addOrUpdateRemindFn();
      closePopup("range");
      rangeSelectType.value = "";
    };
    const cVisible = common_vendor.ref(false);
    const showRoleAdd = () => {
      cVisible.value = true;
    };
    const addRoleConfirm = () => {
      getTargetFn();
      cVisible.value = false;
    };
    const addRoleClose = () => {
      cVisible.value = false;
    };
    common_vendor.onMounted(() => {
      if (props.visible) {
        dialogShow();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: remindData.value.typeName
      }, remindData.value.typeName ? {
        b: remindData.value.headImage,
        c: remindData.value.headImage,
        d: common_vendor.t(remindData.value.typeName)
      } : {}, {
        e: common_vendor.o(($event) => openPopup("target")),
        f: waysMap[remindData.value.way]
      }, waysMap[remindData.value.way] ? {
        g: common_vendor.t(waysMap[remindData.value.way] && waysMap[remindData.value.way].name)
      } : {}, {
        h: common_vendor.o(($event) => openPopup("way")),
        i: remindData.value.cycleTypeName
      }, remindData.value.cycleTypeName ? {
        j: common_vendor.t(remindData.value.cycleTypeName)
      } : {}, {
        k: common_vendor.o(($event) => openPopup("cycle")),
        l: remindData.value.reminderTime
      }, remindData.value.reminderTime ? {
        m: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(remindData.value.reminderTime).format("YYYY/MM/DD HH:mm"))
      } : {}, {
        n: common_vendor.o(($event) => openPopup("time")),
        o: remindData.value.content,
        p: common_vendor.o(($event) => remindData.value.content = $event.detail.value),
        q: common_vendor.o(dialogClose),
        r: common_vendor.n(common_vendor.unref(confirmAble) ? "able" : "disable"),
        s: common_vendor.o(dialogConfirm),
        t: common_vendor.sr(dialogRef, "87b726da-0", {
          "k": "dialogRef"
        }),
        v: common_vendor.p({
          type: "center",
          ["mask-click"]: false,
          ["is-mask-click"]: false
        }),
        w: common_vendor.o(showRoleAdd),
        x: common_vendor.f(targetList.value, (item, k0, i0) => {
          return {
            a: item.headImage,
            b: common_vendor.t(item.typeName),
            c: item.id,
            d: common_vendor.n(remindData.value.toUserRelationId === item.id ? "active" : ""),
            e: common_vendor.o(($event) => changeTargeFn(item), item.id)
          };
        }),
        y: !targetList.value.length
      }, !targetList.value.length ? {} : {}, {
        z: common_vendor.o(($event) => closePopup("target")),
        A: common_vendor.o(($event) => confirmFn("target")),
        B: popupType.value === "target",
        C: common_vendor.f(reminderWays, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: common_vendor.t(remainObj.value[item.remainKey] || 0),
            d: index,
            e: common_vendor.n(remindData.value.way === item.type ? "active" : ""),
            f: common_vendor.o(($event) => changeWaysFn(item), index)
          };
        }),
        D: common_vendor.o(($event) => closePopup("way")),
        E: common_vendor.o(($event) => confirmFn("way")),
        F: popupType.value === "way",
        G: popupType.value === "cycle"
      }, popupType.value === "cycle" ? {
        H: common_vendor.f(cycleList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.cycleType),
            b: index,
            c: cycleIndex.value[0] === index ? 1 : ""
          };
        }),
        I: indicatorStyle,
        J: cycleIndex.value,
        K: common_vendor.o(changeCycleFn),
        L: common_vendor.o(($event) => closePopup("cycle")),
        M: common_vendor.o(($event) => confirmFn("cycle"))
      } : {}, {
        N: common_vendor.f(years, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: timeValue.value[0] === index ? 1 : ""
          };
        }),
        O: common_vendor.f(months, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: timeValue.value[1] === index ? 1 : ""
          };
        }),
        P: common_vendor.f(days, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: timeValue.value[2] === index ? 1 : ""
          };
        }),
        Q: common_vendor.f(hours, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: timeValue.value[3] === index ? 1 : ""
          };
        }),
        R: common_vendor.f(minutes, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: timeValue.value[4] === index ? 1 : ""
          };
        }),
        S: indicatorStyle,
        T: timeValue.value,
        U: common_vendor.o(changeTimeFn),
        V: common_vendor.o(($event) => closePopup("time")),
        W: common_vendor.o(($event) => confirmFn("time")),
        X: popupType.value === "time",
        Y: rangeDesc[rangeType.value]
      }, rangeDesc[rangeType.value] ? {
        Z: common_vendor.t(rangeDesc[rangeType.value].title),
        aa: common_vendor.t(rangeDesc[rangeType.value].once),
        ab: common_vendor.n(rangeSelectType.value === "once" ? "active" : ""),
        ac: common_vendor.o(($event) => rangeConfirm("once")),
        ad: common_vendor.t(rangeDesc[rangeType.value].all),
        ae: common_vendor.n(rangeSelectType.value === "all" ? "active" : ""),
        af: common_vendor.o(($event) => rangeConfirm("all"))
      } : {}, {
        ag: popupType.value === "range",
        ah: common_vendor.sr(popupRef, "87b726da-1", {
          "k": "popupRef"
        }),
        ai: common_vendor.p({
          type: "bottom",
          ["mask-click"]: false,
          ["is-mask-click"]: false,
          ["safe-area"]: false
        }),
        aj: common_vendor.o(addRoleConfirm),
        ak: common_vendor.o(addRoleClose),
        al: common_vendor.p({
          visible: cVisible.value
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-87b726da"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/reminderSet.vue"]]);
wx.createComponent(Component);
