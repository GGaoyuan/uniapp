<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, defineComponent,  } from "vue";
import { forward } from "@/utils/router";
import profileApi from "@/api/profile";
import editHeader from "@/components/edit-header";
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

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
});

onMounted(() => {
  getUserInfo();
  getPlugin();
});

const userInfo = ref({});
const totalUserInfo = ref({});
const editVisible = ref(false);
const nowSex = ref(null)
const sVisible = ref(false)
const isRequestBack = ref(false)

// 数据接口请求
// 保存用户反馈
async function getUserInfo() {
  const res = await profileApi.findHomePageUserInfo({});
  totalUserInfo.value = res;
  userInfo.value = res?.userInfoVO;
  nowSex.value = userInfo.value.sex;
  console.log(nowSex.value, "我是查询到的性别");
  isRequestBack.value = true;
}

const sClose = ()=> {
   sVisible.value = false;
}

const changeSex = (val)=> {
  nowSex.value = val;
  totalUserInfo.value.userInfoVO.sex = nowSex.value;
  uni.setStorageSync("userInfo", totalUserInfo.value);
  getUserInfo();
  sVisible.value = false;
}

function confirm() {
  console.log("进行选择");
}

function listChange(val) {
  console.log(val, "我是变化");
}

const removeAllLoginInfo = () => {
  uni.clearStorage();
  getPlugin().clearMiguCache();
  // forward("profile");
  uni.navigateBack({
    delta: 1
  });
};

const getPlugin =() => {
  let _plugin;

  if (!_plugin) {
    _plugin = requirePlugin("myPlugin");
    // 初始化，更新默认配置
    _plugin.setOptions?.({
      requestDomain: "https://passport.migu.cn",
      sourceId: "220055",
      skin: "music",
      protocols: [
        ["服务协议", "/pages/protocol"],
        ["隐私政策", "/pages/privacy"],
      ],
    });
  }
  return _plugin;
}

// 弹窗操作方法
const goEditHeader = () => {
  console.log("进入事件");

  editVisible.value = true;
};

const goEditSex = ()=> {
  sVisible.value = true;
}

const editStauts = (res) => {
  console.log(res, "我是返回");
};

const editPopupClose = (rs) => {
  editVisible.value = false;
  getUserInfo();
  console.log("我是关闭");
};
</script>


<template>
  <div class="userinfo-container">
    <div class="user-box user-header-box">
      <p class="header-text">头像</p>
      <div class="header-box">
        <div class="header-img">
          <image :src="userInfo.avatar"></image>
        </div>
        <div class="header-icon" @click="goEditHeader()">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/list-icon.png"
          ></image>
        </div>
      </div>
    </div>

    <!-- <div class="user-box user-nickname-box">
      <p class="header-text">昵称</p>
      <p class="user-nickName">{{ userInfo.nickname }}</p>
    </div> -->

    <div class="user-box user-header-box">
      <p class="header-text">性别</p>
      <div class="header-box">
        <p class="user-sex-name">{{ userInfo.sex === 0 ? '女' : '男' }}</p>
        <div class="header-icon" @click="goEditSex()">
          <image
            src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/profile/list-icon.png"
          ></image>
        </div>
      </div>
    </div>

    <div class="user-box user-phone-box">
      <p class="header-text">手机号</p>
      <p class="user-phone">{{ userInfo.phone }}</p>
    </div>

    <div class="bottom-box">
      <div class="add-button" @click="removeAllLoginInfo()">退出当前账号</div>
    </div>

    <editHeader
      :visible="editVisible"
      @confirm="editStauts"
      @close="editPopupClose"
    />
    <selectSex v-if="isRequestBack" :visible="sVisible" :sex="nowSex" @close="sClose" @confirm="changeSex"></selectSex>
  </div>
</template>



<style lang="scss" scoped>
.userinfo-container {
  box-sizing: border-box;
  padding: 38rpx 38rpx 241rpx;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  .user-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-top: 38rpx;
    padding: 0 38rpx;
    border-radius: 26.92rpx;
    width: 100%;
    height: 119.23rpx;
    background: #fff;
    font-weight: 400;
    .header-text {
      text-align: left;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      font-size: 30.77rpx;
      color: #999;
    }
    .header-icon {
      width: 38rpx;
      height: 38rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .user-sex-name {
      margin-right: 17rpx;
    }
  }
  .user-header-box {
    .header-box {
      display: flex;
      align-items: center;
      .header-img {
        margin-right: 17rpx;
        border: 2.56rpx solid #fff;
        border-radius: 21rpx;
        width: 76.92rpx;
        height: 76.92rpx;
        background: #d6d6d8;
        image {
          border-radius: 21rpx;
          width: 100%;
          height: 100%;
        }
      }
      .header-icon {
        width: 38rpx;
        height: 38rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .user-phone-box {
    .user-phone {
      text-align: left;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 30.77rpx;
      color: #272727;
    }
  }
  .user-nickname-box {
    .user-nickName {
      text-align: left;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 30.77rpx;
      color: #272727;
    }
  }
  .bottom-box {
    position: fixed;
    left: 0;
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
