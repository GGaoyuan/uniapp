<script lang="ts" setup>
import { reactive, ref, defineComponent } from "vue";
import { forward, back } from "@/utils/router";
import { onShareAppMessage } from "@dcloudio/uni-app";
import login from "@/components/login/index.vue";
import profileApi from "@/api/profile";
import loginApi from "@/api/loginApi";

onLoad((option) => {
  console.log(option, "我是入参");
  //   productId.value = option.productId;
  //   getUserToken();
});

onShow(() => {
  getPlugin();
  goCheckToken();
  innerAudioContext.play();
  console.log("执行播放");
});
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.src =
  "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/music/new-year-music.mp3";
const isPlayMusic = ref(true);

const playStatusChange = () => {
  if (isPlayMusic.value) {
    isPlayMusic.value = false;
    innerAudioContext.pause();
  } else {
    isPlayMusic.value = true;
    innerAudioContext.play();
  }
};

onBeforeUnmount(() => {
  innerAudioContext.stop();
  console.log("执行暂停");
});

const userToken = ref("");
const payUrl = ref("");
const productId = ref("");
const id = ref("12312312313");
const loginVisible = ref(false);
const userInfo = ref({});
const isLoigin = ref(false);

// 获取用户信息
async function getUserInfo() {
  userInfo.value = await profileApi.findHomePageUserInfo({}); // 用户信息
  uni.setStorageSync("userInfo", userInfo.value);
  console.log(userInfo.value, "我是用户信息");
}

// 初始化
const getPlugin = () => {
  let _plugin;

  if (!_plugin) {
    _plugin = requirePlugin("myPlugin");
    // 初始化，更新默认配置
    _plugin.setOptions?.({
      requestDomain: "https://passport.migu.cn",
      sourceId: "220055",
      skin: "music",
      protocols: [
        ["服务协议", "/pages/protocol"],
        ["隐私政策", "/pages/privacy"],
      ],
    });
  }
  return _plugin;
};

// 检查用户token
function goCheckToken() {
  getPlugin().apiGetMiguToken({
    success: (miguToken) => {
      console.log("用户已登录，获取的一级token为:", miguToken);
      const userInfo = getPlugin().getMiguUserInfo();
      console.log(userInfo, "我是用户信息");
      isLoigin.value = true;

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
        isLoigin.value = false;
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

// 登陆状态
function loginStauts(data) {
  loginVisible.value = false;
  getUserInfo();
}

const loginPopupClose = (val) => {
  loginVisible.value = false;
};

// 1.发送给朋友
onShareAppMessage((res) => {
  id.value = "321321321321321";
  return {
    title: "AI亲情提醒",
    path: `pages/main/index`,
  };
  // return res;
});
//2.分享到朋友圈
const onShareTimeline = (res) => {
  return res;
};

const goShare = () => {
  if (!isLoigin.value) {
    loginVisible.value = true;
    return;
  }

  innerAudioContext.stop();

  forward("activity-h5-page", {
    goType: "home",
  });
};
const goMyWish = () => {
  if (!isLoigin.value) {
    loginVisible.value = true;
    return;
  }

  innerAudioContext.stop();

  forward("activity-h5-page", {
    goType: "wish",
  });
};

const goBack = () => {
  back(-1);
};
</script>


<template>
  <div class="home-container">
    <div class="home-header">
      <div class="go-back-img" :class="{ an: isPlayMusic }">
        <img
          v-if="isPlayMusic"
          @click="playStatusChange()"
          src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/activity-img/music-play-icon.png"
          alt="#"
        />
        <img
          v-if="!isPlayMusic"
           @click="playStatusChange()"
          src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/activity-img/music-pause-icon.png"
          alt="#"
        />
      </div>
      <div class="my-wish" @click="goMyWish()">我的祝福</div>
    </div>

    <div class="bottom-box">
      <div class="bottom-text">
        <p class="text-part">视频电话传递给父母的祝福，你可以</p>
        <p class="text-part">給爸爸妈妈汇报今年的成就</p>
        <p class="text-part">说说明年的打算和安排，让爸妈放心</p>
      </div>
      <button class="go-wish-btn" @click="goShare">定制祝福</button>
    </div>

    <login
      :visible="loginVisible"
      @confirm="loginStauts"
      @close="loginPopupClose"
    ></login>
  </div>
</template>



<style lang="scss" scoped>
.home-container {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 60rpx 40rpx;
  width: 100%;
  height: 100vh;
  background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/activity-img/home-bg.png')
    no-repeat;
  background-size: 100% 100%;
  .home-header {
    display: flex;
    justify-content: space-between;
    .go-back-img {
      width: 60rpx;
      height: 60rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .my-wish {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 30rpx;
      width: 172rpx;
      height: 60rpx;
      background: rgba(24, 24, 24, 0.4);
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #fefeff;
    }
  }
  .bottom-box {
    display: flex;
    position: absolute;
    bottom: 60rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: -40rpx;
    width: 100%;
    .bottom-text {
      margin-bottom: 60rpx;
      text-align: center;
      .text-part {
        margin-top: 10rpx;
        text-align: center;
        font-family: Microsoft YaHei;
        font-weight: 400;
        font-size: 28rpx;
        color: #181818;
      }
    }
    .go-wish-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      border-radius: 50rpx;
      width: 480rpx;
      height: 100rpx;
      background: #ff293c;
      font-family: Microsoft YaHei;
      font-weight: 600;
      font-size: 42rpx;
      color: #fefeff;
    }
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.an {
  animation: rotation 8s infinite linear;
}
</style>
