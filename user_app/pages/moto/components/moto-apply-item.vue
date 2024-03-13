<script setup>
	import {
		reactive,
		defineComponent,
		ref,
		onMounted,
	} from 'vue';
	import {
		onLoad,
		onReady,
	} from "@dcloudio/uni-app";

	const props = defineProps({
		list: {
			type: Object,
			default: {},
		},
	})

	// let test = ref(props.list);

	onLoad((option) => {
		console.log("script:onLoad");

	});

	onReady(() => {
		//console.log("script:onReady_" + props.list.name);
	});

	onMounted(() => {
		console.log("script:onMounted_" + props.list);
	});
</script>

<template>
	<view class="contaiiner">
		<view class="title-area">
			<text>{{ props.list.name }}</text>
			<text>{{ props.list.age }}</text>
		</view>
		<view class="line"></view>
		<view class="content-item">
			<text>aaa</text>
			<view style="width: 50rpx;"></view>
			<text>bbb</text>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.contaiiner {
		display: flex;
		flex-direction: column;
		height: auto;
		background-color: white;
		margin-top: 15rpx;
		margin-left: 40rpx;
		margin-bottom: 15rpx;
		margin-right: 40rpx;
		border: 1rpx solid #fff;
		border-radius: 16rpx;

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
		}

		.line {
			height: 1rpx;
			background-color: red;
		}

		.content-item {
			height: auto;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			margin-top: 12rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 12rpx;
			// background-color: green;
		}
	}
</style>