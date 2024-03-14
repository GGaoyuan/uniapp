<script setup>
	const props = defineProps({
		title: String,
	})
</script>

<template>
	<view class="content">
		
	</view>
</template>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: row;
		background-color: yellow;
		margin-left: 40rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.line {
		background-color: #3D77F0;
		width: 8rpx;
	}

	.titleText {
		margin-left: 15rpx;
		color: #222222;
	}
</style>