<template>
	<view
		class="u-circle-progress"
		:style="{
			width: widthPx + 'px',
			height: widthPx + 'px',
			backgroundColor: bgColor
		}"
	>
		<canvas
			class="u-canvas-bg"
			:canvas-id="elBgId"
			:id="elBgId"
			:style="{
				width: widthPx + 'px',
				height: widthPx + 'px'
			}"
		></canvas>
		<canvas
			class="u-canvas"
			:canvas-id="elId"
			:id="elId"
			:style="{
				width: widthPx + 'px',
				height: widthPx + 'px'
			}"
		></canvas>
		<slot></slot>
	</view>
</template>

<script>

export default {
	name: 'u-circle-progress',
	props: {
		percent: {
			type: Number,
			default: 0,
			validator: val => {
				return val >= 0 && val <= 100;
			}
		},
		// 底部圆环的颜色（灰色的圆环）
		inactiveColor: {
			type: String,
			default: '#ececec'
		},
		// 圆环激活部分的颜色
		activeColor: {
			type: String,
			default: '#19be6b'
		},
		// 圆环线条的宽度，单位rpx
		borderWidth: {
			type: [Number, String],
			default: 14
		},
		// 整个圆形的宽度，单位rpx
		width: {
			type: [Number, String],
			default: 200
		},
		// 整个圆环执行一圈的时间，单位ms
		duration: {
			type: [Number, String],
			default: 0
		},
		// 主题类型
		type: {
			type: String,
			default: ''
		},
		// 整个圆环进度区域的背景色
		bgColor: {
			type: String,
			default: '#ffffff'
		}
	},
	data() {
		return {
			elBgId: 'uCircleProgressBgId',
			elId: 'uCircleProgressElId',
			widthPx: uni.upx2px(this.width), 				// 转成px后的整个组件的背景宽度
			borderWidthPx: uni.upx2px(this.borderWidth), 	// 转成px后的圆环的宽度
			startAngle: -Math.PI / 2, 						// canvas画圆的起始角度，默认为3点钟方向，定位到12点钟方向
			progressContext: null, 							// 活动圆的canvas上下文
			newPercent: 0, 									// 当动态修改进度值的时候，保存进度值的变化前后值，用于比较用
			oldPercent: 0 									// 当动态修改进度值的时候，保存进度值的变化前后值，用于比较用
		};
	},
	watch: {
		percent(nVal, oVal = 0) {
			if (nVal > 100) nVal = 100;
			if (nVal < 0) oVal = 0;
			// 此值其实等于this.percent，命名一个新
			this.newPercent = nVal;
			this.oldPercent = oVal;
			setTimeout(() => {
				// 无论是百分比值增加还是减少，需要操作还是原来的旧的百分比值
				// 将此值减少或者新增到新的百分比值
				this.drawCircleByProgress(oVal);
			}, 0);
		}
	},
	created() {
		// 赋值，用于加载后第一个画圆使用
		this.newPercent = this.percent;
		this.oldPercent = 0;
	},
	computed: {
		// 有type主题时，优先起作用
		circleColor() {
			return this.activeColor
		}
	},
	mounted() {
		// 在h5端，必须要做一点延时才起作用，this.$nextTick()无效(HX2.4.7)
		setTimeout(() => {
			this.drawProgressBg();
			this.drawCircleByProgress(this.oldPercent);
		}, 50);
	},
	methods: {
		drawProgressBg() {
			let ctx = uni.createCanvasContext(this.elBgId, this);
			ctx.setLineWidth(this.borderWidthPx); 
			ctx.setStrokeStyle(this.inactiveColor); 
			ctx.beginPath(); 
		
			let radius = this.widthPx / 2;
			ctx.arc(radius, radius, radius - this.borderWidthPx, 0, 2 * Math.PI, false);
			ctx.stroke(); 
			ctx.draw();
		},
		drawCircleByProgress(progress) {
			// 第一次操作进度环时将上下文保存到了this.data中，直接使用即可
			let ctx = this.progressContext;
			if (!ctx) {
				ctx = uni.createCanvasContext(this.elId, this);
				this.progressContext = ctx;
			}
			
			ctx.setLineCap('round');
			ctx.setLineWidth(this.borderWidthPx);
			ctx.setStrokeStyle(this.circleColor);

			let time = Math.floor(this.duration / 100);
			let endAngle = ((2 * Math.PI) / 100) * progress + this.startAngle;
			ctx.beginPath();
			
			let radius = this.widthPx / 2;
			ctx.arc(radius, radius, radius - this.borderWidthPx, this.startAngle, endAngle, false);
			ctx.stroke();
			ctx.draw();
			// 如果变更后新值大于旧值，意味着增大了百分比
			if (this.newPercent > this.oldPercent) {
				// 每次递增百分之一
				progress++;
				if (progress > this.newPercent) return;
			} else {
				progress--;
				if (progress < this.newPercent) return;
			}
			setTimeout(() => {
				this.drawCircleByProgress(progress);
			}, time);
		}
	}
};
</script>

<style lang="scss" scoped>

.u-circle-progress {
	position: relative;
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	align-items: center;
	justify-content: center;
}

.u-canvas-bg {
	position: absolute;
}

.u-canvas {
	position: absolute;
}
</style>