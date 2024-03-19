<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, defineComponent, defineExpose } from "vue";
import { forward } from "@/utils/router";
import memberBenefitsApi from "@/api/member-benefits";
import profileApi from "@/api/profile";
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

const memberList = reactive([
  { name: "2元包", id: "1", msg: "" },
  { name: "5元包", id: "2", url: "../../static/profile/member-img.png" },
  { name: "10元包", id: "3", url: "../../static/profile/member-img.png" },
]);

const packageList = ref([]);

function change(e) {
  nowSelect.value = e.detail.current;
  current.value = e.detail.current;
}
function clickItem(e) {
  swiperDotIndex.value = e;
}

const modeIndex = ref(-1);
const styleIndex = ref(-1);
const current = ref(0);
const mode = ref("default");
const dotsStyles = reactive({
  backgroundColor: "rgba(255, 255, 255, .3)",
  border: "1px rgba(255, 255, 255, .3) solid",
  color: "#fff",
  selectedBackgroundColor: "rgba(255, 255, 255, 1)",
  selectedBorder: "0px rgba(255, 255, 255, .9) solid",
});
const swiperDotIndex = ref(0);

const isSelectAgreeMent = ref(true); // 是否勾选协议，因为目前没有协议，暂时默认为true

const modelVale = ref(0);
const isPlayVideo = ref(false);
const vipBenefitInfo = ref({});
const nowSelect = ref(0);
const userInfo = ref({});
const vipStatus = ref(-1);
const isRequest = ref(false);
const rightList = ref([
  {
    messageCount: "30条",
    voiceCount: "50条",
    videoCount: "10条",
    personCount: "5人",
  },
  {
    messageCount: "50条",
    voiceCount: "70条",
    videoCount: "20条",
    personCount: "10人",
  },
  {
    messageCount: "100条",
    voiceCount: "100条",
    videoCount: "30条",
    personCount: "10人",
  },
]);
const packageText = ['乐享包', '畅享包',"尊享包"]

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
});

// 获取用户信息
async function getUserInfo() {
  userInfo.value = await profileApi.findHomePageUserInfo({});
  vipStatus.value = userInfo.value?.vipStatus;
  console.log(vipStatus.value, "我是会员状态");
  uni.setStorageSync("userInfo", userInfo.value);

  console.log(userInfo.value, "我是用户信息");
  isRequest.value = true;
}

function selectStatusChange() {
  isSelectAgreeMent.value = !isSelectAgreeMent.value;
}

async function getVipInfo() {
  const res = await memberBenefitsApi.getVipInfo({});
  vipBenefitInfo.value = JSON.parse(JSON.stringify(res));
  console.log(vipBenefitInfo.value, "获取权益中心数据");
  packageList.value = vipBenefitInfo.value;
  console.log(packageList.value, "我是商品数据");

  const resArr = JSON.parse(JSON.stringify(packageList.value));

  console.log(resArr, "131231");

  for (let index = 0; index < resArr.length; index++) {
    console.log(index, "1123");
    console.log(resArr[index].apiProductConfig.status);

    if (resArr[index].apiProductConfig.status === 1) {
      console.log(index, "进入循环");
      nowSelect.value = index;
    }
  }
}

const selectPackChange = (item, index) => {
  nowSelect.value = index;
  console.log(nowSelect.value, vipStatus.value);

  swiperChange(index);
};

// 轮播图切换控制
const swiperChange = (index) => {
  console.log(swiperDotIndex.value, "我是swiperIndex");

  swiperDotIndex.value = index;
};

// 支付接口
const goPay = async (data) => {
  if (!isSelectAgreeMent.value) {
    uni.showToast({
      title: "请勾选会员协议",
      icon: "error",
    });
  }
  let productId = packageList.value[nowSelect.value].apiProductConfig.id;
  forward("migu-pay", {
    productId: productId,
  });
  // const res = await memberBenefitsApi.orderBefit({
  //   productId: productId,
  // });

  // console.log(res, "支付返回");
  getUserInfo();
};

onShow(() => {
  getUserInfo();
  getVipInfo();
  selectPackChange({}, 0);
});
</script>


<template>
  <div
    :class="{
      'not-vip': vipStatus === 0 || nowSelect + 1 !== vipStatus,
      'vip-two': nowSelect + 1 == vipStatus && vipStatus === 1,
      'vip-five': nowSelect + 1 == vipStatus && vipStatus === 2,
      'vip-ten': nowSelect + 1 == vipStatus && vipStatus === 3,
    }"
    class="vip-container"
    v-if="isRequest"
  >
    <div class="vip-header">
      <div class="header-icon">
        <image class="header-img" :src="userInfo.userInfoVO.avatar"></image>
        <image
          v-if="vipStatus === 0"
          class="vip-icon"
          src="../../static/benefits/not-vip-icon.png"
        ></image>
        <image
          v-if="vipStatus !== 0"
          class="vip-icon"
          src="../../static/benefits/vip-icon.png"
        ></image>
      </div>
      <div class="user-info-box">
        <p class="user-name">{{ userInfo.userInfoVO.phone }}</p>
        <p class="user-vip-status" v-if="vipStatus === 0">未开通会员</p>
        <p class="user-vip-status" v-if="vipStatus !== 0">
          连续包月会员，到期自动续费
        </p>
      </div>
    </div>

    <div class="vip-card-box" v-if="nowSelect < 0">
      <image
        src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/vip-card-not-vip.png"
      ></image>
    </div>

    <div class="vip-card-box" v-if="nowSelect === 0">
      <image
        src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/vip-card-vip-two.png"
      ></image>
    </div>

    <div class="vip-card-box" v-if="nowSelect === 1">
      <image
        src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/vip-card-vip-five.png"
      ></image>
    </div>

    <div class="vip-card-box" v-if="nowSelect === 2">
      <image
        src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/vip-card-vip-ten.png"
      ></image>
    </div>

    <div class="vip-swiper-box">
      <uni-swiper-dot
        class="uni-swiper-dot-box"
        field="content"
        :info="info"
        :current="current"
        :mode="mode"
        :dots-styles="dotsStyles"
      >
        <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
          <swiper-item v-for="(item, index) in rightList" :key="index">
            <div class="swiper-item" :class="'swiper-item' + index">
              <div class="swiper-part">
                <div class="swiper-icon">
                  <image
                    src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/ben-message.png"
                  ></image>
                </div>
                <p class="swiper-text-1">{{ item.messageCount }}</p>
                <p class="swiper-text-2">短信提醒</p>
              </div>

              <div class="swiper-part">
                <div class="swiper-icon">
                  <image
                    src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/ben-phone.png"
                  ></image>
                </div>
                <p class="swiper-text-1">{{ item.voiceCount }}</p>
                <p class="swiper-text-2">语音提醒</p>
              </div>

              <div class="swiper-part">
                <div class="swiper-icon">
                  <image
                    src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/ben-movie.png"
                  ></image>
                </div>
                <p class="swiper-text-1">{{ item.videoCount }}</p>
                <p class="swiper-text-2">视频提醒</p>
              </div>

              <div class="swiper-part">
                <div class="swiper-icon">
                  <image
                    src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/ben-user.png"
                  ></image>
                </div>
                <p class="swiper-text-1">{{ item.personCount }}</p>
                <p class="swiper-text-2">提醒人数</p>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </div>

    <div class="buy-vip-box">
      <div class="notice-box">
        <div class="notice-icon">
          <image src="../../static/benefits/ben-notice.png"></image>
        </div>
        <wyb-noticeBar
          class="notice-text"
          :text="[
            '开通会员享受更多提醒次数及提醒人数，已是会员用户也可以退定原会员权益后开通高级别会员增加权益内容！',
          ]"
          :space-const="320"
          bgColor="#F5F5F5"
          color="#272727"
          :show-more="false"
          :show-icon="false"
        />
      </div>

      <div class="buy-vip-list-box">
        <div class="buy-vip-list">
          <div
            class="buy-vip-part"
            v-for="(item, index) of packageList"
            :key="index"
            :class="{
              active: nowSelect === index,
            }"
            @click="selectPackChange(item, index)"
          >
            <div
              class="status-icon status-icon-now"
              v-if="item.apiProductConfig.status === 1"
            >
              生效中
            </div>
            <!-- <div
              class="status-icon status-icon-pass"
              v-if="item.apiProductConfig.status === 2"
            >
              已退订
            </div> -->

            <p class="buy-title">包月{{ packageText[index] }}</p>
            <p class="buy-text">
              ￥<span class="buy-price">{{
                item.apiProductConfig.price / 100
              }}</span>
            </p>
            <!-- <div class="package-icon" v-if="nowSelect === index">
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/pack-select.png"
              ></image>
            </div> -->
          </div>
        </div>

        <div
          class="pay-button"
          :class="isSelectAgreeMent ? '' : 'not-vip'"
          @click="goPay()"
          v-if="vipStatus === 0"
        >
          立即支付
        </div>
        <div class="pay-button is-pay" v-if="vipStatus !== 0">
          已订购其他商品，退订失效后可订购该商品
        </div>
        <!-- <div class="agreement-box">
          <div class="select-box">
            <div
              v-if="!isSelectAgreeMent"
              class="select-icon"
              @click="selectStatusChange()"
            >
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/not-select.png"
              ></image>
            </div>
            <div
              v-if="isSelectAgreeMent"
              class="select-icon"
              @click="selectStatusChange()"
            >
              <image
                src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/select.png"
              ></image>
            </div>
          </div>
          <p class="agreement-text">
            请确认
            <span class="agreement-detail">《会员服务协议》《隐私政策》</span>
          </p>
        </div> -->

        <div class="equity-content">
          <p class="equity-title">更多权益内容</p>
          <div class="equity-list">
            <div class="equity-part">
              <div class="equity-img">
                <image
                  src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/equity-img.png"
                ></image>
              </div>
              <div class="equity-text">
                <p class="equity-text-1">日历视图</p>
                <p class="equity-text-2">日历网格查看每天提醒事项</p>
              </div>
            </div>

            <!-- <div class="equity-part">
              <div class="equity-img">
                <image
                  src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/equity-img.png"
                ></image>
              </div>
              <div class="equity-text">
                <p class="equity-text-1">提醒人数</p>
                <p class="equity-text-2">短信提醒</p>
              </div>
            </div>

            <div class="equity-part">
              <div class="equity-img">
                <image
                  src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/benefits/equity-img.png"
                ></image>
              </div>
              <div class="equity-text">
                <p class="equity-text-1">提醒人数</p>
                <p class="equity-text-2">短信提醒</p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.vip-container {
  width: 100%;
  min-height: 100vh;
  .vip-header {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 58rpx;
    .header-icon {
      position: relative;
      border: 3.85rpx solid #fff;
      border-radius: 26.92rpx;
      width: 115.38rpx;
      height: 115.38rpx;
      background: #d6d6d8;
      .header-img {
        border-radius: 26.92rpx;
        width: 100%;
        height: 100%;
      }
      .vip-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 38rpx;
        height: 38rpx;
      }
    }
    .user-info-box {
      margin-left: 38rpx;
      .user-name {
        text-align: left;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        font-size: 38.46rpx;
        color: #fff;
      }
      .user-vip-status {
        margin-top: 7rpx;
        text-align: left;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 26.92rpx;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .vip-card-box {
    margin: auto;
    width: 673.08rpx;
    height: 153.85rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .vip-swiper-box {
    display: flex;
    margin-top: 38rpx;
    width: 100%;
    .swiper-box {
      width: 100%;
      height: 250rpx;
    }
    .swiper-item {
      display: flex;
      justify-content: space-around;
      width: 100%;
      .swiper-part {
        width: 96.15rpx;
        .swiper-icon {
          width: 96.15rpx;
          height: 96.15rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .swiper-text-1 {
          margin-top: 7.69rpx;
          text-align: center;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          font-size: 30.77rpx;
          color: #fff;
        }
        .swiper-text-2 {
          margin-top: 2.69rpx;
          text-align: center;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 23.08rpx;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
  .buy-vip-box {
    box-sizing: border-box;
    padding: 38rpx;
    border-radius: 57.69rpx 57.69rpx 0 0;
    width: 100%;
    height: 996rpx;
    background: #fff;
    .notice-box {
      display: flex;
      overflow: hidden;
      align-items: center;
      margin: auto;
      padding: 19rpx;
      border-radius: 19.23rpx;
      width: 635.08rpx;
      height: 31.23rpx;
      background: #f5f5f5;
      .notice-icon {
        margin-right: 21rpx;
        width: 34.62rpx;
        height: 34.62rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .notice-text {
        // margin-left: 7rpx;
        // text-align: left;
        // font-family: PingFangSC, PingFangSC-Regular;
        // font-weight: 400;
        // font-size: 23.08rpx;
        // color: #272727;
        width: 580rpx;
      }
    }
    .buy-vip-list-box {
      overflow: hidden;
      box-sizing: border-box;
      // padding-top: 57.69rpx;
      width: 100%;
      .buy-vip-list {
        overflow-x: auto;
        padding-top: 57.69rpx;
        white-space: nowrap;
        .buy-vip-part {
          display: inline-block;
          position: relative;
          box-sizing: border-box;
          margin-left: 38.46rpx;
          padding: 28.85rpx 38.25rpx;
          border: 4rpx solid #e9e9e9;
          border-radius: 26.92rpx;
          width: 230.77rpx;
          height: 173.08rpx;
          background: #fff;
          .status-icon {
            display: flex;
            position: absolute;
            left: 0;
            top: -20rpx;
            justify-content: center;
            align-items: center;
            border-radius: 11.54rpx;
            width: 96.15rpx;
            height: 46.15rpx;
            text-align: left;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-size: 23.08rpx;
          }
          .status-icon-now {
            background: #7079ff;
            color: #fff;
          }
          .status-icon-pass {
            background: #e9e9e9;
            color: #999;
          }
          .buy-title {
            text-align: left;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            font-size: 26.92rpx;
            color: #272727;
          }
          .buy-text {
            margin-top: 19.23rpx;
            text-align: left;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            font-size: 34.62rpx;
            color: #272727;
          }
          .buy-price {
            text-align: left;
            font-family: FZLTTHK, FZLTTHK-Regular;
            font-weight: bold;
            font-size: 46.15rpx;
            color: #272727;
          }
          .package-icon {
            position: absolute;
            right: 19.23rpx;
            bottom: 19.23rpx;
            width: 38.46rpx;
            height: 38.46rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
        }
        .buy-vip-part:nth-child(1) {
          margin-left: 0;
        }
        .buy-vip-part.active {
          border: 4rpx solid #7079ff;
          background: #eeefff;
        }
      }
      .buy-vip-list::-webkit-scrollbar {
        display: none;
      }
      .pay-button {
        margin: auto;
        margin-top: 38.46rpx;
        border-radius: 48.08rpx;
        width: 596.15rpx;
        height: 96.15rpx;
        background: #7079ff;
        line-height: 96.15rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: bold;
        font-size: 38.46rpx;
        color: #fff;
      }
      .not-vip {
        opacity: 0.2;
      }
      .is-pay {
        border-radius: 48rpx;
        width: 596.15rpx;
        height: 96.15rpx;
        background: rgba(112, 121, 255, 0.2);
        line-height: 96.15rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 30.77rpx;
        color: #7079ff;
      }
      .agreement-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 19.23rpx;
        .select-box {
          margin-right: 7rpx;
          padding-bottom: 7rpx;
          .select-icon {
            width: 30rpx;
            height: 30rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
        }
        .agreement-text {
          text-align: left;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 26.92rpx;
          color: #272727;
        }
        .agreement-detail {
          color: #7079ff;
        }
      }
      .equity-content {
        margin-top: 38.46rpx;
        .equity-title {
          text-align: left;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          font-size: 30.77rpx;
          color: #272727;
        }
        .equity-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .equity-part {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            margin-top: 19.23rpx;
            padding: 26.92rpx;
            border-radius: 19.23rpx;
            width: 100%;
            height: 134.62rpx;
            background: #f5f5f5;
          }
          .equity-img {
            width: 80.77rpx;
            height: 80.77rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .equity-text {
            margin-left: 19rpx;
            .equity-text-1 {
              text-align: left;
              font-family: PingFangSC, PingFangSC-Semibold;
              font-weight: 600;
              font-size: 26.92rpx;
              color: #272727;
            }
            .equity-text-2 {
              text-align: left;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              font-size: 23.08rpx;
              color: #999;
            }
          }
        }
      }
    }
  }
}
.not-vip {
  background-color: #1d2540;
}
.vip-two {
  background-color: #292e75;
}
.vip-five {
  background-color: #3d2975;
}
.vip-ten {
  background-color: #532975;
}
.uni-swiper-dot-box {
  width: 100%;
}
.example-body-item {
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* #endif */
  flex: 1;
  margin: 15rpx;
  padding: 15rpx;
  padding: 0 15rpx;
  border-width: 1px;
  border-style: solid;
  border-color: #e5e5e5;
  border-radius: 5px;
  height: 60rpx;
}
.example-body-item-text {
  font-size: 28rpx;
  color: #fff;
}
.example-body-dots {
  margin-left: 10rpx;
  border-radius: 50px;
  width: 16rpx;
  height: 16rpx;
  background-color: #fff;
}
.active {
  border-width: 1px;
  border-style: solid;
  border-color: #007aff;
}
</style>
