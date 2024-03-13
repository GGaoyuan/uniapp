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
		title: String
	})

	const typeStr = computed(() => {
		if (props.data.status == 0) {
			return "待审核";
		}
		else if (props.data.status == 1) {
			return "已通过";
		}
		else if (props.data.status == 2) {
			return "已安装";
		}
		else if (props.data.status == 3) {
			return "已驳回";
		}
		else if (props.data.status == 4) {
			return "已取消";
		}
	  return "";
	})
	// let test = ref(props.list);

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
			<text class="status-text status-color">{{ typeStr }}</text>
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
	.contaiiner {
		display: flex;
		flex-direction: column;
		height: auto;
		background-color: white;
		margin-top: 30rpx;
		margin-left: 40rpx;
		margin-right: 40rpx;
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
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 12rpx;

			// background-color: yellow;
			.title-style {
				font-size: 18px;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 600;
				color: #222222;
			}
			.status-text {
				font-size: 15px;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 400;
			}
			.status-color {
				color: red;
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
			align-items: center;

			margin-top: 12rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 12rpx;

			.item-title {
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #222222;
			}

			.clear-box {
				width: 10rpx;
			}

			.item-content {
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #999999;
			}

			// background-color: green;
		}
	}
</style>