<template>
  <uni-popup
      ref="popupRef"
      type="bottom"
      :safe-area="false"
      :mask-background-color="0x00000000"
      @maskClick="popupClose"
  >
    <view class="recorder">
      <view class="recorder-rect"></view>
      <!-- recorderText.length === 0 &&  -->
      <view class="recorder-top" v-if="!showTop">
        <view class="recorder-top-tip">{{playStatus ? '松开完成录制' : '长按录制语音'}}</view>
      </view>
      <!-- recorderText.length > 0 && -->
      <text class="recorder-text" v-if="showTop">{{ recorderText }}</text>

      <!-- <div class="recorder-wave"  v-if="!showTop && playStatus"> -->
      <view class="recorder-wave" ref="waveRef"  v-if="!showTop">
        <image class="recorder-wave-gif" :src="animateWave" alt="" v-show="playStatus" />
        <!-- <view class="recorder-wave-item" id="recorder-wave-item-0"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-1"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-2"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-3"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-4"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-5"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-6"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-7"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-8"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-9"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-10"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-11"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-12"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-13"></view>
        <view class="recorder-wave-item" id="recorder-wave-item-14"></view> -->
      </view>
      <view class="recorder-box"
        v-if="!showTop"
        @longpress="onStartRecoder"
        @touchend="onEndRecoder"
        :style="!playStatus ? 'opacity: 1' : 'opacity: 0.2'"
      >
          <image class="recorder-box-voice" :src="voice" mode="aspectFit" ></image>
      </view>

      <view class="recorder-buttom" v-if="showTop">
        <view class="recorder-buttom-cancel" @click="cancel">重新录制</view>
        <view class="recorder-buttom-confirm" @click="confirm">确定</view>
      </view>
      <!-- <view class="recorder-box"
        @click="reset"
      ></view> -->
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
  import { ref, defineExpose, onMounted } from "vue";
  import { ise } from '@/components/record/IseComponent';
  import { messageCenter } from '@/components/ipViewComponents/core/message/MessageCenter';

  import voice from '@/static/recording/voice.png';
  import animateWave from '@/static/recording/animateWave.png';

  const recorderManager = uni.getRecorderManager();


  const recorderText = ref('');
  const playStatus = ref(false);
  const finish = ref(false);
  const timer = ref(null);
  const showTop = ref(false);
  const emits = defineEmits([
    'confirm'
  ]);

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    maximum: {
      type: Number,
      default: 15
    }
  });

  watch(
    () => props.visible,
    (newVal, oldVal) => {
      if (newVal) {
        popupShow();
      } else {
        popupClose();
      }
    }
  );

  const waveRef = ref<any>(null);
  const popupRef = ref<any>(null);
  const popupShow = () => {
    popupRef.value.open();

    playStatus.value = false;
    recorderText.value = '';
    showTop.value = false;
  };
  const popupClose = () => {
    popupRef.value.close();
    emits('confirm', recorderText.value);
  };


  // const waveInterval = ref(null);
  const query = uni.createSelectorQuery();
  onMounted(() => {
    if (props.visible) {
      popupShow();
    }

    // recordShow();
    // 录制开始
    // playStatus.value = false;
    // recorderText.value = '';
    // showTop.value = false;
    recorderManager.onStart(() => {
      recorderText.value = '';
      // uni.showLoading({
      //   title: '录制中...'
      // });
    })
    // 录制结束
    recorderManager.onStop(({ tempFilePath }) => {
      clearInterval(timer.value);
      // uni.hideLoading();
      finish.value = true;
      playStatus.value = false;
      showTop.value = true;
    })

    messageCenter.listen('sttMessage', sttMessageHandler, this);

    // ---------------------------------音波，获取不到ref暂时注释----------------------------------------
    // if (waveInterval.value) {
    //   clearInterval(waveInterval.value);
    //   waveInterval.value = null;
    // }

    // setTimeout(() => {
    //   waveInterval.value = setInterval(() => {
    //     if (playStatus.value) {
    //       for(let i = 0; i < 15; i++) {
    //         console.log('waveRef.value', waveRef.value)
    //         // let height = 100 * Math.sin(Math.PI / 10 * i) * Math.random()
    //         // ele.style = `transition: height 0.15s ease; height:${height}px;`
    //       }
    //     }
    //   }, 150);
    // }, 1000);

  });

  function sttMessageHandler (e) {
    console.log('sttMessageHandler', e)
    if (e.retCode === '000000') {
      if (e?.result?.text) {
        recorderText.value = e.result.text;
      }
    }
  }

  // 完成事件
  function confirm () {
    console.log('完成')
    popupClose();
  }

  // 取消事件
  function cancel () {
    console.log('cancel')
    showTop.value = false;
  }

  // 重新录制
  function reset () {
    finish.value = false;
    console.log('reset');
  }

  // 录制结束
  function onEndRecoder () {
    console.log('onEndRecoder')
    recorderManager.stop();

    // 延时发送结束指令
    setTimeout(() => {
      console.log('延时发送结束指令 endPushAudioData')
      ise.endPushAudioData()
    }, 500);
  }

  // 开始录制
  function onStartRecoder () {
    playStatus.value = true;
    showTop.value = false;
    recorderManager.start({
      duration: props.maximum * 1000,
      audioSource: 'auto',
      sampleRate: 16000,
      encodeBitRate: 96000,
      numberOfChannels: 1,
      frameSize: 2,
      // format: 'mp3',
      format: 'PCM',
    });

    recorderManager.onFrameRecorded((res) => {
        // frameBuffer	ArrayBuffer	录音分片结果数据
        // isLastFrame	Boolean	当前帧是否正常录音结束前的最后一帧
        const { frameBuffer, isLastFrame } = res;
        ise.pushAudioData(frameBuffer);

        // 结束录制消息
        if (isLastFrame) {
          console.log('结束录制消息 ')
        }
    })
  }

</script>

<style lang="scss">
.recorder {
  display: flex;
  position: relative;
  z-index: 11;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  border-radius: 57rpx 57rpx 0 0;
  width: 100%;
  height: 705rpx;
  background-color: #fff;
  font-size: 24rpx;
  &-text {
    position: relative;
    // margin-bottom: 88rpx;
    margin-left: 76rpx;
    margin-right: 76rpx;
    margin-top: 38rpx;
    width: 596rpx;
    height: 382rpx;
    line-height: 53rpx;
    text-align: left;
    font-family: 'Microsoft YaHei';
    font-weight: 600;
    font-size: 38rpx;
    color: #272727;
  }
  &-rect {
    margin-top: 38rpx;
    border-radius: 8rpx;
    width: 77rpx;
    height: 15rpx;
    background: #f5f5f5;
  }
  &-top {
    margin-top: 38rpx;
    &-tip {
      width: 100%;
      line-height: 42rpx;
      text-align: left;
      text-align: center;
      font-family: 'Microsoft YaHei';
      font-weight: 400;
      font-size: 30rpx;
      color: #999;
    }
  }
  &-buttom {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-left: 76rpx;
    margin-right: 76rpx;
    margin-top: 76rpx;
    font-size: 28rpx;
    &-cancel {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 48rpx;
      width: 269rpx;
      height: 96rpx;
      background: #7079ff19;
      line-height: 53rpx;
      font-family: 'Microsoft YaHei';
      font-weight: 500;
      font-size: 38rpx;
      color: #7079ff;
    }
    &-confirm {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 57rpx;
      border-radius: 48rpx;
      width: 269rpx;
      height: 96rpx;
      background: #7079ff;
      line-height: 53rpx;
      font-family: 'Microsoft YaHei';
      font-weight: 500;
      font-size: 38rpx;
      color: #fff;
    }
  }
  &-box {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 57rpx;
    width: 230rpx;
    height: 115rpx;
    background: #7079ff;
    &-voice {
      width: 61rpx;
      height: 61rpx;
    }
  }
  &-wave {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 159rpx;
    margin-bottom: 161rpx;
    width: 303rpx;
    height: 57rpx;
    &-gif {
      width: 303rpx;
      height: 57rpx;
    }
    // &-item {
    //   background-color: #7079FF;
    //   width: 10rpx;
    //   margin-right: 8rpx;
    //   border-radius: 57rpx 57rpx 0rpx 0rpx;
    // }
  }
}
</style>
