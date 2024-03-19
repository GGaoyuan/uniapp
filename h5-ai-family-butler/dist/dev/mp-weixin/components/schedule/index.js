"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_router = require("../../utils/router.js");
const utils_dateTools = require("../../utils/dateTools.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (weekPanel + _easycom_uni_popup)();
}
const weekPanel = () => "./weekPanel.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  props: {
    taskData: {
      // 任务数据 对象类型
      type: Object,
      default: () => ({})
    },
    festivalData: {
      // 节假日数据 对象类型
      type: Array,
      default: () => []
    },
    taskArray: {
      // 任务列表 数组类型
      type: Array,
      default: () => []
    },
    initType: {
      // 默认选择的类型
      type: Object,
      default: () => ({})
    },
    extra: {
      // 额外的数据 角色
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    "dayInit",
    "daySelect",
    "change",
    "changeType",
    "getTaskByList"
  ],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    common_vendor.watch(
      () => props.taskData,
      (newVal, oldVal) => {
        console.log(newVal, "props.taskData 数据改变了");
        getTaskDataByType(type.value, newVal);
      }
    );
    const extraData = common_vendor.ref({ ...props.extra });
    const now = common_vendor.dayjs();
    const nowDate = now.format(utils_dateTools.MONTH_FORMAT);
    const userInfo = common_vendor.index.getStorageSync("userInfo") || {};
    const _isVip = !!userInfo.vipStatus;
    const isVip = common_vendor.ref(_isVip);
    const typeCurrent = common_vendor.ref(
      isVip.value ? { title: "日", type: "day" } : { title: "列表", type: "list" }
    );
    const type = common_vendor.ref(isVip.value ? "day" : "list");
    const typeSelector = [
      { title: "日", type: "day" },
      { title: "周", type: "week" },
      { title: "月", type: "month" },
      { title: "列表", type: "list" }
    ];
    const weeks = ["日", "一", "二", "三", "四", "五", "六"];
    const listTypeArr = ["待执行", "已执行"];
    const listType = common_vendor.ref(0);
    const getTaskByList = (index, isReload = false) => {
      listType.value = index;
      emits("getTaskByList", index, isReload);
    };
    if (type.value === "list") {
      getTaskByList(0);
    }
    const selectedDate = common_vendor.ref(common_vendor.dayjs().format("YYYY-MM-DD"));
    const dateDes = common_vendor.ref("今天");
    const dayInit = (data) => {
      emits("dayInit", data);
    };
    const weekIndexMap = common_vendor.ref({});
    const weekTaskListByHour = common_vendor.reactive({});
    const getWeekTaskListByHour = (taskObj = {}, len = 7) => {
      for (const key in weekTaskListByHour) {
        delete weekTaskListByHour[key];
      }
      for (const i in taskObj) {
        const dayTask = taskObj[i];
        if (dayTask) {
          for (let dti = 0; dti < dayTask.length; dti++) {
            const dyItem = dayTask[dti];
            const hours = `hour${dyItem.reminderTime.split(" ")[1].split(":")[0]}`;
            if (weekTaskListByHour[hours]) {
              if (weekTaskListByHour[hours][weekIndexMap.value[i]]) {
                weekTaskListByHour[hours][weekIndexMap.value[i]].push(dyItem);
              } else {
                weekTaskListByHour[hours][weekIndexMap.value[i]] = [dyItem];
              }
            } else {
              weekTaskListByHour[hours] = new Array(len).fill(0);
              if (weekTaskListByHour[hours][weekIndexMap.value[i]]) {
                weekTaskListByHour[hours][weekIndexMap.value[i]].push(dyItem);
              } else {
                weekTaskListByHour[hours][weekIndexMap.value[i]] = [dyItem];
              }
            }
          }
        }
      }
      console.log(weekTaskListByHour, "==============weekTaskListByHour");
    };
    const getNewWeek = (week, type2) => {
      if (type2 === "week") {
        for (let i = 0; i < week.length; i++) {
          const item = week[i];
          weekIndexMap.value[item.dateStr] = i;
        }
      }
      emits("change", week);
    };
    const weekInit = (week) => {
      getNewWeek(week, "week");
    };
    const daySelect = (item) => {
      selectedDate.value = item.dateStr;
      type.value = "day";
      emits("changeType", typeCurrent.value, type.value);
    };
    common_vendor.ref([]);
    const monthListInit = (year = common_vendor.dayjs().format("YYYY"), month = common_vendor.dayjs().format("M")) => {
      const dateList = [];
      let startDate = common_vendor.dayjs(`${year}-${month}`).day(0);
      const endDate = common_vendor.dayjs(`${year}-${month}`).endOf("month").day(6);
      while (startDate < endDate) {
        const dateStr = startDate.format("YYYY-MM-DD");
        dateList.push({
          date: startDate,
          month: startDate.month() + 1,
          year: startDate.year(),
          dateStr,
          day: startDate.format("D"),
          iscurrenMonth: startDate.format("M") === month
        });
        startDate = startDate.add(1, "day");
      }
      return dateList;
    };
    const changeType = (item) => {
      if (!isVip.value) {
        openPopup(item);
        return;
      }
      typeCurrent.value = item;
      type.value = item.type;
      if (item.type === "month") {
        getSwipeMonthList();
      } else if (item.type === "list") {
        getTaskByList(listType.value, true);
      }
      emits("changeType", item, type.value);
      dateDes.value = "今天";
    };
    const getTaskDataByType = (type2, taskObj) => {
      switch (type2) {
        case "day":
          getDayData(selectedDateItem.value);
          extraData.value = { ...props.extra };
          break;
        case "week":
          getWeekTaskListByHour(taskObj);
          break;
      }
    };
    const iconMap = {
      0: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/w-wechat.png",
      // 微信
      1: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/w-sm.png",
      // 短信
      2: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/w-ring.png",
      // 音频外呼
      3: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/w-video.png"
      // 视频外呼
    };
    const statusMap = {
      0: "待处理",
      1: "已接听",
      2: "未接听",
      3: "执行中",
      4: "提醒失败",
      5: "提醒失败"
    };
    const dayTaskList = common_vendor.ref([]);
    const dayTaskListByHour = common_vendor.ref({});
    const fomartDayTask = () => {
      for (const key in dayTaskListByHour.value) {
        delete dayTaskListByHour.value[key];
      }
      dayTaskList.value.forEach((item) => {
        const hours = `time${item.reminderTime.split(" ")[1].split(":")[0]}`;
        if (dayTaskListByHour.value[hours]) {
          dayTaskListByHour.value[hours].push(item);
        } else {
          dayTaskListByHour.value[hours] = [item];
        }
      });
      console.log(
        dayTaskList.value,
        dayTaskListByHour.value,
        "============fomartDayTask===dayTaskList"
      );
    };
    const selectedDateItem = common_vendor.ref({});
    const getDayData = (item) => {
      console.log(
        item.dateStr,
        props.taskData,
        Object.keys(props.taskData),
        "获取当天的数据-----------------"
      );
      const dateSection = Object.keys(props.taskData);
      if (dateSection.includes(item.dateStr)) {
        selectedDateItem.value = item;
        selectedDate.value = item.dateStr;
        dateDes.value = utils_dateTools.getTimeInterval(common_vendor.dayjs().format(utils_dateTools.DATE_FORMAT), item.dateStr);
        dayTaskList.value = props.taskData[selectedDate.value] || [];
      } else {
        selectedDateItem.value = { dateStr: dateSection[0] };
        selectedDate.value = dateSection[0];
        dateDes.value = utils_dateTools.getTimeInterval(
          common_vendor.dayjs().format(utils_dateTools.DATE_FORMAT),
          selectedDate.value
        );
        dayTaskList.value = props.taskData[selectedDate.value] || [];
      }
      fomartDayTask();
      emits("daySelect", item);
    };
    const goDetail = (item) => {
      utils_router.forward("remindDetail", {
        taskId: item.taskId,
        reminderTime: item.reminderTime,
        id: item.id
      });
    };
    const popupRef = common_vendor.ref(null);
    const popupMap = common_vendor.reactive({
      day: {
        title: "日历·日视图需要开通会员才能使用",
        desc: "方便定焦到具体某日的行程安排，直观的查看当日 各时间段的忙闲"
      },
      week: {
        title: "日历·周视图需要开通会员才能使用",
        desc: "方便定焦到具体某日的行程安排，直观的查看当日 各时间段的忙闲"
      },
      month: {
        title: "日历·月视图需要开通会员才能使用",
        desc: "方便定焦到具体某日的行程安排，直观的查看当日 各时间段的忙闲"
      }
    });
    const tipType = common_vendor.ref("");
    const openPopup = (item) => {
      tipType.value = item.type;
      if (item.type !== "list") {
        popupRef.value.open();
      }
    };
    const goBenefit = () => {
      utils_router.forward("memberBenefits");
      popupRef.value.close();
    };
    const getCutDowning = (item) => {
      const cutDown = utils_dateTools.getCutdown(item.reminderTime);
      item.cutDown = cutDown;
      setTimeout(() => {
        const cutDown2 = utils_dateTools.getCutdown(item.reminderTime);
        item.cutDown = cutDown2;
      }, 1e3);
    };
    const scrollTop = common_vendor.ref(0);
    common_vendor.ref({ scrollTop: 0 });
    const upper = () => {
    };
    const lower = () => {
      if (listType.value === 0)
        return;
      emits("getTaskByList", listType.value);
    };
    const scroll = () => {
    };
    const swipeCurrent = common_vendor.ref(1);
    const swipeDuration = common_vendor.ref(300);
    const swipeDisableTouch = common_vendor.ref(false);
    const swipeList = common_vendor.ref([
      monthListInit(
        common_vendor.dayjs().subtract(1, "month").format("YYYY"),
        common_vendor.dayjs().subtract(1, "month").format("M")
      ),
      monthListInit(),
      monthListInit(
        common_vendor.dayjs().subtract(-1, "month").format("YYYY"),
        common_vendor.dayjs().subtract(-1, "month").format("M")
      )
    ]);
    const getSwipeMonthList = () => {
      swipeList.value = [
        monthListInit(
          common_vendor.dayjs().subtract(1, "month").format("YYYY"),
          common_vendor.dayjs().subtract(1, "month").format("M")
        ),
        monthListInit(),
        monthListInit(
          common_vendor.dayjs().subtract(-1, "month").format("YYYY"),
          common_vendor.dayjs().subtract(-1, "month").format("M")
        )
      ];
      emits("change", swipeList.value[swipeCurrent.value]);
    };
    const swipeAnimationfinish = (event) => {
      const currentIndex = event.target.current;
      const currentWeekDays = swipeList.value[currentIndex];
      swipeCurrent.value = currentIndex;
      if (swipeDuration.value === 0) {
        swipeDuration.value = 300;
        setTimeout(() => {
          swipeDisableTouch.value = true;
        }, 100);
      } else {
        swipeDuration.value = 0;
        swipeDisableTouch.value = false;
        setTimeout(() => {
          const currentDayOne = currentWeekDays[17].date;
          swipeList.value = [
            monthListInit(
              currentDayOne.subtract(1, "month").format("YYYY"),
              currentDayOne.subtract(1, "month").format("M")
            ),
            monthListInit(
              currentDayOne.subtract(0, "month").format("YYYY"),
              currentDayOne.subtract(0, "month").format("M")
            ),
            monthListInit(
              currentDayOne.subtract(-1, "month").format("YYYY"),
              currentDayOne.subtract(-1, "month").format("M")
            )
          ];
          swipeCurrent.value = 1;
          emits("change", currentWeekDays);
        }, 0);
      }
    };
    expose({
      getDayData
    });
    common_vendor.onShow(() => {
      const userInfo2 = common_vendor.index.getStorageSync("userInfo") || {};
      const _isVip2 = !!userInfo2.vipStatus;
      isVip.value = _isVip2;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(nowDate)),
        b: common_vendor.t(dateDes.value),
        c: common_vendor.f(typeSelector, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index,
            c: common_vendor.n(typeCurrent.value.type === item.type ? "active" : ""),
            d: common_vendor.o(($event) => changeType(item), index)
          };
        }),
        d: common_vendor.n(type.value === "day" && typeCurrent.value.type !== "day" ? "left" : ""),
        e: typeCurrent.value.type === "day"
      }, typeCurrent.value.type === "day" ? {
        f: common_vendor.o(dayInit),
        g: common_vendor.o(getDayData),
        h: common_vendor.o(getNewWeek),
        i: common_vendor.p({
          ["task-data"]: __props.taskData,
          ["selected-date"]: selectedDate.value
        })
      } : {}, {
        j: typeCurrent.value.type === "week"
      }, typeCurrent.value.type === "week" ? common_vendor.e({
        k: type.value === "week"
      }, type.value === "week" ? {
        l: common_vendor.o(weekInit),
        m: common_vendor.o(daySelect),
        n: common_vendor.o((week) => getNewWeek(week, "week")),
        o: common_vendor.p({
          ["task-data"]: __props.taskData,
          ["selected-able"]: false,
          ["is-show-dot"]: false
        }),
        p: common_vendor.f(common_vendor.unref(weekTaskListByHour), (hourList, wKey, i0) => {
          return {
            a: common_vendor.t(wKey.substr(4)),
            b: common_vendor.f(hourList, (hourItemList, index, i1) => {
              return {
                a: common_vendor.f(hourItemList, (hourItem, _index, i2) => {
                  return common_vendor.e(__props.extra.id ? {
                    a: common_vendor.t(hourItem.content),
                    b: common_vendor.n(hourItem.operateStatus ? "done" : "undo")
                  } : {
                    c: hourItem.userRelation && hourItem.userRelation.headImage
                  }, {
                    d: `hour${_index}`,
                    e: common_vendor.o(($event) => goDetail(hourItem), `hour${_index}`)
                  });
                }),
                b: index
              };
            }),
            c: wKey
          };
        }),
        q: __props.extra.id
      } : {
        r: common_vendor.o(dayInit),
        s: common_vendor.o(getDayData),
        t: common_vendor.o(getNewWeek),
        v: common_vendor.p({
          ["task-data"]: __props.taskData,
          date: selectedDate.value,
          ["selected-date"]: selectedDate.value
        })
      }) : {}, {
        w: typeCurrent.value.type === "month"
      }, typeCurrent.value.type === "month" ? common_vendor.e({
        x: type.value === "month"
      }, type.value === "month" ? {
        y: common_vendor.f(weeks, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        z: common_vendor.f(swipeList.value, (_monthDays, _index, i0) => {
          return {
            a: common_vendor.f(_monthDays, (item, index, i1) => {
              return common_vendor.e({
                a: __props.festivalData[index] && __props.festivalData[index].weekday
              }, __props.festivalData[index] && __props.festivalData[index].weekday ? {
                b: common_vendor.n(__props.festivalData[index].weekday === "班" ? "ban" : "xiu")
              } : {}, {
                c: common_vendor.t(item.day),
                d: common_vendor.n(common_vendor.unref(now).format(common_vendor.unref(utils_dateTools.DATE_FORMAT)) === item.dateStr ? "active" : ""),
                e: __props.festivalData[index] && __props.festivalData[index].festival
              }, __props.festivalData[index] && __props.festivalData[index].festival ? {
                f: common_vendor.t(__props.festivalData[index].festival)
              } : {}, {
                g: common_vendor.n(item.iscurrenMonth ? "" : "gray"),
                h: __props.taskData[item.dateStr] && __props.extra.id
              }, __props.taskData[item.dateStr] && __props.extra.id ? {
                i: common_vendor.f(__props.taskData[item.dateStr].slice(0, 3), (taskItem, k2, i2) => {
                  return {
                    a: common_vendor.t(taskItem.content),
                    b: common_vendor.n(taskItem.operateStatus ? "done" : ""),
                    c: taskItem.dateStr
                  };
                })
              } : {}, {
                j: __props.taskData[item.dateStr] && !__props.extra.id
              }, __props.taskData[item.dateStr] && !__props.extra.id ? {
                k: common_vendor.f(__props.taskData[item.dateStr].slice(0, 2), (taskItem, k2, i2) => {
                  return {
                    a: taskItem.dateStr,
                    b: taskItem.userRelation && taskItem.userRelation.headImage
                  };
                })
              } : {}, {
                l: index,
                m: common_vendor.o(($event) => daySelect(item), index)
              });
            }),
            b: _index
          };
        }),
        A: swipeCurrent.value,
        B: swipeDuration.value,
        C: swipeDisableTouch.value,
        D: common_vendor.o(swipeAnimationfinish)
      } : {
        E: common_vendor.o(dayInit),
        F: common_vendor.o(getDayData),
        G: common_vendor.o(getNewWeek),
        H: common_vendor.p({
          ["task-data"]: __props.taskData,
          date: selectedDate.value,
          ["selected-date"]: selectedDate.value
        })
      }) : {}, {
        I: common_vendor.f(dayTaskListByHour.value, (hourList, key, i0) => {
          return {
            a: common_vendor.t(key.substr(4)),
            b: common_vendor.f(hourList, (item, k1, i1) => {
              return common_vendor.e(!__props.extra.id ? {
                a: item.userRelation.headImage,
                b: common_vendor.t(item.userRelation.typeName),
                c: iconMap[item.way],
                d: common_vendor.t(item.operateStatus === 1 && item.way === 1 ? "已通知" : statusMap[item.operateStatus]),
                e: common_vendor.n(`status${item.operateStatus}`),
                f: common_vendor.t(item.content),
                g: common_vendor.t(item.answer),
                h: item.answer
              } : {
                i: iconMap[item.way],
                j: common_vendor.t(item.operateStatus === 1 && item.way === 1 ? "已通知" : statusMap[item.operateStatus]),
                k: common_vendor.n(`status${item.operateStatus}`),
                l: common_vendor.t(item.content),
                m: common_vendor.t(item.answer),
                n: item.answer
              }, {
                o: common_vendor.t(item.reminderType === 0 ? "单次提醒" : item.cycleTypeName),
                p: common_vendor.t(item.reminderTime),
                q: item.id,
                r: common_vendor.o(($event) => goDetail(item), item.id)
              });
            }),
            c: key
          };
        }),
        J: !__props.extra.id,
        K: JSON.stringify(dayTaskListByHour.value) === "{}"
      }, JSON.stringify(dayTaskListByHour.value) === "{}" ? {} : {}, {
        L: type.value === "day",
        M: common_vendor.f(listTypeArr, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.n(listType.value === index ? "active" : ""),
            d: common_vendor.o(($event) => getTaskByList(index), index)
          };
        }),
        N: common_vendor.f(__props.taskArray, (item, k0, i0) => {
          return common_vendor.e(!__props.extra.id ? {
            a: item.userRelation.headImage,
            b: common_vendor.t(item.userRelation.typeName),
            c: iconMap[item.way],
            d: common_vendor.t(item.operateStatus !== 0 ? item.operateStatus === 1 && item.way === 1 ? "已通知" : statusMap[item.operateStatus] : getCutDowning(item)),
            e: common_vendor.t(item.cutDown),
            f: common_vendor.n(`status${item.operateStatus}`),
            g: common_vendor.t(item.content),
            h: common_vendor.t(item.answer),
            i: item.answer
          } : {
            j: iconMap[item.way],
            k: common_vendor.t(item.operateStatus !== 0 ? item.operateStatus === 1 && item.way === 1 ? "已通知" : statusMap[item.operateStatus] : getCutDowning(item)),
            l: common_vendor.t(item.cutDown),
            m: common_vendor.n(`status${item.operateStatus}`),
            n: common_vendor.t(item.content),
            o: common_vendor.t(item.answer),
            p: item.answer
          }, {
            q: common_vendor.t(item.reminderType === 0 ? "单次提醒" : item.cycleTypeName),
            r: common_vendor.t(item.reminderTime),
            s: item.id,
            t: common_vendor.o(($event) => goDetail(item), item.id)
          });
        }),
        O: !__props.extra.id,
        P: scrollTop.value,
        Q: common_vendor.o(upper),
        R: common_vendor.o(lower),
        S: common_vendor.o(scroll),
        T: __props.taskArray && __props.taskArray.length === 0
      }, __props.taskArray && __props.taskArray.length === 0 ? {} : {}, {
        U: type.value === "list",
        V: common_vendor.unref(popupMap)[tipType.value]
      }, common_vendor.unref(popupMap)[tipType.value] ? {
        W: common_vendor.n(tipType.value),
        X: common_vendor.t(common_vendor.unref(popupMap)[tipType.value].title),
        Y: common_vendor.t(common_vendor.unref(popupMap)[tipType.value].desc),
        Z: common_vendor.o(goBenefit)
      } : {}, {
        aa: common_vendor.sr(popupRef, "806ea376-4", {
          "k": "popupRef"
        }),
        ab: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false,
          ["mask-background-color"]: "rgba(0,0,0,0)"
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-806ea376"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/schedule/index.vue"]]);
wx.createComponent(Component);
