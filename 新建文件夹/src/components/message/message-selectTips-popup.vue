<template>
  <uni-popup
      ref="popupRef"
      type="bottom"
      :safe-area="false"
      :mask-background-color="0x00000000"
      @maskClick="popupClose"
  >
    <div class="popup-box">
      <view class="popup-box-head">
        <div class="popup-box-head-title">
          <image class="popup-box-head-title-back" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/select_tip_back.png" @click="popupClose" />
          <view class="popup-box-head-title-text">为您推荐</view>
        </div>
        <image
          class="popup-box-head-pic"
          :src="prompts.tabbarList[selectIndex]?.tagPicture"
          :animation="tipAniType === 1 ? showpic : hidepic"
        ></image>
      </view>

      <scroll-view   :enable-flex="true" @scroll="scrollView" :scroll-x="true" show-scrollbar="false" scroll-with-animation :scroll-left="cscrollLeft" class="popup-box-content" id="popup-box-content" :style="prompts.tabbarList.length>0&&selectIndex==prompts.tabbarList.length-1?'padding-right: 38rpx':''">
        <view
          v-for="(item, index) in prompts.tabbarList"
          :key="index"
          class="popup-box-content-tabbar-item"
          :class="[index === selectIndex ? 'popup-box-content-tabbar-select' : 'popup-box-content-tabbar']"
          @click="getPrompts(index)"
        >
          <view
            :class="[index === selectIndex ? 'tabbar-text-select' : 'tabbar-text']"
          >
            {{ item.typeName }}
          </view>
        </view>
      </scroll-view>
      <view class="popup-box-list">
        <view
          v-for="(item, index) in prompts.promptList"
          :key="index"
          class="popup-box-list-item"
          :style="index==0?'margin-top: 35rpx' :''"
        >
          <view class="popup-box-list-item-text">{{ item.copywriting }}</view>
          <div class="popup-box-list-item-placeholder"></div>
          <image class="popup-box-list-item-add" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/mainPage/main_tips_care_add.png" @click="addPrompt(item.copywriting )" alt="" />
        </view>
      </view>
    </div>
  </uni-popup>
</template>

<script setup lang="ts">
import { messageCenter } from "@/components/ipViewComponents/core/message/MessageCenter";
import { sleep } from "@/uni_modules/lime-shared";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const animation= uni.createAnimation({
  timingFunction: 'ease',
  // transformOrigin: "0 100%",
  // duration: 3000,
  // timingFunction: "ease-out",
  // delay: 3000
})

const showpic = ref(null);
const hidepic = ref(null);
const tipAniType = ref(1);
const selectType = ref({});
const selectTypeId = ref(0);
const sendType = ref(0);

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
const selectIndex = ref(0);
const prompts: any = reactive({
  tabbarList: [],
  promptList: []
})
const popupRef = ref<any>(null);
const popupShow = () => {
  popupRef.value.open();
};
const popupClose = () => {
  selectTypeId.value = -1;
  popupRef.value.close();
  messageCenter.dispatch('closeMessageSelectPopup');
};
const contentScrollW =ref(0)
const cscrollLeft=ref(0)
//实例化getCurrentInstance
let _this = getCurrentInstance();
function scrollView(e) {
  // contentScrollW.value = e.detail.scrollLeft;
  console.log(e,'scrollView');

}

function getPrompts (index?: number) {
  if (prompts.tabbarList.length) {
    selectIndex.value = index;
    prompts.promptList = [...prompts.tabbarList[index].copyWritingConfigList];

    getPicIndex();

    tipAniType.value = 0;
    sleep(1000);
    tipAniType.value = 1;

    const query = uni.createSelectorQuery().in(_this)
    let  container:any =query.select('#popup-box-content')


        query.selectAll('.popup-box-content-tabbar-item').boundingClientRect(data => {
          let _width = 0

          for (let i = 0; i < index; i++) {
            _width += data[i].width
          }
          console.log(data,'datadatadata===',_width);

          // 当大于屏幕一半的宽度则滚动，否则就设置位置为0
          const _clientWidth = uni.getSystemInfoSync().windowWidth / 2;
          if (_width > _clientWidth-50) {
            cscrollLeft.value = _width + data[index].width /2  - _clientWidth ;
            console.log(cscrollLeft.value,'scrollLeft.value',_clientWidth);

          } else {
            cscrollLeft.value = 0;
          }
        }).exec()

        container.scrollOffset({
            scrollLeft: cscrollLeft.value,
				})

  }
}

function getPicIndex () {
  let pUrl = '';
  console.log('selectIndex.value', selectIndex.value)
}

function changePompts (data, type) {
  // console.log(data, type, "我是changePompts");

  if (data) {
    prompts.tabbarList = [...data];

    if (sendType.value === 1) {
      let index = prompts.tabbarList.findIndex(item => item.id === selectTypeId.value);
      if (index === -1) {
        index = 0
      }
      // console.log(index, "我是Index");

      ckeckTypeId(index);
    } else {
      getPrompts(0);
    }

  }
}

const selectTypeChange = (data)=> {
  // console.log(prompts.tabbarList, "我是全部列表", selectTypeId.value);
  selectIndex.value = prompts.tabbarList.findIndex(item => item.id === selectTypeId.value);
  // console.log(data, "我是当前选择的id");
  sendType.value = 1;
  selectTypeId.value = data;
}

const ckeckTypeId = (index)=> {
      selectIndex.value = prompts.tabbarList.findIndex(item => item.id === selectTypeId.value);
      prompts.promptList = [...prompts.tabbarList[index].copyWritingConfigList];

      if (selectIndex.value == -1) {
        selectIndex.value = 0;
      }
      // console.log(prompts.tabbarList, "我是全部列表", selectTypeId.value);
      // console.log(selectIndex.value, "我是筛选出来的下标");


      getPicIndex();

      tipAniType.value = 0;
      sleep(1000);
      tipAniType.value = 1;
}

function addPrompt (prompt) {
  messageCenter.dispatch('addMessage', prompt);

  popupClose();
}

onMounted(() => {
  if (props.visible) {
    popupShow();
  }

  //淡入
  animation.opacity(1).step({duration:3000,delay:1000});
  showpic.value = animation.export();

  //淡出
  animation.opacity(0).step({duration:3000,delay:1000});
  hidepic.value = animation.export();

  tipAniType.value = 1;

  messageCenter.listen('sendPrompts', changePompts, this);
  messageCenter.listen('sendType', selectTypeChange, this);
});

</script>

<style scoped lang="scss">
:deep ::-webkit-scrollbar {
    display: block !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: auto !important;
    background: transparent !important;
    color: transparent !important;
  }
.element {
  // margin-left: 200px;
  animation: slide-in-from-left 1s ease-out;
}
@keyframes slide-in-from-left {
  0% {
    transform: translateX(-50%);
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;

  }
}

.popup-box {
  overflow: hidden;
  position: relative;
  bottom: 0;
  border-radius: 57rpx 57rpx 0rpx 0rpx;
  width: 750rpx;
  height: 55vh;
  background: linear-gradient(180deg, #dee0ff, #fff 40%);
  &-head {
    display: flex;
    justify-content: space-between;
    &-title {
      display: flex;
      margin-left: 38rpx;
      margin-top: 57rpx;
      &-back {
        padding-right: 19rpx;
        padding-top: 8rpx;
        width: 38rpx;
        height: 38rpx;
      }
      &-text {
        line-height: 53rpx;
        text-align: left;
        font-family: 'Microsoft YaHei';
        font-weight: 500;
        font-size: 38rpx;
        color: #272727;
      }
    }
    &-pic {
      margin-right: 19rpx;
      width: 180rpx;
      height: 148rpx;
    }
  }
  &-content {
    display: flex;
    // width: auto;
    overflow-x: auto;
    height: 80rpx;
    // min-height: 34rpx;
    // margin-left: 38rpx;
    padding-left: 38rpx;
    // margin-top: 38rpx;
    margin-top: 26rpx;
    box-sizing: border-box;

    width: 750rpx;
    &-tabbar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      margin-right: 26rpx;
      border-radius: 34rpx;
      width: 169rpx;
      height: 69rpx;
      background: #fff;
    }
    &-tabbar-select {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      margin-right: 26rpx;
      border-radius: 34rpx;
      width: 169rpx;
      height: 69rpx;
      background: #7079ff;
    }
  }
  &-content::-webkit-scrollbar {
    display: block !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: auto !important;
    background: transparent !important;
    color: transparent !important;
  }
  &-list {
    overflow-y: auto;
    margin-left: 38rpx;
    margin-right: 38rpx;
    height: 560rpx;
    &-item {
      display: flex;
      // justify-content: space-between;
      margin-top: 57rpx;
      // margin-bottom: 19rpx;
      &-add {
        width: 38rpx;
        height: 38rpx;
      }
      &-placeholder {
        margin-left: 10rpx;
      }
      &-text {
        overflow: hidden;
        width: 660rpx;
        line-height: 42rpx;
        text-overflow: ellipsis;
        text-align: left;
        font-family: 'Microsoft YaHei';
        font-weight: 500;
        font-size: 30rpx;
        color: #272727;
        white-space: nowrap;
      }
    }
  }
  &-list::-webkit-scrollbar {
    display: none;
  }
}
.tabbar-text {
  line-height: 38rpx;
  text-align: left;
  font-family: 'Microsoft YaHei';
  font-weight: 500;
  font-size: 26rpx;
  color: #272727;
}
.tabbar-text-select {
  line-height: 38rpx;
  text-align: left;
  font-family: 'Microsoft YaHei';
  font-weight: 500;
  font-size: 26rpx;
  color: #fff;
}

</style>
