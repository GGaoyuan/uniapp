<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, defineComponent, defineExpose } from "vue";
import { forward } from "@/utils/router";
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

const info = [
  {
    colorClass: "uni-bg-red",
    url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
    content: "内容 A",
  },
  {
    colorClass: "uni-bg-green",
    url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
    content: "内容 B",
  },
  {
    colorClass: "uni-bg-blue",
    url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
    content: "内容 C",
  },
];
const contentList = [
  {
    url: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/header-img-1.png",
    contentHeader: "您好，我是AI亲情提醒助手",
    contentDetail:
      "我能够帮您创建提醒任务，并在约定的时间通过语音、视频等方式提醒您或您的家人。",
  },
  {
    url: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/header-img-2.png",
    contentHeader: "查看我的使用说明",
    contentDetail:
      "点击下方的新手引导和场景体验，您可以了解如何使用我更加高效地管理您的时间和任务。",
  },
  {
    url: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/header-img-3.png",
    contentHeader: "快速开始",
    contentDetail: "当然，您也可以点击 “立即进入”直接开始创建任务哦！",
  },
];

const modeIndex = -1;
const styleIndex = -1;
const current = ref(0);
const mode = "default";
const dotsStyles = [
  {
    backgroundColor: "#D9D9D9",
    color: "#fff",
    selectedBackgroundColor: "#272727",
    borderRadius: '6rpx'
  },
  {
    backgroundColor: "#D9D9D9",
    color: "#fff",
    selectedBackgroundColor: "#272727",
    borderRadius: '6rpx'
  },
  {
    backgroundColor: "#D9D9D9",
    color: "#fff",
    selectedBackgroundColor: "#272727",
    borderRadius: '6rpx'
  },
];
const swiperDotIndex = ref(0);

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
});

function confirm() {
  console.log("进行选择");
}

function listChange(val) {
  console.log(val, "我是变化");
}

const goMain = () => {
  forward("index");
};

const goGuide = () => {
  forward("guide");
};

const swiperChange = (e) => {
  current.value = e.detail.current;
};
</script>


<template>
  <div class="first-guide-container">
    <uni-swiper-dot
      class="uni-swiper-dot-box"
      :info="info"
      :current="current"
      :mode="mode"
      :dots-styles="dotsStyles"
      field="content"
    >
      <swiper
        class="swiper-box"
        :current="swiperDotIndex"
        :autoplay="true"
        @change="swiperChange"
      >
        <swiper-item v-for="(item, index) in contentList" :key="index">
          <div class="swiper-item" :class="'swiper-item' + index">
            <image class="icon-header" :src="item.url" alt="#" />
            <p class="content-title">{{ item.contentHeader }}</p>
            <p class="content-detail">{{ item.contentDetail }}</p>
          </div>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>

    <div class="guide-bottom-container">
      <div class="guide-box">
        <div class="go-main" @click="goMain()">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/go-main.png"
          ></image>
        </div>
        <div class="go-guide" @click="goGuide()">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/new-guide.png"
          ></image>
        </div>
      </div>
      <div class="guide-bottom" @click="goMain()">立即进入</div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.first-guide-container {
  box-sizing: border-box;
  padding-top: 244rpx;
  width: 100%;
  height: 100vh;
  background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/first-guide/first-guide-bg.png')
    no-repeat;
  background-size: 100% 100%;
  .swiper-box {
    height: 800rpx;
    .icon-header {
      display: block;
      margin: auto;
      width: 386.54rpx;
      height: 490rpx;
    }
    .content-title {
      margin-top: 57rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      font-size: 46.15rpx;
      color: #272727;
    }
    .content-detail {
      margin: auto;
      margin-top: 38rpx;
      width: 634.62rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 30.77rpx;
      color: #272727;
    }
  }
  .guide-bottom-container {
    box-sizing: border-box;
    padding: 0 57rpx;
    width: 100%;
    .guide-box {
      display: flex;
      justify-content: space-between;
      margin-top: 57rpx;
      .go-main {
        width: 298.08rpx;
        height: 257.69rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .go-guide {
        width: 298.08rpx;
        height: 257.69rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .guide-bottom {
      margin-top: 101rpx;
      border-radius: 26.92rpx;
      width: 634.62rpx;
      height: 115.38rpx;
      background: #272727;
      line-height: 115rpx;
      text-align: center;
      font-family: FZLTZCHJW, FZLTZCHJW-Regular;
      font-weight: 600;
      font-size: 38.46rpx;
      color: #fff;
    }
  }
}

</style>