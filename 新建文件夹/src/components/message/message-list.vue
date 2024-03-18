<template>
    <div>

      <!-- 提示界面 -->
      <!-- <div class="mainTip" v-show="mainTitle.length">
        <p class="mainTip-title">{{mainTitle}}</p>
        <div class="mainTip-content" v-html="mainContent"></div>

        <div class="mainTip-item" v-for="(item, index) in messageList.prompts" :key="index">
          <uni-transition mode-class="fade" :show="true" :id="'tab'+item.index">
            <div class="mainTip-item-content" @click="showTipMessage(index)">
              <p class="mainTip-item-content-text">{{ item.copywriting }}</p>
            </div>
          </uni-transition>
        </div>
      </div> -->

      <div class="mainTip-new" v-show="mainTitle.length">
        <div class="title-box">
          <img class="message-contaner-item-title-icon" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_message_ip.png" alt="" />
              <div class="scroll-box">
                  <wyb-noticeBar class="notice-text" :text="['你好，我是您的AI亲情提醒助手','您可以文字或语音发送类似如下内容','明天8点提醒妈妈去医院复查', '']" type="vert" bgColor="rgba(255,255,255,0.0)" color="#FFFFFF" :show-more="false" :show-icon="false" font-size="30"/>
              </div>
        </div>

        <div class="content-box">
          <div class="content-one-list">
              <image class="list-one" :src="recommendList.length&&recommendList[0]?.homePictureUrl ? recommendList[0].homePictureUrl : ''" @click="tipTypeChange(recommendList[0].id)"></image>
              <!-- 第一个标签改为小程序活动跳转 -->
              <!-- <image class="list-one" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/activity-img/activity-enter.png" @click="goActivity()"></image> -->
              <image class="list-two" :src="recommendList.length&&recommendList[1]?.homePictureUrl ? recommendList[1].homePictureUrl : ''" @click="tipTypeChange(recommendList[1].id)"></image>
          </div>
          <div class="content-two-list">
              <image class="list-one" :src="recommendList.length&&recommendList[2]?.homePictureUrl ? recommendList[2].homePictureUrl : ''" @click="tipTypeChange(recommendList[2].id)"></image>
              <image class="list-two" :src="recommendList.length&&recommendList[3]?.homePictureUrl ? recommendList[3].homePictureUrl : ''" @click="tipTypeChange(recommendList[3].id)"></image>
              <image class="list-three" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-more-scene.png" @click="goMember()"></image>
          </div>
        </div>
      </div>

      <!-- 聊天列表 -->
      <scroll-view v-show="!mainTitle.length" class="message-contaner" scroll-y="true" :style="{height: listHeight + 'rpx'}" scroll-with-animation=true :scroll-into-view="'tab'+ tabId" >
        <div class="message-contaner-item" v-for="(item) in messageList.messages" :key="item.index">
          <!-- 用户输入 -->
          <uni-transition mode-class="fade" :show="true" :id="'tab'+item.index">
            <div class="message-contaner-item-mineContent" v-show="item.type === MessageType.USER">
              <p class="message-contaner-item-mineContent-text">{{ item.content }}</p>
            </div>
          </uni-transition>


          <!-- Loading -->
          <uni-transition v-if="socketBack" mode-class="fade" :show="true" :id="'tab'+item.index" >
            <div class="message-contaner-item-aiContent" v-show="item.type === MessageType.LOADING">
              <div class="message-contaner-item-aiContent-group loading-box">
                <img class="message-contaner-item-aiContent-group-img" style="top: -5rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_message_ip.png" alt="" />
                <img class="loading-img" style="top: -4rpx;    margin-left: 18rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/loading.png" alt="" />
              </div>
            </div>
          </uni-transition>

          <!-- AI回复 -->
          <uni-transition mode-class="fade" :show="true" :id="'tab'+item.index" >
            <div class="message-contaner-item-aiContent" v-show="item.type === MessageType.ROBOT">
              <div class="message-contaner-item-aiContent-group">
                <img class="message-contaner-item-aiContent-group-img" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_message_ip.png" alt="" />
                <span class="message-contaner-item-aiContent-group-text">{{ item.content }}</span>
              </div>
            </div>
          </uni-transition>


          <!-- 系统提示 -->
          <uni-transition mode-class="fade" :show="true" :id="'tab'+item.index" >
            <div class="message-contaner-item-settingLoading" v-show="item.type === MessageType.SYSTEM_LOADING">
              <p class="message-contaner-item-settingLoading-text">{{ item.content }}</p>
            </div>

            <div class="message-contaner-item-settingContent" v-show="item.type === MessageType.SYSTEM_POPUP">
              <div class="message-contaner-item-settingContent-title">
                  <p class="message-contaner-item-settingContent-title-text">提醒设置成功</p>
                  <img class="message-contaner-item-settingContent-title-img" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_setTipSucces.png" alt="">
              </div>

              <div class="message-contaner-item-settingContent-some">
                  <p class="message-contaner-item-settingContent-some-text">提醒对象</p>
                  <img class="message-contaner-item-settingContent-some-img" :src="item?.content?.userRelation?.headImage || ''" alt="">
                  <p class="message-contaner-item-settingContent-some-name">{{item?.content?.toUserAccount || item?.content?.userRelation?.typeName || '未设置'}}</p>
              </div>

              <div class="message-contaner-item-settingContent-some">
                  <p class="message-contaner-item-settingContent-some-text">提醒方式</p>
                  <p class="message-contaner-item-settingContent-some-name">{{getWay(item?.content?.way)}}</p>
              </div>

              <div class="message-contaner-item-settingContent-some">
                  <p class="message-contaner-item-settingContent-some-text">提醒周期</p>
                  <p class="message-contaner-item-settingContent-some-name">{{getReminderType(item?.content?.reminderType)}}</p>
              </div>

              <div class="message-contaner-item-settingContent-some">
                  <p class="message-contaner-item-settingContent-some-text">提醒时间</p>
                  <p class="message-contaner-item-settingContent-some-name">{{item?.content?.reminderTime || '未设置'}}</p>
              </div>

              <div class="message-contaner-item-settingContent-content">
                <p class="message-contaner-item-settingContent-content-tip">提醒内容</p>
                 <div class="message-contaner-item-settingContent-content-view">
                  <p class="message-contaner-item-settingContent-content-view-text">{{item?.content?.content || '未设置提醒内容'}}</p>
                </div>
              </div>
            </div>
          </uni-transition>
        </div>
      </scroll-view>
    </div>
</template>

<script setup lang="ts">
import { messageCenter } from "@/components/ipViewComponents/core/message/MessageCenter";
import { SocketCmd } from '@/constants/WSConstants';
import { MessageType } from '@/constants/MessageContants';
import mainApi from '../../api/main'

import main_message_ip from 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_message_ip.png';
import main_setTipSucces from 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_setTipSucces.png';
import { forward } from "@/utils/router";

const messageList = reactive({
  messages: [
    // {
    //   content: '今天天气不错3',
    //   type: MessageType.SYSTEM_POPUP,
    //   index: 0
    // },
    // {
    //   content: '今天天气不错svsv3',
    //   type: MessageType.SYSTEM_POPUP,
    //   index: 1
    // }
  ],
  prompts: []
});

// 列表需要跳转的元素下标
const tabId = ref(-1);

// 列表高度
const listHeight = ref(0);

// 主页提示消息
const mainTitle = ref('');
const mainContent = ref('');

const socketBack = ref(true)
const testValue = ref(10);
const recommendList = ref([])

let test = setInterval(() => {
  testValue.value--
  if (testValue.value === 0) {
     clearInterval(test);
  }
}, 1000)

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  messageCenter.listen('messageScrollHeight', scrollHeightHandler, this);
  messageCenter.listen('messageList', messageHandler, this);
  messageCenter.listen('mainPageMessageTip', mainPageMessageTipHandler, this);
  messageCenter.listen('wsMessage', wsMessageHandler, this);
  // messageCenter.listen('messageTipList', tipTypeChange, this);
  gettRecommendInfo();
});

const goActivity = () => {
  forward('activity-page')
}
function scrollHeightHandler (e) {
  listHeight.value = e;
}

function messageHandler (e, type) {
  console.log(e,type,'messageHandlermessageHandler',MessageType.SYSTEM_POPUP);

  if (mainTitle.value.length) {
    mainTitle.value = '';
  }

  let arr = [
    ...messageList.messages,
  ]
  arr.push({
    content: e,
    type: type,
    index: arr.length
  })
  messageList.messages = arr;
  console.log(messageList.messages,messageList,'messageList.messages');


  tabId.value = arr[arr.length - 1].index;
}

function mainPageMessageTipHandler (data: {
  prompts: [ {copywriting: string, id: number} ]
  tipTitle: string,
  tipContent: string,
  id: number
}) {
  mainTitle.value = data.tipTitle;
  mainContent.value = data.tipContent.length ? data.tipContent.replace(/\n/g,'<br/>') : '';

  if (data.prompts && data.prompts) {
    // TODO 截取前两位，和产品（刘坤鹏）沟通确认了，这里只会展示两个提示
    let prompts = data.prompts.splice(0, 2);
    messageList.prompts = [...prompts];
  }
}

function wsMessageHandler (message) {
  // {"msg":"您好，我是您的AI亲情提醒助手，我可以根据您对提醒对象、提醒时间、提醒事项等元素的要求生成提醒","socketCmd":"CHAT","socketMsgType":"ROBOT"}
  switch (message.socketCmd) {
    case SocketCmd.CHAT:
      // 显示对话
      messageList.messages = messageList.messages.filter((item) => item.content !== "LOADING");
      messageHandler(message.msg, MessageType.ROBOT);
    break;
    case SocketCmd.FINISH:
      // TODO 吊起设置弹窗
      messageList.messages = messageList.messages.filter((item) => item.content !== "LOADING");
      messageCenter.dispatch('messageFinish', message.msg || null);
    break;
  }
}

function showTipMessage (index) {
  // TODO 首页点击提示文案
  let msg = messageList.prompts[index];
  messageCenter.dispatch('addMessage',  msg.copywriting);
}

/**
 * 判断提示周期
 */
function getReminderType (type) {
  switch(type) {
    case 0:
      return '单次';
    break;
    case 1:
      return '周期';
    break;
    default:
      return '未设置'
  }
}

/**
 * 设置提醒方式
 */
function getWay (type) {
  switch(type) {
    case 0:
      return '微信';
    break;
    case 1:
      return '短信';
    break;
    case 2:
      return '音频外呼';
    break;
    case 3:
      return '视频外呼';
    break;
    default:
      return '未设置'
  }
}

// 请求首页推荐列表
const gettRecommendInfo = async ()=> {
  const res = await mainApi.getRecommendList({});
  console.log(res, "我是接受数据");

  recommendList.value = res;
  console.log(recommendList.value, "我是推荐列表");
}

const tipTypeChange = async (id)=> {
  messageCenter.dispatch('sendType', id);
  messageCenter.dispatch('messageTipList');
}

const goMember = ()=> {
  // forward('myFamily');
  messageCenter.dispatch('messageTipList');
}

</script>

<style scoped lang="scss">
/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.fade-leave-active .child {
  position: absolute;
}
.mainTip {
  margin-left: 38rpx;
  margin-right: 38rpx;
  &-title {
    display: block;
    overflow: hidden;
    padding-top: 38rpx;
    line-height: 52rpx;
    text-overflow: ellipsis;
    text-align: left;
    font-family: 'Microsoft YaHei';
    font-weight: 800;
    font-size: 46rpx;
    color: #fff;
    white-space: nowrap;
  }
  &-content {
    margin-top: 19rpx;
    line-height: 38rpx;
    text-align: left;
    font-family: 'Microsoft YaHei';
    font-weight: 400;
    font-size: 28rpx;
    color: #fff;
  }
  &-item {
    display: flex;
    &-content {
      margin-top: 38rpx;
      border-radius: 26rpx;
      width: auto;
      background: #ffffff0f;
      &-text {
        padding: 26rpx;
        line-height: 42rpx;
        text-align: left;
        font-family: 'Microsoft YaHei';
        font-weight: 500;
        font-size: 30rpx;
        color: #fff;
        overflow-wrap: break-word;
        word-wrap: break-word;
        white-space: pre-line;
      }
    }
  }
}
.message-contaner {
  overflow: auto;
  &-item {
    display: flex;
    &-mineContent {
      margin-left: 38rpx;
      margin-right: 38rpx;
      margin-top: 38rpx;
      border-radius: 26rpx;
      width: auto;
      background: #fff;
      &-text {
        padding: 26rpx;
        line-height: 48rpx;
        text-align: left;
        font-family: 'Microsoft YaHei';
        font-weight: 500;
        font-size: 34rpx;
        color: #272727;
        word-break: break-all;
      }
    }
    &-aiContent {
      margin-left: 38rpx;
      margin-right: 38rpx;
      margin-top: 38rpx;
      border-radius: 26rpx;
      width: auto;
      background: #ffffff0f;
      &-group {
        // display: flex;
        // align-items: center;
        // justify-content: center;
        padding-left: 26rpx;
        padding-right: 45rpx;
        padding-top: 26rpx;
        padding-bottom: 26rpx;
        &-img {
          position: relative;
          top: 12rpx;
          width: 57rpx;
          height: 57rpx;
        }
        &-text {
          position: relative;
          left: 19rpx;
          line-height: 68rpx;
          text-align: left;
          font-family: 'Microsoft YaHei';
          font-weight: 500;
          font-size: 34rpx;
          color: #fff;
          overflow-wrap: break-word;
          word-break: break-all;
          white-space: pre-line;
          // padding-left: 26rpx;
        }
      }
      &-group.loading-box {
        display: flex;
        align-items: center;
        padding: 26rpx 45rpx 26rpx 26rpx;
        &-img {
          position: relative;
          top: 12rpx;
          width: 57rpx;
          height: 57rpx;
        }
        .loading-img {
          position: relative;
          top: 12rpx;
          width: 80rpx;
          height: 30rpx;
        }
      }
    }
    &-settingContent {
      margin-left: 38rpx;
      margin-right: 115rpx;
      margin-top: 38rpx;

      // height: 857rpx;
      border-radius: 38rpx;
      width: auto;
      background: #fff;
      &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 38rpx;
        width: 596rpx;
        height: 76rpx;
        &-text {
          // padding-top: 50rpx;
          padding-left: 38rpx;
          line-height: 53rpx;
          text-align: left;
          font-family: 'Microsoft YaHei';
          font-weight: 600;
          font-size: 38rpx;
          color: #272727;
        }
        &-img {
          padding-right: 38rpx;
          width: 76rpx;
          height: 76rpx;
        }
      }
      &-some {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding-top: 48rpx;
        padding-top: 32rpx;
        width: 596rpx;
        height: 76rpx;
        &-text {
          // padding-top: 65rpx;
          padding-left: 38rpx;
          line-height: 42rpx;
          text-align: left;
          font-family: 'Microsoft YaHei';
          font-weight: 400;
          font-size: 30rpx;
          color: #999;
        }
        &-img {
          padding-right: 19rpx;
          width: 76rpx;
          height: 76rpx;
        }
        &-name {
          padding-right: 38rpx;
          line-height: 42rpx;
          text-align: left;
          font-family: 'Microsoft YaHei';
          font-weight: 600;
          font-size: 30rpx;
          color: #272727;
        }
      }
      &-content {
        padding-left: 38rpx;
        padding-right: 38rpx;
        padding-top: 48rpx;
        padding-bottom: 38rpx;
        &-tip {
          line-height: 53rpx;
          text-align: left;
          font-family: 'Microsoft YaHei';
          font-weight: 400;
          font-size: 30rpx;
          color: #999;
        }
        &-view {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 19rpx;
          border-radius: 15rpx;
          width: 519rpx;
          height: 176rpx;
          background: #f5f5f5;
          &-text {
            width: 461rpx;
            height: 138rpx;
            line-height: 46rpx;
            text-align: left;
            font-family: 'Microsoft YaHei';
            font-weight: 500;
            font-size: 30rpx;
            color: #272727;
          }
        }
      }
    }
  }
}
.mainTip-new {
  box-sizing: border-box;
  padding: 0 38rpx;
  padding-top: 30rpx;
  width: 100%;
  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    animation-name: tip-move;
    animation-duration: 0.8s;
    animation-iteration-count: inherit;
    animation-fill-mode: forwards;
    .message-contaner-item-title-icon {
      width: 57.69rpx;
      height: 63.46rpx;
    }
    .scroll-box {
      overflow: hidden;
      box-sizing: border-box;
      margin-left: 19rpx;
      padding-left: 19rpx;
      padding-top: 8rpx;
      border-radius: 19.23rpx;
      width: 530.77rpx;
      height: 80.77rpx;
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
.content-box {
  .content-one-list {
    display: flex;
    margin-top: 57rpx;
    opacity: 0;
    will-change: transform;
    transform: translate3d(0, 0, 0);
    animation-name: tip-move-one-list;
    animation-duration: 1.6s;
    animation-delay: 0.5s;
    animation-iteration-count: inherit;
    animation-fill-mode: forwards;
    .list-one {
      width: 442.31rpx;
      height: 211.54rpx;
    }
    .list-two {
      margin-left: 19rpx;
      width: 211.54rpx;
      height: 211.54rpx;
    }
  }
  .content-two-list {
    display: flex;
    margin-top: 19rpx;
    opacity: 0;
    animation-name: tip-move-two-list;
    animation-duration: 0.8s;
    animation-delay: 1s;
    animation-iteration-count: inherit;
    animation-fill-mode: forwards;
    .list-one {
      width: 211.54rpx;
      height: 211.54rpx;
    }
    .list-two {
      margin-left: 19rpx;
      width: 211.54rpx;
      height: 211.54rpx;
    }
    .list-three {
      margin-left: 19rpx;
      width: 211.54rpx;
      height: 211.54rpx;
    }
  }
}
@keyframes tip-move {
  0% {
    margin-top: 40rpx;
    opacity: 0;
  }
  100% {
    margin-top: 0rpx;
    opacity: 1;
  }
}
@keyframes tip-move-one-list {
  0% {
    margin-top: 97rpx;
    opacity: 0;
  }
  100% {
    margin-top: 57rpx;
    opacity: 1;
  }
}
@keyframes tip-move-two-list {
  0% {
    margin-top: 59rpx;
    opacity: 0;
  }
  100% {
    margin-top: 19rpx;
    opacity: 1;
  }
}

</style>
