<script setup>
	// import uni-section from "uview-ui"
	// const props = defineProps({
	// 	title: String,
	// })
	const sex = [{
		text: '男',
		value: 0
	}, {
		text: '女',
		value: 1
	}, {
		text: '未知',
		value: 2
	}];
	let radio1 = 0;

	var value = 0;
	var range = [{
		"value": 0,
		"text": "篮球"
	}, {
		"value": 1,
		"text": "足球"
	}, {
		"value": 2,
		"text": "游泳"
	}];
</script>

<template>
	<view class="content">
		<text class="titleText">asdasdadasdas</text>




		<uni-section title="单选" type="line">
			<view class="uni-px-5 uni-pb-5">
				<view class="text">单bbb选选中：{{JSON.stringify(radio1)}}</view>
				<uni-data-checkbox v-model="radio1" :localdata="sex"></uni-data-checkbox>
			</view>
		</uni-section>

		<uni-section>
			<view>
				<uni-data-checkbox v-model="value" :localdata="range"></uni-data-checkbox>
				
			</view>
		</uni-section>


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
	}

	.titleText {
		margin-left: 15rpx;
		color: #222222;
	}
</style>