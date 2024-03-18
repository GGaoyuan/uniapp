<!-- eslint-disable @typescript-eslint/no-use-before-define -->
<!-- eslint-disable no-use-before-define -->
<script setup lang="ts">
import { ref } from 'vue';
import reminderApi from '@/api/reminder';
import reminderSet from '@/components/reminderSet.vue';
import { useInit } from '@/hooks/useInit';
import { back } from '@/utils/router';
import { getCutdown } from '@/utils/dateTools';
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

const statusMap = {
  0: { title: '待处理', icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/info.png' },
  1: { title: '已接听', icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/success.png' },
  2: { title: '未接听', icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/fail.png' },
  3: { title: '执行中', icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/info.png' },
  4: { title: '系统提醒失败', icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/fail.png' },
  5: { title: '提醒失败，已超出可用提醒次数', icon: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/fail.png' }
};

const wayMap = {
  0: '微信提醒',
  1: '短信提醒',
  2: '语音提醒',
  3: '视频提醒'
};

const taskInfo = ref<any>({});
const setVisible = ref(false); // 设置
const getTaskInfo = async (pageQuery: any, doCounting = true) => {
  const req = {
    id: pageQuery.id,
    reminderTime: decodeURIComponent(pageQuery.reminderTime),
    taskId: pageQuery.taskId
  };
  taskInfo.value = await reminderApi.getFindTaskInfo(req);
  // 待处理的情况，倒计时
  if (taskInfo.value.operateStatus === 0) {
    if (doCounting) getCutDowning();
  }
};

// 删除提醒
const delFn = () => {
  const req = {
    taskId: taskInfo.value.taskId,
    operationRange: taskInfo.value.operationRange || 0,
    id: taskInfo.value.id,
    currentReminderTime: taskInfo.value.reminderTime
  };
  reminderApi.delTask(req).then(() => {
    uni.showToast({
      title: '删除成功'
    });
    back(1);
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
  if (typeof data === 'number') {
    id = data;
  } else {
    id = data.id;
  }
  const { pageQuery } = useInit();
  getTaskInfo({ ...pageQuery, id });
  setVisible.value = false;
};

const popupRef = ref<any>(null);
const delRemind = () => {
  if (taskInfo.value.reminderType !== 0) {
    popupRef.value.open();
  } else {
    delFn();
  }
};

const rangeConfirm = (type: string) => {
  if (type === 'once') {
    taskInfo.value.operationRange = 0;
  } else {
    taskInfo.value.operationRange = 1;
  }
  popupRef.value.close();
  delFn();
};
let timer = null;
const cutDown = ref('');
const getCutDowning = () => {
  cutDown.value = getCutdown(taskInfo.value.reminderTime);
  if (cutDown.value.includes('剩余')) {
    return;
  }

  timer = setInterval(() => {
    if (cutDown.value === '0时0分0秒') {
      clearInterval(timer);
      const { pageQuery } = useInit();
      getTaskInfo(pageQuery, false);
      return;
    }
    cutDown.value = getCutdown(taskInfo.value.reminderTime);
  }, 1000);
};

onLoad(() => {});
onMounted(() => {
  const { pageQuery } = useInit();
  getTaskInfo(pageQuery);

  // setVisible.value = true;
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <view>
    <view class="detail-header"></view>
    <view class="detail">
      <view class="detail-content" :class="[`status${taskInfo.operateStatus}`]">
        <view v-if="statusMap[taskInfo.operateStatus]" class="dc-header">
          <image
            class="dc-header-icon"
            :src="statusMap[taskInfo.operateStatus].icon"
          ></image>
          {{
            taskInfo.way === 1 && taskInfo.operateStatus === 1
              ? '已通知'
              : statusMap[taskInfo.operateStatus].title
          }}
          <view v-if="!taskInfo.operateStatus" class="dc-header-cutdown">{{
            cutDown
          }}</view>
        </view>
        <view class="dc-content">
          <view class="dc-content-h">提醒内容</view>
          <view class="dc-content-c">{{ taskInfo.content }}</view>
          <view v-if="taskInfo.answer" class="dc-content-a">
            <text>接听答复</text>：{{ taskInfo.answer }}
          </view>
        </view>
      </view>
      <view class="detail-item">
        <view class="detail-item-label">提醒对象</view>
        <view v-if="taskInfo.userRelation" class="detail-item-content">
          <image class="icon" :src="taskInfo.userRelation.headImage"></image>
          <view>{{ taskInfo.userRelation.typeName }}</view>
        </view>
      </view>
      <view class="detail-item">
        <view class="detail-item-label">提醒方式</view>
        <view class="detail-item-content">
          {{ wayMap[taskInfo.way] }}
        </view>
      </view>
      <view class="detail-item">
        <view class="detail-item-label">提醒周期</view>
        <view class="detail-item-content">
          <view>{{
            taskInfo.reminderType === 0 ? '单次提醒' : taskInfo.cycleTypeName
          }}</view>
        </view>
      </view>
      <view class="detail-item">
        <view class="detail-item-label">提醒时间</view>
        <view class="detail-item-content">
          <view>{{ taskInfo.reminderTime }}</view>
        </view>
      </view>
      <view v-if="taskInfo.reminderType !== 0" class="detail-item">
        <view class="detail-item-label">下次提醒</view>
        <view class="detail-item-content">
          <view>{{ taskInfo.nextReminderTime }}</view>
        </view>
      </view>
      <view class="detail-footer">
        <view class="detail-footer-btn del" @click="delRemind">删除</view>
        <view
          v-if="taskInfo.operateStatus !== 3"
          class="detail-footer-btn confirm"
          @click="showReminerSet"
        >
          {{ taskInfo.operateStatus !== 0 ? '重新打开' : '编辑' }}
        </view>
      </view>
    </view>
    <!--  @confirm="" -->
    <reminderSet
      :data="taskInfo"
      :visible="setVisible"
      @cancel="closeReminderSet"
      @confirm="confirmReminderSet"
    />
    <uni-popup
      ref="popupRef"
      class="popup-container"
      type="bottom"
      :safe-area="false"
    >
      <div class="popup-box">
        <view class="range-box">
          <view class="range-box-title">此为重复提醒，请确认删除？</view>
          <view
            class="range-box-btn"
            :class="[taskInfo.operationRange === 0 ? 'active' : '']"
            @click="rangeConfirm('once')"
            >仅删除本次提醒</view
          >
          <view
            class="range-box-btn"
            :class="[taskInfo.operationRange === 1 ? 'active' : '']"
            @click="rangeConfirm('all')"
            >删除所有将来提醒</view
          >
        </view>
      </div>
    </uni-popup>
  </view>
</template>

<style scoped lang="scss">
.detail-header {
  position: fixed;
  left: 0;
  top: 0;
  border-radius: 0rpx 0rpx 57.69rpx 57.69rpx;
  width: 100vw;
  height: 29.42rpx;
  background: #fff;
}
.detail {
  overflow: auto;
  box-sizing: border-box;
  padding-top: 38.46rpx;
  padding-bottom: 200rpx;
  min-height: 100vh;
  background: #f5f5f5;
}
.detail-content {
  margin: 38.46rpx auto;
  border-radius: 26.92rpx;
  width: 673.08rpx;
  background: #7079ff;
  &.status0 {
    background: #fd9633;
  }
  &.status2,
  &.status4,
  &.status5 {
    background: #f57070;
  }
  .dc-header {
    display: flex;
    position: relative;
    align-items: center;
    margin-left: 38.46rpx;
    padding-top: 23.08rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    font-size: 38.46rpx;
    color: #fff;
    &-icon {
      margin-right: 19.23rpx;
      width: 46.15rpx;
      height: 46.15rpx;
    }
    &-cutdown {
      position: absolute;
      right: 38.46rpx;
      top: 23.08rpx;
    }
  }
  .dc-content {
    // height: 376.92rpx;
    box-sizing: border-box;
    margin: 28.85rpx auto 0;
    padding: 38.64rpx;
    border-radius: 26.92rpx;
    width: 673.08rpx;
    background: #fff;
    &-h {
      margin-bottom: 19.23rpx;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 30.77rpx;
      color: #999;
    }
    &-c {
      // margin-bottom: 38.64rpx;
      font-weight: 600;
      color: #272727;
    }
    .dc-content-a {
      box-sizing: border-box;
      margin-top: 38.64rpx;
      padding: 19.23rpx;
      border-radius: 15.38rpx;
      width: 596.15rpx;
      height: 115.38rpx;
      background: #f5f5f5;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Medium;
      font-size: 26.92rpx;
      text {
        font-weight: 600;
        color: #7079ff;
      }
    }
  }
}
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto 38.46rpx;
  padding: 0 38.46rpx;
  border-radius: 26.92rpx;
  width: 673.08rpx;
  height: 119.23rpx;
  background: #fff;
  .detail-item-label {
    line-height: 42.31rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #999;
  }
  .detail-item-content {
    display: flex;
    align-items: center;
    font-weight: 600;
    .icon {
      margin-right: 19.23rpx;
      border: 2.56rpx solid #fff;
      border-radius: 21.15rpx;
      width: 76.92rpx;
      height: 76.92rpx;
      background: #d6d6d8;
    }
  }
}
.detail-footer {
  display: flex;
  position: fixed;
  left: 50%;
  bottom: 57.69rpx;
  justify-content: center;
  transform: translateX(-50%);
  .detail-footer-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 48.08rpx;
    width: 269.23rpx;
    height: 96.15rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    font-size: 38.46rpx;
    &.del {
      margin-right: 57.69rpx;
      background: #fff;
      color: #df5c5c;
    }
    &.confirm {
      background: #7079ff;
      color: #fff;
    }
  }
}
.popup-box {
  overflow: hidden;
  padding: 0 38.46rpx;
  border-radius: 57.69rpx 57.69rpx 0rpx 0rpx;
  background: #fff;
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
</style>
