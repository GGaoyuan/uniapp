"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_dateTools = require("../../utils/dateTools.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "weekPanel",
  props: {
    date: {
      // 当前周的日期， 默认当天
      type: [String, Number]
    },
    selectedDate: {
      type: [String, Number],
      default: common_vendor.dayjs().format("YYYY-MM-DD")
    },
    selectedAble: {
      // 是否能被选中
      type: Boolean,
      default: true
    },
    taskData: {
      // 任务数据
      type: Object,
      default: () => ({})
    },
    isShowDot: {
      type: Boolean,
      default: true
    }
  },
  emits: ["init", "select", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const nowDay = common_vendor.dayjs().format(utils_dateTools.DATE_FORMAT);
    const weeks = ["日", "一", "二", "三", "四", "五", "六"];
    const daySelect = common_vendor.ref(props.selectedDate);
    common_vendor.watch(
      () => props.selectedDate,
      (newVal, oldVal) => {
        if (newVal) {
          daySelect.value = newVal;
        }
      }
    );
    const weekDays = utils_dateTools.getWeekDays(props.date);
    const getCurrentDay = () => {
      for (let i = 0; i < weekDays.length; i++) {
        const wdItem = weekDays[i];
        if (daySelect.value === wdItem.dateStr) {
          return wdItem;
        }
      }
      return {};
    };
    const currentDay = getCurrentDay();
    common_vendor.watch(
      () => props.taskData,
      (newVal, oldVal) => {
        if (props.selectedAble && onceFlag.value) {
          console.log(newVal, "props.taskDaxxxxxxxxxxxxxxxxxxta 数据改变了");
          emits("select", currentDay);
          onceFlag.value = false;
        }
      }
    );
    emits("init", weekDays);
    const onceFlag = common_vendor.ref(true);
    const changeDay = (item) => {
      daySelect.value = item.dateStr;
      emits("select", item);
    };
    const _selectedD = common_vendor.dayjs(props.date);
    const swipeCurrent = common_vendor.ref(1);
    const swipeDuration = common_vendor.ref(300);
    const swipeDisableTouch = common_vendor.ref(false);
    const swipeList = common_vendor.ref([
      utils_dateTools.getWeekDays(_selectedD.subtract(1, "week")),
      utils_dateTools.getWeekDays(_selectedD.subtract(0, "week")),
      // weekDays,
      utils_dateTools.getWeekDays(_selectedD.subtract(-1, "week"))
    ]);
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
          const currentDayOne = currentWeekDays[0].date;
          swipeList.value = [
            utils_dateTools.getWeekDays(currentDayOne.subtract(1, "week")),
            utils_dateTools.getWeekDays(currentDayOne.subtract(0, "week")),
            utils_dateTools.getWeekDays(currentDayOne.subtract(-1, "week"))
          ];
          swipeCurrent.value = 1;
          emits("change", currentWeekDays);
        }, 0);
      }
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(weeks, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        b: common_vendor.f(swipeList.value, (_weekDays, index, i0) => {
          return {
            a: common_vendor.f(_weekDays, (item, _index, i1) => {
              return {
                a: common_vendor.t(item.day),
                b: common_vendor.n(common_vendor.unref(nowDay) === item.dateStr ? "current" : ""),
                c: common_vendor.n(daySelect.value === item.dateStr && __props.selectedAble ? "selected" : ""),
                d: __props.taskData[item.dateStr] && __props.taskData[item.dateStr].length && __props.isShowDot,
                e: _index,
                f: common_vendor.o(($event) => changeDay(item), _index)
              };
            }),
            b: index
          };
        }),
        c: swipeCurrent.value,
        d: swipeDuration.value,
        e: swipeDisableTouch.value,
        f: common_vendor.o(swipeAnimationfinish)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cd8826e1"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/schedule/weekPanel.vue"]]);
wx.createComponent(Component);
