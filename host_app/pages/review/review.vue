<script>
	import {
		reactive, ref
	} from "vue";
	
	//import ajson from '/static/testjson.js';
	
	export default {
		// setup() {
		// 	const dataSource = ref([]),
			
		// 	return { dataSource };
		// },
		components: {},
		data() {
			return {
				dataSource: [],
				//localData: ajson.data,
				dataLoaded: false,
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

					const json = JSON.stringify(require("../../static/data/testjson.js").reviewData);
					const list = JSON.parse(json)["list"]
					console.log("list:" + list);
					uni.hideLoading()
					for (var i = 0; i < 20; i++) {
						const data = {
							id: i,
						}
						this.dataSource.push(data);
					}
					console.log("loadList complete");
				}, 500);
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

<template>
	<view>
		<view v-if="dataSource.length == 0 && dataLoaded" class="no-data">
			<image class="no-data-image" src="/static/logo.png"></image>
			<text class="no-data-title">空的</text>
		</view>

		<view class="list" v-if="dataSource.length != 0 && dataLoaded">
			<view class="list-header">
				Headerbbb
			</view>

			<scroll-view class="list-content" scroll-y rebound="false">
				<view class="list-content-item" v-for="item in dataSource" :key="item.id">
					<view class="list-content-item-top">
						<text class="moto">motoType</text>
						<text class="time">time</text>
					</view>
					<view class="list-content-item-mid">
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
					<view class="list-content-item-bottom">
						<view class=".bottom-left-button" @click="onLeftListItemTap('8848')">取消</view>
						<view style="width: 10rpx; height: 100%; background-color: red;"></view>
						<view class=".bottom-right-button" @click="onRightListItemTap('aaaaaaa')">确认</view>
					</view>
				</view>

			</scroll-view>

		</view>

	</view>
</template>


<style lang="scss" scoped>
	.list {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.list-header {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: #333;
			color: #fff;
			height: 80rpx;
			text-align: center;
			z-index: 99;
		}

		.list-content {
			position: sticky;
			margin-top: 80rpx;
			flex: 1;
			overflow: auto;

			.list-content-item {
				display: flex;
				flex-direction: column;
				// height: 180rpx;
				margin-top: 20rpx;
				margin-bottom: 40rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
				background-color: blue;

				.list-content-item-top {
					margin-left: 20rpx;
					margin-right: 20rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					background-color: red;
				}

				.list-content-item-mid {
					// margin-left: 20rpx;
					// margin-right: 20rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					background-color: green;
					align-items: center;

					.info-area {
						display: flex;
						flex-direction: column;
					}

					.review-status {}
				}

				.list-content-item-bottom {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: stretch;
					background-color: #fff;
					//overflow: hidden;
					height: 100rpx;
					// margin-left: 20rpx;
					// margin-right: 20rpx;
				}

				.bottom-left-button {
					display: flex;
					justify-content: center;
					flex-direction: column;
					flex: 1;
					text-align: center;
					font-size: 14px;
					background-color: #800f94;
				}

				.bottom-right-button {
					display: flex;
					justify-content: center;
					flex-direction: column;
					flex: 1;
					text-align: center;
					font-size: 14px;
					background-color: blue;
				}
			}
		}
	}








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