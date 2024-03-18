<script setup lang="ts">
import { createScopedThreejs } from 'threejs-miniprogram';
import { useInit } from '@/hooks/useInit';
import { forward } from '@/utils/router';
import { AniType, ScreenInfo, isGuide} from '@/constants/MainPageConstants'

import { IpScene } from '@/pages/main/ipView/IpScene';
import { messageCenter } from '@/components/ipViewComponents/core/message/MessageCenter';
// import { httpPost } from '@/utils/http/HttpDecrator';
// import { MessageType } from '@/constants/MessageContants';
import messageList from '@/components/message/message-list.vue';
import messageSelectTipsPopup from '@/components/message/message-selectTips-popup.vue';
import inputBox from '@/components/input/input-box.vue';
import reminderSet from '@/components/reminderSet.vue';
import login from '@/components/login/index.vue';
import profileApi from '@/api/profile'
import loginApi from "@/api/loginApi";

import http from '@/utils/request';
import { isLogin } from '@/utils/loginState';
import { ws } from '@/net/websocket/AIConnect';
import { stt } from '@/net/websocket/STTConnect';
import env from '@/config/env';
import { MessageType } from '@/constants/MessageContants';
import { onShareAppMessage } from "@dcloudio/uni-app";

// ----------初始化方法 & 跳转-----------

const nextFrameStartHooks = new Set<() => void>();
function onNextFrameStart(fn: () => void) {
  nextFrameStartHooks.add(fn);
  return () => nextFrameStartHooks.delete(fn);
}

let _canvas;
const animation= uni.createAnimation({
  timingFunction: 'ease',
})
const loadingHide = ref(null);

function createThree() {
  const query = uni.createSelectorQuery();
  const scene = query.select('#ipC');

  scene
    .node((res) => {
      // console.log('res', res);
    })
    .exec((res) => {
      _canvas = res[0].node;
      const _three = createScopedThreejs(_canvas);
      uni._THREE = _three;
      const scene = new IpScene(nextFrameStartHooks, onNextFrameStart);
      scene.initScene(_canvas, _three);
    });

  playLoading.value = true;

  //加载动画淡出
  animation.opacity(0).step({duration:500,delay:100});

}

function createWS() {
  let userVO= uni.getStorageSync('userInfo');

  // 如果登陆了就直接链接，否则登陆后链接
  if ( isLogin() ) {
    // fixme
    let _url = env.apiEnv === 'dev' ? 'wss://ivr.migu.cn/wb/ai-family-butler/client/ws' : 'wss://ivr.migu.cn/wb/ai-family-butler/client/ws';
    !ws.socketTask && ws.initRequest(`${_url}?userId=${userVO.userInfoVO.id}&openId=${userVO.userInfoVO.openId}`, 15000);
  }

  !stt.socketTask && stt.initRequest('wss://saasdev.51znyx.com/vcs-open-api-client/iat', 15000);
  // !stt.socketTask && stt.initRequest('wss://saasdev.51znyx.com/vcs-open-api-client/iat?params=%7B%22aue%22%3A%22mp3%22%7D', 15000);
}

function touchStart(e) {
  if (!_canvas) return;

  e.preventDefault();
  _canvas.dispatchTouchEvent({ ...e, type: 'touchstart' });
}

function touchMove(e) {
  if (!_canvas) return;
  _canvas.dispatchTouchEvent({ ...e, type: 'touchmove' });
}

function touchEnd(e) {
  if (!_canvas) return;
  _canvas.dispatchTouchEvent({ ...e, type: 'touchend' });

  let touchs = e.touches[0] || e.changedTouches[0];


  if (touchs) {
    messageCenter.dispatch('touched', true);

    let _x = parseInt(touchs.x + '');
    let _y = parseInt(touchs.y + '');
    let _w = parseInt(ScreenInfo.screenW + '');
    let _h = parseInt(ScreenInfo.screenH + '');

    let touInfo = {
      x: (_x  / _w) * 2 - 1,
      y: -(_y / _h) * 2 + 1
    };
  //  messageCenter.dispatch('messageList', 'ds' +_canvas._left + ', ' + _canvas._top + ', ' + _x + ', ' + _y + ', ' + _w + ', ' + _h , MessageType.USER);
    messageCenter.dispatch('touchInfo', touInfo);
  }
}

// ----------------------------------事件------------------------------------------
function goPersenal() {
  console.log('goPersenal');
  forward('profile');
}

function goSetting() {
  // 判断是否需要打开登陆界面
  if (isLogin()) {
    forward('remind', {
      a: 1
    });
  } else {
    // 打开登陆弹窗
    loginPopupVisible(true);
  }

}

// ----------------------------------界面逻辑------------------------------------------
// 显示登陆弹窗
const loginVisible = ref(false);
// 显示设置弹窗
const finishPopupVisible = ref(false);
// 显示提醒列表弹窗
const selectTipsVisible = ref(false);
// 提醒设置数据
const finishData = ref(null);
// 提醒面板数据
const promptsData = ref(null);
// 用户头像
const userAvatar = ref('');
// 加载模型显示的loading
const playLoading = ref(false);

const popupRef = ref<any>(null);

// 用户信息
const userInfo = ref({})

// @httpPost('', {})
async function getMainMessageTip() {
  const data = await http.post('/api/homepage/config/findCopywriting', {});

  console.log('首页提醒：', JSON.stringify(data));
  messageCenter.dispatch('mainPageMessageTip', {
    prompts: data.homepageRemindRecommendList,
    tipTitle: data.tipTitle,
    tipContent: data.tipContent,
    id: data.id
  });
}

async function getMainMessagePrompt() {
  let data = await http.post('/api/recommend/config/findRemindRecommend', {});

  console.log('提醒列表', JSON.stringify(data));
  promptsData.value = data;
}

function closeMessageSelectPopup() {
  // TODO 关闭提示弹窗
  selectTipsVisible.value = false;
  // messageCenter.dispatch('hideGLB', false);
}

function messageTipList() {
  messageCenter.dispatch('sendPrompts', promptsData.value);
  // messageCenter.dispatch('hideGLB', true);
  selectTipsVisible.value = true;
}

function playLoadingHandler () {
  playLoading.value = false;
  loadingHide.value = animation.export();
}

function messagePopup(data) {
  console.log(data,'messagePopup');

  if (data) {
    finishData.value = JSON.parse(data);
  } else {
    finishData.value = {};
  }

  console.log('finishPopupVisible', finishPopupVisible.value);
  // 打开提醒弹窗
  finishPopupVisible.value = true;

  messageCenter.dispatch('hideGLB', true);
}

function finishSuccess(data) {
  // TODO 设置完成
  console.log('finishSuccess 设置完成:', data);
  finishPopupVisible.value = false;

  messageCenter.dispatch('hideGLB', false);
  messageCenter.dispatch('playAnimate', AniType.RIGHT);

  messageCenter.dispatch('messageList',data , MessageType.SYSTEM_POPUP);
}

function closeReminderSet() {
  // TODO 取消设置
  console.log('closeReminderSet 取消设置');
  finishPopupVisible.value = false;

  messageCenter.dispatch('hideGLB', false);
}

function loginPopupVisible (show) {
  loginVisible.value = show;
}

// 登陆状态
function loginStauts (data) {
  loginPopupVisible(false);
  getUserInfo();

  createWS();
}

// 获取用户信息
async function getUserInfo() {
  userInfo.value = await profileApi.findHomePageUserInfo({});  // 用户信息
  userAvatar.value = userInfo.value?.userInfoVO?.avatar || 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_top_userHead.png';
  uni.setStorageSync("userInfo", userInfo.value);
  createWS();

  console.log(userInfo.value, "我是用户信息");
}

// 初始化
const getPlugin = ()=> {
   let _plugin;

    if (!_plugin) {
        _plugin = requirePlugin('myPlugin')
        // 初始化，更新默认配置
        _plugin.setOptions?.({
            requestDomain: 'https://passport.migu.cn',
            sourceId: '220055',
            skin: 'music',
            protocols: [
                ['服务协议', '/pages/protocol'],
                ['隐私政策', '/pages/privacy']
            ]
        })
    }
    return _plugin
}

// 检查用户token
function goCheckToken() {
  getPlugin().apiGetMiguToken({
    success: (miguToken) => {
      console.log("用户已登录，获取的一级token为:", miguToken);
      const userInfo = getPlugin().getMiguUserInfo();
      console.log(userInfo, "我是用户信息");

      if (miguToken) {
        // 页面显示
        loginApi
          .login({
            token: miguToken,
          })
          .then((res) => {
            console.log(res, "我是内部登录返回");
            uni.setStorageSync("token", res);

            getUserInfo();
          });
      } else {
        // 异常分支，应该不会出现，理论上成功返回的 miguToken 都是有值的
        // userInfo
        //   ? console.log('清除缓存，需重新登录')
        //   : console.log('用户未登录，或会话已失效，需重新登录')
        // this.clear()
      }
      checkToken();
    },
    fail: (err) => {
      if (getPlugin().getMiguUserInfo()) {
        console.log("用户已登录，但获取token失败，重试一次:", err);
        goCheckToken();
        return;
        // console.log("已清除缓存，需重新登录:", err);
      } else {
        console.log(
          "获取一级token失败，用户未登录或会话已失效，需重新登录:",
          err
        );
        uni.clearStorage();
      }
      // this.clear()
      checkToken();
    },
  });
}

function checkToken() {
  uni.getStorage({
    key: "token",
    success: (res) => {
      getUserInfo();
    },
    fail: () => {
      console.log("查询失败");
      // isLogin = false;
    },
  });
}

function loginPopupClose () {
  console.log('loginPopupClose');
  loginPopupVisible(false);
}
const showtips = ref(false);
const tipIndex =ref(1);
const tipsdialogRef = ref<any>(null);
function tipsdialogShow() {
  console.log(isGuide.isGuide,'tipsdialogShow');
  if(!uni.getStorageSync('isGuide')){
    isGuide.isGuide = true
    // tipsdialogRef.value?.open();
    showtips.value = true;
    uni.setStorageSync('isGuide','true');
  }else{
    messageCenter.dispatch('showModol')
  }

}

// 1.发送给朋友
onShareAppMessage((res) => {
  id.value = "321321321321321";
  return {
    title: "2024新春说给爸妈的话",
    path: `pages/activity-share-page/index?templateId=${templateId.value}&share=true`,
  };
});
//2.分享到朋友圈
const onShareTimeline = (res) => {
  return res;
};

function skipUp(){
    // tipsdialogRef.value?.close();
    showtips.value = false;
    messageCenter.dispatch('showModol')
    // messageCenter.dispatch('hideGLB', false);
}

function nextStep(){
    // tipsdialogRef.value?.close();
    if(tipIndex.value ==4){
      skipUp()
    }else{
      ++tipIndex.value;
    }
}

// ----------------------------------页面初始化------------------------------------------
const screenWidth = ref(0);
const sceenHeight = ref(0);
const mainTopDistance = ref(0);
// const mainLeftDistance = ref(0);
onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
  // uni.hideTabBar();
  uni.hideNavigationBarLoading();
});

onReady(() => {
  // 用户信息
  // let userVO= uni.getStorageSync('userInfo');

  // userAvatar.value = userVO?.userInfoVO?.avatar || 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_top_userHead.png';
  uni.getSystemInfo({
    success: (res) => {
      console.log('页面高度:', res.windowHeight);

      // 获取手机顶部状态栏的高度
      const statusBarHeight = res.statusBarHeight || 0;

      // 获取导航栏的高度（手机状态栏高度 + 胶囊高度 + 胶囊的上下间距）
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      const navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2;
      console.log('状态栏高度:', statusBarHeight, navBarHeight);

      // 计算顶部图标距离
      const topIconDistance = statusBarHeight + navBarHeight;
      mainTopDistance.value = topIconDistance;

      const _canvash = res.windowHeight * 0.45;
      ScreenInfo.screenW = screenWidth.value = res.windowWidth;
      ScreenInfo.screenH = sceenHeight.value = _canvash;

      // 计算消息列表高度
      const _buttomH = (160 / 750) * res.windowWidth;
      const _listPX = res.windowHeight - _canvash - _buttomH;
      const _listRPX = _listPX * (750 / res.windowWidth);
      messageCenter.dispatch('messageScrollHeight', _listRPX);
      tipsdialogShow();
      createThree();
      createWS();
    }
  });

  // 请求首页提示数据
  getMainMessageTip();
  // 请求提示文案列表数据
  getMainMessagePrompt();

  messageCenter.listen('loginPopupVisible', loginPopupVisible, this);
  messageCenter.listen('messageFinish', messagePopup, this);
  messageCenter.listen('messageTipList', messageTipList, this);
  messageCenter.listen('playLoading', playLoadingHandler, this);
  messageCenter.listen(
    'closeMessageSelectPopup',
    closeMessageSelectPopup,
    this
  );

});

onShow(()=> {
  getPlugin();
  goCheckToken();
  let userVO= uni.getStorageSync('userInfo');
  userAvatar.value = userVO?.userInfoVO?.avatar || 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_top_userHead.png';
  getMainMessageTip();
})

</script>

<template>
  <div class="main-container">
    <view class="main-container-content">
      <div
        class="main-container-content-top"
        :style="{ left: '38rpx', top: `${mainTopDistance}rpx` }"
      >
        <div class="main-container-content-top-head" @click="goPersenal">
          <img
            class="main-container-content-top-head-img"
            :src="userAvatar"
            alt=""
          />
        </div>

        <!-- <div class="main-container-content-top-info" > -->
        <img
          class="main-container-content-top-info"
          src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_top_setting.png"
          alt=""
          @click="goSetting"
        />
        <!-- </div> -->
      </div>
      <canvas
        id="ipC"
        type="webgl"
        class="main-container-content-ipC"
        :style="{ width: `${screenWidth}px`, height: `${sceenHeight}px` }"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
      </canvas>

      <view class="loading" ref="loadRef">
         <image
          class="loading-gif"
          src="https://ivr.migu.cn/ai-family-butler/static/butler/model/homepage_loading.gif"
          alt=""
          v-show="playLoading"
          :animation="loadingHide"
        />
      </view>

      <div class="main-container-content-chat">
        <div class="main-container-content-chat-list">
          <div class="main-container-content-chat-list-mask" />
          <messageList />
        </div>
        <inputBox />
      </div>
    </view>
    <div class="main-container-popup">
      <reminderSet
        :visible="finishPopupVisible"
        :data="finishData"
        @cancel="closeReminderSet"
        @confirm="finishSuccess"
      />
      <messageSelectTipsPopup :visible="selectTipsVisible"  :safe-area="false" />
      <login :visible="loginVisible" @confirm="loginStauts" @close="loginPopupClose"></login>
    </div>

<!-- uni-popup
      ref="tipsdialogRef"
      :mask-click="false"
      :is-mask-click="false" -->
    <div  v-show="showtips"  class="tips-bg">
    <!--用户头像 -->
         <view class="tips-dialog" v-show="tipIndex==1">
          <img class="main-container-content-top-head-img"  :style="{position:'fixed', left: '38rpx', top: `${mainTopDistance+12}rpx` }" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_top_userHead.png" alt="">

           <img class="tips-dialog-user-tip" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-top-tips-user.png" alt="">

            <img class="tips-dialog-skip" style="left: 38.46rpx;top: 486.54rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-cancel.png" @click="skipUp" alt="">
            <img class="tips-dialog-skip" style="left: 230.77rpx;top: 486.54rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-ok.png" @click="nextStep" alt="">
         </view>
          <!-- 消息 -->
         <view class="tips-dialog" v-show="tipIndex==2">
          <img class="main-container-content-top-info"  :style="{position:'fixed', left: '112.85rpx', top: `${mainTopDistance+12}rpx` }" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_top_setting.png" alt="">

           <img style="position: fixed;left: 134.62rpx;top: 206.7rpx;width: 500rpx;height: 172.15rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-setting.png" alt="">

            <img class="tips-dialog-skip" style="left: 134.62rpx;top: 436.54rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-cancel.png"   @click="skipUp" alt="">
            <img class="tips-dialog-skip" style="left: 346.15rpx;top: 436.54rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-ok.png" @click="nextStep" alt="">
         </view>
          <!-- 添加 -->
         <view class="tips-dialog" v-show="tipIndex==3">
          <img class="main-container-content-top-info"  :style="{width: '96rpx',
    height: '96rpx',position:'fixed', left: '1rpx',
    bottom: '56.69rpx', }" src="https://hn.iflytektstd.com/hubeiyd-file-store/2023-12-27/3ed0f2d1a6364408b74bfe97a5a369f2.png" alt="">

           <img style="position: fixed;left: 38.46rpx;bottom: 176.48rpx;width: 653.85rpx;height: 183.14rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-plus.png" alt="">

            <img class="tips-dialog-skip" style="right: 269.23rpx;bottom: 190.38rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-cancel.png"  @click="skipUp" alt="">
            <img class="tips-dialog-skip" style="right: 57.69rpx;bottom: 190.38rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-ok.png" @click="nextStep" alt="">
         </view>


                   <!-- 语音 -->
      <view class="tips-dialog" v-show="tipIndex==4">
          <img class="main-container-content-top-info"  style="position: fixed;right: 40rpx;bottom: 57.69rpx;width: 557.69rpx;height: 96.15rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-input.png" alt="">

           <img style="position: fixed;right: 34.87rpx;bottom: 175.91rpx;width: 530.51rpx;height: 239.47rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-input.png" alt="">

            <img class="tips-dialog-skip" style="left: 184.62rpx;bottom: 192.31rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-cancel.png"  @click="skipUp" alt="">
            <img class="tips-dialog-skip" style="left: 396.15rpx;bottom: 192.31rpx;" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/novice-guide/main-tips-ok.png" @click="nextStep" alt="">
         </view>


        </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100vw;
  height: 100vh;
  background: #7079ff;
  &-content {
    &-top {
      display: flex;
      position: absolute;
      z-index: 2;
      justify-content: center;
      align-items: center;
      height: 100rpx;
      &-head {
        align-self: center;
        width: 77rpx;
        height: 77rpx;
        &-img {
          border: 4rpx solid #fff;
          border-radius: 26rpx;
          width: 71rpx;
          height: 71rpx;
          background: #d8d8d8;
        }
      }
      &-info {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 38rpx;
        border-radius: 28rpx;
        width: 77rpx;
        height: 77rpx;
      }
    }
    &-ipC {
      z-index: 1;
      background: #7079ff;
      // background: linear-gradient(top, #8d70ff 0%, #7079ff 100%);
      // background: linear-gradient(to bottom, #8d70ff 0%, #7079ff 100%);
      filter: progid:dximagetransform.microsoft.gradient(startColorstr='#913fcf', endColorstr='#7079ff', GradientType=0);
    }
    &-chat {
      height: 55vh;
      &-list {
        position: relative;
        &-mask {
          position: absolute;
          top: -2rpx;
          z-index: 1;
          width: 750rpx;
          height: 50rpx;
          background: linear-gradient(180deg, #7079ff, #7079ff00);
          pointer-events: none;
        }
      }
      .input-box {
        width: 750rpx;
        height: 96rpx;
      }
    }
  }
}
.main-container-popup {
  position: absolute;
  z-index: 9999;
}
.main-container-tips{

}
.tips-bg {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.tips-dialog {
  &-user-tip {
    position: fixed;
    left: 38.46rpx;
    top: 206.82rpx;
    width: 461.54rpx;
    height: 222.03rpx;
  }
  &-skip {
    position: fixed;
    width: 153.85rpx;
    height: 76.92rpx;
  }
}
.loading {
  position: absolute;
  left: 50%;
  top: 24%;
  z-index: 10;
  transform: translateX(-50%);
  &-gif {
    width: 185rpx;
    height: 185rpx;
  }
}
@keyframes fade {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>

