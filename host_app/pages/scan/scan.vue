<template>
		<view class="container-area">
			<view class="test1">A</view>
			<uni-list :border="true">
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
				<text>AAAAAA</text>
			</uni-list>
			<view class="test3">C</view>
		</view>
		
</template>



<script>
	export default {
		components: {},
		data() {
			return {

			}
		},
		onLoad() {

		},
		onReady() {

		},
		methods: {

		},
	}
</script>



<style lang="scss">
	.container-area {
		display: flex;
		flex-direction: column;
		margin-top: 101rpx;
		margin-bottom: 101rpx;
		//height: 900rpx;
		background-color: blue;
	}

	.test1 {
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		right: 0rpx;
		height: 100rpx;
		background-color: red;
	}

	.test3 {
		position: absolute;
		left: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		height: 100rpx;
		background-color: yellow;
	}
</style>