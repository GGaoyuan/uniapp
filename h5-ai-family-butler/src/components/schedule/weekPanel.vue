<script setup lang="ts">
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import { DATE_FORMAT, getWeekDays } from '@/utils/dateTools';
const props = defineProps({
  date: {
    // 当前周的日期， 默认当天
    type: [String, Number]
  },
  selectedDate: {
    type: [String, Number],
    default: dayjs().format('YYYY-MM-DD')
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
});

const emits = defineEmits(['init', 'select', 'change']);

const nowDay = dayjs().format(DATE_FORMAT);
const weeks = ['日', '一', '二', '三', '四', '五', '六'];
// 选中的日期
const daySelect = ref(props.selectedDate);
watch(
  () => props.selectedDate,
  (newVal, oldVal) => {
    if (newVal) {
      daySelect.value = newVal;
    }
  }
);

const weekDays = getWeekDays(props.date);
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
watch(
  () => props.taskData,
  (newVal, oldVal) => {
    // console.log(props.selectedAble, onceFlag.value, 'llllalalalalalalla');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (props.selectedAble && onceFlag.value) {
      console.log(newVal, 'props.taskDaxxxxxxxxxxxxxxxxxxta 数据改变了');
      emits('select', currentDay);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      onceFlag.value = false;
    }
  }
);
emits('init', weekDays);
const onceFlag = ref(true);
// 改变所选择的日期
const changeDay = (item: any) => {
  daySelect.value = item.dateStr;
  emits('select', item);
};
const _selectedD = dayjs(props.date); // 当前选择的时间

const swipeCurrent = ref(1);
const swipeDuration = ref(300);
const swipeDisableTouch = ref(false);

const swipeList = ref([
  getWeekDays(_selectedD.subtract(1, 'week')),
  getWeekDays(_selectedD.subtract(0, 'week')),
  // weekDays,
  getWeekDays(_selectedD.subtract(-1, 'week'))
]);

const swipeAnimationfinish = (event: any) => {
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
        getWeekDays(currentDayOne.subtract(1, 'week')),
        getWeekDays(currentDayOne.subtract(0, 'week')),
        getWeekDays(currentDayOne.subtract(-1, 'week'))
      ];
      swipeCurrent.value = 1;
      emits('change', currentWeekDays);
    }, 0);
  }
};

onMounted(() => {
  // if (props.selectedAble) {
  //   emits('select', currentDay);
  // }
});
</script>

<template>
  <view class="panel">
    <view class="panel-top">
      <view class="sp-head">
        <view v-for="(item, index) in weeks" :key="index" class="sp-head-h"
          >{{ item }}
        </view>
      </view>
      <swiper
        class="sp-swiper"
        :indicator-dots="false"
        :autoplay="false"
        :circular="false"
        :current="swipeCurrent"
        :duration="swipeDuration"
        :disable-touch="swipeDisableTouch"
        @animationfinish="swipeAnimationfinish"
      >
        <swiper-item
          v-for="(_weekDays, index) in swipeList"
          :key="index"
          class="sp-item"
        >
          <view
            v-for="(item, _index) in _weekDays"
            :key="_index"
            class="sp-item-box"
            @click="changeDay(item)"
          >
            <view
              class="sp-item-h"
              :class="[
                nowDay === item.dateStr ? 'current' : '',
                daySelect === item.dateStr && selectedAble ? 'selected' : ''
              ]"
            >
              {{ item.day }}
            </view>
            <view
              v-show="
                taskData[item.dateStr] &&
                taskData[item.dateStr].length &&
                isShowDot
              "
              class="dot"
            ></view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<style scoped lang="scss">
.panel-top {
  background: #fff;
}
.sp-head {
  margin-top: 24rpx;
  display: flex;
  justify-content: space-between;

  &-h {
    margin-right: 20rpx;
    flex: 1;
    // width: 69.23rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #999999;
  }
}
.sp-swiper {
  height: 100rpx;
}
.sp-item {
  margin-top: 12rpx;
  display: flex;
  justify-content: space-between;
  .sp-item-box {
    margin-right: 20rpx;
    flex: 1;
    text-align: center;
  }
  .sp-item-h {
    margin: 0 auto;
    // width: 69.23rpx;
    max-width: 69.23rpx;
    height: 69.23rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #272727;
    &.current {
      background: #f0f1ff;
      border-radius: 20rpx;
      color: #7079ff;
    }
    &.selected {
      background: #7079ff;
      border-radius: 20rpx;
      color: #ffffff;
    }
  }
  .dot {
    margin: 4rpx auto 0;
    width: 8rpx;
    height: 8rpx;
    background: #7079ff;
    border-radius: 50%;
  }
}
</style>
