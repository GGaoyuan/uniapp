<script setup lang="ts">
import reminderApi from '@/api/reminder';
import defaultPng from '@/static/reminder/default-icon.png';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => ({})
  }
});

const emits = defineEmits(['confirm', 'close']);
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

const formData = ref<any>({});
const formStatus = ref(false); // 表单是否显示，编辑、新增状态有
const confirmAble = computed(() => {
  return formData.value.phone && formData.value.code;
});
const dialogRef = ref<any>(null);
const dialogShow = () => {
  formData.value = { ...props.data };
  if (!formData.value.id) {
    formStatus.value = true;
  }
  dialogRef.value.open();
};
const dialogClose = () => {
  emits('close');

  dialogRef.value.close();
  setTimeout(() => {
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    clearData();
  }, 500);
};
const confirmFn = (type: any) => {
  const req = {
    typeId: formData.value.typeId,
    id: formData.value.id,
    heardImageId: formData.value.typeId,
    phone: formData.value.phone,
    code: formData.value.code
  };
  if (!formData.value.typeId) {
    uni.showToast({
      title: '请选择人物关系'
    });
    return;
  }

  reminderApi.relationSave(req).then(() => {
    emits('confirm', type);
    dialogRef.value.close();
    setTimeout(() => {
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      clearData();
    }, 500);
  });
};

const changeEdit = () => {
  formStatus.value = true;
};
const delFn = () => {
  // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
  if(formData.value.typeName=='自己'){
    uni.showToast({
      title: '不能删除自己',
      icon: 'error'
    });
    return
  }
  confirmShow();
};
const confirmDel = async () => {
  await reminderApi.relationDel({ id: formData.value.id });
  dialogRef.value.close();

  emits('confirm', 'del');
  // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
  confirmClose();
};
const leftTime = ref(59);
const smsBtnMsg = ref('获取验证码');
let timer = null;
// 获取严严重码
const getVerCode = async () => {
  if (smsBtnMsg.value !== '获取验证码') {
    return;
  }
  const res = await reminderApi.relationSms({ phone: formData.value.phone });
  formData.value.code = res;
  timer = setInterval(() => {
    if (leftTime.value < 0) {
      smsBtnMsg.value = '获取验证码';
      leftTime.value = 59;
      clearInterval(timer);
    } else {
      smsBtnMsg.value = `${leftTime.value--}s`;
    }
  }, 1000);
};

const popupRef = ref<any>(null);
// 获取对象列表
const targetList = ref<any>([]);
const getTargetFn = async () => {
  const res = await reminderApi.findType({
    rangeFlag: 2
  });
  targetList.value = res;
};
const openPopup = () => {
  popupRef.value.open();
  getTargetFn();
};

const closePopup = () => {
  popupRef.value.close();
};
const changeTargeFn = (item: any) => {
  formData.value.typeName = item.typeName;
  formData.value.typeId = item.id;
  formData.value.headImage = item.headImage;
};
const confirmSelect = () => {
  popupRef.value.close();
};

const confirmRef = ref<any>(null);
const confirmShow = () => {
  confirmRef.value.open();
};
const confirmClose = () => {
  confirmRef.value.close();
};

const clearData = () => {
  clearInterval(timer);
  leftTime.value = 59;
  smsBtnMsg.value = '获取验证码';
  formStatus.value = false;
};
onMounted(() => {
  if (props.visible) {
    dialogShow();
  }
});
</script>

<template>
  <view>
    <uni-popup
      ref="dialogRef"
      type="center"
      :mask-click="false"
      :is-mask-click="false"
    >
      <view class="container">
        <view class="c-content">
          <image
            class="c-close"
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/close.png"
            @click="dialogClose"
          ></image>
          <image
            class="c-content-logo"
            :src="formData.headImage || defaultPng"
          ></image>
          <view v-if="formStatus">
            <view v-if="!data.id" class="c-content-select" @click="openPopup">
              <view>选择人物关系</view>
              <image class="item-right" src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/right.png" />
            </view>
            <view v-else class="c-content-role">{{ data.typeName }}</view>
            <view class="c-content-form">
              <view class="c-content-item">
                <view class="c-content-input-layout">
                  <view class="c-content-input">
                    <input
                      v-model="formData.phone"
                      class="uni-input"
                      placeholder="请输入提醒号码"
                      :maxlength="11"
                    />
                  </view>
                </view>
              </view>

              <view class="c-content-item">
                <view class="c-content-input-layout short">
                  <view class="c-content-input">
                    <input
                      v-model="formData.code"
                      class="uni-input"
                      placeholder="请输入验证码"
                    />
                  </view>
                </view>
                <view class="c-content-btn" @click="getVerCode">{{
                  smsBtnMsg
                }}</view>
              </view>
              <view class="c-content-footer">
                <view
                  v-if="formData.id"
                  class="c-conetnt-footer_del"
                  @click="delFn"
                ></view>
                <view
                  class="c-content-footer__btn"
                  :class="[confirmAble ? 'able' : 'disable']"
                  @click="confirmFn('add')"
                  >确定</view
                >
              </view>
              <!-- <view class="c-content-footer"></view> -->
            </view>
          </view>
          <view v-else>
            <view class="c-content-role">{{ data.typeName }}</view>
            <view class="c-content-c">
              <view class="c-content-c__phone">{{ data.phone }}</view>
              <view class="c-content-c__btn" @click="changeEdit">更改</view>
            </view>
            <view class="c-conetnt-footer">
              <view class="c-conetnt-footer_del" @click="delFn"></view>
              <view class="c-conetnt-footer__btn" @click="confirmFn('edit')"
                >确定</view
              >
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
    <uni-popup
      ref="confirmRef"
      type="center"
      :mask-click="false"
      :is-mask-click="false"
    >
      <view class="cf-content">
        <view class="cf-content-desc"
          >是否确定删除提醒人？
          <view class="cf-content-desc__tip"
            >该提醒人未执行的提醒会同步删除</view
          >
        </view>
        <view class="cf-content-footer">
          <view class="cf-content-footer__cancel" @click="confirmClose"
            >取消</view
          >
          <view class="cf-content-footer__btn" @click="confirmDel">确定</view>
        </view>
      </view>
    </uni-popup>
    <uni-popup
      ref="popupRef"
      class="popup-container"
      type="bottom"
      :mask-click="false"
      :is-mask-click="false"
      :safe-area="false"
    >
      <div class="popup-box">
        <view class="popup-box-title">选择提醒对象</view>
        <view class="popup-box-content">
          <view class="target-box">
            <view
              v-for="item in targetList"
              :key="item.id"
              class="target-item"
              :class="[formData.typeId === item.id ? 'active' : '']"
              @click="changeTargeFn(item)"
            >
              <image class="target-item-logo" :src="item.headImage"></image>
              <view class="target-item-name">{{ item.typeName }}</view>
            </view>
          </view>
        </view>
        <view class="popup-box-footer">
          <view class="popup-box-footer__item cancel" @click="closePopup()"
            >取消</view
          >
          <view class="popup-box-footer__item confirm" @click="confirmSelect()"
            >确定</view
          >
        </view>
      </div>
    </uni-popup>
  </view>
</template>

<style scoped lang="scss">
.c-content {
  position: relative;
  padding-top: 1rpx;
  padding-bottom: 57.65rpx;
  border-radius: 38.46rpx;
  width: 596.15rpx;
  // height: 650rpx;
  background: #fff;
  .c-close {
    position: absolute;
    right: 0;
    top: -96.11rpx;
    width: 57.69rpx;
    height: 57.69rpx;
  }
  .c-content-logo {
    position: absolute;
    left: 50%;
    top: -83.97rpx;
    border: 5.13rpx solid #fff;
    border-radius: 38.46rpx;
    width: 163.46rpx;
    height: 163.46rpx;
    transform: translateX(-50%);
  }
  .c-content-select {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 115.38rpx;
    text-align: center;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    font-size: 30.77rpx;
    color: #7079ff;
    .item-right {
      margin-left: 19.23rpx;
      width: 30.77rpx;
      height: 30.77rpx;
    }
  }
  .c-content-form {
    margin-top: 57.69rpx;
    padding: 0 38.46rpx;
  }
  .c-content-item {
    display: flex;
    align-items: center;
    // justify-content: center;
    margin-bottom: 38.46rpx;
  }
  .c-content-input-layout {
    border-radius: 46.15rpx;
    width: 519.23rpx;
    height: 92.31rpx;
    background: #f5f5f5;
    &.short {
      width: 269.23rpx;
    }
  }
  .c-content-input {
    display: flex;
    align-items: center;
    border-radius: 46.15rpx;
    width: 100%;
    // width: 519.23rpx;
    height: 92.31rpx;
    background: #f5f5f5;
    font-size: 30.77rpx;
    .uni-input {
      padding-left: 38.46rpx;
    }
  }
  .c-content-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 38.46rpx;
    border-radius: 46.15rpx;
    width: 211.54rpx;
    height: 92.31rpx;
    background: #7079ff;
    color: #fff;
  }
  .c-content-footer {
    display: flex;
    align-items: center;
    .c-content-footer__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      border-radius: 48.08rpx;
      // width: 423.08rpx;
      height: 96.15rpx;
      background: #7079ff;
      color: #fff;
      &.disable {
        background: #7079ff;
        opacity: 0.2;
      }
    }
    margin: 0 auto;
  }
  .c-content-role {
    display: flex;
    justify-content: center;
    margin-top: 115.38rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    font-size: 38.46rpx;
    color: #272727;
  }
  .c-content-c {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 65.38rpx 0;
    padding: 0 57.69rpx;
    text-align: left;
    font-weight: 600;
    color: #272727;
    .c-content-c__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1.92rpx solid #7079ff;
      border-radius: 38.46rpx;
      width: 115.38rpx;
      height: 61.54rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 26.92rpx;
      color: #7079ff;
    }
  }
  .c-conetnt-footer_del {
    margin-right: 38.46rpx;
    width: 96.15rpx;
    height: 96.15rpx;
    background: url($uni-static-dir-reminder + 'del.png') no-repeat;
    background-size: 100% 100%;
  }
  .c-conetnt-footer {
    display: flex;
    align-items: center;
    padding: 0 48.08rpx;
    .c-conetnt-footer__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 48.08rpx;
      width: 365.38rpx;
      height: 96.15rpx;
      background: #7079ff;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      color: #fff;
    }
  }
}
.popup-box {
  overflow: hidden;
  padding: 0 38.46rpx;
  border-radius: 57.69rpx 57.69rpx 0rpx 0rpx;
  background: #fff;
  &-title {
    margin: 38.46rpx auto;
    text-align: center;
    text-align: center;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    font-size: 38.46rpx;
    color: #222;
  }
  .popup-box-footer {
    display: flex;
    justify-content: center;
    margin: 76.92rpx 0 57.96rpx;
    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 48.08rpx;
      width: 269.23rpx;
      height: 96.15rpx;
      background: #f5f5f5;
      &.cancel {
        margin-right: 57.96rpx;
        color: #999;
      }
      &.confirm {
        background: #7079ff;
        color: #fff;
      }
    }
  }
}
.target-box {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  height: 300rpx;
  .target-item {
    margin-right: 16rpx;
    border-radius: 38.46rpx;
    width: 153.85rpx;
    height: 215.38rpx;
    background: #fff;
    text-align: center;
    color: #272727;
    &.active {
      background: #7079ff;
      color: #fff;
    }
    &-logo {
      display: inline-block;
      margin-top: 19.23rpx;
      border: 3.85rpx solid #fff;
      border-radius: 32.69rpx;
      // margin-bottom: 19.23rpx;
      width: 115.38rpx;
      height: 115.38rpx;
      background: #d6d6d8;
    }
  }
}
.cf-content {
  border-radius: 38.46rpx;
  width: 596.15rpx;
  height: 323.08rpx;
  background: #fff;
}
.cf-content-desc {
  padding: 57.69rpx;
  text-align: left;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  font-size: 38.46rpx;
  color: #272727;
  &__tip {
    margin-top: 11.54rpx;
    text-align: left;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    font-size: 26.92rpx;
    color: #999;
  }
}
.cf-content-footer {
  display: flex;
  justify-content: center;
  view {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 48.08rpx;
    width: 230.77rpx;
    height: 96.15rpx;
    background: #f5f5f5;
  }
  .cf-content-footer__cancel {
    margin-right: 38.46rpx;
    text-align: center;
    font-weight: 500;
    color: #999;
  }
  .cf-content-footer__btn {
    background: #7079ff;
    color: #fff;
  }
}
</style>
