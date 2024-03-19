"use strict";
const common_vendor = require("../../common/vendor.js");
const api_reminder = require("../../api/reminder.js");
const common_assets = require("../../common/assets.js");
require("../../utils/request.js");
require("../../utils/platform.js");
require("../../utils/router.js");
require("../../utils/shared.js");
require("../../utils/urlMap.js");
require("../../config/commonParams.js");
require("../../helper/pinia-auto-refs.js");
require("../../store/app.js");
require("../../store/setup.js");
require("../../store/test.js");
require("../../store/user.js");
require("../../config/env.js");
require("../../config/serviceLoading.js");
require("../ipViewComponents/core/message/MessageCenter.js");
require("../ipViewComponents/core/utils/pools/ObjectPool.js");
require("../../constants/MainPageConstants.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["confirm", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    common_vendor.watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal) {
          dialogShow();
        } else {
          dialogClose();
        }
      }
    );
    const formData = common_vendor.ref({});
    const formStatus = common_vendor.ref(false);
    const confirmAble = common_vendor.computed(() => {
      return formData.value.phone && formData.value.code;
    });
    const dialogRef = common_vendor.ref(null);
    const dialogShow = () => {
      formData.value = { ...props.data };
      if (!formData.value.id) {
        formStatus.value = true;
      }
      dialogRef.value.open();
    };
    const dialogClose = () => {
      emits("close");
      dialogRef.value.close();
      setTimeout(() => {
        clearData();
      }, 500);
    };
    const confirmFn = (type) => {
      const req = {
        typeId: formData.value.typeId,
        id: formData.value.id,
        heardImageId: formData.value.typeId,
        phone: formData.value.phone,
        code: formData.value.code
      };
      if (!formData.value.typeId) {
        common_vendor.index.showToast({
          title: "请选择人物关系"
        });
        return;
      }
      api_reminder.reminder.relationSave(req).then(() => {
        emits("confirm", type);
        dialogRef.value.close();
        setTimeout(() => {
          clearData();
        }, 500);
      });
    };
    const changeEdit = () => {
      formStatus.value = true;
    };
    const delFn = () => {
      if (formData.value.typeName == "自己") {
        common_vendor.index.showToast({
          title: "不能删除自己",
          icon: "error"
        });
        return;
      }
      confirmShow();
    };
    const confirmDel = async () => {
      await api_reminder.reminder.relationDel({ id: formData.value.id });
      dialogRef.value.close();
      emits("confirm", "del");
      confirmClose();
    };
    const leftTime = common_vendor.ref(59);
    const smsBtnMsg = common_vendor.ref("获取验证码");
    let timer = null;
    const getVerCode = async () => {
      if (smsBtnMsg.value !== "获取验证码") {
        return;
      }
      const res = await api_reminder.reminder.relationSms({ phone: formData.value.phone });
      formData.value.code = res;
      timer = setInterval(() => {
        if (leftTime.value < 0) {
          smsBtnMsg.value = "获取验证码";
          leftTime.value = 59;
          clearInterval(timer);
        } else {
          smsBtnMsg.value = `${leftTime.value--}s`;
        }
      }, 1e3);
    };
    const popupRef = common_vendor.ref(null);
    const targetList = common_vendor.ref([]);
    const getTargetFn = async () => {
      const res = await api_reminder.reminder.findType({
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
    const changeTargeFn = (item) => {
      formData.value.typeName = item.typeName;
      formData.value.typeId = item.id;
      formData.value.headImage = item.headImage;
    };
    const confirmSelect = () => {
      popupRef.value.close();
    };
    const confirmRef = common_vendor.ref(null);
    const confirmShow = () => {
      confirmRef.value.open();
    };
    const confirmClose = () => {
      confirmRef.value.close();
    };
    const clearData = () => {
      clearInterval(timer);
      leftTime.value = 59;
      smsBtnMsg.value = "获取验证码";
      formStatus.value = false;
    };
    common_vendor.onMounted(() => {
      if (props.visible) {
        dialogShow();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(dialogClose),
        b: common_vendor.unref(formData).headImage || common_vendor.unref(common_assets.defaultPng),
        c: common_vendor.unref(formStatus)
      }, common_vendor.unref(formStatus) ? common_vendor.e({
        d: !__props.data.id
      }, !__props.data.id ? {
        e: common_vendor.o(openPopup)
      } : {
        f: common_vendor.t(__props.data.typeName)
      }, {
        g: common_vendor.unref(formData).phone,
        h: common_vendor.o(($event) => common_vendor.unref(formData).phone = $event.detail.value),
        i: common_vendor.unref(formData).code,
        j: common_vendor.o(($event) => common_vendor.unref(formData).code = $event.detail.value),
        k: common_vendor.t(common_vendor.unref(smsBtnMsg)),
        l: common_vendor.o(getVerCode),
        m: common_vendor.unref(formData).id
      }, common_vendor.unref(formData).id ? {
        n: common_vendor.o(delFn)
      } : {}, {
        o: common_vendor.n(common_vendor.unref(confirmAble) ? "able" : "disable"),
        p: common_vendor.o(($event) => confirmFn("add"))
      }) : {
        q: common_vendor.t(__props.data.typeName),
        r: common_vendor.t(__props.data.phone),
        s: common_vendor.o(changeEdit),
        t: common_vendor.o(delFn),
        v: common_vendor.o(($event) => confirmFn("edit"))
      }, {
        w: common_vendor.sr(dialogRef, "8445e454-0", {
          "k": "dialogRef"
        }),
        x: common_vendor.p({
          type: "center",
          ["mask-click"]: false,
          ["is-mask-click"]: false
        }),
        y: common_vendor.o(confirmClose),
        z: common_vendor.o(confirmDel),
        A: common_vendor.sr(confirmRef, "8445e454-1", {
          "k": "confirmRef"
        }),
        B: common_vendor.p({
          type: "center",
          ["mask-click"]: false,
          ["is-mask-click"]: false
        }),
        C: common_vendor.f(common_vendor.unref(targetList), (item, k0, i0) => {
          return {
            a: item.headImage,
            b: common_vendor.t(item.typeName),
            c: item.id,
            d: common_vendor.n(common_vendor.unref(formData).typeId === item.id ? "active" : ""),
            e: common_vendor.o(($event) => changeTargeFn(item), item.id)
          };
        }),
        D: common_vendor.o(($event) => closePopup()),
        E: common_vendor.o(($event) => confirmSelect()),
        F: common_vendor.sr(popupRef, "8445e454-2", {
          "k": "popupRef"
        }),
        G: common_vendor.p({
          type: "bottom",
          ["mask-click"]: false,
          ["is-mask-click"]: false,
          ["safe-area"]: false
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8445e454"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/character/index.vue"]]);
wx.createComponent(Component);
