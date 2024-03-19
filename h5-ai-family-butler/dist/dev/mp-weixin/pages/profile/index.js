"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
const utils_router = require("../../utils/router.js");
const api_profile = require("../../api/profile.js");
const api_allVideo = require("../../api/all-video.js");
const api_allVoice = require("../../api/all-voice.js");
const api_loginApi = require("../../api/loginApi.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../../components/ipViewComponents/core/message/MessageCenter.js");
require("../../components/ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (common_vendor.unref(Header) + _easycom_uni_popup + common_vendor.unref(login))();
}
const login = () => "../../components/login/index.js";
const Header = () => "../../components/header/index.js";
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage((res) => {
      return {
        title: "AI亲情提醒",
        path: `pages/main/index`,
        imageUrl: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/share-img/share-img.png"
      };
    });
    const memberList = common_vendor.ref([]);
    const userInfo = common_vendor.ref({});
    const remindSelectInfo = common_vendor.ref({});
    const remindSelect = common_vendor.ref(3);
    const remindWayOtherSelect = common_vendor.ref(0);
    const remindWayOwnSelect = common_vendor.ref(0);
    const isLogin = common_vendor.ref(false);
    const vipStatus = common_vendor.ref(0);
    common_vendor.ref([]);
    const cVisible = common_vendor.ref(false);
    const selectVideo = common_vendor.ref("");
    const selectVoice = common_vendor.ref("");
    common_vendor.onLoad((data) => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
      console.log("进入onload", data);
    });
    common_vendor.onShow(() => {
      getPlugin();
      goCheckToken();
      getRemindSelectData();
      reminderWaySelect();
      console.log("执行show结束");
    });
    common_vendor.onUpdated(() => {
      console.log("执行update结束");
    });
    common_vendor.onMounted(() => {
      console.log("执行onMounted结束");
    });
    function checkToken() {
      common_vendor.index.getStorage({
        key: "token",
        success: (res) => {
          getUserInfo();
        },
        fail: () => {
          console.log("查询失败");
          isLogin.value = false;
          getVideoList();
          getVoiceList();
        }
      });
    }
    const getPlugin = () => {
      var _a;
      let _plugin;
      if (!_plugin) {
        _plugin = requirePlugin("myPlugin");
        (_a = _plugin.setOptions) == null ? void 0 : _a.call(_plugin, {
          requestDomain: "https://passport.migu.cn",
          sourceId: "220055",
          skin: "music",
          protocols: [
            ["服务协议", "/pages/protocol"],
            ["隐私政策", "/pages/privacy"]
          ]
        });
      }
      return _plugin;
    };
    function goCheckToken() {
      getPlugin().apiGetMiguToken({
        success: (miguToken) => {
          console.log("用户已登录，获取的一级token为:", miguToken);
          const userInfo2 = getPlugin().getMiguUserInfo();
          console.log(userInfo2, "我是用户信息");
          if (miguToken) {
            api_loginApi.login.login({
              token: miguToken
            }).then((res) => {
              console.log(res, "我是内部登录返回");
              common_vendor.index.setStorageSync("token", res);
              getUserInfo();
            });
          }
          checkToken();
        },
        fail: (err) => {
          if (getPlugin().getMiguUserInfo()) {
            console.log("用户已登录，但获取token失败，重试一次:", err);
            goCheckToken();
            return;
          } else {
            console.log(
              "获取一级token失败，用户未登录或会话已失效，需重新登录:",
              err
            );
            common_vendor.index.clearStorage();
          }
          checkToken();
        }
      });
    }
    function reminderChange(val) {
      console.log(val, "我是传的值");
      remindSelect.value = val;
    }
    function reminderOtherMethodChange(val) {
      console.log(val, "我是入参");
      remindWayOtherSelect.value = val;
    }
    function reminderOwnMethodChange(val) {
      console.log(val, "我是入参");
      remindWayOwnSelect.value = val;
    }
    const loginStauts = async (data) => {
      getUserInfo();
      closeLoginPopup();
    };
    async function getUserInfo() {
      var _a, _b, _c, _d, _e;
      isLogin.value = true;
      userInfo.value = await api_profile.profile.findHomePageUserInfo({});
      vipStatus.value = (_a = userInfo.value) == null ? void 0 : _a.vipStatus;
      console.log(vipStatus.value, "我是会员状态");
      memberList.value = (_b = userInfo.value) == null ? void 0 : _b.userRelation;
      remindWayOtherSelect.value = (_c = userInfo.value) == null ? void 0 : _c.reminderWayConfig.remindOther;
      remindWayOwnSelect.value = (_d = userInfo.value) == null ? void 0 : _d.reminderWayConfig.remindOwner;
      remindSelect.value = (_e = userInfo.value) == null ? void 0 : _e.reminderContentSelect;
      common_vendor.index.setStorageSync("userInfo", userInfo.value);
      console.log(remindWayOtherSelect.value, "我是用户信息");
    }
    const getVideoList = async () => {
      const res = await api_allVideo.allVideo.getVideoList({});
      console.log(res, "查询视频列表");
      selectVideo.value = res[0].smallAvatar;
    };
    const getVoiceList = async () => {
      var _a;
      const res = await api_allVoice.allVoice.getVoiceList({});
      console.log(res, "查询音频列表");
      selectVoice.value = (_a = res[0]) == null ? void 0 : _a.speakerAvatar;
    };
    async function getRemindSelectData() {
      remindSelectInfo.value = await api_profile.profile.reminderContentSelect({});
      remindSelect.value = remindSelectInfo.value.personalSelect;
      console.log(remindSelect.value, "人称选择查询123");
    }
    async function remindSelectSave() {
      const resData = await api_profile.profile.reminderContentSave({
        personalSelect: remindSelect.value
      });
      if (resData == 1) {
        closePopup();
        getUserInfo();
      }
      console.log(resData, "人称选择保存信息返回");
    }
    async function reminderWaySelect() {
      const res = await api_profile.profile.reminderWaySelect({});
      remindWayOtherSelect.value = res == null ? void 0 : res.remindOther;
      remindWayOwnSelect.value = res == null ? void 0 : res.remindOwner;
      console.log(res, "人称选择查询");
    }
    async function reminderWaySave() {
      const res = await api_profile.profile.reminderWaySave({
        remindOther: remindWayOtherSelect.value,
        remindOwner: remindWayOwnSelect.value
      });
      if (res == 1) {
        closeRemindPopup();
        getUserInfo();
      }
      console.log(res, "提醒方式提交返回");
    }
    const remindPopup = common_vendor.ref(null);
    const reminderMethodpopup = common_vendor.ref(null);
    function closePopup() {
      remindPopup.value.close();
    }
    function openLoginPopup() {
      cVisible.value = true;
    }
    function closeLoginPopup() {
      cVisible.value = false;
    }
    const loginPopupClose = (val) => {
      console.log(val, "我是登录关闭返回");
      closeLoginPopup();
    };
    function closeRemindPopup() {
      reminderMethodpopup.value.close();
    }
    function showMethodPopup() {
      reminderMethodpopup.value.open("center");
    }
    function goMyfamily() {
      utils_router.forward("myFamily");
    }
    function goVoice() {
      utils_router.forward("voice");
    }
    function goVideo() {
      utils_router.forward("video");
    }
    function goGuide() {
      utils_router.forward("guide");
    }
    function goFeedback() {
      utils_router.forward("feedBack");
    }
    function goMemberBenefits() {
      utils_router.forward("memberBenefits");
    }
    function goUserInfo() {
      utils_router.forward("userInfo");
    }
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      return common_vendor.e({
        a: common_vendor.p({
          title: "个人设置"
        }),
        b: !isLogin.value
      }, !isLogin.value ? {
        c: common_vendor.o(($event) => openLoginPopup())
      } : {}, {
        d: isLogin.value
      }, isLogin.value ? common_vendor.e({
        e: (_a = userInfo.value.userInfoVO) == null ? void 0 : _a.avatar,
        f: common_vendor.t((_c = (_b = userInfo.value) == null ? void 0 : _b.userInfoVO) == null ? void 0 : _c.phone),
        g: vipStatus.value === 0
      }, vipStatus.value === 0 ? {} : {}, {
        h: vipStatus.value === 1
      }, vipStatus.value === 1 ? {} : {}, {
        i: vipStatus.value === 2
      }, vipStatus.value === 2 ? {} : {}, {
        j: vipStatus.value === 3
      }, vipStatus.value === 3 ? {} : {}, {
        k: common_vendor.o(($event) => goUserInfo())
      }) : {}, {
        l: !isLogin.value || vipStatus.value === 0
      }, !isLogin.value || vipStatus.value === 0 ? {
        m: common_vendor.o(($event) => goMemberBenefits())
      } : {}, {
        n: isLogin.value && vipStatus.value === 1
      }, isLogin.value && vipStatus.value === 1 ? {
        o: common_vendor.o(($event) => goMemberBenefits()),
        p: common_vendor.t(userInfo.value.reminderWay.remindSmsLeft),
        q: common_vendor.t(userInfo.value.reminderWay.remindVoiceLeft),
        r: common_vendor.t(userInfo.value.reminderWay.remindVideoLeft),
        s: common_vendor.t(userInfo.value.reminderWay.familyMembersLeft)
      } : {}, {
        t: isLogin.value && vipStatus.value === 2
      }, isLogin.value && vipStatus.value === 2 ? {
        v: common_vendor.o(($event) => goMemberBenefits()),
        w: common_vendor.t(userInfo.value.reminderWay.remindSmsLeft),
        x: common_vendor.t(userInfo.value.reminderWay.remindVoiceLeft),
        y: common_vendor.t(userInfo.value.reminderWay.remindVideoLeft),
        z: common_vendor.t(userInfo.value.reminderWay.familyMembersLeft)
      } : {}, {
        A: isLogin.value && vipStatus.value === 3
      }, isLogin.value && vipStatus.value === 3 ? {
        B: common_vendor.o(($event) => goMemberBenefits()),
        C: common_vendor.t(userInfo.value.reminderWay.remindSmsLeft),
        D: common_vendor.t(userInfo.value.reminderWay.remindVoiceLeft),
        E: common_vendor.t(userInfo.value.reminderWay.remindVideoLeft),
        F: common_vendor.t(userInfo.value.reminderWay.familyMembersLeft)
      } : {}, {
        G: common_vendor.o(($event) => goMyfamily()),
        H: common_vendor.f(memberList.value, (item, index, i0) => {
          return {
            a: item.headImage,
            b: common_vendor.t(item.typeName),
            c: index
          };
        }),
        I: isLogin.value
      }, isLogin.value ? {
        J: (_d = userInfo.value.voiceCallsSpeaker) == null ? void 0 : _d.speakerAvatar
      } : {}, {
        K: !isLogin.value
      }, !isLogin.value ? {
        L: (_e = selectVoice.value[0]) == null ? void 0 : _e.speakerAvatar
      } : {}, {
        M: common_vendor.o(($event) => goVoice()),
        N: isLogin.value
      }, isLogin.value ? {
        O: (_f = userInfo.value.videoCallsPerson) == null ? void 0 : _f.smallAvatar
      } : {}, {
        P: !isLogin.value
      }, !isLogin.value ? {
        Q: (_g = selectVideo.value[0]) == null ? void 0 : _g.smallAvatar
      } : {}, {
        R: common_vendor.o(($event) => goVideo()),
        S: ((_h = userInfo.value.reminderWayConfig) == null ? void 0 : _h.remindOther) === 2 || remindWayOtherSelect.value === 2
      }, ((_i = userInfo.value.reminderWayConfig) == null ? void 0 : _i.remindOther) === 2 || remindWayOtherSelect.value === 2 ? {} : {}, {
        T: ((_j = userInfo.value.reminderWayConfig) == null ? void 0 : _j.remindOther) === 3 || remindWayOtherSelect.value === 3
      }, ((_k = userInfo.value.reminderWayConfig) == null ? void 0 : _k.remindOther) === 3 || remindWayOtherSelect.value === 3 ? {} : {}, {
        U: ((_l = userInfo.value.reminderWayConfig) == null ? void 0 : _l.remindOther) === 1 || remindWayOtherSelect.value === 1
      }, ((_m = userInfo.value.reminderWayConfig) == null ? void 0 : _m.remindOther) === 1 || remindWayOtherSelect.value === 1 ? {} : {}, {
        V: common_vendor.o(($event) => showMethodPopup()),
        W: common_vendor.o(($event) => goGuide()),
        X: common_vendor.o(($event) => goFeedback()),
        Y: remindSelect.value != 0
      }, remindSelect.value != 0 ? {
        Z: common_vendor.o(($event) => reminderChange(0))
      } : {}, {
        aa: remindSelect.value == 0
      }, remindSelect.value == 0 ? {} : {}, {
        ab: remindSelect.value != 1
      }, remindSelect.value != 1 ? {
        ac: common_vendor.o(($event) => reminderChange(1))
      } : {}, {
        ad: remindSelect.value == 1
      }, remindSelect.value == 1 ? {} : {}, {
        ae: common_vendor.o(($event) => closePopup()),
        af: common_vendor.o(($event) => remindSelectSave()),
        ag: common_vendor.sr(remindPopup, "f97f9319-1", {
          "k": "remindPopup"
        }),
        ah: common_vendor.p({
          type: "bottom"
        }),
        ai: remindWayOtherSelect.value === 2
      }, remindWayOtherSelect.value === 2 ? {} : {}, {
        aj: remindWayOtherSelect.value === 2 ? 1 : "",
        ak: common_vendor.o(($event) => reminderOtherMethodChange(2)),
        al: remindWayOtherSelect.value === 3
      }, remindWayOtherSelect.value === 3 ? {} : {}, {
        am: remindWayOtherSelect.value === 3 ? 1 : "",
        an: common_vendor.o(($event) => reminderOtherMethodChange(3)),
        ao: remindWayOwnSelect.value === 2
      }, remindWayOwnSelect.value === 2 ? {} : {}, {
        ap: remindWayOwnSelect.value === 2 ? 1 : "",
        aq: common_vendor.o(($event) => reminderOwnMethodChange(2)),
        ar: remindWayOwnSelect.value === 3
      }, remindWayOwnSelect.value === 3 ? {} : {}, {
        as: remindWayOwnSelect.value === 3 ? 1 : "",
        at: common_vendor.o(($event) => reminderOwnMethodChange(3)),
        av: remindWayOwnSelect.value === 1
      }, remindWayOwnSelect.value === 1 ? {} : {}, {
        aw: remindWayOwnSelect.value === 1 ? 1 : "",
        ax: common_vendor.o(($event) => reminderOwnMethodChange(1)),
        ay: common_vendor.o(($event) => closeRemindPopup()),
        az: common_vendor.o(($event) => reminderWaySave()),
        aA: common_vendor.sr(reminderMethodpopup, "f97f9319-2", {
          "k": "reminderMethodpopup"
        }),
        aB: common_vendor.p({
          type: "bottom"
        }),
        aC: common_vendor.o(loginStauts),
        aD: common_vendor.o(loginPopupClose),
        aE: common_vendor.p({
          visible: cVisible.value
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-f97f9319"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/profile/index.vue"]]);
wx.createPage(MiniProgramPage);
