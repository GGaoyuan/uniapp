<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, toRefs } from "vue";
import { forward } from "@/utils/router";
import profileApi from "@/api/profile";
import login from "@/components/login";
import Header from "@/components/header";
import allVideoApi from "@/api/all-video";
import allVoiceApi from "@/api/all-voice";
import loginApi from "@/api/loginApi";
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

const memberList = ref([]);

const userInfo = ref({});
const remindSelectInfo = ref({});
const remindSelect = ref(3); // 人称选择绑定字段
const remindWayOtherSelect = ref(0); // 给他人提醒绑定字段
const remindWayOwnSelect = ref(0); // 给自己提醒绑定字段
const isLogin = ref(false); // 是否登录
const vipStatus = ref(0);
const mockUser = ref([]);
const cVisible = ref(false);
const selectVideo = ref(""); // 默认选择的视频头像
const selectVoice = ref(""); // 默认选择的音频头像

onLoad((data) => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
  console.log("进入onload", data);
});

onShow(() => {
    getPlugin();
    goCheckToken();
    getRemindSelectData();
    reminderWaySelect();
    console.log("执行show结束");

});

onUpdated(() => {
  console.log("执行update结束");
})

onMounted(()=> {
  console.log("执行onMounted结束");
})


// 微信登录
const wxGetUserInfo = ()=> {
  uni.getUserProfile({
    desc:'Wexin',     // 这个参数是必须的
    success:res=>{
      console.log("用户信息",res.rawData)

      let res111 = getPlugin();
      console.log(res111, "我是初始化插件");
      uni.navigateTo({
          url: 'plugin://myPlugin/migulogin'
      })
    }
  })
}

function checkToken() {
  uni.getStorage({
    key: "token",
    success: (res) => {
      getUserInfo();
    },
    fail: () => {
      console.log("查询失败");
      isLogin.value = false;
      getVideoList();
      getVoiceList();
    },
  });
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

// 提醒人称控制函数
function reminderChange(val: number) {
  console.log(val, "我是传的值");
  remindSelect.value = val;
}

// 提醒他人控制函数
function reminderOtherMethodChange(val: number) {
  console.log(val, "我是入参");
  remindWayOtherSelect.value = val;
}

// 提醒自己控制函数
function reminderOwnMethodChange(val: number) {
  console.log(val, "我是入参");
  remindWayOwnSelect.value = val;
}

// 数据接口请求
// 查询用户数据
const mockAllUser = async () => {
  const res = await profileApi.mockAllUser({});

  mockUser.value = res;
  console.log(mockUser.value, "我是所有账号");
};

const loginStauts = async (data) => {
  getUserInfo();
  closeLoginPopup();
};

async function getUserInfo() {
  isLogin.value = true;
  userInfo.value = await profileApi.findHomePageUserInfo({});
  vipStatus.value = userInfo.value?.vipStatus;
  console.log(vipStatus.value, "我是会员状态");
  memberList.value = userInfo.value?.userRelation;
  remindWayOtherSelect.value = userInfo.value?.reminderWayConfig.remindOther;
  remindWayOwnSelect.value = userInfo.value?.reminderWayConfig.remindOwner;
  remindSelect.value = userInfo.value?.reminderContentSelect;
  uni.setStorageSync("userInfo", userInfo.value);

  console.log(remindWayOtherSelect.value, "我是用户信息");
}

// 未登录情况下获取视频列表数据
const getVideoList = async () => {
  const res = await allVideoApi.getVideoList({});
  console.log(res, "查询视频列表");

  selectVideo.value = res[0].smallAvatar;
};

// 未登录情况下获取音频列表数据
const getVoiceList = async () => {
  const res = await allVoiceApi.getVoiceList({});
  console.log(res, "查询音频列表");

  selectVoice.value = res[0]?.speakerAvatar;
};

// 查询提醒内容人称选择
async function getRemindSelectData() {
  remindSelectInfo.value = await profileApi.reminderContentSelect({});
  remindSelect.value = remindSelectInfo.value.personalSelect;
  console.log(remindSelect.value, "人称选择查询123");
}

// 查询提醒内容人称保存
async function remindSelectSave() {
  const resData: any = await profileApi.reminderContentSave({
    personalSelect: remindSelect.value,
  });

  if (resData == 1) {
    closePopup();
    getUserInfo();
  }

  console.log(resData, "人称选择保存信息返回");
}

// 查询提醒方式保存
async function reminderWaySelect() {
  const res = await profileApi.reminderWaySelect({});
  remindWayOtherSelect.value = res?.remindOther;
  remindWayOwnSelect.value = res?.remindOwner;
  console.log(res, "人称选择查询");
}

// 查询提醒方式保存
async function reminderWaySave() {
  const res: any = await profileApi.reminderWaySave({
    remindOther: remindWayOtherSelect.value,
    remindOwner: remindWayOwnSelect.value,
  });

  if (res == 1) {
    closeRemindPopup();
    getUserInfo();
  }

  console.log(res, "提醒方式提交返回");
}

// 创建弹窗引用
const remindPopup = ref(null);
const reminderMethodpopup = ref(null);
// const loginPopup = ref(null);

// 弹窗控制函数
function showPopup() {
  remindPopup.value.open("center");
  console.log(remindPopup.value); // 在onMounted钩子中获取DOM对象
}

function closePopup() {
  remindPopup.value.close();
}

function openLoginPopup() {
  cVisible.value = true;
}

function closeLoginPopup() {
  cVisible.value = false;
}

const loginPopupClose = (val) => {
  console.log(val, "我是登录关闭返回");
  closeLoginPopup();
};

function closeRemindPopup() {
  reminderMethodpopup.value.close();
}

function showMethodPopup() {
  reminderMethodpopup.value.open("center");
}

function closeMethodPopup() {
  reminderMethodpopup.value.open("center");
}

// 下面是页面跳转的函数
function goMyfamily() {
  forward("myFamily");
}

function goVoice() {
  forward("voice");
}

function goVideo() {
  forward("video");
}

function goGuide() {
  forward("guide");
}

function goFeedback() {
  forward("feedBack");
}

function goMemberBenefits() {
  forward("memberBenefits");
}

function goUserInfo() {
  forward("userInfo");
}
</script>

<template>
  <div class="personal-container">
    <Header title="个人设置"></Header>

    <div class="login-box" @click="openLoginPopup()" v-if="!isLogin">
      <div class="user-img">
        <image
          src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/user-img.png.png"
          alt="#"
        />
      </div>
      <div class="login-btn">
        <p>点击登录</p>
        <div class="btn-icon">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/login-icon.png"
            mode="#"
          ></image>
        </div>
      </div>
    </div>

    <div class="login-box icon" @click="goUserInfo()" v-if="isLogin">
      <div class="user-img">
        <image :src="userInfo.userInfoVO?.avatar" alt="#" />
        <!-- <div class="header-icon">
          <image src="../../static/profile/header-icon.png"></image>
        </div> -->
      </div>
      <div class="user-icon-box">
        <p class="user-name">{{ userInfo?.userInfoVO?.phone }}</p>
        <div class="btn-icon not-vip" v-if="vipStatus === 0">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/vip-icon-notvip.png"
            mode="#"
          ></image>
          <span class="icon-text">非会员</span>
        </div>
        <div class="btn-icon" v-if="vipStatus === 1">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/vip-icon-thrid.png"
            mode="#"
          ></image>
          <span class="icon-text">乐享会员</span>
        </div>
        <div class="btn-icon" v-if="vipStatus === 2">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/vip-icon-thrid.png"
            mode="#"
          ></image>
          <span class="icon-text">畅享会员</span>
        </div>
        <div class="btn-icon" v-if="vipStatus === 3">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/vip-icon-thrid.png"
            mode="#"
          ></image>
          <span class="icon-text">尊享会员</span>
        </div>
      </div>
    </div>

    <div
      class="not-vip-box"
      @click="goMemberBenefits()"
      v-if="!isLogin || vipStatus === 0"
    >
      <div class="vip-left">
        <p class="vip-title">开通会员</p>
        <p class="vip-text">AI亲情提醒，为家人设置温馨关护</p>
      </div>
      <div class="vip-right">开通会员</div>
    </div>

    <!-- 3元包页面 -->
    <div class="vip-box-3 vip-box" v-if="isLogin && vipStatus === 1">
      <div class="box-top" @click="goMemberBenefits()">
        <div class="box-top-left">
          <p class="text-title">亲情提醒·乐享包会员</p>
          <p class="text-content">连续包月会员，到期自动续费</p>
        </div>
        <!-- <div class="box-top-right">
          <div class="go-vip-button">升级会员</div>
        </div> -->
      </div>
      <div class="box-bottom">
        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/message-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindSmsLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/phone-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindVoiceLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/video-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindVideoLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/user-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.familyMembersLeft }}人</span
          >
        </div>
      </div>
    </div>

    <!-- 5元包页面 -->
    <div class="vip-box-5 vip-box" v-if="isLogin && vipStatus === 2">
      <div class="box-top" @click="goMemberBenefits()">
        <div class="box-top-left">
          <p class="text-title">亲情提醒·畅享包会员</p>
          <p class="text-content">连续包月会员，到期自动续费</p>
        </div>
        <!-- <div class="box-top-right">
          <div class="go-vip-button">升级会员</div>
        </div> -->
      </div>
      <div class="box-bottom">
        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/message-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindSmsLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/phone-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindVoiceLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/video-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindVideoLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/user-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.familyMembersLeft }}人</span
          >
        </div>
      </div>
    </div>

    <!-- 10元包页面 -->
    <div class="vip-box-10 vip-box" v-if="isLogin && vipStatus === 3">
      <div class="box-top" @click="goMemberBenefits()">
        <div class="box-top-left">
          <p class="text-title">亲情提醒·尊享包会员</p>
          <p class="text-content">连续包月会员，到期自动续费</p>
        </div>
        <!-- <div class="box-top-right">
          <div class="go-vip-button">续费</div>
        </div> -->
      </div>
      <div class="box-bottom">
        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/message-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindSmsLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/phone-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindVoiceLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/video-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.remindVideoLeft }}条</span
          >
        </div>

        <div class="bottom-icon-part">
          <div class="icon-box">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/user-icon.png"
              mode="#"
            ></image>
          </div>
          <span class="icon-text"
            >{{ userInfo.reminderWay.familyMembersLeft }}人</span
          >
        </div>
      </div>
    </div>

    <div class="scroll-container">
      <div class="scroll-box">
        <div class="my-family-box">
      <div class="my-family-top">
        <span class="box-title">我的家庭成员</span>
        <div class="add-family" @click="goMyfamily()">
          <image
            class="add-img"
            src="../../static/profile/add-family-icon.png"
          ></image>
          <span class="add-text">添加</span>
        </div>
      </div>

      <div class="member-list-box">
        <div class="member-list">
          <div
            class="member-part"
            v-for="(item, index) of memberList"
            :key="index"
          >
            <div class="member-img">
              <image :src="item.headImage" mode="#"></image>
            </div>
            <text class="member-name">{{ item.typeName }}</text>
          </div>
        </div>

        <!-- <div class="member-part add-member">
          <div class="member-img" @click="goMyfamily()">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/add-icon.png"
            ></image>
          </div>
          <text class="member-name">添加</text>
        </div> -->
      </div>
    </div>

    <div class="tab-list-box">
      <div class="tab-part" @click="goVoice()">
        <div class="tab-left">
          <text>语音外呼发音</text>
        </div>
        <div class="tab-right">
          <div class="tab-right-header-img">
            <image
              v-if="isLogin"
              :src="userInfo.voiceCallsSpeaker?.speakerAvatar"
            ></image>
            <image v-if="!isLogin" :src="selectVoice[0]?.speakerAvatar"></image>
          </div>
          <div class="text-icon">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/list-icon.png"
              mode="#"
            ></image>
          </div>
        </div>
      </div>
      <div class="tab-part" @click="goVideo()">
        <div class="tab-left">
          <text>视频外呼形象</text>
        </div>
        <div class="tab-right">
          <div class="tab-right-header-img">
            <image
              v-if="isLogin"
              :src="userInfo.videoCallsPerson?.smallAvatar"
            ></image>
            <image v-if="!isLogin" :src="selectVideo[0]?.smallAvatar"></image>
          </div>
          <div class="text-icon">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/list-icon.png"
              mode="#"
            ></image>
          </div>
        </div>
      </div>
      <!-- <div class="tab-part" @click="showPopup()">
        <div class="tab-left">
          <text>提醒内容人称</text>
        </div>
        <div class="tab-right">
          <text
            class="tab-right-text"
            v-if="
              isLogin
                ? userInfo.reminderContentSelect === 1
                : remindSelect === 1
            "
            >第一人称</text
          >
          <text
            class="tab-right-text"
            v-if="userInfo.reminderContentSelect === 0 || remindSelect === 0"
            >第三人称</text
          >
          <div class="text-icon">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/list-icon.png"
              mode="#"
            ></image>
          </div>
        </div>
      </div> -->
      <div class="tab-part" @click="showMethodPopup()">
        <div class="tab-left">
          <text>默认提醒方式</text>
        </div>
        <div class="tab-right">
          <!-- <text
            class="tab-right-text"
            v-if="
              userInfo.reminderWayConfig?.remindOther === 0
            "
            >微信提醒</text
          > -->
          <text
            class="tab-right-text"
            v-if="
              userInfo.reminderWayConfig?.remindOther === 2 || remindWayOtherSelect === 2
            "
            >语音提醒</text
          >
          <text
            class="tab-right-text"
            v-if="
              userInfo.reminderWayConfig?.remindOther === 3 || remindWayOtherSelect === 3
            "
            >视频提醒</text
          >
          <text
            class="tab-right-text"
            v-if="
              userInfo.reminderWayConfig?.remindOther === 1 || remindWayOtherSelect === 1
            "
            >短信提醒</text
          >
          <!-- <text
            class="tab-right-text"
            v-if="
              userInfo.reminderWayConfig?.remindOther === 0
            "
            >微信提醒</text
          > -->
          <div class="text-icon">
            <image
              src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/list-icon.png"
              mode="#"
            ></image>
          </div>
        </div>
      </div>
    </div>

    <div class="guide-box">
      <div class="guide-list" @click="goGuide()">
        <div class="guide-left">
          <text>新手指导</text>
        </div>
        <div class="text-icon">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/list-icon.png"
            mode="#"
          ></image>
        </div>
      </div>

      <div class="guide-list" @click="goFeedback()">
        <div class="guide-left">
          <text>意见反馈</text>
        </div>
        <div class="text-icon">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/list-icon.png"
            mode="#"
          ></image>
        </div>
      </div>
    </div>
      </div>

    </div>



    <uni-popup ref="remindPopup" type="bottom">
      <div class="remind-popup">
        <p class="remind-title">提醒内容人称</p>
        <div class="remind-example">
          <p class="example-text">
            <span class="example-title">需求示例</span
            >：女儿让妈妈帮忙接孙女放学
          </p>
        </div>
        <div class="remind-box">
          <div class="thrid-remind">
            <div
              class="remind-icon"
              v-if="remindSelect != 0"
              @click="reminderChange(0)"
            >
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-not-select-icon.png"
                mode="#"
              ></image>
            </div>
            <div class="remind-icon" v-if="remindSelect == 0">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-select-icon.png"
                mode="#"
              ></image>
            </div>
          </div>
          <div class="remind-content">
            <p class="remind-content-title">第三人称</p>
            <p class="remind-text">
              <span class="remind-header">通话示例</span>
              ：您好，您有一个来自女儿的提醒，您的女儿希望您下午帮忙去接孙女放学回家
            </p>
          </div>
        </div>

        <div class="remind-box">
          <div class="thrid-remind">
            <div
              class="remind-icon"
              v-if="remindSelect != 1"
              @click="reminderChange(1)"
            >
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-not-select-icon.png"
                mode="#"
              ></image>
            </div>
            <div class="remind-icon" v-if="remindSelect == 1">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-select-icon.png"
                mode="#"
              ></image>
            </div>
          </div>
          <div class="remind-content">
            <p class="remind-content-title">第一人称</p>
            <p class="remind-text">
              <span class="remind-header">通话示例</span>
              ：您好，您有一个来自女儿的提醒，您的女儿希望您下午帮忙去接孙女放学回家
            </p>
          </div>
        </div>

        <div class="button-group">
          <div class="cancel-btn" @click="closePopup()">取消</div>
          <div class="confirm-btn" @click="remindSelectSave()">确认</div>
        </div>
      </div>
    </uni-popup>

    <uni-popup ref="reminderMethodpopup" type="bottom">
      <div class="reminder-method-box">
        <p class="reminder-method-title">默认提醒方式</p>
        <p class="reminder-method-text">
          若您输入提醒的事项时为明确提醒方式时，为您默认推荐：
        </p>
        <p class="method-way-text">给他人提醒：</p>

        <div class="reminder-icon-box">
          <div
            class="reminder-icon"
            :class="{ active: remindWayOtherSelect === 2 }"
            @click="reminderOtherMethodChange(2)"
          >
            <div class="icon-image">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-phone.png"
                mode="#"
              ></image>
            </div>
            <p class="icon-text">语音提醒</p>
            <div class="remind-select-icon" v-if="remindWayOtherSelect === 2">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-active.png"
                mode="#"
              ></image>
            </div>
          </div>

          <div
            class="reminder-icon"
            :class="{ active: remindWayOtherSelect === 3 }"
            @click="reminderOtherMethodChange(3)"
          >
            <div class="icon-image">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-video.png"
                mode="#"
              ></image>
            </div>
            <p class="icon-text">视频提醒</p>
            <div class="remind-select-icon" v-if="remindWayOtherSelect === 3">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-active.png"
                mode="#"
              ></image>
            </div>
          </div>

          <!-- <div
            class="reminder-icon"
            :class="{ active: remindWayOtherSelect === 1 }"
            @click="reminderOtherMethodChange(1)"
          >
            <div class="icon-image">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-text.png"
                mode="#"
              ></image>
            </div>
            <p class="icon-text">短信提醒</p>
            <div class="remind-select-icon" v-if="remindWayOtherSelect === 1">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-active.png"
                mode="#"
              ></image>
            </div>
          </div> -->
        </div>

        <p class="method-way-text method-own">给自己提醒：</p>

        <div class="reminder-icon-box">
          <div
            class="reminder-icon"
            :class="{ active: remindWayOwnSelect === 2 }"
            @click="reminderOwnMethodChange(2)"
          >
            <div class="icon-image">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-phone.png"
                mode="#"
              ></image>
            </div>
            <p class="icon-text">语音提醒</p>
            <div class="remind-select-icon" v-if="remindWayOwnSelect === 2">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-active.png"
                mode="#"
              ></image>
            </div>
          </div>

          <div
            class="reminder-icon"
            :class="{ active: remindWayOwnSelect === 3 }"
            @click="reminderOwnMethodChange(3)"
          >
            <div class="icon-image">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-video.png"
                mode="#"
              ></image>
            </div>
            <p class="icon-text">视频提醒</p>
            <div class="remind-select-icon" v-if="remindWayOwnSelect === 3">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-active.png"
                mode="#"
              ></image>
            </div>
          </div>

          <div
            class="reminder-icon"
            :class="{ active: remindWayOwnSelect === 1 }"
            @click="reminderOwnMethodChange(1)"
          >
            <div class="icon-image">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-text.png"
                mode="#"
              ></image>
            </div>
            <p class="icon-text">短信提醒</p>
            <div class="remind-select-icon" v-if="remindWayOwnSelect === 1">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-active.png"
                mode="#"
              ></image>
            </div>
          </div>

          <!-- <div
            class="reminder-icon"
            :class="{ active: remindWayOwnSelect === 0 }"
            @click="reminderOwnMethodChange(0)"
          >
            <div class="icon-image">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-weixin.png"
                mode="#"
              ></image>
            </div>
            <p class="icon-text">微信提醒</p>
            <div class="remind-select-icon" v-if="remindWayOwnSelect === 0">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/remind-active.png"
                mode="#"
              ></image>
            </div>
          </div> -->
        </div>

        <div class="button-group">
          <div class="cancel-btn" @click="closeRemindPopup()">取消</div>
          <div class="confirm-btn" @click="reminderWaySave()">确认</div>
        </div>
      </div>
    </uni-popup>

    <login
      :visible="cVisible"
      @confirm="loginStauts"
      @close="loginPopupClose"
    ></login>
  </div>
</template>

<style lang="scss" scoped>
.personal-container {
  box-sizing: border-box;
  padding: 38rpx;
  padding-top: 107rpx;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #d8daff 0%, #f5f5f5 40%, #f5f5f5 100%);
  .login-box {
    display: flex;
    align-items: center;
    margin-top: 58rpx;
    .user-img {
      position: relative;
      border: 5rpx solid #fff;
      border-radius: 26.92rpx;
      width: 123.08rpx;
      height: 123.08rpx;
      image {
        border-radius: 26.92rpx;
        width: 100%;
        height: 100%;
      }
    }
    .login-btn {
      display: flex;
      align-items: center;
      margin-left: 34.62rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      font-size: 38.46rpx;
      color: #272727;
      .btn-icon {
        margin-left: 19.23rpx;
        width: 38.46rpx;
        height: 38.46rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .login-box.icon {
    .user-img {
      .header-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 38.46rpx;
        height: 38.46rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .user-icon-box {
      align-self: flex-end;
      margin-left: 38rpx;
      .user-name {
        text-align: left;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        font-size: 38.46prx;
        color: #272727;
      }
      .btn-icon {
        display: flex;
        align-items: center;
        margin-top: 11rpx;
        border-radius: 21.15rpx;
        width: 169.23rpx;
        height: 42.31rpx;
        background: #5d67ff;
        image {
          margin-left: 9rpx;
          width: 42.31rpx;
          height: 42.31rpx;
        }
        .icon-text {
          margin-left: 7rpx;
          text-align: left;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 23.08rpx;
          color: #fff;
        }
      }
      .not-vip {
        width: 138rpx;
        background: #f5f5f5;
        .icon-text {
          color: #999;
        }
      }
    }
  }
  .not-vip-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-top: 34.62rpx;
    padding: 32rpx 38rpx 34rpx;
    width: 100%;
    height: 153.85rpx;
    background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/open-vip-bg.png')
      no-repeat;
    background-size: 100% 100%;
    .vip-left {
      .vip-title {
        font-family: FZLTTHK, FZLTTHK-Regular;
        font-weight: 600;
        font-size: 34.62rpx;
        color: #fff;
      }
      .vip-text {
        margin-top: 11.54rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 23.08rpx;
        color: #fff;
      }
    }
    .vip-right {
      border-radius: 30.77rpx;
      width: 161.54rpx;
      height: 61.54rpx;
      background: #7079ff;
      line-height: 61.54rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 26.92rpx;
      color: #fff;
    }
  }
  .vip-box {
    box-sizing: border-box;
    margin-top: 38.25rpx;
    padding: 32.69rpx 38.46rpx 38.46rpx;
    width: 100%;
    height: 253.85rpx;
    .box-top {
      display: flex;
      justify-content: space-between;
      .box-top-left {
        .text-title {
          text-align: left;
          font-family: FZLTTHK, FZLTTHK-Regular;
          font-weight: bold;
          font-size: 34.62rpx;
          color: #fff;
        }
        .text-content {
          margin-top: 11rpx;
          text-align: left;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 23.08rpx;
          color: #fff;
        }
      }
      .box-top-right {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30.77rpx;
        width: 161.54rpx;
        height: 61.54rpx;
        background: #fdefdf;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 26.92rpx;
        color: #a67b4e;
      }
    }
    .box-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 57.69rpx;
      .bottom-icon-part {
        display: flex;
        align-items: center;
        .icon-box {
          width: 34.62rpx;
          height: 34.62rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .icon-text {
          margin-left: 7.69rpx;
          text-align: left;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          font-size: 26.92rpx;
          color: #fff;
        }
      }
    }
  }
  .vip-box-3 {
    background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/vip-three-bg.png')
      no-repeat;
    background-size: 100% 100%;
  }
  .vip-box-5 {
    background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/vip-five-bg.png')
      no-repeat;
    background-size: 100% 100%;
  }
  .vip-box-10 {
    background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/vip-ten-bg.png')
      no-repeat;
    background-size: 100% 100%;
  }
  .scroll-container {
    overflow: hidden;
    width: 100%;
    height: 950rpx;
    .scroll-box {
      overflow-y: auto;
      height: 100%;
    }
    .scroll-box::-webkit-scrollbar {
      display: none;
    }
  }
  .my-family-box {
    box-sizing: border-box;
    margin-top: 38.46rpx;
    padding: 38.42rpx;
    border-radius: 26.92rpx;
    width: 100%;
    // height: 330.77rpx;
    min-height: 119rpx;
    background: #fff;
    .my-family-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .box-title {
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 600;
        font-size: 30.77rpx;
        color: #272727;
      }
      .add-family {
        display: flex;
        align-items: center;
        height: 36rpx;
        .add-img {
          margin-right: 8rpx;
          width: 36rpx;
          height: 36rpx;
        }
        .add-text {
          text-align: left;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 26.92rpx;
          color: #272727;
        }
      }
    }
    .member-list-box {
      display: flex;
      overflow: hidden;
      justify-content: space-between;
      margin-top: 38.46rpx;
      width: 100%;
      .member-list {
        display: flex;
        overflow-x: auto;
        justify-content: space-between;
        .member-part {
          margin-left: 38.46rpx;
          width: 115.38rpx;
          text-align: center;
          .member-img {
            margin-bottom: 19rpx;
            border-radius: 26.92rpx;
            width: 115.38rpx;
            height: 115.38rpx;
            background: #d6d6d8;
            image {
              border-radius: 26.92rpx;
              width: 100%;
              height: 100%;
            }
          }
          .member-name {
            text-align: left;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            font-size: 26.92rpx;
            color: #272727;
          }
        }
        .member-part:nth-child(1) {
          margin-left: 0;
        }
      }
      .member-list::-webkit-scrollbar {
        display: none;
      }
      .add-member {
        width: 115.38rpx;
        text-align: center;
        .member-img {
          border-radius: 26.92rpx;
          width: 115.38rpx;
          height: 115.38rpx;
          background: unset;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .tab-list-box {
    box-sizing: border-box;
    margin-top: 38.46rpx;
    padding: 38.46rpx;
    border-radius: 26.92rpx;
    width: 100%;
    background: #fff;
    .tab-part {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50rpx;
      .tab-left {
        text-align: right;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 600;
        font-size: 30.77rpx;
        color: #272727;
      }
      .tab-right {
        display: flex;
        align-items: center;
        .tab-right-text {
          margin-right: 19.23rpx;
          text-align: left;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 30.77rpx;
          color: #999;
        }
        .tab-right-header-img {
          margin-right: 19rpx;
          border: 1.92px solid #fff;
          border-radius: 15.38rpx;
          width: 57.69rpx;
          height: 57.69rpx;
          background: #d6d6d8;
          image {
            border-radius: 15.38rpx;
            width: 100%;
            height: 100%;
          }
        }
        .text-icon {
          width: 38.46rpx;
          height: 38.46rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .tab-part:nth-child(1) {
      margin-top: 0;
    }
    .tab-part:nth-child(3) {
      margin-top: 57rpx;
    }
    .tab-part:nth-child(4) {
      margin-top: 57rpx;
    }
  }
  .guide-box {
    box-sizing: border-box;
    margin-top: 38.46rpx;
    padding: 19px;
    border-radius: 13.46px;
    width: 100%;
    height: 109.62px;
    background: #fff;
    .guide-list {
      display: flex;
      justify-content: space-between;
      margin-top: 28px;
      .guide-left {
        text-align: right;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 600;
        font-size: 15.38px;
        color: #272727;
      }
      .text-icon {
        width: 38.46rpx;
        height: 38.46rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .guide-list:nth-child(1) {
      margin-top: 0;
    }
  }
  .remind-popup {
    box-sizing: border-box;
    padding: 36rpx 38rpx 57rpx;
    border-radius: 38.46rpx;
    width: 596.15rpx;
    height: 923.08rpx;
    background: #fff;
    .remind-title {
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: bold;
      font-size: 38.46rpx;
      color: #272727;
    }
    .remind-example {
      box-sizing: border-box;
      margin-top: 38.46rpx;
      padding: 19rpx;
      border-radius: 15.38rpx;
      width: 519.23rpx;
      height: 76.92rpx;
      background: #f5f5f5;
      .example-text {
        text-align: left;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 26.92rpx;
        color: #272727;
      }
      .example-title {
        color: #7079ff;
      }
    }
    .remind-box {
      display: flex;
      margin-top: 55.77rpx;
      .thrid-remind {
        display: flex;
        .remind-icon {
          width: 46.15rpx;
          height: 46.15rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .remind-content {
        margin-left: 19.23rpx;
        .remind-content-title {
          text-align: left;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: bold;
          font-size: 34.62rpx;
          color: #272727;
        }
        .remind-text {
          margin-top: 19.23rpx;
          line-height: 46.15rpx;
          text-align: left;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 26.92rpx;
          color: #999;
        }
        .remind-header {
          color: #7079ff;
        }
      }
    }
    .button-group {
      display: flex;
      justify-content: space-around;
      margin-top: 57rpx;
      width: 100%;
      .cancel-btn {
        border-radius: 48rpx;
        width: 230rpx;
        height: 96rpx;
        background: #f5f5f5;
        line-height: 96rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 38rpx;
        color: #999;
      }
      .confirm-btn {
        border-radius: 48rpx;
        width: 230rpx;
        height: 96rpx;
        background: #7079ff;
        line-height: 96.15rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 38rpx;
        color: #fff;
      }
    }
  }
  .reminder-method-box {
    box-sizing: border-box;
    padding: 38rpx 38rpx 57rpx;
    border-radius: 38.46rpx;
    width: 596.15rpx;
    height: 961.54rpx;
    background: #fff;
    .reminder-method-title {
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: bold;
      font-size: 38.46rpx;
      color: #272727;
    }
    .reminder-method-text {
      margin-top: 19.23rpx;
      line-height: 46.15rpx;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 26.92rpx;
      color: #999;
    }
    .method-way-text {
      margin-top: 19.23rpx;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: bold;
      font-size: 34.62rpx;
      color: #272727;
    }
    .method-own {
      margin-top: 39rpx;
    }
    .reminder-icon-box {
      display: flex;
      margin-top: 38rpx;
      .reminder-icon {
        position: relative;
        box-sizing: border-box;
        margin-left: 19rpx;
        padding: 26rpx 11rpx 21rpx;
        border-radius: 19.23rpx;
        width: 115.38rpx;
        height: 157.69rpx;
        background: #f5f5f5;
        .icon-image {
          margin: auto;
          width: 57.69rpx;
          height: 57.69rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .icon-text {
          margin-top: 17rpx;
          text-align: center;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 23.08rpx;
          color: #666;
        }
        .remind-select-icon {
          position: absolute;
          right: 0;
          top: 0;
          width: 38.46rpx;
          height: 38.46rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .reminder-icon:nth-child(1) {
        margin-left: 0;
      }
      .reminder-icon.active {
        background: rgba(112, 121, 255, 0.1);
        .icon-text {
          color: #7079ff;
        }
      }
    }
    .button-group {
      display: flex;
      justify-content: space-around;
      margin-top: 57rpx;
      width: 100%;
      .cancel-btn {
        border-radius: 48rpx;
        width: 230rpx;
        height: 96rpx;
        background: #f5f5f5;
        line-height: 96rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 38rpx;
        color: #999;
      }
      .confirm-btn {
        border-radius: 48rpx;
        width: 230rpx;
        height: 96rpx;
        background: #7079ff;
        line-height: 96.15rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 38rpx;
        color: #fff;
      }
    }
  }
  .login-popup-box {
    padding-top: 57rpx;
    padding-bottom: 87rpx;
    border-radius: 57.69rpx 57.69rpx 0 0;
    width: 100%;
    // height: 300rpx;
    background: #fff;
    .login-text {
      margin-top: 57.69rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      color: #222;
    }
  }
}
</style>
