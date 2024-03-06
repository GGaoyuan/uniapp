<template>
	<view class="container-area">
		<view class="top">A</view>
		<!-- <view class="middle">B</view> -->
		<uni-list class="middle">
			<text>BBBBBB</text>
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
			<text>CCCCCC</text>
		</uni-list>
		<view class="bottom">C</view>
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
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		background-color: blue;
	}

	.top {
		position: sticky;
		top: 0rpx;
		min-height: 100rpx;
		background-color: red;
		z-index: 100;
	}

	.middle {
		flex-grow: 1;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		background-color: green;
		z-index: 1;
	}

	.bottom {
		position: sticky;
		bottom: 0rpx;
		min-height: 100rpx;
		background-color: yellow;
		z-index: 100;
	}
</style>