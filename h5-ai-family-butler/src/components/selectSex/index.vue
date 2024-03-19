<script setup lang="ts">
import profileApi from "@/api/profile";
import userInfoApi from "@/api/userinfo"
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  sex: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(["confirm", "close"]);
watch(
  () => props.visible,
  (newVal, oldVal) => {
    if (newVal) {
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      dialogShow();
    } else {
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      dialogClose();
    }
  }
);

const sexPopup = ref<any>(null);
const selectSex = ref<any>(-1);
const dialogShow = () => {
  sexPopup.value.open();
};
const dialogClose = () => {
  emits("close");
  sexPopup.value.close();
};

const mockUser = ref([]);
const userInfo = ref({});

const openPopup = () => {
  sexPopup.value.open();
};

const closePopup = () => {
  sexPopup.value.close();
  emits("close");
};

const clickMask = (val) => {
  emits("close");
}

const changeSelectSex = (val)=> {
    selectSex.value = val;
    console.log(selectSex.value, "我是选择的性别");
}

//变更性别请求
const changeSex = async ()=> {
    const res = await userInfoApi.saveSex({sex: selectSex.value})
    console.log(res);
    emits("confirm", selectSex.value);
    closePopup();
}


onMounted(() => {
    selectSex.value = props.sex;
    console.log(selectSex.value, '引入弹窗');
  if (props.visible) {
    dialogShow();
  }
});

onShow(() => {
    selectSex.value = props.sex;
    console.log(selectSex.value, '引入弹窗');
    
  if (props.visible) {
    dialogShow();
  }
});
</script>

<template>
    <uni-popup
        
      ref="sexPopup"
      type="center"
      @maskClick="clickMask"
    >
        <div class="sex-popup-box">
            <p class="sex-title">请选择你的性别</p>

            <div class="sex-box man-box" :class="{ active: selectSex === 1 }" @click="changeSelectSex(1)">
                <image class="sex-icon" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/select-sex/man.png"></image>
                <p>我是男生</p>
                <image v-if="selectSex === 1" class="select-icon" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/select-sex/select-sex-icon.png"></image>
            </div>
            <div class="sex-box madam-box" :class="{ active: selectSex === 0 }" @click="changeSelectSex(0)">
                <image class="sex-icon" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/select-sex/madam.png"></image>
                <p>我是女生</p>
                <image v-if="selectSex === 0" class="select-icon" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/select-sex/select-sex-icon.png"></image>
            </div>

            <p class="sex-info">在您选择性别后，提醒中可以更好的提示您的家人是来自谁的提醒消息。</p>
            <p class="sex-example">如：您有一条来自女儿的亲情提醒</p>

            <div class="popup-button-group">
                <div class="popup-button cancel-button" @click="closePopup()">取消</div>
                <div class="popup-button next-button" @click="changeSex()">下一步</div>
            </div>

        </div>
    </uni-popup>
</template>

<style scoped lang="scss">
.sex-popup-box {
  box-sizing: border-box;
  padding: 38rpx 38rpx 57rpx;
  border-radius: 38.46rpx;
  width: 596.15rpx;
  height: 838.46rpx;
  background: #fff;
  .sex-title {
    text-align: center;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    font-size: 38.46rpx;
    color: #272727;
  }
  .sex-box {
    display: flex;
    position: relative;
    align-items: center;
    box-sizing: border-box;
    padding: 26rpx 19rpx;
    border-radius: 26.92rpx;
    width: 519.23rpx;
    height: 134.62rpx;
    .sex-icon {
      width: 80.77rpx;
      height: 80.77rpx;
    }
    .select-icon {
      position: absolute;
      right: 0;
      top: 0;
      width: 57.69rpx;
      height: 57.69rpx;
    }
  }
  .man-box {
    margin-top: 57rpx;
    background: #eaf7ff;
  }
  .madam-box {
    margin-top: 38rpx;
    background: #ffeefc;
  }
  .sex-info {
    margin-top: 38rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    font-size: 26.92rpx;
    color: #999;
  }
  .sex-example {
    margin-top: 15rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    font-size: 26.92rpx;
    color: #7079ff;
  }
  .popup-button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 57rpx;
    .popup-button {
      border-radius: 48.08rpx;
      width: 230.77rpx;
      height: 96.15rpx;
      line-height: 96rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      color: #999;
    }
    .cancel-button {
      background: #f5f5f5;
      color: #999;
    }
    .next-button {
      background: #7079ff;
      color: #fff;
    }
  }
}
</style>
