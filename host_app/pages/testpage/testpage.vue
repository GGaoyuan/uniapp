<script>
	import {
		reactive,
		ref
	} from "vue";
	import reviewStatusBar from "../../components/review-status-bar.vue"

	export default {
		components: {
			reviewStatusBar,
		},
		data() {
			console.log("script:data");
			return {
				value: 0,
				range: [{
					"value": 0,
					"text": "篮球"
				}, {
					"value": 1,
					"text": "足球"
				}, {
					"value": 2,
					"text": "游泳"
				}],
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
					for (var i = 0; i < 2; i++) {
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
	<view class="container">
		<view class="status-bar">
			<review-status-bar>
				
			</review-status-bar>
		</view>

		<scroll-view class="list" scroll-y rebound="false">


			<view class="motor-info">
				<view class="motor-info-title">
					<view>分割线</view>
					<view>车辆信息</view>
				</view>
				<view class="motor-info-list">
					<uni-section>
						<view >
							<uni-data-checkbox v-model="value" :localdata="range" @change="change"></uni-data-checkbox>
						</view>
					</uni-section>

					<view class="motor-info-list-text">
						<view>车辆品牌</view>
						<view>雅迪</view>
					</view>
					<view class="motor-info-list-text">
						<view>车辆颜色</view>
						<view>黑色</view>
					</view>
					
					
				</view>
			</view>
			<!-- <view class="list-item" v-for="item in dataSource" :key="item.id">
				<text>{{item.id}}</text>
			</view> -->
		</scroll-view>


	</view>

</template>


<style lang="scss" scoped>
	.uni-px-5 {
		padding-left: 100px;
		padding-right: 10px;
	}

	.uni-pb-5 {
		padding-bottom: 10px;
	}


	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #F2F2F2;
		.status-bar {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: #333;
			color: #fff;
			height: 120rpx;
			text-align: center;
			z-index: 99;
		}


		.list {
			position: sticky;
			overflow: auto;
			margin-top: 140rpx;
			background-color: red;


			.motor-info {
				display: flex;
				flex-direction: column;

				.motor-info-title {
					display: flex;
					flex-direction: row;
				}

				.motor-info-list {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					background-color: blue;

					.motor-info-list-text {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
					}

					.motor-info-list-selector {
						// display: flex;
						// flex-direction: row;
						background-color: yellow;
						//justify-content: space-between;
					}
				}

			}

			.list-header {
				height: 100rpx;
				text-align: center;
				background-color: blue;
			}

			.list-item {
				// display: flex;
				// flex-direction: column;
				height: 180rpx;
				// margin-top: 20rpx;
				// margin-bottom: 40rpx;
				// margin-left: 40rpx;
				// margin-right: 40rpx;
				background-color: blue;

			}
		}
	}
</style>