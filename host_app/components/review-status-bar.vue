<template>
	<view class="container">
		<image class="status-image" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="status-text">aaaaaaaaaaaaaaaaaa</text>
			<text class="notice-text">bbbbb</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "reviewStatusBar",
		data() {
			return {
				content: 'Test'
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 100%;		
		background-color: white;
		color: red;
	}
	
	.status-image {
		margin-left: 30rpx;
		width: 80rpx;
		height: 80rpx;
	}
	
	.text-area {
		margin-left: 15rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		color: #3D77F0;
	}
	
	.status-text {
		font-size: 18px;
		font-family: PingFangSC, PingFangSC-Medium;
	}
	.notice-text {
		font-size: 15px;
	}
	
</style>