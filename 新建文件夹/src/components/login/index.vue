<script setup lang="ts">
import profileApi from "@/api/profile";
import loginApi from "@/api/loginApi";
import defaultPng from "@/static/reminder/default-icon.png";
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

const loginPopup = ref<any>(null);
const dialogShow = () => {
  loginPopup.value.open();
};
const dialogClose = () => {
  emits("close");
  loginPopup.value.close();
};

const mockUser = ref([]);
const userInfo = ref({});

const openPopup = () => {
  loginPopup.value.open();
};

const closePopup = () => {
  loginPopup.value.close();
};

const clickMask = (val) => {
  emits("close");
}


const wxUserInfo = reactive({
  code: '',
  iv: '',
  encryptedData: '',
  userInfo: {
    avatarUrl: ''
  }
})

const wxLogin = ()=> {
  console.log();
  uni.login({
     success (res) {
    if (res.code) {
      //发起网络请求
      wxUserInfo.code = res.code;
      console.log(res, "我是登录返回");
      getUserProfile()
    } else {
      console.log('登录失败！' + res.errMsg)
    }
  }
  })
}

const getUserProfile = ()=> {
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  uni.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      wxUserInfo.iv = res.iv;
      wxUserInfo.encryptedData = res.encryptedData;
      wxUserInfo.userInfo = res.userInfo;
      

      goWxLogin();
    }
  })
}

const goWxLogin = ()=> {
  uni.navigateTo({
      url: `plugin://myPlugin/wechatlogin?code=${encodeURIComponent(wxUserInfo.code)}&iv=${encodeURIComponent(wxUserInfo.iv)}&enc=${encodeURIComponent(wxUserInfo.encryptedData)}&userInfo=${JSON.stringify({...wxUserInfo.userInfo,avatarUrl: encodeURIComponent(wxUserInfo.userInfo.avatarUrl)})}`
  });
  dialogClose();
}


// 微信登录
const goPhoneLogin = ()=> {
  uni.getUserProfile({
    desc:'Wexin',     // 这个参数是必须的
    success:res=>{
      console.log("用户信息",res.rawData)
      uni.navigateTo({
          url: 'plugin://myPlugin/migulogin'
      })
      dialogClose();

      // uni.navigateTo({
      //   url: `plugin://myPlugin/wechatlogin
      //       ?code=${encodeURIComponent(code)}
      //       &iv=${encodeURIComponent(iv)}
      //       &enc=${encodeURIComponent(encryptedData)}
      //       &userInfo=${JSON.stringify({
      //           ...userInfo,
      //           avatarUrl: encodeURIComponent(userInfo.avatarUrl)
      //       })}`
      // })


    }
  })
}


const loginToken = ref('')

// 咪咕sdk方法
const goCheckToken = ()=> {
  getPlugin().apiGetMiguToken({
      success: miguToken => {
        console.log('用户已登录，获取的一级token为:', miguToken)
        loginToken.value = miguToken;
        const userInfo = getPlugin().getMiguUserInfo()
        console.log(userInfo, "我是用户信息");
        
        if (miguToken) {
          // 页面显示
          // const res = loginApi.login({
          //   token: miguToken
          // });
          // console.log(res, "我是内部登录返回");
          
        } else {
          // 异常分支，应该不会出现，理论上成功返回的 miguToken 都是有值的
          // userInfo
          //   ? console.log('清除缓存，需重新登录')
          //   : console.log('用户未登录，或会话已失效，需重新登录')
          // this.clear()
        }
      },
      fail: err => {
        if (getPlugin().getMiguUserInfo()) {
          // if (needRetry) {
          //   console.log('用户已登录，但获取token失败，重试一次:', err)
          //   this.getUserToken(false)
          //   return
          // }
          console.log('已清除缓存，需重新登录:', err)
        } else {
          console.log(
            '获取一级token失败，用户未登录或会话已失效，需重新登录:',
            err
          )
        }
        // this.clear()
      }
    })
}

// 初始化
const getPlugin = ()=> {
   let _plugin;

    if (!_plugin) {
        _plugin = requirePlugin('myPlugin')
        // 初始化，更新默认配置
        _plugin.setOptions?.({
            requestDomain: 'https://passport.migu.cn',
            sourceId: '220055',
            skin: 'music',
            protocols: [
                ['服务协议', '/pages/protocol'],
                ['隐私政策', '/pages/privacy']
            ]
        })
    }
    return _plugin
}

// 查询用户数据
const mockAllUser = async () => {
  const res = await profileApi.mockAllUser({});

  mockUser.value = res;
  console.log(mockUser.value, "我是所有账号");
};

//登录
const goLogin = async (item) => {
  const res = await profileApi.mockLogin({
    phone: item.phone,
  });
  console.log(res, "mock的登录数据");

  await uni.setStorageSync("token", res);

  getUserInfo();
};

async function getUserInfo() {
  userInfo.value = await profileApi.findHomePageUserInfo({});
  uni.setStorageSync("userInfo", userInfo.value);

  if (userInfo.value) {
    emits("confirm", userInfo.value);
  }

  console.log(userInfo.value, "我是用户信息");
}

onMounted(() => {
  // mockAllUser();
  getPlugin();
  wxLogin();
  if (props.visible) {
    dialogShow();
  }
});
</script>

<template>
  <view class="lpopup">
    <uni-popup
      ref="loginPopup"
      type="bottom"
      :safe-area="false"
      @maskClick="clickMask"
    >
      <div class="login-popup-box">
        <p class="login-text" @click="getUserProfile()">微信一键登录</p>
        <p class="login-text" @click="goPhoneLogin()">其他手机号登录</p>
        <!-- <p
          class="login-text"
          v-for="(item, index) of mockUser"
          :key="index"
          @click="goLogin(item)"
        >
          {{ item.phone }}
        </p> -->
      </div>
    </uni-popup>
  </view>
</template>

<style scoped lang="scss">
.login-popup-box {
  padding-top: 57rpx;
  padding-bottom: 87rpx;
  border-radius: 57.69rpx 57.69rpx 0 0;
  width: 100%;
  // height: 300rpx;
  background: #fff;
  .login-text {
    margin-top: 57.69rpx;
    text-align: center;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    font-size: 38.46rpx;
    color: #222;
  }
}
</style>
