<script lang="ts">
import loginApi from "@/api/loginApi";
import profileApi from "@/api/profile"

function getPlugin() {
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
function goCheckToken() {
  getPlugin().apiGetMiguToken({
    success: (miguToken) => {
      console.log("用户已登录，获取的一级token为:", miguToken);
      const userInfo = getPlugin().getMiguUserInfo();
      console.log(userInfo, "我是用户信息");

      if (miguToken) {
        // 页面显示
        loginApi
          .login({
            token: miguToken,
          })
          .then((res) => {
            console.log(res, "我是内部登录返回");
            uni.setStorageSync("token", res);

            getUserInfo();
          });
      } else {
        // 异常分支，应该不会出现，理论上成功返回的 miguToken 都是有值的
        // userInfo
        //   ? console.log('清除缓存，需重新登录')
        //   : console.log('用户未登录，或会话已失效，需重新登录')
        // this.clear()
      }
    },
    fail: (err) => {
      if (getPlugin().getMiguUserInfo()) {
        console.log("用户已登录，但获取token失败，重试一次:", err);
        goCheckToken();
        return;
        // console.log("已清除缓存，需重新登录:", err);
      } else {
        console.log(
          "获取一级token失败，用户未登录或会话已失效，需重新登录:",
          err
        );
        uni.clearStorage();
      }
      // this.clear()
    },
  });
}

async function getUserInfo() {
  const res = await profileApi.findHomePageUserInfo({}).then((res) => {
     console.log(res, "我是用户信息");
     uni.setStorageSync("userInfo", res);
  });
 
}

export default {
  globalData: {
    // 全局设置状态栏和导航栏高度
    statusBarH: 0,
    customBarH: 0,
    screenHeight: 0,
  },
  // 初始化

  onLaunch(option) {
    console.log("进入app.vue事件");
    goCheckToken();

    uni.getSystemInfo({
      success: (e) => {
        // 获取手机状态栏高度
        const statusBar = e.statusBarHeight;
        const menu = uni.getMenuButtonBoundingClientRect();
        // 导航栏高度 = 胶囊下距离 + 胶囊上距离 - 状态栏高度
        const customBar = menu.bottom + (menu.top - statusBar);
        this.globalData.statusBarH = statusBar;
        this.globalData.customBarH = customBar;
        this.globalData.screenHeight = e.screenHeight;
      },
    });
  },
};
</script>

<style></style>
