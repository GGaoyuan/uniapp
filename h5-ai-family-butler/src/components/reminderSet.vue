<script setup lang="ts">
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import Character from '@/components/character/index.vue';
import reminderApi from '@/api/reminder';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    // 提醒详情数据
    type: Object,
    default: () => ({})
  }
});
const emits = defineEmits(['confirm', 'cancel']);
watch(
  () => props.visible,
  (newVal, oldVal) => {
    if (newVal) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dialogShow();
    }
  }
);

const date = new Date();
const years: any = [];
const year = ref(date.getFullYear());
const months: any = [];
const month = ref(date.getMonth() + 1);
const days: any = [];
const day = ref(date.getDate());
const hours: any = [];
const hour = ref(date.getHours());
const minutes: any = [];
const minute = ref(date.getMinutes());
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
const timeValue = ref(defaultTime);
const indicatorStyle = `font-weight: 700;`;

const propsData = {
  ...props.data,
  currentReminderTime: undefined
};

const defaultRemindData = reactive<any>(propsData);
const remindData = ref<any>(propsData);

// 获取对象列表
const targetList = ref<any>([]);
const getTargetFn = async () => {
  const res: any = await reminderApi.getRelationList({});
  targetList.value = res.apiFindUserRelationList;
};
// 获取方式余量
const remainObj = ref<any>({});
const getWaysRemain = async () => {
  remainObj.value = await reminderApi.getReminderWay();
};
const waysMap = reactive({
  2: {
    name: '语音提醒',
    icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/ring.png',

    id: '1',
    type: 'ring',
    remainKey: 'remindVoiceRemaining'
  },
  3: {
    name: '视频提醒',
    icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/video.png',
    id: '2',
    type: 'video',
    remainKey: 'remindVideoRemaining'
  },
  1: {
    name: '短信提醒',
    icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/sm.png',
    reside: 10,
    id: '3',
    type: 'sm',
    remainKey: 'remindSmsRemaining'
  },
  0: {
    name: '微信提醒',
    icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/wechat.png',
    id: '4',
    type: 'wechat',
    remainKey: 'remindWechatRemaining'
  }
});
const reminderWays = reactive([
  {
    name: '语音提醒',
    icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/ring.png',

    id: '1',
    type: 2,
    remainKey: 'remindVoiceRemaining'
  },
  {
    name: '视频提醒',
    icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/video.png',
    id: '2',
    type: 3,
    remainKey: 'remindVideoRemaining'
  },
  {
    name: '短信提醒',
    icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/sm.png',
    reside: 10,
    id: '3',
    type: 1,
    remainKey: 'remindSmsRemaining'
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
    const timeArr = remindData.value.reminderTime.split(' ');
    const time1Arr = timeArr[0].split('-');
    const time2Arr = timeArr[1].split(':');
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

const changeTimeFn = (e?) => {
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
  const dateStr = dayjs(
    `${year.value}-${month.value}-${day.value} ${hour.value}:${minute.value}`
  ).format('YYYY-MM-DD HH:mm:ss');
  console.log(dateStr, '=================dateStr');
  timeValue.value = val;
  remindData.value.currentReminderTime = dateStr;
  remindData.value.reminderTime = dateStr;
};

const changeWaysFn = (item: any) => {
  // remindData.value.wayName = item.name;
  // 次数用完
  if (remainObj.value[item.remainKey] === 0) {
    uni.showToast({
      title: '次数已用完',
      icon: 'error'
    });
    return;
  }
  remindData.value.way = item.type;
};
const changeTargeFn = (item: any) => {
  remindData.value.typeName = item.typeName;
  remindData.value.toUserRelationId = item.id;
  remindData.value.headImage = item.headImage;
};

const popupRef = ref<any>(null);
const popupType = ref<String>(''); // target: 对象, way: 方式, cycle: 周期, time: 时间
const openPopup = async (type: string) => {
  switch (type) {
    case 'target':
      // 获取对象列表数据
      getTargetFn();
      break;
    case 'way':
      // 每次显示的时候，获取最新的余量数据
      getWaysRemain();
      break;
    case 'cycle':
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      await getCycleFn();
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      changeCycleFn();
      break;
    case 'time':
      getDefautTime();
      if (!remindData.value.reminderTime) {
        changeTimeFn();
      }
      break;
  }
  popupRef.value.open();
  popupType.value = type;
};
// 提醒周期
const cycleList = ref<any>([]);
const defaultCycleIndex = [0];
const cycleIndex = ref(defaultCycleIndex);
const getCycleFn = async () => {
  cycleList.value = await reminderApi.getListReminderCycle({});
  const _index = cycleList.value.findIndex((ele) => {
    return ele.id === remindData.value.cycleTypeId;
  });
  if (_index > -1) {
    cycleIndex.value = [_index];
  } else {
    cycleIndex.value = [0];
  }
};

const changeCycleFn = (event?: any) => {
  let index = cycleIndex.value[0];
  if (event) {
    index = event.detail.value[0] || 0;
    cycleIndex.value = event.detail.value;
  }

  const item = cycleList.value[index];
  remindData.value.reminderType = item.cycleType === '单次提醒' ? 0 : 1;
  remindData.value.cycleTypeId = item.id;
  remindData.value.cycleTypeName = item.cycleType;
};
const closePopup = (type: string) => {
  switch (type) {
    case 'target':
      remindData.value.typeName = defaultRemindData.value.typeName;
      remindData.value.toUserRelationId =
        defaultRemindData.value.toUserRelationId;
      remindData.value.headImage = defaultRemindData.value.headImage;
      break;
    case 'way':
      remindData.value.way = defaultRemindData.value.way;
      break;
    case 'cycle':
      remindData.value.reminderType = defaultRemindData.value.reminderTypes;
      remindData.value.cycleTypeId = defaultRemindData.value.cycleTypeId;
      remindData.value.cycleTypeName = defaultRemindData.value.cycleTypeName;
      cycleIndex.value = defaultCycleIndex;
      break;
    case 'time':
      remindData.value.currentReminderTime =
        defaultRemindData.value.reminderTime;
      remindData.value.reminderTime = defaultRemindData.value.reminderTime;
      timeValue.value = defaultTime;
      break;
  }
  popupRef.value.close();
};
const confirmFn = (type: string) => {
  switch (type) {
    case 'target':
      defaultRemindData.value.typeName = remindData.value.typeName;
      defaultRemindData.value.toUserRelationId =
        remindData.value.toUserRelationId;
      break;
    case 'way':
      defaultRemindData.value.way = remindData.value.way;
      break;
    case 'cycle':
      defaultRemindData.value.reminderType = remindData.value.reminderType;
      defaultRemindData.value.cycleTypeId = remindData.value.cycleTypeId;
      defaultRemindData.value.cycleTypeName = remindData.value.cycleTypeName;
      break;
    case 'time':
      defaultRemindData.value.currentReminderTime =
        remindData.value.reminderTime;
      defaultRemindData.value.reminderTime = remindData.value.reminderTime;
      break;
  }

  popupRef.value.close();
};

const dialogRef = ref<any>(null);
const dialogShow = () => {
  dialogRef.value.open();
  const propsData = {
    ...props.data,
    toUserRelationId: props.data.userRelation && props.data.userRelation.id,
    typeName: props.data.userRelation && props.data.userRelation.typeName,
    headImage: props.data.userRelation && props.data.userRelation.headImage,
    currentReminderTime: undefined
    // ...props.data.userRelation
  };
  // 对象已删除
  if (props.data.userRelation && props.data.userRelation.state === 2) {
    propsData.toUserRelationId = undefined;
    propsData.typeName = undefined;
    propsData.headImage = undefined;
  }
  defaultRemindData.value = { ...propsData };
  remindData.value = { ...propsData };
};
const dialogClose = () => {
  emits('cancel');
  // 重置默认数据
  remindData.value = { ...props.data };
  defaultRemindData.value = { ...props.data };
  // cycleIndex.value = [0];
  dialogRef.value.close();
};
const confirmAble = computed(() => {
  return (
    remindData.value.toUserRelationId &&
    remindData.value.way &&
    remindData.value.cycleTypeId &&
    remindData.value.reminderTime &&
    remindData.value.content
  );
});
const dialogConfirm = async () => {
  if (!confirmAble.value) {
    return;
  }
  dialogRef.value.close();
  const isUpdate = props.data.operateStatus === 0;
  const confirmApiFn = isUpdate ? reminderApi.updateTask : reminderApi.saveTask;
  // 编辑的时候: 是待执行、且不是单次提醒的时候才回去提示确认
  if (
    props.data &&
    props.data.taskId &&
    props.data.operateStatus === 0 &&
    props.data.reminderType !== 0
  ) {
    // confirmApiFn = reminderApi.updateTask;
    openPopup('range');
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    rangeType.value = 'update';
    return;
  }
  const updateReq = {
    toUserRelationId:
      remindData.value.toUserRelationId || remindData.value.userRelation.id,
    way: remindData.value.way,
    reminderType: remindData.value.reminderType,
    cycleTypeId: remindData.value.cycleTypeId,
    content: remindData.value.content,
    reminderTime: remindData.value.reminderTime,
    taskId: remindData.value.taskId,
    operationRange: remindData.value.operationRange || 0,
    id: remindData.value.id,
    currentReminderTime:
      remindData.value.currentReminderTime || remindData.value.reminderTime
  };

  const addReq = {
    toUserRelationId:
      remindData.value.toUserRelationId || remindData.value.userRelation.id,
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

  confirmApiFn(req)
    .then((res) => {
      emits('confirm', res);
    })
    .catch((e) => {
      dialogClose();
    });
};
const addOrUpdateRemindFn = async () => {
  let confirmApiFn = reminderApi.saveTask;
  if (props.data && props.data.taskId && props.data.operateStatus === 0) {
    confirmApiFn = reminderApi.updateTask;
  }
  const req = {
    toUserRelationId:
      remindData.value.toUserRelationId || remindData.value.userRelation.id,
    way: remindData.value.way,
    reminderType: remindData.value.reminderType,
    cycleTypeId: remindData.value.cycleTypeId,
    content: remindData.value.content,
    reminderTime: remindData.value.reminderTime,
    taskId: remindData.value.taskId,
    operationRange: remindData.value.operationRange,
    id: remindData.value.id,
    currentReminderTime:
      remindData.value.currentReminderTime || remindData.value.reminderTime
  };
  confirmApiFn(req)
    .then((res) => {
      emits('confirm', res);
    })
    .catch((e) => {
      dialogClose();
    });
};
const rangeType = ref('update'); // update
const rangeDesc = {
  del: {
    title: '此为重复提醒，请确认删除？',
    once: '仅删除本次提醒',
    all: '删除所有将来提醒'
  },
  update: {
    title: '此为重复提醒，请确认修改？',
    once: '仅针对本次提醒修改',
    all: '针对所有将来提醒修改'
  }
};
const rangeSelectType = ref('');
const rangeConfirm = async (type: string) => {
  rangeSelectType.value = type;
  if (type === 'once') {
    remindData.value.operationRange = 0;
  } else {
    remindData.value.operationRange = 1;
  }
  await addOrUpdateRemindFn();
  closePopup('range');
  rangeSelectType.value = '';
};

const cVisible = ref(false);
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
onMounted(() => {
  if (props.visible) {
    dialogShow();
  }
});
</script>

<template>
  <view class="reminder-container">
    <uni-popup
      ref="dialogRef"
      type="center"
      :mask-click="false"
      :is-mask-click="false"
    >
      <view class="reminder">
        <view class="reminder-form">
          <view class="reminder-form-item">
            <view class="label">提醒对象</view>
            <view class="item" @click="openPopup('target')">
              <view v-if="remindData.typeName" class="item-c">
                <image
                  v-show="remindData.headImage"
                  class="item-c-icon"
                  :src="remindData.headImage"
                ></image>
                <view class="item-c-black">{{ remindData.typeName }}</view>
              </view>
              <view v-else>请选择</view>
              <image class="item-right" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/right.png" />
            </view>
          </view>
          <view class="reminder-form-item">
            <view class="label">提醒方式</view>
            <view class="item" @click="openPopup('way')">
              <!-- <view>{{
                (waysMap[remindData.way] && waysMap[remindData.way].name) ||
                '请选择'
              }}</view> -->

              <view v-if="waysMap[remindData.way]" class="item-c-black">{{
                waysMap[remindData.way] && waysMap[remindData.way].name
              }}</view>
              <view v-else>请选择</view>
              <image class="item-right" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/right.png" />
            </view>
          </view>
          <view class="reminder-form-item">
            <view class="label">提醒周期</view>
            <view class="item" @click="openPopup('cycle')">
              <!-- <view>{{ remindData.cycleTypeName || '请选择' }}</view> -->
              <view v-if="remindData.cycleTypeName" class="item-c-black">{{
                remindData.cycleTypeName
              }}</view>
              <view v-else>请选择</view>
              <image class="item-right" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/right.png" />
            </view>
          </view>
          <view class="reminder-form-item" @click="openPopup('time')">
            <view class="label">提醒时间</view>
            <view class="item">
              <!-- <view>{{
                remindData.reminderTime
                  ? dayjs(remindData.reminderTime).format('YYYY/MM/DD HH:mm')
                  : '请选择'
              }}</view> -->
              <view v-if="remindData.reminderTime" class="item-c-black">{{
                dayjs(remindData.reminderTime).format('YYYY/MM/DD HH:mm')
              }}</view>
              <view v-else>请选择</view>
              <image class="item-right" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/right.png" />
            </view>
          </view>
          <view class="reminder-form-item col">
            <view class="label">提醒内容</view>
            <view class="item">
              <textarea
                v-model="remindData.content"
                placeholder-class="item-input-placeholder"
                class="item-input"
                :cursor-spacing="40"
                placeholder="请输入提醒内容…"
              />
            </view>
          </view>
        </view>
        <view class="reminder-footer">
          <view class="reminder-footer-btn" @click="dialogClose">取消</view>
          <view
            class="reminder-footer-btn confirm"
            :class="[confirmAble ? 'able' : 'disable']"
            @click="dialogConfirm"
            >设置提醒</view
          >
        </view>
      </view>
    </uni-popup>

    <uni-popup
      ref="popupRef"
      class="popup-container"
      type="bottom"
      :mask-click="false"
      :is-mask-click="false"
      :safe-area="false"
    >
      <div v-show="popupType === 'target'" class="popup-box">
        <view class="popup-box-title">
          选择提醒对象
          <view class="popup-box-add" @click="showRoleAdd">
            <view class="popup-box-add__icon"></view>
            <text>添加</text>
          </view>
        </view>
        <view class="popup-box-content">
          <view class="target-box">
            <view
              v-for="item in targetList"
              :key="item.id"
              class="target-item"
              :class="[remindData.toUserRelationId === item.id ? 'active' : '']"
              @click="changeTargeFn(item)"
            >
              <image class="target-item-logo" :src="item.headImage"></image>
              <view class="target-item-name">{{ item.typeName }}</view>
            </view>
            <view v-if="!targetList.length" class="empty-box">
              <view class="empty-box-logo"></view>
              <view class="empty-box-txt">暂无提醒对象</view>
            </view>
          </view>
        </view>
        <view class="popup-box-footer">
          <view
            class="popup-box-footer__item cancel"
            @click="closePopup('target')"
            >取消</view
          >
          <view
            class="popup-box-footer__item confirm"
            @click="confirmFn('target')"
            >确定</view
          >
        </view>
      </div>
      <div v-show="popupType === 'way'" class="popup-box">
        <view class="popup-box-title">选择提醒方式</view>
        <view class="popup-box-content">
          <view class="way-box">
            <view
              v-for="(item, index) in reminderWays"
              :key="index"
              class="way-item"
              :class="[remindData.way === item.type ? 'active' : '']"
              @click="changeWaysFn(item)"
            >
              <view class="way-item-check"></view>
              <image
                class="way-item-logo"
                :src="item.icon"
                mode="widthFix"
              ></image>
              <view class="way-item-des">
                <view class="wid-name">{{ item.name }}</view>
                <view class="wid-tip"
                  >本月还剩{{ remainObj[item.remainKey] || 0 }}条</view
                >
              </view>
            </view>
          </view>
        </view>
        <view class="popup-box-footer">
          <view class="popup-box-footer__item cancel" @click="closePopup('way')"
            >取消</view
          >
          <view class="popup-box-footer__item confirm" @click="confirmFn('way')"
            >确定</view
          >
        </view>
      </div>
      <div v-if="popupType === 'cycle'" class="popup-box">
        <view class="popup-box-title">选择提醒周期</view>
        <picker-view
          indicator-class="picker-cover"
          class="picker-view"
          :indicator-style="indicatorStyle"
          :value="cycleIndex"
          @change="changeCycleFn"
        >
          <view class="picker-view-cover" style=""></view>
          <picker-view-column>
            <view
              v-for="(item, index) in cycleList"
              :key="index"
              class="picker-view-item"
              :class="{ active: cycleIndex[0] === index }"
              >{{ item.cycleType }}</view
            >
          </picker-view-column>
        </picker-view>
        <view class="popup-box-footer">
          <view
            class="popup-box-footer__item cancel"
            @click="closePopup('cycle')"
            >取消</view
          >
          <view
            class="popup-box-footer__item confirm"
            @click="confirmFn('cycle')"
            >确定</view
          >
        </view>
      </div>
      <div v-show="popupType === 'time'" class="popup-box">
        <view class="popup-box-title">选择提醒时间</view>
        <picker-view
          indicator-class="picker-cover"
          class="picker-view"
          :indicator-style="indicatorStyle"
          :value="timeValue"
          @change="changeTimeFn"
        >
          <view class="picker-view-cover" style=""></view>
          <picker-view-column>
            <view
              v-for="(item, index) in years"
              :key="index"
              class="picker-view-item year"
              :class="{ active: timeValue[0] === index }"
              >{{ item }}年</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item, index) in months"
              :key="index"
              class="picker-view-item"
              :class="{ active: timeValue[1] === index }"
              >{{ item }}月</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item, index) in days"
              :key="index"
              class="picker-view-item"
              :class="{ active: timeValue[2] === index }"
              >{{ item }}日</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item, index) in hours"
              :key="index"
              class="picker-view-item"
              :class="{ active: timeValue[3] === index }"
              >{{ item }}时</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item, index) in minutes"
              :key="index"
              class="picker-view-item"
              :class="{ active: timeValue[4] === index }"
              >{{ item }}分</view
            >
          </picker-view-column>
        </picker-view>
        <view class="popup-box-footer">
          <view
            class="popup-box-footer__item cancel"
            @click="closePopup('time')"
            >取消</view
          >
          <view
            class="popup-box-footer__item confirm"
            @click="confirmFn('time')"
            >确定</view
          >
        </view>
      </div>
      <div v-show="popupType === 'range'" class="popup-box">
        <view v-if="rangeDesc[rangeType]" class="range-box">
          <view class="range-box-title">{{ rangeDesc[rangeType].title }}</view>
          <view
            class="range-box-btn"
            :class="[rangeSelectType === 'once' ? 'active' : '']"
            @click="rangeConfirm('once')"
            >{{ rangeDesc[rangeType].once }}</view
          >
          <view
            class="range-box-btn"
            :class="[rangeSelectType === 'all' ? 'active' : '']"
            @click="rangeConfirm('all')"
            >{{ rangeDesc[rangeType].all }}</view
          >
        </view>
      </div>
    </uni-popup>

    <Character
      :visible="cVisible"
      @confirm="addRoleConfirm"
      @close="addRoleClose"
    ></Character>
  </view>
</template>

<style scoped lang="scss">
.reminder-container {
  ::v-deep .picker-cover {
    height: 103.85rpx;
    &::after {
      border: 0;
      height: 0;
    }
    &::before {
      border: 0;
      height: 0;
    }
  }
}
.reminder {
  z-index: 2;
  border-radius: 38.46rpx;
  width: 596.15rpx;
  background: #fff;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  font-size: 30.77rpx;
  color: #999;
  .reminder-form {
    padding: 46.15rpx 38.46rpx 0;
  }
  .reminder-form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 57.69rpx;
    &:first-child {
      margin-top: 0;
    }
    &.col {
      flex-wrap: wrap;
      .label,
      .item {
        width: 100%;
      }
      .item {
        margin-top: 19.23rpx;
      }
    }
    .item {
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #7079ff;
      .item-c {
        display: flex;
        position: absolute;
        right: 88rpx;
        top: 26rpx;
        align-items: center;
        .item-c-icon {
          margin-right: 19.23rpx;
          border: 2.56rpx solid #fff;
          border-radius: 21.15rpx;
          width: 76.92rpx;
          height: 76.92rpx;
          background: #d6d6d8;
        }
      }
      .item-c-black {
        color: #272727;
      }
      .item-right {
        margin-left: 19.23rpx;
        width: 30.77rpx;
        height: 30.77rpx;
      }
      .item-input {
        box-sizing: border-box;
        padding: 19.23rpx;
        border-radius: 15.38rpx;
        width: 519.23rpx;
        height: 176.92rpx;
        background: #f5f5f5;
        text-align: left;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 26.92rpx;
        color: #999;
      }
      .item-input-placeholder {
        text-align: left;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 26.92rpx;
        color: #999;
      }
    }
  }
  .reminder-footer {
    display: flex;
    justify-content: space-between;
    padding: 57.69rpx 48.08rpx;
    font-weight: 600;
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 48.08rpx;
      width: 230.77rpx;
      height: 96.15rpx;
      background: #f5f5f5;
      &.confirm {
        background: rgba(112, 121, 255, 0.3);
        color: #fff;
        &.able {
          background: #7079ff;
        }
      }
    }
  }
}
.popup-container {
  border-radius: 50px;
}
::v-deep .uni-popup .uni-popup__wrapper {
  background-color: #fff;
}
.popup-box {
  overflow: hidden;
  padding: 0 38.46rpx;
  border-radius: 57.69rpx 57.69rpx 0rpx 0rpx;
  background: #fff;
  &-title {
    margin: 38.46rpx auto;
    text-align: center;
    text-align: center;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    font-size: 38.46rpx;
    color: #222;
  }
  .popup-box-add {
    display: flex;
    position: absolute;
    right: 38.46rpx;
    top: 44.23rpx;
    align-items: center;
    text-align: center;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    font-size: 30rpx;
    color: #222;
    &__icon {
      margin-right: 3.85rpx;
      width: 34.62rpx;
      height: 34.62rpx;
      background: url($uni-static-dir-reminder + 'add.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .popup-box-footer {
    display: flex;
    justify-content: center;
    margin: 46rpx 0 57.96rpx;
    font-weight: 600;
    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 48.08rpx;
      width: 269.23rpx;
      height: 96.15rpx;
      background: #f5f5f5;
      &.cancel {
        margin-right: 57.96rpx;
        color: #999;
      }
      &.confirm {
        background: #7079ff;
        color: #fff;
      }
    }
  }
}
.picker-view {
  border-radius: 57.69rpx 57.69rpx 0rpx 0rpx;
  width: 100%;
  height: 519.25rpx;
  .picker-view-cover {
    position: absolute;
    left: 0;
    top: 50%;
    border-radius: 21.15rpx;
    border-radius: 40px;
    border-radius: 21.15rpx;
    width: 100%;
    height: 103.85rpx;
    background: #f5f5f5;
    transform: translateY(-50%);
  }
  .picker-view-item {
    // padding: 20rpx;
    // .year {
    //   width
    // }
    line-height: 103.85rpx;
    text-align: center;
    &.active {
      font-weight: 600;
      font-size: 38.46rpx;
    }
  }
}
.target-box {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  max-height: 700rpx;
  .target-item {
    margin-right: 16rpx;
    border-radius: 38.46rpx;
    width: 153.85rpx;
    height: 215.38rpx;
    background: #fff;
    text-align: center;
    color: #272727;
    &.active {
      background: #7079ff;
      color: #fff;
    }
    &-logo {
      display: inline-block;
      margin-top: 19.23rpx;
      border: 3.85rpx solid #fff;
      border-radius: 32.69rpx;
      // margin-bottom: 19.23rpx;
      width: 115.38rpx;
      height: 115.38rpx;
      background: #d6d6d8;
    }
  }
}
.way-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .way-item {
    display: flex;
    position: relative;
    // justify-content: center;
    align-items: center;
    margin-bottom: 38.46rpx;
    border-radius: 26.92rpx;
    width: 317.31rpx;
    height: 144.23rpx;
    background: #f5f5f5;
    &.active {
      background: rgba(112, 121, 255, 0.1);
      .way-item-check {
        display: block;
      }
    }
  }
  .way-item-check {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 44.23rpx;
    height: 40.38rpx;
    background: url($uni-static-dir-reminder + 'check.png') no-repeat;
    background-size: 100% 100%;
  }
  .way-item-logo {
    margin: 0 26.92rpx;
    width: 77rpx;
    // height: 76.92rpx;
  }
  .way-item-des {
    .wid-name {
      text-align: left;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      font-size: 30.77rpx;
      color: #222;
    }
    .wid-tip {
      text-align: left;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 23.08rpx;
      color: #999;
    }
  }
}
.range-box {
  padding: 38.46rpx 0;
  font-weight: 500;
  color: #272727;
  .range-box-title {
    margin-bottom: 38.46rpx;
    font-weight: bold;
  }
  .range-box-btn {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin: 0 auto 38.46rpx;
    padding-left: 26.92rpx;
    border-radius: 21.15rpx;
    width: 673.08rpx;
    height: 103.85rpx;
    background: #f5f5f5;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    font-size: 34.62rpx;
    color: #272727;
    &.active {
      background: #7079ff;
      color: #fff;
    }
  }
}
.empty-box {
  width: 100%;
  text-align: left;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  font-size: 30.77rpx;
  color: #999;
  .empty-box-logo {
    margin: 76rpx auto 19rpx;
    width: 192.31rpx;
    height: 192.31rpx;
    background: url(../static/reminder/empty.png) no-repeat;
    background-size: 100% 100%;
  }
  .empty-box-txt {
    text-align: center;
    // margin: 0 auto;
  }
}
</style>
