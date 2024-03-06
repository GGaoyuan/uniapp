<template>
	<view class>
		<view  v-if="true" class="no-data">
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

<style lang="scss">
	// .container {
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	justify-content: center;
	// 	background-color: red
	// }
	
	.no-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.no-data-image {
			display: flex;
			flex-direction: column;
			height: 200rpx;
			width: 200rpx;
			margin-top: 200rpx;
		}

		.no-data-title {
			display: flex;
			flex-direction: column;
			font-size: 36rpx;
			color: #800f94;
		}
	}
</style>