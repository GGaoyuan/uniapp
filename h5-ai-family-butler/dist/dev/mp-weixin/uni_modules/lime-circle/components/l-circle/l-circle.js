"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeCircle_components_lCircle_useTransition = require("./useTransition.js");
const uni_modules_limeCircle_components_lCircle_props = require("./props.js");
const uni_modules_limeCircle_components_lCircle_getCanvas = require("./getCanvas.js");
const uni_modules_limeCircle_components_lCircle_circle = require("./circle.js");
const uni_modules_limeShared_addUnit_index = require("../../../lime-shared/addUnit/index.js");
const uni_modules_limeShared_unitConvert_index = require("../../../lime-shared/unitConvert/index.js");
const uni_modules_limeShared_isString_index = require("../../../lime-shared/isString/index.js");
const uni_modules_limeShared_getRect_index = require("../../../lime-shared/getRect/index.js");
require("./animation/ease.js");
require("./animation/bezier.js");
require("./animation/index.js");
require("../../../lime-shared/canIUseCanvas2d/index.js");
require("../../../lime-shared/isNumeric/index.js");
require("../../../lime-shared/isDef/index.js");
const _sfc_main = common_vendor.defineComponent$1({
  name: "l-circle",
  props: uni_modules_limeCircle_components_lCircle_props.CircleProps,
  emits: ["update:current"],
  setup(props, { emit }) {
    const context = common_vendor.getCurrentInstance();
    const useCanvas = common_vendor.ref(props.canvas);
    const canvasId = `l-circle-${context.uid}`;
    let circleCanvas = null;
    const RADIAN = Math.PI / 180;
    const ratio = common_vendor.computed(() => 100 / props.max);
    const percent = common_vendor.ref(0);
    const angle = common_vendor.computed(() => props.dashboard ? 135 : -90);
    const isShowCap = common_vendor.computed(() => {
      const { dashboard } = props;
      return current.value > 0 && (dashboard ? true : current.value < props.max);
    });
    const offsetTop = common_vendor.ref(0);
    const strokeEndCap = common_vendor.reactive({
      x: "0",
      y: "0"
    });
    const styles = common_vendor.computed(() => ({
      width: uni_modules_limeShared_addUnit_index.addUnit(props.size),
      height: uni_modules_limeShared_addUnit_index.addUnit(props.size),
      "--l-circle-offset-top": !useCanvas.value && offsetTop.value
    }));
    const classes = common_vendor.computed(() => {
      const { clockwise, lineCap } = props;
      return lineCap ? `is-${lineCap} ` : " " + !clockwise && !useCanvas.value && `clockwise`;
    });
    const trailStyles = common_vendor.computed(() => {
      const { size, trailWidth, trailColor, dashboard } = props;
      const circle = getCircle(size, trailWidth);
      const mask = `radial-gradient(transparent ${circle.r - 0.5}px, #000 ${circle.r}px)`;
      let background = "";
      let capStart = { x: "", y: "" };
      let capEnd = capStart;
      if (dashboard) {
        background = `conic-gradient(from 225deg, ${trailColor} 0%, ${trailColor} 75%, transparent 75%, transparent 100%)`;
        capStart = calcPosition(circle.c, 135);
        capEnd = calcPosition(circle.c, 45);
        offsetTop.value = (uni_modules_limeShared_unitConvert_index.unitConvert(size) - (uni_modules_limeShared_unitConvert_index.unitConvert(capStart.y) + uni_modules_limeShared_unitConvert_index.unitConvert(trailWidth) / 2)) / 4 + "px";
      } else {
        background = `${trailColor}`;
      }
      return {
        color: trailColor,
        mask,
        "-webkit-mask": mask,
        background,
        "--l-circle-trail-cap-start-x": capStart.x,
        "--l-circle-trail-cap-start-y": capStart.y,
        "--l-circle-trail-cap-end-x": capEnd.x,
        "--l-circle-trail-cap-end-y": capEnd.y,
        // '--l-circle-trail-cap-color': trailColor,
        "--l-circle-trail-cap-size": uni_modules_limeShared_addUnit_index.addUnit(uni_modules_limeShared_unitConvert_index.unitConvert(trailWidth))
      };
    });
    const strokeStyles = common_vendor.computed(() => {
      const { size, strokeWidth, strokeColor, dashboard, max } = props;
      const circle = getCircle(size, strokeWidth);
      const percent2 = dashboard ? current.value * 0.75 * ratio.value : current.value * ratio.value;
      const mask = `radial-gradient(transparent ${circle.r - 0.5}px, #000 ${circle.r}px)`;
      const cap = calcPosition(circle.c, angle.value);
      let startColor = "";
      let endColor = "";
      let gradient = `conic-gradient(${dashboard ? "from 225deg," : ""} transparent 0%,`;
      let gradientEnd = `transparent var(--l-circle-percent), transparent ${dashboard ? "75%" : "100%"})`;
      if (uni_modules_limeShared_isString_index.isString(strokeColor)) {
        gradient += ` ${strokeColor} 0%, ${strokeColor} var(--l-circle-percent), ${gradientEnd}`;
        startColor = endColor = strokeColor;
      } else if (Array.isArray(strokeColor)) {
        const len = strokeColor.length;
        for (let i = 0; i < len; i++) {
          const color = strokeColor[i];
          if (i === 0) {
            gradient += `${color} 0%,`;
            startColor = color;
          } else {
            gradient += `${color} calc(var(--l-circle-percent) * ${(i + 1) / len}),`;
          }
          if (i == len - 1) {
            endColor = color;
          }
        }
        gradient += gradientEnd;
      }
      return {
        mask,
        "-webkit-mask": mask,
        "--l-background": gradient,
        // background: isString(strokeColor) ? strokeColor : strokeColor[0],
        // background: gradient,
        // transition: `--l-circle-percent ${duration}ms`,
        "--l-circle-percent": `${percent2 / ratio.value == max ? percent2 + 0.1 : percent2}%`,
        "--l-circle-stroke-cap-start-color": startColor,
        "--l-circle-stroke-cap-end-color": endColor,
        "--l-circle-stroke-cap-start-x": cap.x,
        "--l-circle-stroke-cap-start-y": cap.y,
        "--l-circle-stroke-cap-end-x": strokeEndCap.x,
        "--l-circle-stroke-cap-end-y": strokeEndCap.y,
        "--l-circle-stroke-cap-size": uni_modules_limeShared_addUnit_index.addUnit(uni_modules_limeShared_unitConvert_index.unitConvert(strokeWidth)),
        "--l-circle-stroke-cap-opacity": isShowCap.value ? 1 : 0
      };
    });
    const calcStrokeCap = () => {
      const { size, strokeWidth, dashboard, max } = props;
      const circle = getCircle(size, strokeWidth);
      const arc = dashboard ? 180 / 2 * 3 : 180 * 2;
      const step = arc / max * current.value + angle.value;
      const cap = calcPosition(circle.c, step);
      strokeEndCap.x = cap.x;
      strokeEndCap.y = cap.y;
    };
    const calcPosition = (r, angle2) => {
      return {
        x: r + r * Math.cos(angle2 * RADIAN) + "px",
        y: r + r * Math.sin(angle2 * RADIAN) + "px"
      };
    };
    const getCircle = (size, lineWidth) => {
      const s = uni_modules_limeShared_unitConvert_index.unitConvert(size);
      const w = uni_modules_limeShared_unitConvert_index.unitConvert(lineWidth);
      const c = (s - w) / 2;
      const r = s / 2 - w;
      return {
        s,
        w,
        c,
        r
      };
    };
    const [current, stopTransition] = uni_modules_limeCircle_components_lCircle_useTransition.useTransition(percent, {
      duration: props.duration
    });
    const stopPercent = common_vendor.watch(() => props.percent, (v) => {
      percent.value = v;
      circleCanvas && circleCanvas.play(v);
    });
    const stopCurrent = common_vendor.watch(current, (v) => {
      if (!useCanvas.value) {
        calcStrokeCap();
      }
      emit("update:current", v.toFixed(2));
    });
    const getProps = () => {
      const { strokeWidth, trailWidth } = props;
      return Object.assign({}, props, { trailWidth: uni_modules_limeShared_unitConvert_index.unitConvert(trailWidth), strokeWidth: uni_modules_limeShared_unitConvert_index.unitConvert(strokeWidth) });
    };
    common_vendor.onMounted(() => {
      uni_modules_limeShared_getRect_index.getRect(".check", { context }).then((res) => {
        useCanvas.value = !(res.height > 0 && !props.canvas);
        if (useCanvas.value) {
          stopTransition();
          setTimeout(() => {
            uni_modules_limeCircle_components_lCircle_getCanvas.getCanvas(canvasId, { context }).then((res2) => {
              circleCanvas = new uni_modules_limeCircle_components_lCircle_circle.b(res2, {
                size: uni_modules_limeShared_unitConvert_index.unitConvert(props.size),
                run: (v) => current.value = v,
                pixelRatio: uni_modules_limeCircle_components_lCircle_getCanvas.isCanvas2d ? common_vendor.index.getSystemInfoSync().pixelRatio : 1
              });
              circleCanvas.setOption(getProps());
              circleCanvas.play(props.percent);
            });
          }, 50);
        }
        percent.value = props.percent;
      });
    });
    common_vendor.onUnmounted(() => {
      stopPercent();
      stopCurrent();
      stopTransition();
    });
    return {
      useCanvas,
      canvasId,
      classes,
      styles,
      trailStyles,
      strokeStyles,
      current
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.useCanvas
  }, !_ctx.useCanvas ? {
    b: common_vendor.s(_ctx.trailStyles)
  } : {}, {
    c: !_ctx.useCanvas
  }, !_ctx.useCanvas ? common_vendor.e({
    d: _ctx.current
  }, _ctx.current ? {} : {}, {
    e: _ctx.current
  }, _ctx.current ? {} : {}, {
    f: common_vendor.s(_ctx.strokeStyles)
  }) : {}, {
    g: _ctx.useCanvas
  }, _ctx.useCanvas ? {
    h: _ctx.canvasId,
    i: _ctx.canvasId
  } : {}, {
    j: common_vendor.n({
      clockwise: !_ctx.clockwise && !_ctx.useCanvas
    }),
    k: common_vendor.n(["is-" + _ctx.lineCap]),
    l: common_vendor.s(_ctx.styles)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/uni_modules/lime-circle/components/l-circle/l-circle.vue"]]);
wx.createComponent(Component);
