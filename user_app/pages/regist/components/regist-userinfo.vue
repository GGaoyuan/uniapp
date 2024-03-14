<script setup>
	// const props = defineProps({
	// 	title: String,
	// })
	const identity = [{
		text: '学生',
		value: 0
	}, {
		text: '教职工',
		value: 1
	}, {
		text: '其他',
		value: 2
	}];
	let radio1 = 0;

	function change() {
		console.log("change");
	}
</script>

<template>
	<view class="content">
		<text class="titleText">222</text>

		<view class="checkbox">
			<text>身份</text>
			<uni-data-checkbox v-model="radio1" :localdata="identity" @change="change"></uni-data-checkbox>
		</view>


	</view>
</template>

<style scoped lang="scss">
	.text {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}

	.uni-px-5 {
		padding-left: 10px;
		padding-right: 10px;
	}

	.uni-pb-5 {
		padding-bottom: 10px;
	}


	.content {
		display: flex;
		flex-direction: column;
		background-color: yellow;
		margin-left: 40rpx;
		margin-right: 40rpx;
		padding-top: 50rpx;
		padding-bottom: 50rpx;
		border: 1rpx solid white;
		border-radius: 20rpx;

		.checkbox {
			display: flex;
			flex-direction: row;

			.checklist-text {
				font-size: 80px;
				color: #666;
				margin-left: 5px;
				line-height: 80px;
			}
		}

	}

	.titleText {
		margin-left: 15rpx;
		color: #222222;
	}
</style>