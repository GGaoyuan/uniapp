function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var e=0;i.length>e;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function e(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function n(t,i){(null==i||i>t.length)&&(i=t.length);for(var e=0,n=Array(i);i>e;e++)n[e]=t[e];return n}function r(t,i){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,i){if(t){if("string"==typeof t)return n(t,i);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,i):void 0}}(t))||i&&t&&"number"==typeof t.length){e&&(t=e);var r=0,a=function(){};return{s:a,n:function(){return t.length>r?{done:!1,value:t[r++]}:{done:!0}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,h=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return o=t.done,t},e:function(t){h=!0,s=t},f:function(){try{o||null==e.return||e.return()}finally{if(h)throw s}}}}var a=function(t){return/^#.{3,6}$/.test(t)?4===t.length?t.substring(1).split("").map((function(t){return 17*parseInt(t,16)})):[t.substring(1,3),t.substring(3,5),t.substring(5,7)].map((function(t){return parseInt(t,16)})):(console.error("lime-circle: 渐变仅支持hex值"),[0,0,0])},s=function(t){return 1===t.length?"0"+t:t},o=function(t,i,e){var n,r,o,h,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,c=[],l=[],d=function(t){return Math.pow(t/255,u)};for(t=a(t).map(d),i=a(i).map(d),n=0;e>n;n++){for(h=1-(o=n/(e-1)),r=0;3>r;r++)l[r]=s(Math.round(255*Math.pow(t[r]*h+i[r]*o,1/u)).toString(16));c.push("#"+l.join(""))}return c};var h=function(t,i,e,n){var r=1e-6,a=3*t-3*e+1,s=3*e-6*t,o=3*t,h=3*i-3*n+1,u=3*n-6*i,c=3*i;function l(t){return((a*t+s)*t+o)*t}return function(t){return i=function(t){for(var i,e,n,h=t,u=0;8>u;u++){if(e=l(h)-t,r>Math.abs(e))return h;if(r>Math.abs(i=(3*a*(n=h)+2*s)*n+o))break;h-=e/i}var c=1,d=0;for(h=t;c>d;){if(e=l(h)-t,r>Math.abs(e))return h;e>0?c=h:d=h,h=(c+d)/2}return h}(t),((h*i+u)*i+c)*i;var i}}(.25,.1,.25,1),u=Symbol("tick"),c=Symbol("tick-handler"),l=Symbol("animations"),d=Symbol("start-times"),f=Symbol("pause-start"),v=Symbol("pause-time"),g="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(t){return setTimeout(t,1e3/60)},m="undefined"!=typeof cancelAnimationFrame?cancelAnimationFrame:function(t){clearTimeout(t)},y=function(){function i(){t(this,i),this.state=void 0,this.state="Initiated",this[l]=new Set,this[d]=new Map}return e(i,[{key:"start",value:function(){var t=this;if("Initiated"===this.state){this.state="Started";var i=Date.now();this[v]=0,this[u]=function(){var e,n=Date.now(),a=r(t[l]);try{for(a.s();!(e=a.n()).done;){var s=e.value,o=void 0;(o=t[d].get(s)<i?n-i-s.delay-t[v]:n-t[d].get(s)-s.delay-t[v])>s.duration&&(t[l].delete(s),o=s.duration),o>0&&s.run(o)}}catch(t){a.e(t)}finally{a.f()}t[c]=g(t[u])},this[u]()}}},{key:"pause",value:function(){"Started"===this.state&&(this.state="Paused",this[f]=Date.now(),m(this[c]))}},{key:"resume",value:function(){"Paused"===this.state&&(this.state="Started",this[v]+=Date.now()-this[f],this[u]())}},{key:"reset",value:function(){this.pause(),this.state="Initiated",this[v]=0,this[f]=0,this[l]=new Set,this[d]=new Map,this[c]=null}},{key:"add",value:function(t,i){2>arguments.length&&(i=Date.now()),this[l].add(t),this[d].set(t,i)}}]),i}(),p=function(){function i(e,n,r,a,s,o){t(this,i),this.startValue=void 0,this.endValue=void 0,this.duration=void 0,this.timingFunction=void 0,this.delay=void 0,this.template=void 0,s=s||function(t){return t},o=o||function(t){return t},this.startValue=e,this.endValue=n,this.duration=r,this.timingFunction=s,this.delay=a,this.template=o}return e(i,[{key:"run",value:function(t){var i=this.endValue-this.startValue,e=this.timingFunction(t/this.duration);this.template(this.startValue+i*e)}}]),i}(),w=Math.PI/180,b=function(){function i(e,n){t(this,i),this.canvas=void 0,this.context=void 0,this.current=0,this.size=0,this.pixelRatio=1,this._isConicGradient=!1,this._attrs={percent:0,size:"120px",lineCap:"round",strokeWidth:6,strokeColor:"#2db7f5",trailWidth:6,trailColor:"#ddd",dashboard:!1,clockwise:!0,duration:300,max:100,beforeAnimate:!0,animate:!0,formatter:"{d}{d}.{d}{d}%",fontSize:"16px",showText:!1},this._timer=void 0,this.startTime=0,this.target=0,this._colors=[],this._gradientColors=[],this._rAF=function(t){},this._cAf=function(t){},this.timeline=void 0,this.run=void 0,this.canvas=e,this.run=n.run,this.size=n.size||120,this.pixelRatio=n.pixelRatio||1,this.init(),this.initRaf(),this.timeline=new y(this._rAF,this._cAf)}return e(i,[{key:"init",value:function(){var t=this.size,i=this.pixelRatio;if(this.canvas){this.canvas.width=t*i,this.canvas.height=t*i;var e=this.canvas.getContext("2d");this._isConicGradient=!!e.createConicGradient,this.context=e}}},{key:"initRaf",value:function(){var t=this.canvas;"undefined"!=typeof window?(this._rAF=window.requestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)},this._cAf=window.cancelAnimationFrame||function(t){window.clearTimeout(t)}):t&&t.requestAnimationFrame?(this._rAF=t.requestAnimationFrame,this._cAf=t.cancelAnimationFrame):(this._rAF=function(t){return setTimeout(t,16.7)},this._cAf=function(t){clearTimeout(t)})}},{key:"setOption",value:function(t){Object.assign(this._attrs,t)}},{key:"set",value:function(t,i){this._attrs[t]=i}},{key:"get",value:function(t){return this._attrs[t]||this.canvas[t]}},{key:"play",value:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.get("percent");this.target=Math.max(Math.min(i,this.get("max")||100),0),this.createConicGradient(),this.timeline.start(),this.timeline.add(new p(this.current,i,this.get("duration"),0,h,(function(i){t.current=1e-4>i?0:i,t.render(t.current),t.run(t.current)})))}},{key:"createConicGradient",value:function(){if(!this._isConicGradient){var t=this.get("strokeColor");if("string"!=typeof t&&this._colors!==t){this._colors=t,this._gradientColors=[];for(var i=this.getArc(),e=t.length-1,n=Math.floor(i/e),r=0;e>r;r++){i-=n,this._gradientColors=this._gradientColors.concat(o(t[r],t[r+1],r+1===e?n+i:n))}}}}},{key:"render",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=this.context,e=this.size,n=this.pixelRatio,r=this.getSalce(),a=this.getRotate(),s=e/2;i.setTransform(1,0,0,1,0,0),i.clearRect(-s,-s,e,e),i.setTransform(r*n,0,0,n,s*n,s*n),i.rotate(a*w),this.drawTrail(s),this.drawStroke(s,t),i.draw&&i.draw()}},{key:"drawArc",value:function(t,i,e,n,r){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:this.get("lineCap"),s=this.context;s.beginPath(),s.lineCap=a,s.strokeStyle=i,s.lineWidth=e,s.arc(0,0,t,n,r),s.stroke()}},{key:"getArc",value:function(){var t=this.get("arc");return t||(this.get("dashboard")?270:360)}},{key:"getSalce",value:function(){return this.get("clockwise")?1:-1}},{key:"getRotate",value:function(){return this.get("arc")?180:this.get("dashboard")?135:-90}},{key:"drawTrail",value:function(t){var i=t-this.get("trailWidth")/2;this.drawArc(i,this.get("trailColor"),this.get("trailWidth"),0,this.getArc()*w)}},{key:"drawStroke",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(i){var e=t-this.get("strokeWidth")/2,n=this.get("strokeColor"),r=this.getArc(),a=Math.round(r/this.get("max")*i);if("string"==typeof n||this._isConicGradient)if("string"!=typeof n&&this._isConicGradient){var s=this.context,o=s.createConicGradient(this.get("dashboard")?45:90,0,0);n.forEach((function(t,i){o.addColorStop(i/(n.length-1),t)})),this.drawArc(e,o,this.get("strokeWidth"),0,a*w)}else this.drawArc(e,n,this.get("strokeWidth"),0,a*w);else for(var h=0;a>h;h++)this.drawArc(e,this._gradientColors[h],this.get("strokeWidth"),h*w,(h+1)*w,this.get("dashboard")||r!=a?this.get("lineCap"):"butt")}}}]),i}();export{b as Circle};
