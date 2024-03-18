<script setup lang="ts">
import { defineExpose, ref } from 'vue';
import dayjs from 'dayjs';
import weekPanel from './weekPanel.vue';
import { forward } from '@/utils/router';
import {
  DATE_FORMAT,
  MONTH_FORMAT,
  getCutdown,
  getTimeInterval
} from '@/utils/dateTools';
const props = defineProps({
  taskData: {
    // 任务数据 对象类型
    type: Object,
    default: () => ({})
  },
  festivalData: {
    // 节假日数据 对象类型
    type: Array<any>,
    default: () => []
  },
  taskArray: {
    // 任务列表 数组类型
    type: Array<any>,
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
});
const emits = defineEmits([
  'dayInit',
  'daySelect',
  'change',
  'changeType',
  'getTaskByList'
]);

watch(
  () => props.taskData,
  (newVal, oldVal) => {
    console.log(newVal, 'props.taskData 数据改变了');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getTaskDataByType(type.value, newVal);
  }
);
const extraData = ref({ ...props.extra });

// schdule moudule
const now = dayjs();
const nowDate = now.format(MONTH_FORMAT);
const userInfo = uni.getStorageSync('userInfo') || {};
const _isVip = !!userInfo.vipStatus;
const isVip = ref(_isVip);
const typeCurrent = ref<any>(
  isVip.value ? { title: '日', type: 'day' } : { title: '列表', type: 'list' }
);

const type = ref(isVip.value ? 'day' : 'list'); // day, week, month, list
// const typeSelector = ['日', '周', '月', '列表'];
const typeSelector = [
  { title: '日', type: 'day' },
  { title: '周', type: 'week' },
  { title: '月', type: 'month' },
  { title: '列表', type: 'list' }
];
// const weekType = ref('week'); // week, day
// const monthType = ref('month'); // month, day
const weeks = ['日', '一', '二', '三', '四', '五', '六'];

// 列表选中，默认是待执行
const listTypeArr = ['待执行', '已执行'];
const listType = ref(0);
const getTaskByList = (index, isReload = false) => {
  listType.value = index;
  emits('getTaskByList', index, isReload);
};
if (type.value === 'list') {
  getTaskByList(0);
}

// 日+++++++++++++++
const selectedDate: any = ref(dayjs().format('YYYY-MM-DD'));
const dateDes = ref('今天');
const dayInit = (data) => {
  // 日初始化数据
  emits('dayInit', data);
};

// 周++++++++++++
const weekIndexMap = ref({});
// 一周按时划分的数据 数据类型 {hours: [[],[],....]}
const weekTaskListByHour = reactive<any>({});
const getWeekTaskListByHour = (taskObj: any = {}, len = 7) => {
  for (const key in weekTaskListByHour) {
    delete weekTaskListByHour[key];
  }
  for (const i in taskObj) {
    const dayTask: any = taskObj[i];
    if (dayTask) {
      for (let dti = 0; dti < dayTask.length; dti++) {
        const dyItem = dayTask[dti];
        const hours = `hour${dyItem.reminderTime.split(' ')[1].split(':')[0]}`;
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
  console.log(weekTaskListByHour, '==============weekTaskListByHour');
};
// 滑动的时候，获取新的一周的数据
const getNewWeek = (week: any, type?: string) => {
  if (type === 'week') {
    for (let i = 0; i < week.length; i++) {
      const item = week[i];
      weekIndexMap.value[item.dateStr] = i;
    }
    // getWeekTaskListByHour(props.taskData);
  }
  emits('change', week);
};
const weekInit = (week: any) => {
  // 周初始化数据
  getNewWeek(week, 'week');
  // getWeekTaskListByHour(props.taskData);
};
// 周、月点击某个日期，切换日状态
const daySelect = (item) => {
  selectedDate.value = item.dateStr;
  type.value = 'day';
  emits('changeType', typeCurrent.value, type.value);
  // if (typeCurrent.value === 2) {
  //   monthType.value = 'day';
  // }
  // weekType.value = 'day';
};

// 月++++++++++++
const mList = ref<any>([]);
const monthListInit = (
  year = dayjs().format('YYYY'),
  month = dayjs().format('M')
) => {
  // 需要遍历的日历数组数据
  const dateList: any = [];
  // 日历渲染开始日期
  let startDate = dayjs(`${year}-${month}`).day(0);
  // 日历主体渲染结束日期
  const endDate = dayjs(`${year}-${month}`).endOf('month').day(6);
  //   循环构造数据
  while (startDate < endDate) {
    const dateStr = startDate.format('YYYY-MM-DD');
    dateList.push({
      date: startDate,
      month: startDate.month() + 1,
      year: startDate.year(),
      dateStr,
      day: startDate.format('D'),
      iscurrenMonth: startDate.format('M') === month
    });
    startDate = startDate.add(1, 'day');
  }
  // emits('change', dateList);
  return dateList;
};

// 切换日程显示
const changeType = (item: any) => {
  if (!isVip.value) {
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    openPopup(item);
    return;
  }
  typeCurrent.value = item;
  type.value = item.type;
  if (item.type === 'month') {
    // 月数据
    // mList.value = monthListInit();
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    getSwipeMonthList();
  } else if (item.type === 'list') {
    getTaskByList(listType.value, true);
  }
  emits('changeType', item, type.value);
  dateDes.value = '今天';
};

const getTaskDataByType = (type: any, taskObj: any) => {
  switch (type) {
    case 'day':
      // if (extraData.value.id !== props.extra.id) {
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      getDayData(selectedDateItem.value);
      extraData.value = { ...props.extra };
      // }
      break;
    case 'week':
      getWeekTaskListByHour(taskObj);
      break;
    case 'month':
      break;
  }
};

const iconMap = {
  0: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/w-wechat.png', // 微信
  1: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/w-sm.png', // 短信
  2: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/w-ring.png', // 音频外呼
  3: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/w-video.png' // 视频外呼
};
const statusMap = {
  0: '待处理',
  1: '已接听',
  2: '未接听',
  3: '执行中',
  4: '提醒失败',
  5: '提醒失败'
};
const dayTaskList = ref([]);
const dayTaskListByHour = ref<any>({});
const fomartDayTask = () => {
  for (const key in dayTaskListByHour.value) {
    delete dayTaskListByHour.value[key];
  }
  dayTaskList.value.forEach((item: any) => {
    // HACK:键值赋值问题
    const hours = `time${item.reminderTime.split(' ')[1].split(':')[0]}`;
    if (dayTaskListByHour.value[hours]) {
      dayTaskListByHour.value[hours].push(item);
    } else {
      dayTaskListByHour.value[hours] = [item];
    }
  });
  console.log(
    dayTaskList.value,
    dayTaskListByHour.value,
    '============fomartDayTask===dayTaskList'
  );
};

const selectedDateItem = ref<any>({});
const getDayData = (item: any) => {
  // 获取当天的数据
  console.log(
    item.dateStr,
    props.taskData,
    Object.keys(props.taskData),
    '获取当天的数据-----------------'
  );
  // 当前的时间区间
  const dateSection = Object.keys(props.taskData);
  if (dateSection.includes(item.dateStr)) {
    selectedDateItem.value = item;
    selectedDate.value = item.dateStr;
    dateDes.value = getTimeInterval(dayjs().format(DATE_FORMAT), item.dateStr);
    dayTaskList.value = props.taskData[selectedDate.value] || [];
  } else {
    selectedDateItem.value = { dateStr: dateSection[0] };
    selectedDate.value = dateSection[0];
    dateDes.value = getTimeInterval(
      dayjs().format(DATE_FORMAT),
      selectedDate.value
    );
    dayTaskList.value = props.taskData[selectedDate.value] || [];
  }
  fomartDayTask();
  emits('daySelect', item);
};

const goDetail = (item: any) => {
  forward('remindDetail', {
    taskId: item.taskId,
    reminderTime: item.reminderTime,
    id: item.id
  });
  // uni.navigateTo({
  //   url: `/pages/remind/detail?taskId=${item.taskId}&reminderTime=${item.reminderTime}`
  // });
};

const popupRef = ref<any>(null);
const popupMap = reactive({
  day: {
    title: '日历·日视图需要开通会员才能使用',
    desc: '方便定焦到具体某日的行程安排，直观的查看当日 各时间段的忙闲'
  },
  week: {
    title: '日历·周视图需要开通会员才能使用',
    desc: '方便定焦到具体某日的行程安排，直观的查看当日 各时间段的忙闲'
  },
  month: {
    title: '日历·月视图需要开通会员才能使用',
    desc: '方便定焦到具体某日的行程安排，直观的查看当日 各时间段的忙闲'
  }
});
const tipType = ref('');
const openPopup = (item) => {
  tipType.value = item.type;
  if (item.type !== 'list') {
    popupRef.value.open();
  }
};
const goBenefit = () => {
  forward('memberBenefits');
  popupRef.value.close();
};

const getCutDowning = (item: any) => {
  const cutDown = getCutdown(item.reminderTime);
  item.cutDown = cutDown;
  setTimeout(() => {
    const cutDown = getCutdown(item.reminderTime);
    item.cutDown = cutDown;
  }, 1000);
};

const scrollTop = ref(0);
const old = ref<any>({ scrollTop: 0 });
const upper = () => {};
const lower = () => {
  // 获取下一页数据
  if (listType.value === 0) return;
  emits('getTaskByList', listType.value);
};

const scroll = () => {};

const swipeCurrent = ref(1);
const swipeDuration = ref(300);
const swipeDisableTouch = ref(false);

const swipeList = ref([
  monthListInit(
    dayjs().subtract(1, 'month').format('YYYY'),
    dayjs().subtract(1, 'month').format('M')
  ),
  monthListInit(),
  monthListInit(
    dayjs().subtract(-1, 'month').format('YYYY'),
    dayjs().subtract(-1, 'month').format('M')
  )
]);

const getSwipeMonthList = () => {
  swipeList.value = [
    monthListInit(
      dayjs().subtract(1, 'month').format('YYYY'),
      dayjs().subtract(1, 'month').format('M')
    ),
    monthListInit(),
    monthListInit(
      dayjs().subtract(-1, 'month').format('YYYY'),
      dayjs().subtract(-1, 'month').format('M')
    )
  ];
  emits('change', swipeList.value[swipeCurrent.value]);
};

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
      const currentDayOne = currentWeekDays[17].date;
      swipeList.value = [
        monthListInit(
          currentDayOne.subtract(1, 'month').format('YYYY'),
          currentDayOne.subtract(1, 'month').format('M')
        ),
        monthListInit(
          currentDayOne.subtract(0, 'month').format('YYYY'),
          currentDayOne.subtract(0, 'month').format('M')
        ),
        monthListInit(
          currentDayOne.subtract(-1, 'month').format('YYYY'),
          currentDayOne.subtract(-1, 'month').format('M')
        )
      ];
      swipeCurrent.value = 1;
      emits('change', currentWeekDays);
    }, 0);
  }
};

defineExpose({
  getDayData
});
onShow(() => {
  const userInfo = uni.getStorageSync('userInfo') || {};
  const _isVip = !!userInfo.vipStatus;
  isVip.value = _isVip;
});
</script>

<template>
  <view class="schedule">
    <view class="schedule-header">
      <view class="schedule-date">
        <view class="ym">{{ nowDate }}</view>
        <view class="dd">{{ dateDes }}</view>
      </view>
      <view class="schedule-selector">
        <view
          v-for="(item, index) in typeSelector"
          :key="index"
          class="schedule-selector__item"
          :class="[
            typeCurrent.type === item.type ? 'active' : '',
            type === 'day' && typeCurrent.type !== 'day' ? 'left' : ''
          ]"
          @click="changeType(item)"
        >
          <view class="left-icon"></view>
          {{ item.title }}</view
        >
      </view>
    </view>
    <view class="schedule-preview">
      <view v-if="typeCurrent.type === 'day'" class="day-box">
        <weekPanel
          :task-data="taskData"
          :selected-date="selectedDate"
          @init="dayInit"
          @select="getDayData"
          @change="getNewWeek"
        />
      </view>
      <view v-if="typeCurrent.type === 'week'" class="week">
        <view v-if="type === 'week'">
          <view class="week-top">
            <weekPanel
              :task-data="taskData"
              :selected-able="false"
              :is-show-dot="false"
              @init="weekInit"
              @select="daySelect"
              @change="(week) => getNewWeek(week, 'week')"
            />
          </view>
          <view class="week-panel">
            <view
              v-for="(hourList, wKey) in weekTaskListByHour"
              :key="wKey"
              class="week-panel-item"
            >
              <text class="point">{{ (wKey as any).substr(4) }}时</text>
              <view
                v-for="(hourItemList, index) in hourList"
                :key="index"
                class="wpi-box"
              >
                <view class="wpi-box__item">
                  <view
                    v-for="(hourItem, _index) in hourItemList"
                    :key="`hour${_index}`"
                    @click="goDetail(hourItem)"
                  >
                    <view
                      v-if="extra.id"
                      class="wpi-box__item-des"
                      :class="[hourItem.operateStatus ? 'done' : 'undo']"
                      >{{ hourItem.content }}
                    </view>
                    <image
                      v-else
                      class="wpi-box__item-logo"
                      :src="
                        hourItem.userRelation && hourItem.userRelation.headImage
                      "
                    ></image>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <weekPanel
          v-else
          :task-data="taskData"
          :date="selectedDate"
          :selected-date="selectedDate"
          @init="dayInit"
          @select="getDayData"
          @change="getNewWeek"
        />
      </view>
      <view v-if="typeCurrent.type === 'month'" class="month">
        <view v-if="type === 'month'">
          <view class="sp-head">
            <view v-for="(item, index) in weeks" :key="index" class="sp-head-h"
              >{{ item }}
            </view>
          </view>
          <swiper
            class="month-swiper"
            :indicator-dots="false"
            :autoplay="false"
            :circular="false"
            :current="swipeCurrent"
            :duration="swipeDuration"
            :disable-touch="swipeDisableTouch"
            @animationfinish="swipeAnimationfinish"
          >
            <swiper-item
              v-for="(_monthDays, _index) in swipeList"
              :key="_index"
              class="sp-item"
            >
              <view class="month-panel">
                <view
                  v-for="(item, index) in _monthDays"
                  :key="index"
                  class="month-panel-item"
                  @click="daySelect(item)"
                >
                  <view
                    class="mpi-day"
                    :class="[item.iscurrenMonth ? '' : 'gray']"
                  >
                    <view
                      class="mpi-day-c"
                      :class="[
                        now.format(DATE_FORMAT) === item.dateStr ? 'active' : ''
                      ]"
                    >
                      <view
                        v-if="
                          festivalData[index] && festivalData[index].weekday
                        "
                        class="mpi-day-holiday"
                        :class="[
                          festivalData[index].weekday === '班' ? 'ban' : 'xiu'
                        ]"
                      ></view>
                      <!-- <view style="font-size: 14rpx">{{ item.dateStr }}</view> -->
                      {{ item.day }}
                    </view>
                    <view
                      v-if="festivalData[index] && festivalData[index].festival"
                      class="mpi-day-festival"
                      >{{ festivalData[index].festival }}</view
                    >
                  </view>
                  <view
                    v-if="taskData[item.dateStr] && extra.id"
                    class="mpi-task"
                  >
                    <view
                      v-for="taskItem in taskData[item.dateStr].slice(0, 3)"
                      :key="taskItem.dateStr"
                    >
                      <view
                        class="mpi-task-item"
                        :class="[taskItem.operateStatus ? 'done' : '']"
                        >{{ taskItem.content }}
                      </view>
                    </view>
                  </view>
                  <view
                    v-if="taskData[item.dateStr] && !extra.id"
                    class="mpi-task"
                  >
                    <image
                      v-for="taskItem in taskData[item.dateStr].slice(0, 2)"
                      :key="taskItem.dateStr"
                      class="mpi-task-item-logo"
                      :src="
                        taskItem.userRelation && taskItem.userRelation.headImage
                      "
                    ></image>
                  </view>
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
        <weekPanel
          v-else
          :task-data="taskData"
          :date="selectedDate"
          :selected-date="selectedDate"
          @init="dayInit"
          @select="getDayData"
          @change="getNewWeek"
        />
      </view>
    </view>
  </view>
  <view v-show="type === 'day'" class="list-container">
    <view v-for="(hourList, key) in dayTaskListByHour" :key="key" class="lcd">
      <text class="point">{{ (key as any).substr(4) }}:00</text>
      <view
        v-for="item in hourList"
        :key="item.id"
        class="lcd-box"
        @click="goDetail(item)"
      >
        <view v-if="!extra.id">
          <view class="lcd-box-head">
            <view class="lcd-box-head__info">
              <image class="logo" :src="item.userRelation.headImage"></image>
              <view class="name">{{ item.userRelation.typeName }}</view>
            </view>
            <view class="lcd-box-head__status">
              <view class="status-box" :class="`status${item.operateStatus}`">
                <image class="icon" :src="iconMap[item.way]"></image>
                <text>{{
                  item.operateStatus === 1 && item.way === 1
                    ? '已通知'
                    : statusMap[item.operateStatus]
                }}</text>
              </view>
            </view>
          </view>
          <view class="lcd-box-content">
            <view class="desc">
              {{ item.content }}
            </view>
            <view v-show="item.answer" class="reply">
              <text>接听答复</text>：{{ item.answer }}
            </view>
          </view>
        </view>
        <view v-else>
          <view class="lcd-box-head-line">
            <view class="lcd-box-head-line__status">
              <view class="status-box" :class="`status${item.operateStatus}`">
                <image class="icon" :src="iconMap[item.way]"></image>
                <text>{{
                  item.operateStatus === 1 && item.way === 1
                    ? '已通知'
                    : statusMap[item.operateStatus]
                }}</text>
              </view>
              <text class="desc">
                {{ item.content }}
              </text>
            </view>
          </view>
          <view class="lcd-box-content">
            <view v-show="item.answer" class="reply">
              <text>接听答复</text>：{{ item.answer }}
            </view>
          </view>
        </view>
        <view class="lcd-box-footer">
          <view class="period">{{
            item.reminderType === 0 ? '单次提醒' : item.cycleTypeName
          }}</view>
          提醒时间 {{ item.reminderTime }}</view
        >
      </view>
    </view>
    <view v-if="JSON.stringify(dayTaskListByHour) === '{}'" class="lcd-empty">
      <view class="lcd-empty-logo"></view>
      <text class="lcd-empty-txt">暂无提醒内容</text>
    </view>
  </view>
  <view v-show="type === 'list'">
    <view class="lcd">
      <view class="lcd-header">
        <view
          v-for="(item, index) in listTypeArr"
          :key="index"
          class="lcd-header-btn"
          :class="[listType === index ? 'active' : '']"
          @click="getTaskByList(index)"
          >{{ item }}</view
        >
      </view>
      <scroll-view
        :scroll-top="scrollTop"
        scroll-y="true"
        :show-scrollbar="false"
        class="scroll-Y"
        @scrolltoupper="upper"
        @scrolltolower="lower"
        @scroll="scroll"
      >
        <view
          v-for="item in taskArray"
          :key="item.id"
          class="lcd-box"
          @click="goDetail(item)"
        >
          <view v-if="!extra.id">
            <view class="lcd-box-head">
              <view class="lcd-box-head__info">
                <image class="logo" :src="item.userRelation.headImage"></image>
                <view class="name">{{ item.userRelation.typeName }}</view>
              </view>
              <view class="lcd-box-head__status">
                <view class="status-box" :class="`status${item.operateStatus}`">
                  <image class="icon" :src="iconMap[item.way]"></image>
                  {{
                    item.operateStatus !== 0
                      ? item.operateStatus === 1 && item.way === 1
                        ? '已通知'
                        : statusMap[item.operateStatus]
                      : getCutDowning(item)
                  }}{{ item.cutDown }}
                </view>
              </view>
            </view>
            <view class="lcd-box-content">
              <view class="desc">
                {{ item.content }}
              </view>
              <view v-show="item.answer" class="reply">
                <text>接听答复</text>：{{ item.answer }}
              </view>
            </view>
          </view>
          <view v-else>
            <view class="lcd-box-head-line">
              <view class="lcd-box-head-line__status">
                <view class="status-box" :class="`status${item.operateStatus}`">
                  <image class="icon" :src="iconMap[item.way]"></image>
                  {{
                    item.operateStatus !== 0
                      ? item.operateStatus === 1 && item.way === 1
                        ? '已通知'
                        : statusMap[item.operateStatus]
                      : getCutDowning(item)
                  }}{{ item.cutDown }}
                </view>
                <text class="desc">
                  {{ item.content }}
                </text>
              </view>
            </view>
            <view class="lcd-box-content">
              <view v-show="item.answer" class="reply">
                <text>接听答复</text>：{{ item.answer }}
              </view>
            </view>
          </view>
          <view class="lcd-box-footer">
            <view class="period">{{
              item.reminderType === 0 ? '单次提醒' : item.cycleTypeName
            }}</view
            >提醒时间 {{ item.reminderTime }}</view
          >
        </view>
      </scroll-view>
      <view v-if="taskArray && taskArray.length === 0" class="lcd-empty">
        <view class="lcd-empty-logo"></view>
        <text class="lcd-empty-txt">暂无提醒内容</text>
      </view>
    </view>
  </view>
  <uni-popup
    ref="popupRef"
    class="popup-container"
    type="bottom"
    :safe-area="false"
    mask-background-color="rgba(0,0,0,0)"
  >
    <view v-if="popupMap[tipType]" class="preview-box">
      <view class="privew-box-logo" :class="[tipType]"></view>
      <view class="preview-box-title">{{ popupMap[tipType].title }}</view>
      <view class="preview-box-desc">{{ popupMap[tipType].desc }}</view>
      <view class="preview-box-btn" @click="goBenefit">去开通会员</view>
    </view>
  </uni-popup>
</template>

<style scoped lang="scss">
.schedule {
  padding: 38.46rpx;
  border-radius: 0rpx 0rpx 57.69rpx 57.69rpx;
  background: #fff;
}
.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 38.46rpx;
  .schedule-date {
    display: flex;
    justify-content: space-between;
    flex: 1;
    // margin-right: 30rpx;
    margin-right: 10rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    font-size: 28rpx;
    color: #272727;
    // .ym {
    //   margin-right: 10rpx;
    // }
    .dd {
      flex: 1;
      text-align: center;
      // align-self: flex-end;
    }
  }
  .schedule-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2rpx solid #7079ff;
      border-right: 0;
      width: 96.15rpx;
      height: 53.85rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 28rpx;
      color: #7079ff;
      &.active {
        background: #7079ff;
        color: #fff;
        &.left {
          background: #fff;
          color: #7079ff;
          .left-icon {
            display: block;
          }
        }
      }
      .left-icon {
        display: none;
        margin-right: 3.85rpx;
        width: 30.77rpx;
        height: 30.77rpx;
        background: url($uni-static-dir-reminder + 'left.png') no-repeat;
        background-size: 100%;
      }
      &:first-child {
        border-radius: 200rpx 0rpx 0rpx 200rpx;
        width: 100rpx;
      }
      &:last-child {
        border-right: 2rpx solid #7079ff;
        border-radius: 0rpx 200rpx 200rpx 0rpx;
      }
    }
  }
}
.sp-head {
  display: flex;
  justify-content: space-between;
  margin-top: 24rpx;
  &-h {
    flex: 1;
    // width: 69.23rpx;
    height: 34rpx;
    text-align: center;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    font-size: 24rpx;
    color: #999;
  }
}
.sp-item {
  display: flex;
  overflow-y: auto;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 12rpx;
  .sp-item-h {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 69.23rpx;
    height: 69.23rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    font-size: 40rpx;
    color: #272727;
    &.current {
      border-radius: 20rpx;
      background: #f0f1ff;
      color: #7079ff;
    }
    &.selected {
      border-radius: 20rpx;
      background: #7079ff;
      color: #fff;
    }
  }
  .dot {
    margin: 4rpx auto 0;
    border-radius: 50%;
    width: 8rpx;
    height: 8rpx;
    background: #7079ff;
  }
}
.week-top {
  padding-left: 62rpx;
}
.week-panel {
  margin-top: 19.23rpx;
  .week-panel-item {
    display: flex;
    margin-top: 19.23rpx;
    .point {
      align-self: top;
      width: 62rpx;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 23.08rpx;
      color: #999;
    }
    .wpi-box {
      display: flex;
      flex: 1;
      .wpi-box__item {
        flex: 1;
        text-align: center;
        font-size: 21.15rpx;
        .wpi-box__item-des {
          overflow: hidden;
          margin: 0 auto 7.69rpx;
          border-radius: 3.85rpx;
          width: 80.77rpx;
          background: rgba(112, 121, 255, 1);
          text-overflow: ellipsis;
          text-align: left;
          text-indent: 4rpx;
          color: #fff;
          white-space: nowrap;
          &.done {
            background: rgba(112, 121, 255, 0.1);
            color: rgba(39, 39, 39, 0.3);
          }
        }
        .wpi-box__item-logo {
          border: 1.92rpx solid #fff;
          border-radius: 15.38rpx;
          width: 57.69rpx;
          height: 57.69rpx;
          background: #d6d6d8;
        }
      }
    }
  }
}
.month {
  margin: 0 -28rpx;
}
.month-swiper {
  height: 68vh;
}
.month-panel {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .month-panel-item {
    margin-top: 10rpx;
    width: calc(100% / 7);
    text-align: center;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    font-size: 38.46rpx;
    .mpi-day {
      height: 85rpx;
    }
    .mpi-day-c {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border-radius: 19.23rpx;
      width: 69.23rpx;
      height: 69.23rpx;
      &.active {
        background: #7079ff;
        color: #fff;
      }
    }
    .mpi-day {
      position: relative;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      .mpi-day-holiday {
        position: absolute;
        right: 0;
        top: -10rpx;
        width: 23.08rpx;
        height: 23.08rpx;
        &.xiu {
          background: url($uni-static-dir-reminder + 'xiu.png') no-repeat;
          background-size: 100% 100%;
        }
        &.ban {
          background: url($uni-static-dir-reminder + 'ban.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .mpi-day-festival {
        text-align: center;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 15.38rpx;
        color: #41b659;
      }
      &.gray {
        color: #999;
      }
    }
    .mpi-task {
      overflow: hidden;
      margin-top: 7.69rpx;
      min-height: 105rpx;
      .mpi-task-item {
        overflow: hidden;
        margin: 0 auto 7.69rpx;
        border-radius: 3.85rpx;
        width: calc(100% - 15.38rpx);
        height: 30.77rpx;
        background: #7079ff;
        text-overflow: ellipsis;
        text-align: left;
        text-indent: 4rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-size: 21.15rpx;
        color: #fff;
        white-space: nowrap;
        &.done {
          background: rgba(112, 121, 255, 0.1);
          color: rgba(39, 39, 39, 0.3);
        }
      }
      .mpi-task-item-logo {
        display: block;
        margin: 0 auto 4rpx;
        border: 1.92rpx solid #fff;
        border-radius: 15.38rpx;
        width: 57.69rpx;
        height: 57.69rpx;
        background: #d6d6d8;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    // flex: 1;
  }
}
.scroll-Y {
  height: 55vh;
  // height: calc(100% - 255px);
}
.list-container {
  padding-bottom: 38rpx;
}
.lcd {
  padding: 20rpx 40rpx 0;
  .lcd-header {
    display: flex;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    .lcd-header-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 19.23rpx;
      border-radius: 34.62rpx;
      width: 142.31rpx;
      height: 69.23rpx;
      background: #fff;
      font-size: 26.92rpx;
      &.active {
        background: #7079ff;
        color: #fff;
      }
    }
  }
  .point {
    width: 66rpx;
    height: 34rpx;
    line-height: 34rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    font-size: 24rpx;
    color: #999;
  }
  .lcd-box {
    overflow: hidden;
    margin-top: 19.23rpx;
    margin-bottom: 38.46rpx;
    border-radius: 36rpx;
    background: #fff;
    &:last-child {
      margin-bottom: 0;
    }
    .lcd-box-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 38.46rpx;
    }
    .lcd-box-head-line {
      padding: 38.46rpx 38.46rpx 0;
      // display: flex;
      // align-items: center;
      // flex-wrap: wrap;
    }
    .lcd-box-head__info {
      display: flex;
      align-items: center;
      margin-right: 30.77rpx;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      color: #272727;
      .logo {
        margin-right: 20rpx;
        border: 3.33rpx solid #fff;
        border-radius: 28rpx;
        width: 96.15rpx;
        height: 96.15rpx;
        background: #d6d6d8;
      }
    }
    .lcd-box-head__status,
    .lcd-box-head-line__status {
      // flex: 1;
      display: flex;
      align-items: center;
      view {
        border-radius: 11.54rpx;
        height: 50rpx;
      }
      .status-box {
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-right: 19.23rpx;
        padding: 0 15.38rpx;
        background: #7079ff;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 26.92rpx;
        color: #fff;
        &.status0 {
          background: #fd9633;
        }
        &.status1 {
          background: #7079ff;
        }
        &.status2,
        &.status4,
        &.status5 {
          background: #f57070;
        }
        .icon {
          margin-right: 7.69rpx;
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
    .lcd-box-head-line__status {
      display: inline-block;
      .status-box {
        display: inline-flex;
        margin-right: 19.23rpx;
      }
      .desc {
        line-height: 48.08rpx;
        font-weight: 600;
      }
    }
    .lcd-box-content {
      margin: 0 auto;
      width: 588.46rpx;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      font-size: 34.62rpx;
      color: #272727;
      .reply {
        margin-top: 38.46rpx;
        padding: 19.23rpx 0 19.23rpx 19.23rpx;
        border-radius: 15.38rpx;
        background: #f5f5f5;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        font-size: 26.92rpx;
        text {
          color: #7079ff;
        }
      }
    }
    .lcd-box-footer {
      display: flex;
      align-items: center;
      margin: 38.46rpx auto;
      width: 588.46rpx;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 26.92rpx;
      color: #999;
      .period {
        margin-right: 19.23rpx;
        border-radius: 11.54rpx;
        width: 140rpx;
        height: 52rpx;
        background: #f0f1ff;
        line-height: 52rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 28rpx;
        color: #7079ff;
      }
    }
  }
}
.lcd-empty {
  position: fixed;
  left: 50%;
  top: 50vh;
  transform: translateX(-50%);
  .lcd-empty-logo {
    margin-bottom: 19rpx;
    width: 192.31rpx;
    height: 192.31rpx;
    background: url(../../static/reminder/empty.png) no-repeat;
    background-size: 100% 100%;
  }
  .lcd-empty-txt {
    font-size: 30.77rpx;
    color: #999;
  }
}
.preview-box {
  overflow: auto;
  border-radius: 57.69rpx 57.69rpx 0rpx 0rpx;
  width: 750rpx;
  // height: 77vh;
  height: calc(100vh - 500rpx);
  // height: 1105.77rpx;
  background: #272727;
  color: #fff;
  .privew-box-logo {
    margin: 76.92rpx auto 38.46rpx;
    width: 290px;
    height: 317px;
    &.day {
      background: url($uni-static-dir-reminder + 'day-preview.png') no-repeat;
      background-size: 100%;
    }
    &.week {
      background: url($uni-static-dir-reminder + 'week-preview.png') no-repeat;
      background-size: 100%;
    }
    &.month {
      background: url($uni-static-dir-reminder + 'month-preview.png') no-repeat;
      background-size: 100%;
    }
  }
  .preview-box-title {
    margin: 0 auto 19.23rpx;
    width: 592.31rpx;
    font-family: FZLTTHK, FZLTTHK-Regular;
    font-weight: 600;
    font-size: 34.62rpx;
    color: #fff;
  }
  .preview-box-desc {
    margin: 0 auto;
    width: 592.31rpx;
    line-height: 38.46rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    font-size: 26.92rpx;
    color: #999;
  }
  .preview-box-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 76.92rpx auto 57.69rpx;
    border-radius: 48.08rpx;
    width: 596.15rpx;
    height: 96.15rpx;
    background: #fce1c3;
    text-align: center;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    font-size: 38.46rpx;
    color: #5a4632;
  }
}
</style>
