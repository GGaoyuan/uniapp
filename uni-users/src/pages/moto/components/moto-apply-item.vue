<script setup>
	import {
		reactive,
		ref,
		computed
	} from 'vue';
	import {
		onLoad,
		onReady,
	} from "@dcloudio/uni-app";

	const props = defineProps({
		data: {
			type: Object,
			default: {},
		},
		//title: String
	})

	const status = computed(() => {
		if (props.data.status == 0) {
			return {
				text: "待审核",
				color: "#3D77F0"
			};
		} else if (props.data.status == 1) {
			return {
				text: "已通过",
				color: "orange"
			};
		} else if (props.data.status == 2) {
			return {
				text: "已安装",
				color: "orange"
			};
		} else if (props.data.status == 3) {
			return {
				text: "已驳回",
				color: "red"
			};
		} else if (props.data.status == 4) {
			return {
				text: "已取消",
				color: "red"
			};
		}
		return "";
	})

	onLoad((option) => {
		console.log("script:onLoad");

	});

	onReady(() => {
		//console.log("script:onReady_" + props.list.name);
	});

	// onMounted(() => {
	// 	console.log("script:onMounted_" + props.list);
	// });
</script>

<template>
	<view class="contaiiner">
		<view class="title-area">
			<text class="title-style">{{ props.data.motoType }}</text>
			<text class="status-text" v-bind:style="{color: status.color}">{{ status.text }}</text>
		</view>
		<view class="line"></view>

		<view class="content-item" v-if="props.data.motoBrand.length > 0">
			<text class="item-title">车辆品牌:</text>
			<view class="clear-box"></view>
			<text class="item-content">{{ props.data.motoBrand }}</text>
		</view>
		<view class="content-item" v-if="props.data.motoColor.length > 0">
			<text class="item-title">车辆颜色:</text>
			<view class="clear-box"></view>
			<text class="item-content">{{ props.data.motoColor }}</text>
		</view>
		<view class="content-item" v-if="props.data.motoNumber.length > 0">
			<text class="item-title">车辆编号:</text>
			<view class="clear-box"></view>
			<text class="item-content">{{ props.data.motoNumber }}</text>
		</view>
	</view>
</template>

<style scoped lang="scss">
	@import '@/common/common.scss';
	
	.contaiiner {
		display: flex;
		flex-direction: column;
		height: auto;
		background-color: white;
		margin-top: 30rpx;
		margin-left: $app-container-margin-hor;
		margin-right: $app-container-margin-hor;
		border: 1rpx solid #fff;
		border-radius: 16rpx;
		padding-bottom: 12rpx;

		.title-area {
			height: auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			margin-top: 12rpx;
			margin-left: $app-content-margin-hor;
			margin-right: $app-content-margin-hor;
			margin-bottom: 12rpx;

			// background-color: yellow;
			.title-style {
				font-size: 40rpx;
				font-family: PingFangSC-Medium;
				font-weight: bold;
				color: #222222;
			}

			.status-text {
				font-size: 30rpx;
				font-family: PingFangSC-Medium;
				font-weight: bold;
			}
		}

		.line {
			height: 0.5rpx;
			background-color: #F2F2F2;
		}

		.content-item {
			height: auto;
			display: flex;
			flex-direction: row;
			// background-color: red;
			justify-content: flex-start;
			
			align-items: baseline;

			margin-top: 12rpx;
			margin-left: $app-content-margin-hor;
			margin-right: $app-content-margin-hor;
			margin-bottom: 12rpx;

			.item-title {
				font-size: 32rpx;
				font-family: PingFangSC-Regular;
				font-weight: normal;
				color: #222222;
				word-break: keep-all;
			}

			.clear-box {
				width: 10rpx;
			}

			.item-content {
				// display: flex;
				// align-items: baseline;
				word-break: break-all;
				// word-wrap: break-word;
				// margin-right: 50rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular;
				font-weight: normal;
				color: #999999;
			}

			// background-color: green;
		}
	}
</style>