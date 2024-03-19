
<script setup lang="ts">

import { messageCenter } from '@/components/ipViewComponents/core/message/MessageCenter';
import { MessageType } from '@/constants/MessageContants';
import { ws } from "@/net/websocket/AIConnect";
import { SocketCmd } from '@/constants/WSConstants';
import { checkRecord } from '@/utils/recordUtils';
import uniRecord from '@/components/record/uni-record.vue';
import { isLogin } from '@/utils/loginState';

// 用户录音弹窗
const recordPlayerPopup = ref(false);
// 文本框消息
const message = ref('');

let isLogin = false

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
onMounted(() => {
  messageCenter.listen('addMessage', addMessageHandler, this);
});

watch(
  () => message,
  (newVal, oldVal) => {}
);
const showUseMc =ref(true)

function focusEvent(event){
  // console.log(event,'%%%%%event');
  showUseMc.value = true



}
function getFocus(e){
  showUseMc.value = false
  console.log('getFocus');
  console.log(message.value,'message');
}


function addMessageHandler (msg) {
  message.value = msg;
}

function useMC () {
  // TODO 打开录音弹窗
  checkRecord(() => {
    recordPlayerPopup.value = true
  });
}


// 录音结束
function onUpload(e) {
  recordPlayerPopup.value = false
  addMessageHandler(e && e.length ? e : '');
}

function sendMessage (e) {
    let userVO = uni.getStorageSync('userInfo');
    if (userVO && userVO.userInfoVO) {
        isLogin = true
    }else{
      isLogin = false
    }

  // 判断是否需要打开登陆界面
  if (isLogin) {
    if (message.value.length) {

      // list展示文字
      messageCenter.dispatch('messageList', message.value, MessageType.USER);

      // const msg = {type: 'LOADING' }

      messageCenter.dispatch('messageList','LOADING' , MessageType.LOADING);
      // 发送消息到服务端
      ws.send(message.value, SocketCmd.CHAT);

      message.value = '';
    }
  } else {
    // 打开登陆弹窗
    messageCenter.dispatch('loginPopupVisible', true);
  }
}

function showTipPanel () {
  // TODO 打开提示弹窗
  messageCenter.dispatch('messageTipList');
}

function createFinishPopup () {
  let userVO = uni.getStorageSync('userInfo');
    if (userVO && userVO.userInfoVO) {
        isLogin = true
    }else{
      isLogin = false
    }
  // 判断是否需要打开登陆界面
  if (isLogin) {
    // 打开提醒弹窗
    messageCenter.dispatch('messageFinish', null);
  } else {
    // 打开登陆弹窗
    messageCenter.dispatch('loginPopupVisible', true);
  }
}
</script>

<template>
  <div>
    <div class="input-container">
      <!-- <textarea v-model="message" ref="input"></textarea> -->
      <!-- <img class="input-container-tip" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_setTipBtn.png" @click="showTipPanel" alt=""/> -->
      <img class="input-container-setting" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-manual-remind.png" @click="createFinishPopup" alt=""/>
      <div class="input-container-textView">
          <textarea class="input-container-textView-text" @focus="getFocus($event)" @blur="focusEvent($event)" v-model="message" ref="input" :auto-height="true" :placeholder="'输入提醒对象、时间、内容...'" />
          <view class="input-container-textView-mc" v-if="!showUseMc&&message.length>0"></view>

          <img class="input-container-textView-mc"  v-else @click="useMC" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_mc.png" alt=""/>
          <img class="input-container-textView-send" @click="sendMessage" :src="message.length ? 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_send_1.png' : 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_send_2.png'" v-show="message" alt=""/>
          <div class="input-container-textView-right" v-show="message"></div>
      </div>
    </div>
    <div class="record" v-show="recordPlayerPopup">
      <view class="record-popup-bottom">
        <view class="record-popup-bg"></view>
        <view class="record-popup-content">
          <uniRecord
            :maximum="60"
            @confirm="onUpload"
            :visible="recordPlayerPopup"
          >
          </uniRecord>
        </view>
      </view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.record {
  padding: 30rpx;
}
.record-popup-bottom {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .record-popup-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // background: rgba(0,0,0,0.5);
  }
  .record-popup-content {
    // position: relative;
    // z-index: 11;
    // margin-top: auto;
    // border-radius: 57rpx 57rpx 0 0;
    // width: 750rpx;
    // height: 705rpx;
    // background-color: #fff;
  }
}
.input-container {
  display: flex;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  bottom: 56rpx;
  justify-content: center;
  align-items: flex-end;
  margin: 0 auto;
  width: 750rpx;
  -webkit-overflow-scrolling: touch;
  &-tip {
    width: 96rpx;
    height: 96rpx;
  }
  &-setting {
    // margin-left: 20rpx;
    width: 96rpx;
    height: 96rpx;
  }
  &-textView {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-left: 20rpx;
    border-radius: 26rpx;
    // width: 427rpx;
    width: 557rpx;
    height: auto;
    min-height: 96rpx;
    background: #fff;
    &-text {
      box-sizing: border-box;
      margin-left: 26rpx;
      // margin-top: 26rpx;
      margin-bottom: 26rpx;
      padding-top: 8rpx;
      width: auto;
      // width: 260rpx;
      width: 425rpx;
      height: auto;
      min-height: 42rpx;
      max-height: 172rpx;
      // line-height: 42rpx;
      text-align: left;
      font-family: 'Microsoft YaHei';
      font-weight: 400;
      font-size: 30rpx;
      color: #272727;
      word-wrap: break-word;
    }
    &-mc {
      margin-left: 9rpx;
      margin-right: 19rpx;
      margin-bottom: 17rpx;
      width: 62rpx;
      height: 62rpx;
    }
    &-send {
      margin-bottom: 19rpx;
      width: 62rpx;
      height: 62rpx;
    }
    &-right {
      margin-left: 19rpx;
    }
  }
}
/* 垂直滚动条 */
textarea::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}
/* 垂直滚动条上按钮 */
textarea::-webkit-scrollbar-button:start:decrement {
  border: 1px solid #ccc;
  height: 30px;
  background-color: #f5f5f5;
}
/* 垂直滚动条下按钮 */
textarea::-webkit-scrollbar-button:end:increment {
  border: 1px solid #ccc;
  height: 30px;
  background-color: #f5f5f5;
}
/* 垂直滚动条滑块 */
textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  width: 8px;
  background-color: #666;
}
/* 垂直滚动条轨道 */
textarea::-webkit-scrollbar-track {
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f5f5f5;
}
/* 水平滚动条，同理可以设置水平滚动条的样式 */
textarea::-webkit-scrollbar:horizontal {
  width: 10px;
  background-color: #f5f5f5;
}
</style>
