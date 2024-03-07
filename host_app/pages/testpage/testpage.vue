<template>
	<view>

		<view v-if="dataSource.length == 0 && dataLoaded" class="no-data">
			<image class="no-data-image" src="/static/logo.png"></image>
			<text class="no-data-title">空的</text>
		</view>

		<view class="list-view" v-if="dataSource.length != 0 && dataLoaded">
			<view class="list-view-header">
				<view class="" style="width: 100%;height: 80rpx;">
					aaaaaaa
				</view>
			</view>

			<uni-list class="list-view-content" :border="true">
				<uni-list-item class="list-view-content-item" v-for="(userinfo, index) in dataSource" :key="index">
					aaaaaaa
				</uni-list-item>>

				<!-- <view class="review-student-info" v-for="(userinfo, index) in dataSource" :key="index">
					<view class="top-area">
						<text class="moto">motoType</text>
						<text class="time">time</text>
					</view>
					<view style="height: 10rpx; background-color: yellow;"></view>
					<view class="middle-area">
						<view class="info-area">
							<view class="identity-area">
								<text class="user-job"> jobstudent </text>
								<text class="user-name">name</text>
							</view>
							<text class="user-id">id</text>
							<text class="user-phone">phone</text>
							<text class="user-moto-name">motoname</text>
							<text class="user-moto-color">motname</text>
						</view>
						<text class="review-status">status</text>
					</view>
					<view style="height: 10rpx; background-color: yellow;"></view>
					<view class="bottom-area">
						<view class=".bottom-left-button" @click="onLeftSegmentTap('8848')">取消</view>
						<view style="width: 10rpx; height: 100%; background-color: red;"></view>
						<view class=".bottom-right-button" @click="onRightSegmentTap('aaaaaaa')">确认</view>
					</view>
				</view> -->


			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		reactive
	} from "vue";

	export default {
		components: {},
		data() {
			console.log("script:data");
			return {
				dataLoaded: false,
				dataSource: [],
			}
		},
		onLoad() {
			console.log("script:onLoad");
		},
		onReady() {
			console.log("script:onReady");
			this.loadList();
		},
		methods: {
			loadList() {
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(() => {
					this.dataLoaded = true
					uni.hideLoading()
					for (var i = 0; i < 10; i++) {
						this.dataSource.push('gy');
					}
					console.log("loadList complete");
				}, 1000);
			},

			onLeftListItemTap(number) {
				console.log("onLeftListItemTap");
			},

			onRightListItemTap(value) {
				console.log("onRightListItemTap");

			},
		},
	}
</script>



<style lang="scss" scoped>
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


	.list-view {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #EBEEF5;

		.list-view-header {
			position: sticky;
			top: 0;
			left: 0;
			right: 0;
			background-color: #333;
			color: #fff;
			height: auto;
			text-align: center;
		}

		.list-view-content {
			flex: 1;
			overflow: auto;
			margin-left: 20rpx;
			margin-right: 200rpx;
		}
	}




	.list-item {
		height: 80px;
		line-height: 80px;
		border: 1px solid red;
		text-align: center;
	}
</style>