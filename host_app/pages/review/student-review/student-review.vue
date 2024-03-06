<template>
	<view>
		<view class="no-data">
			<image class="no-data-image" src="/static/logo.png"></image>
			<text class="no-data-title">bbbbb</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.no-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		color: red
	}

	.no-data-image {
		display: flex;
		flex-direction: column;
		height: 200rpx;
		width: 200rpx;
		
	}
	.no-data-title {
		display: flex;
		flex-direction: column;
		font-size: 36rpx;
		color: #800f94;
	}
</style>