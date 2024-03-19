"use strict";
function t(t2, i2) {
  if (!(t2 instanceof i2))
    throw new TypeError("Cannot call a class as a function");
}
function i(t2, i2) {
  for (var e2 = 0; i2.length > e2; e2++) {
    var n2 = i2[e2];
    n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t2, n2.key, n2);
  }
}
function e(t2, e2, n2) {
  return e2 && i(t2.prototype, e2), n2 && i(t2, n2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
}
function n(t2, i2) {
  (null == i2 || i2 > t2.length) && (i2 = t2.length);
  for (var e2 = 0, n2 = Array(i2); i2 > e2; e2++)
    n2[e2] = t2[e2];
  return n2;
}
function r(t2, i2) {
  var e2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
  if (!e2) {
    if (Array.isArray(t2) || (e2 = function(t3, i3) {
      if (t3) {
        if ("string" == typeof t3)
          return n(t3, i3);
        var e3 = Object.prototype.toString.call(t3).slice(8, -1);
        return "Object" === e3 && t3.constructor && (e3 = t3.constructor.name), "Map" === e3 || "Set" === e3 ? Array.from(t3) : "Arguments" === e3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3) ? n(t3, i3) : void 0;
      }
    }(t2)) || i2 && t2 && "number" == typeof t2.length) {
      e2 && (t2 = e2);
      var r2 = 0, a2 = function() {
      };
      return { s: a2, n: function() {
        return t2.length > r2 ? { done: false, value: t2[r2++] } : { done: true };
      }, e: function(t3) {
        throw t3;
      }, f: a2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var s2, o2 = true, h2 = false;
  return { s: function() {
    e2 = e2.call(t2);
  }, n: function() {
    var t3 = e2.next();
    return o2 = t3.done, t3;
  }, e: function(t3) {
    h2 = true, s2 = t3;
  }, f: function() {
    try {
      o2 || null == e2.return || e2.return();
    } finally {
      if (h2)
        throw s2;
    }
  } };
}
var a = function(t2) {
  return /^#.{3,6}$/.test(t2) ? 4 === t2.length ? t2.substring(1).split("").map(function(t3) {
    return 17 * parseInt(t3, 16);
  }) : [t2.substring(1, 3), t2.substring(3, 5), t2.substring(5, 7)].map(function(t3) {
    return parseInt(t3, 16);
  }) : (console.error("lime-circle: 渐变仅支持hex值"), [0, 0, 0]);
}, s = function(t2) {
  return 1 === t2.length ? "0" + t2 : t2;
}, o = function(t2, i2, e2) {
  var n2, r2, o2, h2, u2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, c2 = [], l2 = [], d2 = function(t3) {
    return Math.pow(t3 / 255, u2);
  };
  for (t2 = a(t2).map(d2), i2 = a(i2).map(d2), n2 = 0; e2 > n2; n2++) {
    for (h2 = 1 - (o2 = n2 / (e2 - 1)), r2 = 0; 3 > r2; r2++)
      l2[r2] = s(Math.round(255 * Math.pow(t2[r2] * h2 + i2[r2] * o2, 1 / u2)).toString(16));
    c2.push("#" + l2.join(""));
  }
  return c2;
};
var h = function(t2, i2, e2, n2) {
  var r2 = 1e-6, a2 = 3 * t2 - 3 * e2 + 1, s2 = 3 * e2 - 6 * t2, o2 = 3 * t2, h2 = 3 * i2 - 3 * n2 + 1, u2 = 3 * n2 - 6 * i2, c2 = 3 * i2;
  function l2(t3) {
    return ((a2 * t3 + s2) * t3 + o2) * t3;
  }
  return function(t3) {
    return i3 = function(t4) {
      for (var i4, e3, n3, h3 = t4, u3 = 0; 8 > u3; u3++) {
        if (e3 = l2(h3) - t4, r2 > Math.abs(e3))
          return h3;
        if (r2 > Math.abs(i4 = (3 * a2 * (n3 = h3) + 2 * s2) * n3 + o2))
          break;
        h3 -= e3 / i4;
      }
      var c3 = 1, d2 = 0;
      for (h3 = t4; c3 > d2; ) {
        if (e3 = l2(h3) - t4, r2 > Math.abs(e3))
          return h3;
        e3 > 0 ? c3 = h3 : d2 = h3, h3 = (c3 + d2) / 2;
      }
      return h3;
    }(t3), ((h2 * i3 + u2) * i3 + c2) * i3;
    var i3;
  };
}(0.25, 0.1, 0.25, 1), u = Symbol("tick"), c = Symbol("tick-handler"), l = Symbol("animations"), d = Symbol("start-times"), f = Symbol("pause-start"), v = Symbol("pause-time"), g = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : function(t2) {
  return setTimeout(t2, 1e3 / 60);
}, m = "undefined" != typeof cancelAnimationFrame ? cancelAnimationFrame : function(t2) {
  clearTimeout(t2);
}, y = function() {
  function i2() {
    t(this, i2), this.state = void 0, this.state = "Initiated", this[l] = /* @__PURE__ */ new Set(), this[d] = /* @__PURE__ */ new Map();
  }
  return e(i2, [{ key: "start", value: function() {
    var t2 = this;
    if ("Initiated" === this.state) {
      this.state = "Started";
      var i3 = Date.now();
      this[v] = 0, this[u] = function() {
        var e2, n2 = Date.now(), a2 = r(t2[l]);
        try {
          for (a2.s(); !(e2 = a2.n()).done; ) {
            var s2 = e2.value, o2 = void 0;
            (o2 = t2[d].get(s2) < i3 ? n2 - i3 - s2.delay - t2[v] : n2 - t2[d].get(s2) - s2.delay - t2[v]) > s2.duration && (t2[l].delete(s2), o2 = s2.duration), o2 > 0 && s2.run(o2);
          }
        } catch (t3) {
          a2.e(t3);
        } finally {
          a2.f();
        }
        t2[c] = g(t2[u]);
      }, this[u]();
    }
  } }, { key: "pause", value: function() {
    "Started" === this.state && (this.state = "Paused", this[f] = Date.now(), m(this[c]));
  } }, { key: "resume", value: function() {
    "Paused" === this.state && (this.state = "Started", this[v] += Date.now() - this[f], this[u]());
  } }, { key: "reset", value: function() {
    this.pause(), this.state = "Initiated", this[v] = 0, this[f] = 0, this[l] = /* @__PURE__ */ new Set(), this[d] = /* @__PURE__ */ new Map(), this[c] = null;
  } }, { key: "add", value: function(t2, i3) {
    2 > arguments.length && (i3 = Date.now()), this[l].add(t2), this[d].set(t2, i3);
  } }]), i2;
}(), p = function() {
  function i2(e2, n2, r2, a2, s2, o2) {
    t(this, i2), this.startValue = void 0, this.endValue = void 0, this.duration = void 0, this.timingFunction = void 0, this.delay = void 0, this.template = void 0, s2 = s2 || function(t2) {
      return t2;
    }, o2 = o2 || function(t2) {
      return t2;
    }, this.startValue = e2, this.endValue = n2, this.duration = r2, this.timingFunction = s2, this.delay = a2, this.template = o2;
  }
  return e(i2, [{ key: "run", value: function(t2) {
    var i3 = this.endValue - this.startValue, e2 = this.timingFunction(t2 / this.duration);
    this.template(this.startValue + i3 * e2);
  } }]), i2;
}(), w = Math.PI / 180, b = function() {
  function i2(e2, n2) {
    t(this, i2), this.canvas = void 0, this.context = void 0, this.current = 0, this.size = 0, this.pixelRatio = 1, this._isConicGradient = false, this._attrs = { percent: 0, size: "120px", lineCap: "round", strokeWidth: 6, strokeColor: "#2db7f5", trailWidth: 6, trailColor: "#ddd", dashboard: false, clockwise: true, duration: 300, max: 100, beforeAnimate: true, animate: true, formatter: "{d}{d}.{d}{d}%", fontSize: "16px", showText: false }, this._timer = void 0, this.startTime = 0, this.target = 0, this._colors = [], this._gradientColors = [], this._rAF = function(t2) {
    }, this._cAf = function(t2) {
    }, this.timeline = void 0, this.run = void 0, this.canvas = e2, this.run = n2.run, this.size = n2.size || 120, this.pixelRatio = n2.pixelRatio || 1, this.init(), this.initRaf(), this.timeline = new y(this._rAF, this._cAf);
  }
  return e(i2, [{ key: "init", value: function() {
    var t2 = this.size, i3 = this.pixelRatio;
    if (this.canvas) {
      this.canvas.width = t2 * i3, this.canvas.height = t2 * i3;
      var e2 = this.canvas.getContext("2d");
      this._isConicGradient = !!e2.createConicGradient, this.context = e2;
    }
  } }, { key: "initRaf", value: function() {
    var t2 = this.canvas;
    "undefined" != typeof window ? (this._rAF = window.requestAnimationFrame || function(t3) {
      return window.setTimeout(t3, 1e3 / 60);
    }, this._cAf = window.cancelAnimationFrame || function(t3) {
      window.clearTimeout(t3);
    }) : t2 && t2.requestAnimationFrame ? (this._rAF = t2.requestAnimationFrame, this._cAf = t2.cancelAnimationFrame) : (this._rAF = function(t3) {
      return setTimeout(t3, 16.7);
    }, this._cAf = function(t3) {
      clearTimeout(t3);
    });
  } }, { key: "setOption", value: function(t2) {
    Object.assign(this._attrs, t2);
  } }, { key: "set", value: function(t2, i3) {
    this._attrs[t2] = i3;
  } }, { key: "get", value: function(t2) {
    return this._attrs[t2] || this.canvas[t2];
  } }, { key: "play", value: function() {
    var t2 = this, i3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.get("percent");
    this.target = Math.max(Math.min(i3, this.get("max") || 100), 0), this.createConicGradient(), this.timeline.start(), this.timeline.add(new p(this.current, i3, this.get("duration"), 0, h, function(i4) {
      t2.current = 1e-4 > i4 ? 0 : i4, t2.render(t2.current), t2.run(t2.current);
    }));
  } }, { key: "createConicGradient", value: function() {
    if (!this._isConicGradient) {
      var t2 = this.get("strokeColor");
      if ("string" != typeof t2 && this._colors !== t2) {
        this._colors = t2, this._gradientColors = [];
        for (var i3 = this.getArc(), e2 = t2.length - 1, n2 = Math.floor(i3 / e2), r2 = 0; e2 > r2; r2++) {
          i3 -= n2, this._gradientColors = this._gradientColors.concat(o(t2[r2], t2[r2 + 1], r2 + 1 === e2 ? n2 + i3 : n2));
        }
      }
    }
  } }, { key: "render", value: function() {
    var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i3 = this.context, e2 = this.size, n2 = this.pixelRatio, r2 = this.getSalce(), a2 = this.getRotate(), s2 = e2 / 2;
    i3.setTransform(1, 0, 0, 1, 0, 0), i3.clearRect(-s2, -s2, e2, e2), i3.setTransform(r2 * n2, 0, 0, n2, s2 * n2, s2 * n2), i3.rotate(a2 * w), this.drawTrail(s2), this.drawStroke(s2, t2), i3.draw && i3.draw();
  } }, { key: "drawArc", value: function(t2, i3, e2, n2, r2) {
    var a2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : this.get("lineCap"), s2 = this.context;
    s2.beginPath(), s2.lineCap = a2, s2.strokeStyle = i3, s2.lineWidth = e2, s2.arc(0, 0, t2, n2, r2), s2.stroke();
  } }, { key: "getArc", value: function() {
    var t2 = this.get("arc");
    return t2 || (this.get("dashboard") ? 270 : 360);
  } }, { key: "getSalce", value: function() {
    return this.get("clockwise") ? 1 : -1;
  } }, { key: "getRotate", value: function() {
    return this.get("arc") ? 180 : this.get("dashboard") ? 135 : -90;
  } }, { key: "drawTrail", value: function(t2) {
    var i3 = t2 - this.get("trailWidth") / 2;
    this.drawArc(i3, this.get("trailColor"), this.get("trailWidth"), 0, this.getArc() * w);
  } }, { key: "drawStroke", value: function(t2) {
    var i3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    if (i3) {
      var e2 = t2 - this.get("strokeWidth") / 2, n2 = this.get("strokeColor"), r2 = this.getArc(), a2 = Math.round(r2 / this.get("max") * i3);
      if ("string" == typeof n2 || this._isConicGradient)
        if ("string" != typeof n2 && this._isConicGradient) {
          var s2 = this.context, o2 = s2.createConicGradient(this.get("dashboard") ? 45 : 90, 0, 0);
          n2.forEach(function(t3, i4) {
            o2.addColorStop(i4 / (n2.length - 1), t3);
          }), this.drawArc(e2, o2, this.get("strokeWidth"), 0, a2 * w);
        } else
          this.drawArc(e2, n2, this.get("strokeWidth"), 0, a2 * w);
      else
        for (var h2 = 0; a2 > h2; h2++)
          this.drawArc(e2, this._gradientColors[h2], this.get("strokeWidth"), h2 * w, (h2 + 1) * w, this.get("dashboard") || r2 != a2 ? this.get("lineCap") : "butt");
    }
  } }]), i2;
}();
exports.b = b;
