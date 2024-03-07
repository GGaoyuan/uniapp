<template>
	<view class="container">
		<view class="header">
			<view class="" style="width: 100%;height: 80rpx;">
				Header
			</view>
		</view> 
		<scroll-view class="content" scroll-y>
			<view class="" style="padding: 0 20rpx;">
				<view class="list-item" v-for="item in list" :key="item.id">{{ item.text }}</view>
				<view class="list-item" v-for="item in list" :key="item.id">{{ item.text }}</view>
			</view>
		</scroll-view>
		<view class="footer">
			<view class="" style="width: 100%;height: 80rpx;"> Footer </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						id: 1,
						text: 'Item 1'
					},
					{
						id: 2,
						text: 'Item 2'
					},
					{
						id: 3,
						text: 'Item 3'
					},
					{
						id: 4,
						text: 'Item 4'
					},
					{
						id: 5,
						text: 'Item 5'
					},
					{
						id: 6,
						text: 'Item 6'
					},
					{
						id: 7,
						text: 'Item 7'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 8,
						text: 'Item 8'
					},
					{
						id: 9,
						text: 'Item 9'
					}
				],
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.header {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		background-color: #333;
		color: #fff;
		height: auto;
		text-align: center;
	}

	.content {
		flex: 1;
		overflow: auto;
	}

	.list-item {
		height: 80px;
		line-height: 80px;
		border: 1px solid red;
		text-align: center;
	}

	.footer {
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #333;
		color: #fff;
		text-align: center;
	}
</style>