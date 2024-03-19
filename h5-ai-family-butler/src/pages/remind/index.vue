<!-- eslint-disable @typescript-eslint/no-use-before-define -->
<!-- eslint-disable no-use-before-define -->
<script setup lang="ts">
import { ref } from 'vue';
import reminderApi from '@/api/reminder';
import schedule from '@/components/schedule/index.vue';
import navBar from '@/components/nav-bar/index.vue';
import allPng from '@/static/reminder/all.png';
// import Character from '@/components/character/index.vue';
import { onShareAppMessage } from "@dcloudio/uni-app";

// 1.发送给朋友
onShareAppMessage((res) => {
  return {
    title: "AI亲情提醒",
    path: `pages/main/index`,
    imageUrl: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/share-img/share-img.png',
  };
  // return res;
});

//2.分享到朋友圈
const onShareTimeline = (res) => {
  return res;
};

// role module
const currentRoleIndex = ref(0); // 当前角色的坐标
const currentRole = ref<any>({});
const defaultRoleList = [{ typeName: '全部', id: '', headImage: allPng }];
const roleList = ref<any>([]);
const changeRole = (item: any, index: number) => {
  if (currentRoleIndex.value === index) return;
  currentRoleIndex.value = index;
  currentRole.value = item;
  if (taskType.value.type === 'list') {
    taskList.value = [];
    currentPage.value = 1;
    getTaskByListFn(statusIndex.value, true);
  } else {
    getTask();
    getFestival();
  }
};
// 角色、日期对应的任务
const taskData = ref<any>({});
// 列表模式的任务
const taskList = ref<any>([]);
const dateList = ref<any>([]); // 日期数据
// const selectedDate = ref({}); // 选中的某天
// 获取角色某个时间段的任务【提醒列表】
const getTask = async () => {
  if (!dateList.value.length) return;
  const req = {
    userRelationId: currentRole.value.id,
    startTime: dateList.value.length && `${dateList.value[0].dateStr} 00:00:00`,
    endTime:
      dateList.value.length &&
      `${dateList.value[dateList.value.length - 1].dateStr} 23:59:59`
  };
  taskData.value = await reminderApi.getListTaskInfoGroupByDay(req);
};
const festivalData = ref<any>([]);
// 获取节假日
const getFestival = async () => {
  if (!dateList.value[0]) return;
  const req = {
    startTime: dateList.value[0].dateStr,
    endTime: dateList.value[dateList.value.length - 1].dateStr
  };
  festivalData.value = await reminderApi.startAndEndDate(req);
};
// const cVisible = ref(false);
// 获取角色列表
const getUserRelationListFn = () => {
  reminderApi.getRelationList().then((res: any) => {
    roleList.value = [...defaultRoleList, ...res.apiFindUserRelationList];
    currentRole.value = roleList.value[currentRoleIndex.value];
    // cVisible.value = true;
  });
};

const dayInit = (data: any) => {
  console.log(data, '获取按日分类的一周的数据');
  dateList.value = data;
  getTask();
  getFestival();
};
// const daySelectFn = (data: any) => {
//   // data.dateStr 键值对，taskData[dateStr] 获取任务列表
//   console.log(data, 'day分类下，选择某一天');
//   selectedDate.value = data;
// };
// 改变时间区间
const changeDate = (_dateList: any) => {
  console.log(_dateList, '==========改变时间区间========');
  dateList.value = _dateList;
  // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
  currentPage.value = 1;
  // 重新获取task任务数据
  getTask();
  getFestival();
};

const statusIndex = ref();
const noMore = ref(false);
const currentPage = ref(1);
// 改变执行状态
const getTaskByListFn = async (index: any, isReload = false) => {
  if (statusIndex.value !== index || isReload) {
    taskList.value = [];
    noMore.value = false;
    currentPage.value = 1;
  }
  statusIndex.value = index;
  if (noMore.value) return;
  // 获取list数据
  const res: any = await reminderApi.getListTaskInfo({
    operateStatus: index,
    toUserRelationId: currentRole.value.id || undefined,
    pageSize: 10,
    currentPage: currentPage.value
  });
  taskList.value = [...taskList.value, ...res];
  currentPage.value++;
  if (res.length === 0) {
    noMore.value = true;
  }
};

const taskType = ref<any>({});
// 改变任务筛选类型
const changeType = (item, type) => {
  taskType.value = { ...item };
  taskType.value.type = type;
};

const customBarH = getApp().globalData.customBarH;
onMounted(() => {});
onShow(() => {
  getUserRelationListFn();
  getTask();
});
</script>

<template>
  <view
    class="content"
    :style="{ paddingTop: `${customBarH}px` }"
    :class="[
      taskType.type === 'week' || taskType.type === 'month'
        ? 'content-white'
        : ''
    ]"
  >
    <nav-bar title="提醒记录"></nav-bar>
    <view>
      <scroll-view class="role" :scroll-x="true">
        <view
          v-for="(item, index) in roleList"
          :key="index"
          class="role-item"
          :class="[currentRoleIndex === index ? 'active' : '']"
          @click="changeRole(item, index)"
        >
          <image class="icon" :src="item.headImage"></image>
          <view class="txt">{{ item.typeName }}</view>
        </view>
      </scroll-view>
      <!-- @day-select="daySelectFn" -->
      <schedule
        :task-array="taskList"
        :task-data="taskData"
        :festival-data="festivalData"
        :extra="currentRole"
        @change-type="changeType"
        @change="changeDate"
        @day-init="dayInit"
        @get-task-by-list="getTaskByListFn"
      />
    </view>
    <!--  -->
    <!-- <Character :visible="cVisible" :data="currentRole" @confirm="" @close=""></Character> -->
  </view>
</template>

<style scoped lang="scss">
.content {
  overflow: auto;
  box-sizing: border-box;
  min-height: 100vh;
  background: #f5f5f5;
  &.content-white {
    background: #fff;
  }
  // box-sizing: border-box;
  // background: url($uni-static-dir-local + 'sm.png');
}
.role {
  box-sizing: border-box;
  padding-left: 38.46rpx;
  padding-top: 30rpx;
  background: #fff;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  font-size: 28rpx;
  color: #272727;
  white-space: nowrap;
  &-item {
    display: inline-block;
    margin-right: 16.03rpx;
    border-radius: 36rpx;
    width: 134.62rpx;
    height: 192.31rpx;
    text-align: center;
    font-size: 26.92rpx;
    &.active {
      background: #7079ff;
      color: #fff;
    }
    .icon {
      display: inline-block;
      margin-top: 20rpx;
      border: 3.33rpx solid #fff;
      border-radius: 28rpx;
      width: 96.15rpx;
      height: 96.15rpx;
      background: #fff;
    }
    .txt {
      margin-top: 17.23rpx;
      // line-height: 38.46rpx;
    }
  }
}
</style>
