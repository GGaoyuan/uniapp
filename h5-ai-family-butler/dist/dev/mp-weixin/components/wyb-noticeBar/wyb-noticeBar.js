"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      show: true,
      animDur: "5s",
      autoBoxWidth: 0,
      autoBoxHeight: 0,
      textPercent: 0.77,
      noticePercent: 0.075,
      morePercent: 0.09,
      closePercent: 0.065,
      swp: this.text.slice(),
      textIdx: 0
    };
  },
  computed: {
    rpxWidth() {
      return parseFloat(this.width) / common_vendor.index.getSystemInfoSync().screenWidth * 750;
    },
    autoMarQueeWidth() {
      let percent = this.textPercent;
      if (!this.showClose) {
        percent += this.closePercent;
      }
      if (!this.showIcon) {
        percent += this.noticePercent;
      }
      if (!this.showMore) {
        percent += this.morePercent;
      }
      return parseFloat(this.width) * percent;
    },
    autoNoticeWidth() {
      return parseFloat(this.width) * this.noticePercent;
    },
    autoMoreWidth() {
      return parseFloat(this.width) * this.morePercent;
    },
    autoCloseWidth() {
      return parseFloat(this.width) * this.closePercent;
    },
    blockWidth() {
      let result = 0;
      let eleWidth = 0;
      this.getRect("#text").then((res) => {
        eleWidth = res.width;
      });
      let comWidth = parseFloat(this.autoMarQueeWidth);
      result = comWidth - parseFloat(eleWidth) - this.spaceConst;
      return result;
    },
    autoBgColor() {
      return this.RGBChange(this.color, 0.85, "light");
    },
    autoNoticeSize() {
      return parseFloat(this.width) * 0.087 + "rpx";
    },
    autoMoreSize() {
      return parseFloat(this.width) * 0.087 + "rpx";
    },
    autoCloseSize() {
      return parseFloat(this.width) * 0.087 + "rpx";
    }
  },
  props: {
    // 整体配置参数
    type: {
      type: String,
      default: "hori-connect"
    },
    width: {
      type: [String, Number],
      default: common_vendor.index.getSystemInfoSync().screenWidth
    },
    height: {
      type: [String, Number],
      default: 70
    },
    color: {
      type: String,
      default: "#f5a300"
    },
    bgColor: {
      type: String,
      default: ""
    },
    text: {
      type: Array,
      default() {
        return [];
      }
    },
    fontWeight: {
      type: String,
      default: "normal"
    },
    fontSize: {
      type: [String, Number],
      default: "27"
    },
    hasBorder: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showMore: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ""
    },
    extendMoreArea: {
      type: Boolean,
      default: false
    },
    // hori-connect配置参数
    join: {
      type: String,
      default: "    "
    },
    spaceConst: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 40
    },
    // vert和hori-break配置参数
    time: {
      type: Number,
      default: 3e3
    },
    duration: {
      type: Number,
      default: 1e3
    }
  },
  mounted() {
    this.getRect("#text").then((res) => {
      this.autoBoxWidth = (res.width + this.blockWidth) * 2;
      this.animDur = parseFloat(res.width + this.blockWidth) / this.speed + "s";
    });
  },
  methods: {
    showMoreTap() {
      if (this.url) {
        common_vendor.index.navigateTo({
          url: this.url,
          fail(msg) {
            console.log(msg);
          }
        });
      } else {
        this.$emit("showMore");
      }
    },
    showMoreExtendTap() {
      if (this.extendMoreArea) {
        this.showMoreTap();
      }
    },
    swpChange(e) {
      if (this.text.length > 2) {
        let current = e.detail.current;
        if (current === 1) {
          this.swp.splice(0, 1, this.swp[2]);
          this.swp.splice(2, 1);
        } else if (current === 0) {
          this.swp.splice(1, 1, this.swp[2]);
          this.swp.splice(2, 1);
        }
        this.swp.push(this.text[this.textIdx]);
        this.textIdx++;
        if (this.textIdx === this.text.length - 1)
          this.textIdx = 0;
      }
    },
    getRect(selector) {
      return new Promise((resolve) => {
        common_vendor.index.createSelectorQuery().in(this)["select"](selector).boundingClientRect((rect) => {
          if (rect)
            resolve(rect);
        }).exec();
      });
    },
    RGBChange(color, level, type) {
      if (color.length === 4) {
        let arr = color.split("");
        color = "#" + arr[1] + arr[1] + arr[2] + arr[2] + arr[3] + arr[3];
      }
      let color16List = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)];
      let r = parseInt(color16List[0], 16);
      let g = parseInt(color16List[1], 16);
      let b = parseInt(color16List[2], 16);
      let rgbc = [r, g, b];
      for (var i = 0; i < 3; i++)
        type === "light" ? rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]) : rgbc[i] = Math.floor(rgbc[i] * (1 - level));
      let R = rgbc[0].toString(16);
      let G = rgbc[1].toString(16);
      let B = rgbc[2].toString(16);
      if (R.length === 1)
        R = "0" + R;
      if (G.length === 1)
        G = "0" + G;
      if (B.length === 1)
        B = "0" + B;
      return "#" + R + G + B;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? common_vendor.e({
    b: $props.showClose
  }, $props.showClose ? {
    c: $options.autoCloseSize,
    d: $props.color,
    e: $props.height + "rpx",
    f: common_vendor.o(($event) => $data.show = false),
    g: $options.autoCloseWidth + "px",
    h: $props.height + "rpx",
    i: $props.showIcon ? "10rpx" : "0",
    j: $props.bgColor || $options.autoBgColor
  } : {}, {
    k: $props.showIcon
  }, $props.showIcon ? {
    l: $options.autoNoticeSize,
    m: $props.color,
    n: $props.height + "rpx",
    o: $options.autoNoticeWidth + "px",
    p: $props.height + "rpx",
    q: $props.bgColor || $options.autoBgColor
  } : {}, {
    r: $props.type === "hori-connect"
  }, $props.type === "hori-connect" ? {
    s: common_vendor.t($props.text.length <= 1 ? $props.text[0] : $props.text.join($props.join)),
    t: $props.color,
    v: $props.fontWeight,
    w: $props.fontSize + "rpx",
    x: $props.height + "rpx",
    y: common_vendor.s("width: " + $options.blockWidth + "px; height: 100%"),
    z: common_vendor.t($props.text.length <= 1 ? $props.text[0] : $props.text.join($props.join)),
    A: $props.color,
    B: $props.fontWeight,
    C: $props.fontSize + "rpx",
    D: $props.height + "rpx",
    E: common_vendor.s("width: " + $options.blockWidth + "px; height: 100%"),
    F: $data.autoBoxWidth + "px",
    G: $props.scroll ? "" : "none",
    H: $data.animDur,
    I: common_vendor.o((...args) => $options.showMoreExtendTap && $options.showMoreExtendTap(...args)),
    J: $options.autoMarQueeWidth + "px",
    K: $props.bgColor || $options.autoBgColor
  } : {}, {
    L: $props.type === "vert" || $props.type === "hori-break"
  }, $props.type === "vert" || $props.type === "hori-break" ? common_vendor.e({
    M: $props.text.length <= 2
  }, $props.text.length <= 2 ? {
    N: common_vendor.f($props.text, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    O: $props.color,
    P: $props.fontWeight,
    Q: $props.fontSize + "rpx"
  } : {}, {
    R: $props.text.length > 2
  }, $props.text.length > 2 ? {
    S: common_vendor.t($data.swp[0]),
    T: $props.color,
    U: $props.fontWeight,
    V: $props.fontSize + "rpx"
  } : {}, {
    W: $props.text.length > 2
  }, $props.text.length > 2 ? {
    X: common_vendor.t($data.swp[1]),
    Y: $props.color,
    Z: $props.fontWeight,
    aa: $props.fontSize + "rpx"
  } : {}, {
    ab: $props.fontSize * 1.3 + "rpx",
    ac: $props.scroll,
    ad: $props.time,
    ae: $props.duration,
    af: $props.type === "vert",
    ag: common_vendor.o((...args) => $options.swpChange && $options.swpChange(...args)),
    ah: common_vendor.o((...args) => $options.showMoreExtendTap && $options.showMoreExtendTap(...args)),
    ai: $options.autoMarQueeWidth + "px",
    aj: $props.bgColor || $options.autoBgColor
  }) : {}, {
    ak: $props.showMore
  }, $props.showMore ? {
    al: $options.autoMoreSize,
    am: $props.color,
    an: $props.height + "rpx",
    ao: common_vendor.o((...args) => $options.showMoreTap && $options.showMoreTap(...args)),
    ap: $options.autoMoreWidth + "px",
    aq: $props.height + "rpx",
    ar: $props.bgColor || $options.autoBgColor
  } : {}, {
    as: $options.rpxWidth + "rpx",
    at: $props.height + "rpx",
    av: $props.bgColor || $options.autoBgColor,
    aw: $props.hasBorder ? "1px solid" + $props.color : "none"
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/components/wyb-noticeBar/wyb-noticeBar.vue"]]);
wx.createComponent(Component);
