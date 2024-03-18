<script setup lang="ts">
import reminderApi from "@/api/reminder";
import userInfoApi from "@/api/userinfo";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
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

const headerPopup = ref<any>(null);
const nowSelect = ref<any>(-1);
const nowSelectData = ref<any>({});

const dialogShow = () => {
  headerPopup.value.open();
};
const dialogClose = () => {
  emits("close");
  headerPopup.value.close();
};

const headerList = ref([]);

const openPopup = () => {
  headerPopup.value.open();
};

const closePopup = () => {
  headerPopup.value.close();
};

const clickMask = (val) => {
  emits("close");
};

const selectChange = (item, index) => {
  nowSelect.value = index;
  nowSelectData.value = item;
};

// 接口请求方法
async function getHeaderList() {
  const res = await reminderApi.findType({
    rangeFlag: 2,
  });

  console.log(res, "我是头像返回");

  headerList.value = res;

  if (headerList.value) {
    emits("confirm", headerList.value);
  }

  console.log(headerList.value, "我是头像列表");
}

const changeHeaderImg = async () => {
  const res = await userInfoApi.changeHeadImg({
    id: nowSelectData.value.id,
  });

  console.log(res, "我是选中成功返回");
  clickMask("close");
};

onMounted(() => {
  getHeaderList();
  if (props.visible) {
    dialogShow();
  }
});
</script>

<template>
  <uni-popup
    class="header-popup"
    ref="headerPopup"
    type="bottom"
    :safe-area="false"
    @maskClick="clickMask"
  >
    <div class="header-list-box">
      <div
        class="header-list-part"
        v-for="(item, index) of headerList"
        :key="index"
        @click="selectChange(item, index)"
        :class="{ active: nowSelect === index }"
      >
        <image :src="item.headImage"></image>
        <image v-if="nowSelect === index" class="select-icon" src="../../static/userInfo/select-icon.png"></image>
      </div>
      <div class="bottom-box">
        <div class="bottom-button cancel-btn" @click="clickMask()">取消</div>
        <div class="bottom-button confirm-btn" @click="changeHeaderImg()">
          确定
        </div>
      </div>
    </div>
  </uni-popup>
</template>

<style scoped lang="scss">
.header-popup {
  // width: 100%;
  // height: 100%;
  position: relative;
  .header-list-box {
    display: flex;
    overflow-y: auto;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 38rpx;
    padding-bottom: 140rpx;
    border-radius: 57.69rpx 57.69rpx 0 0;
    width: 100%;
    height: 865rpx;
    background: #fff;
    .header-list-part {
      position: relative;
      margin-top: 39rpx;
      border: 6rpx solid #fff;
      border-radius: 26.92rpx;
      width: 138.46rpx;
      height: 138.46rpx;
      background: #d6d6d8;
      image {
        border-radius: 26.92rpx;
        width: 100%;
        height: 100%;
      }
      .select-icon {
        position: absolute;
        right: -1rpx;
        top: 0;
        width: 53.85rpx;
        height: 53.85rpx;
      }
    }
  }
  .header-list-box::after {
    border: 1px solid transparent;
    width: 138.46rpx;
    content: '';
  }
  .bottom-box {
    display: flex;
    position: absolute;
    left: 0rpx;
    bottom: 0rpx;
    justify-content: space-around;
    width: 100%;
    height: 230.77rpx;
    background: url('../../static/userInfo/header-bottom-bg.png') no-repeat;
    .bottom-button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 86rpx;
      border-radius: 48.08rpx;
      width: 269.23rpx;
      height: 96.15rpx;
    }
    .confirm-btn {
      background: #7079ff;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      color: #fff;
    }
    .cancel-btn {
      background: #f5f5f5;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      color: #999;
    }
  }
}
</style>
