<script lang="ts" setup>
import { reactive, ref, defineComponent } from "vue";
import { forward, back } from "@/utils/router";
import { onShareAppMessage } from "@dcloudio/uni-app";
import activityApi from "@/api/activity-page";

onLoad((option) => {
  console.log(option, "我是入参");
  templateId.value = option.templateId;
  isShare.value = option.share;
  getShareInfo();
});

onMounted(() => {
  if (isShare.value === 'false') {
    setTimeout(() => {
      uni.showToast({
        title: "设置成功",
      });
    }, 100);
  }
});

onShow(() => {
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
const templateId = ref("");
const isShare = ref('');
let templateImage = ref({});

const getUserToken = () => {
  userToken.value = uni.getStorageSync("token");
  payUrl.value =
    "https://ivr.migu.cn/ai-family-butler/static/pay-ai-manage/#/?token=" +
    userToken.value +
    "&productId=" +
    productId.value;
  console.log(payUrl.value, "我是跳转url");
};

const getShareInfo = () => {
  activityApi
    .share({
      templateId: templateId.value,
    })
    .then((res) => {
      templateImage.value = res;
      console.log(templateImage.value, "我是分享回调");
    });
};

// 一键粘贴功能
const goSetClipBoard = () => {
  uni.setClipboardData({
    data: "快过年了，我给你留了一段心声， 注意接听1253077的电话", // 设置要复制的文本内容
    success(res) {
      console.log("成功复制到剪贴板");
    },
    fail(err) {
      console.error("复制失败", err);
    },
  });
};

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

const goBack = () => {
  back(-1);
};

// 回到活动首页
const goActivity = () => {
  forward("activity-page");
};

// 回到AI亲情管家首页
const goHomePage = () => {
  forward("index");
};

const goMyWish = () => {
  forward("activity-h5-page", {
    goType: "wish",
  });
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
    <div class="share-box">
      <image show-menu-by-longpress :src="templateImage" alt="#" />
    </div>
    <p class="share-text">长按保存图片，分享至朋友圈</p>
    <div class="copy-box">
      <div class="copy-content">
        <div class="copy-text">
          快过年了，我给你留了一段心声， 注意接听1253077的电话
        </div>
        <div class="copy-btn" @click="goSetClipBoard()">复制</div>
      </div>
      <div class="copy-tip">复制内容提醒爸妈接听来电</div>
    </div>

    <div class="bottom-box">
      <!-- <div class="bottom-text"></div> -->
      <div></div>
      <button v-if="!isShare" class="go-wish-btn" style="" open-type="share">
        传递祝福
      </button>
      <button v-if="isShare" class="go-wish-btn" @click="goActivity()">
        参加活动
      </button>
      <div class="more-care" @click="goHomePage()">
        <image
          src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/activity-img/more.png"
        />
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.home-container {
  position: relative;
  box-sizing: border-box;
  padding: 40rpx 40rpx 60px;
  width: 100%;
  min-height: 100vh;
  background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/activity-img/setting-bg.png')
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
  .share-box {
    margin: 30rpx auto 38rpx;
    width: 570rpx;
    height: 1018rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .share-text {
    text-align: center;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    font-size: 24rpx;
    color: #a05356;
  }
  .copy-box {
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 30rpx;
    padding: 29rpx;
    border-radius: 30rpx;
    width: 572rpx;
    height: 161rpx;
    background: #ed8790;
    font-weight: 400;
    font-size: 28rpx;
    .copy-content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .copy-text {
        width: 399rpx;
        height: 69rpx;
        line-height: 42rpx;
        font-family: PingFang SC, PingFang SC-Regular;
        color: #fff;
      }
      .copy-btn {
        border-radius: 27rpx;
        width: 100rpx;
        height: 54rpx;
        // opacity: 0.6;
        background: rgba(255, 41, 60, 0.6);
        line-height: 54rpx;
        text-align: center;
        font-family: PingFang SC, PingFang SC-Regular;
        color: #fff;
      }
    }
    .copy-tip {
      margin: 19rpx auto 70rpx;
      height: 24rpx;
      line-height: 42rpx;
      text-align: left;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      font-size: 24rpx;
      color: #a05356;
    }
  }
  .bottom-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .bottom-text {
      margin: 0 auto 35rpx;
      width: 521rpx;
      height: 293rpx;
      background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/activity-img/next-year-b.png')
        no-repeat;
      background-size: 100% 100%;

      // p {
      //   font-size: 28rpx;
      //   font-family: Microsoft YaHei;
      //   font-weight: 400;
      //   text-align: center;
      //   color: #181818;
      //   margin-top: 5rpx;
      // }
    }
    .go-wish-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      margin-right: 40rpx;
      margin-top: 35rpx;
      border-radius: 50rpx;
      width: 480rpx;
      height: 100rpx;
      background: #ff293c;
      font-family: Microsoft YaHei;
      font-weight: 600;
      font-size: 42rpx;
      color: #fefeff;
    }
    .more-care {
      margin-right: -40rpx;
      width: 105rpx;
      height: 100rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content-top {
    position: relative;
    // display: flex;
    height: 676rpx;
    .content-top-left {
      position: absolute;
      top: 148rpx;
      .content-top-left-name {
        font-family: FZLanTingHei-EB-GBK, FZLanTingHei-EB-GBK-Regular;
        font-weight: 800;
        font-size: 56rpx;
        // text-align: justifyLeft;
        color: #181818;
      }
      .content-top-left-text {
        margin-top: 20rpx;
        line-height: 48rpx;
        text-align: left;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 500;
        font-size: 32rpx;
        color: #181818;
      }
    }
    .content-top-right {
      // float: right;
      position: absolute;
      right: 0;
      width: 547rpx;
      height: 676rpx;
      background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/activity-img/next-time.png')
        no-repeat;
      background-size: 100% 100%;
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
