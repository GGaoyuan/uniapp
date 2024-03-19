<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, defineComponent, defineExpose } from "vue";
import { forward, back } from "@/utils/router";
import allVoiceApi from "@/api/all-voice";
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

const videoList = ref([
  { name: "111", id: "1", target: 100 },
  { name: "222", id: "2", target: 70 },
  { name: "333", id: "3", target: 80 },
]);

// const progress = ref(0);

const target = ref(0);
const modelVale = ref(0);
const isPlayVideo = ref(false);
const nowPlay = ref(0);
const nowSelect = ref(-1);
const selectData = ref({});

// 声明音频对象
const innerAudioContext = uni.createInnerAudioContext();

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
});

onMounted(() => {
  getVoiceList();
});

onBeforeUnmount(() => {
  console.log("执行销毁");
  innerAudioContext.destroy();
})

const selectDataChange = async (item, index,str) => {
  nowSelect.value = index;
  selectData.value = item;
  console.log(selectData.value,str,'strstrstr');

};

const getVoiceList = async () => {
  const res = await allVoiceApi.getVoiceList({});
  videoList.value = res;
  console.log(res, "视频列表");
};

const saveSelectVoice = async () => {
  const res = await allVoiceApi.saveOrUpdate({
    id: selectData.value.id,
  });

  back(-1);
  console.log(res, "视频列表");
};

function confirm() {
  console.log("进行选择");
}

const initVoice = (item, index, status) => {
  console.log(item.audioExamples);
  console.log(innerAudioContext, "我是音频对象");
  nowPlay.value = index;
  innerAudioContext.src = item.audioExamples;
  //可以开始播放了
  innerAudioContext.onCanplay(() => {
    const getTime = setInterval(() => {
      if (innerAudioContext.duration !== 0) {
        clearInterval(getTime);
        // console.log(innerAudioContext.duration, "我是音频时长1");
      }
      // console.log(innerAudioContext.duration, "我是音频时长");
    }, 500);
  });

  let proportion = 0

  innerAudioContext.onTimeUpdate((data) => {
    proportion = innerAudioContext.currentTime / innerAudioContext.duration;
    target.value = 100 * proportion;
    // console.log(proportion, "播放进度更新");
    // console.log(target.value, "我是进度条目标");
  })

  if (status === 'play') {
    innerAudioContext.play();
    isPlayVideo.value = true;
    selectDataChange(item, index, '内部');
  } else {
    innerAudioContext.stop();
    isPlayVideo.value = false;
  }

}

onBeforeUnmount(() => {
  innerAudioContext.stop();
  console.log("执行暂停");
});
</script>


<template>
  <div class="voice-container">
    <div class="voice-list">
      <div
        class="voice-box"
        v-for="(item, index) of videoList"
        :key="index"
        @click="selectDataChange(item, index,'外部')"
        :class="{ active: nowSelect === index }"
      >
        <div class="box-img" :style="{  background: 'url(' + item.speakerAvatar + ')',}" style="background-size: 100% 100%;">
          <div
            class="box-icon"
            @click.stop="initVoice(item, index, 'play')"
            v-if="!isPlayVideo || nowPlay !== index"
          >
            <image src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/all-voice/play-icon.png" alt="#" />
          </div>
          <div class="box-icon"  v-if="isPlayVideo && nowPlay === index">
            <l-circle
              class="progress-box"
              v-model:current="modelVale"
              :percent="target"
              size="70rpx"
              strokeColor="#ffffff"

            >
              <div   class="stop-icon" @click.stop="initVoice(item, index, 'close')">
                <image src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/all-voice/stop-icon.png" alt="#" />
              </div>
            </l-circle>
          </div>

          <div class="select-icon" v-if="nowSelect === index">
            <image src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/all-voice/select-icon.png" alt="#" />
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-box">
      <div class="add-button" @click="saveSelectVoice()">确定</div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.voice-container {
  padding-bottom: 241.54rpx;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  .voice-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 48rpx;
    .voice-box {
      margin-top: 38rpx;
      width: 192.31rpx;
      .box-img {
        position: relative;
        border-radius: 26.92rpx;
        width: 192.31rpx;
        height: 192.31rpx;
        background: #d6d6d6;
        .box-icon {
          position: absolute;
          left: 19.23rpx;
          bottom: 19.23rpx;
          width: 61.54rpx;
          height: 61.54rpx;
        }
        .select-icon {
          position: absolute;
          right: 0;
          top: 0;
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
  .voice-list::after {
    width: 192.31rpx;
    content: '';
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
