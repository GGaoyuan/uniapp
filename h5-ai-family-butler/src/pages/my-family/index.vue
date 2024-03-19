<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, defineComponent } from "vue";
import { forward } from "@/utils/router";
import myFamilyApi from "@/api/my-family";
import Character from "@/components/character/index.vue";
import selectSex from "@/components/selectSex/index.vue"
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

const popup = ref(null); // 创建引用，即使在模板中没有直接使用它
const cVisible = ref(false); 
const sVisible = ref(false); 
const currentRole = ref({});
const vipStatus = ref(-1);
const resMemberData = ref({});
const userInfo = ref({});
const nowSex = ref(null);

// 请求数据方法
async function getFamilyData() {
  
  const res = await myFamilyApi.getRelationList({});
  resMemberData.value = res;
  console.log(resMemberData.value, "我是家庭列表");
}

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
});

// onMounted(() => {
//   getFamilyData();
// });

onShow(() => {
  checkToken();
  getFamilyData();
});

function checkToken() {
  uni.getStorage({
    key: "userInfo",
    success: (res) => {
      userInfo.value = res.data;
      vipStatus.value = res.data.vipStatus;
      nowSex.value = res.data.userInfoVO.sex;
      console.log(nowSex.value, "查询用户信息");
    },
    fail: () => {
      console.log("查询失败");
    },
  });
}

function showPopup() {
  console.log();
  
  if (nowSex.value !== null) {
    cVisible.value = true;
  } else {
    sVisible.value = true;
  }
}

function addConfirm(val) {
  console.log(val, "确认返回");
  cVisible.value = false;
  currentRole.value = {};
  getFamilyData();
}

function close(val) {
  cVisible.value = false;
  currentRole.value = {};
  console.log(val, "关闭返回");
}

const sClose = ()=> {
   sVisible.value = false;
}

const changeSex = (val)=> {
  nowSex.value = val;
  userInfo.value.userInfoVO.sex = nowSex.value;
  uni.setStorageSync("userInfo", userInfo.value);
  sVisible.value = false;
  cVisible.value = true;
}

function goMemberBenefits() {
  forward("memberBenefits");
}

const editFamilyInfo = (data) => {
  currentRole.value = data;
  cVisible.value = true;
};
</script>


<template>
  <div class="my-family-container">

    <div
      class="not-vip-box"
      @click="goMemberBenefits()"
      v-if="vipStatus === 0"
    >
      <div class="vip-left">
        <p class="vip-title">开通会员</p>
        <p class="vip-text">AI亲情提醒，为家人设置温馨关护</p>
      </div>
      <div class="vip-right">开通会员</div>
    </div>

    <div class="content-box">
      <p class="add-number">可添加成员数量{{ resMemberData.remindNumberUsed }}/{{ resMemberData.remindNumberTotal }}</p>

      <div class="member-list">
        <div
          class="member-part"
          v-for="(item, index) of resMemberData.apiFindUserRelationList"
          :key="index"
        >
          <div class="member-left">
            <div class="member-img">
              <image :src="item.headImage" mode="#"></image>
            </div>
            <div class="member-text">
              <p class="member-name">{{ item.typeName }}</p>
              <p class="member-phone">{{ item.phone }}</p>
            </div>
          </div>
          <div class="member-right" @click="editFamilyInfo(item)">编辑</div>
        </div>
      </div>
    </div>

    <div class="bottom-box">
      <div class="add-button" @click="showPopup()">添加成员</div>
    </div>

    <Character
      :visible="cVisible"
      :data="currentRole"
      @confirm="addConfirm"
      @close="close"
    ></Character>

    <selectSex :visible="sVisible" :sex="nowSex" @close="sClose" @confirm="changeSex"></selectSex>
  </div>
</template>



<style lang="scss" scoped>
.my-family-container {
  padding-top: 38rpx;
  padding-bottom: 211.54rpx;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  .not-vip-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin: auto;
    padding: 32rpx 38rpx 34rpx;
    width: 673.08rpx;
    height: 153.85rpx;
    background: url('https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/open-vip-bg.png')
      no-repeat;
    background-size: 100% 100%;
    .vip-left {
      .vip-title {
        font-family: FZLTTHK, FZLTTHK-Regular;
        font-weight: 600;
        font-size: 34.62rpx;
        color: #fff;
      }
      .vip-text {
        margin-top: 11.54rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 23.08rpx;
        color: #fff;
      }
    }
    .vip-right {
      border-radius: 30.77rpx;
      width: 161.54rpx;
      height: 61.54rpx;
      background: #7079ff;
      line-height: 61.54rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 26.92rpx;
      color: #fff;
    }
  }
  .content-box {
    box-sizing: border-box;
    padding: 38rpx;
    .vip-box {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 19.23px;
      width: 100%;
      height: 153.85rpx;
      background: url('../../static/profile/open-vip-bg.png') no-repeat;
      background-size: 100% 100%;
      .vip-left {
        .vip-title {
          font-family: FZLTTHK, FZLTTHK-Regular;
          font-weight: 600;
          font-size: 34.62rpx;
          color: #fff;
        }
        .vip-text {
          margin-top: 11.54rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 23.08rpx;
          color: #fff;
        }
      }
      .vip-right {
        border-radius: 30.77rpx;
        width: 161.54rpx;
        height: 61.54rpx;
        background: #7079ff;
        line-height: 61.54rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 26.92rpx;
        color: #fff;
      }
    }
    .add-number {
      margin-top: 38.46rpx;
      text-align: left;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      font-size: 34.62rpx;
      color: #272727;
    }
    .member-list {
      margin-top: 38.46rpx;
      .member-part {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        margin-top: 20rpx;
        padding: 26.92rpx;
        border-radius: 26.92rpx;
        width: 673.08rpx;
        height: 169.23rpx;
        background: #fff;
        .member-left {
          display: flex;
          align-items: center;
          .member-img {
            border-radius: 26.92rpx;
            width: 115.38rpx;
            height: 115.38rpx;
            image {
              border-radius: 26.92rpx;
              width: 100%;
              height: 100%;
            }
          }
          .member-text {
            margin-left: 19.23rpx;
            .member-name {
              font-family: PingFangSC, PingFangSC-Medium;
              font-weight: 500;
              font-size: 34.62rpx;
              color: #272727;
            }
            .member-phone {
              margin-top: 7.69rpx;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              font-size: 26.92rpx;
              color: #272727;
            }
          }
        }
      }
      .member-right {
        border: 2rpx solid #7079ff;
        border-radius: 38.46px;
        width: 115.38rpx;
        height: 61.54rpx;
        line-height: 61.54rpx;
        text-align: center;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        font-size: 26.92rpx;
        color: #7079ff;
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
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      color: #fff;
    }
  }
  .add-popup {
    border-radius: 38.46rpx;
    width: 596.15rpx;
    height: 650rpx;
    background: #fff;
  }
}
</style>