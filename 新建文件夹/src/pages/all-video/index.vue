<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, defineComponent, defineExpose } from "vue";
import { forward, back } from "@/utils/router";
import allVideoApi from "@/api/all-video";
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

// const videoList = reactive([
//   { name: "111", id: "1", target: 100 },
//   { name: "222", id: "2", target: 70 },
//   { name: "333", id: "3", target: 80 },
// ]);

const target = ref(0);
const modelVale = ref(0);
const isPlayVideo = ref(false);
const nowPlay = ref(0);
const videoList = ref([]);
const userInfo = ref({});
const nowSelect = ref(-1);
const selectData = ref({});
const nowPlayVideo = ref(null);
const addPlayTime = ref(0);
const totalTime = ref(0);

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
});

onMounted(() => {
  getVideoInfo();
  nowPlayVideo.value = uni.createVideoContext("video");
  console.log(nowPlayVideo.value, "我是video DOM");
});

// function checkToken() {
//   uni.getStorage({
//     key: "userInfo",
//     success: (res) => {
//       userInfo.value = res;
//       console.log(res, "查询成功");
//     },
//     fail: () => {
//       // uni.showModal({
//       //   title: "读取数据失败",
//       //   content: "找不到 key 对应的数据",
//       //   showCancel: false,
//       // });
//     },
//   });
// }

const selectChange = (item, index) => {
  console.log("进入change事件");
  
  nowSelect.value = index;
  selectData.value = item;
  // if (!isPlayVideo) {
  //   playvideo(item, index);
  // }
};

// 数据请求函数
async function getVideoInfo() {
  const res = await allVideoApi.getVideoList({});

  videoList.value = res;
  console.log(videoList.value, "我是数据返回");
}

const saveSelectVideo = async () => {
  const res = await allVideoApi.saveOrUpdate({
    id: selectData.value.id,
  });

  back(-1);

  console.log(res, "我是保存返回");
};

function confirm() {
  console.log("进行选择");
}

const playTimeUpdate = (data) => {
  let sile = data.detail.currentTime / data.detail.duration;
  target.value = sile * 100;
};

const loadEnd = (data) => {
  console.log(data);
  isPlayVideo.value = false;
  totalTime.value = data.detail.duration;
};

const stopVideo = () => {
  console.log("进入停止事件");
  nowPlayVideo.value.pause();
  isPlayVideo.value = false;
};

function playvideo(item, index) {
  nowSelect.value = index;
  nowPlay.value = index;
  isPlayVideo.value = true;
  setTimeout(() => {
    console.log(nowPlayVideo.value, "当前视频对象");
    
    nowPlayVideo.value.play();
    nowPlayVideo.value.requestFullScreen();
  }, 500);
}

// 关闭全屏播放
const quitFull = ref(false)
const quitFullScreen = (data) => {
  console.log(data, "退出全屏播放");
  if (!data.detail.fullScreen) {
    stopVideo();
  }
}
</script>


<template>
  <div class="video-container">
    <div class="video-list">
      <div
        class="video-box"
        v-for="(item, index) of videoList"
        :key="index"
        @click="selectChange(item, index)"
        :class="{ active: nowSelect === index }"
      >
        <div class="video-avatar">
          <image :src="item.videoAvatar"></image>
        </div>

        <video
          v-if="nowSelect === index"
          id="video"
          ref="nowPlayVideo"
          class="video-play-box"
          :src="item.videoExamples"
          @play="videoPlay"
          @pause="videoPause"
          @ended="videoEnd"
          @loadedmetadata="loadEnd"
          @timeupdate="playTimeUpdate"
          @fullscreenchange="quitFullScreen"
        ></video>

        <div class="box-img">
          <div
            class="box-icon"
            @click="playvideo(item, index)"
          >
            <image src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/all-voice/preview.png" alt="#" />
          </div>
          <!-- <div class="box-icon" v-if="isPlayVideo && nowSelect === index">
            <l-circle
              class="progress-box"
              v-model:current="modelVale"
              :percent="target"
              size="70rpx"
              strokeColor="#ffffff"
              v-if="isPlayVideo && nowPlay === index"
            >
              <div class="stop-icon" @click="stopVideo">
                <image src="../../static/all-voice/stop-icon.png" alt="#" />
              </div>
            </l-circle>
          </div> -->

          <div class="select-icon" v-if="nowSelect === index">
            <image src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/all-voice/select-icon.png" alt="#" />
          </div>
        </div>
        <!-- <p>{{ item.videoName }}</p> -->
      </div>
    </div>

    <div class="bottom-box">
      <div class="add-button" @click="saveSelectVideo()">确定</div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.video-container {
  padding-bottom: 241.54rpx;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  .video-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 48rpx;
    .video-box {
      position: relative;
      margin-top: 38rpx;
      border-radius: 26.92rpx;
      width: 317.31rpx;
      height: 565.38rpx;
      background: #d6d6d6;
      .video-play-box {
        position: absolute;
        left: 10rpx;
        top: 20rpx;
        width: 300rpx;
        height: 300rpx;
      }
      .video-avatar {
        position: absolute;
        top: 0;
        z-index: 9;
        width: 317.31rpx;
        height: 565.38rpx;
        image {
          border-radius: 26.92rpx;
          width: 100%;
          height: 100%;
        }
      }
      .box-img {
        .box-icon {
          position: absolute;
          left: 19.23rpx;
          bottom: 19.23rpx;
          z-index: 99;
          width: 61.54rpx;
          height: 61.54rpx;
        }
        .select-icon {
          position: absolute;
          right: 0;
          top: 0;
          z-index: 99;
          width: 57.69rpx;
          height: 57.69rpx;
        }
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .progress-box {
    .stop-icon {
      margin: auto;
      width: 61.54rpx;
      height: 61.54rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .bottom-box {
    position: fixed;
    bottom: 0;
    z-index: 999;
    box-sizing: border-box;
    padding-top: 57rpx;
    width: 100%;
    height: 211.54rpx;
    background: #fff;
    .add-button {
      margin: 0 auto;
      border-radius: 48.08rpx;
      width: 423.08rpx;
      height: 96.15rpx;
      background: #7079ff;
      line-height: 96.15rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      color: #fff;
    }
  }
}
</style>