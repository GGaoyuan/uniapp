<template>
	<view>
		<view v-if="dataSource.length == 0" class="no-data">
			<image class="no-data-image" src="/static/logo.png"></image>
			<text class="no-data-title">bbbbb</text>
		</view>

		<uni-list v-if="dataSource.length != 0" :border="true">
			<view class="review-student-info" v-for="(userinfo, index) in dataSource" :key="index">
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
					<!-- <view class="segment-divider"></view> -->
					<view style="width: 10rpx; height: 100%; background-color: red;"></view>
					<view class=".bottom-right-button" @click="onRightSegmentTap('aaaaaaa')">确认</view>
				</view>
			</view>


		</uni-list>
	</view>
</template>


<script>
	class Person {
		name;
		constructor(name) {
			this.name = name;
		}
	}
	var dataSource = [];

	export default {
		components: {},
		data() {
			return {
				dataSource,
			}
		},
		onLoad() {
			console.log("onLoad");
		},
		onReady() {
			console.log("onReady");
			this.loadList();
		},
		methods: {
			loadList() {
				setTimeout(function() {
					for (var i = 0; i < 10; i++) {
						let person = new Person("gy");
						dataSource.push(person);
					}
					console.log("loadList complete");
				}, 500);
			},

			onLeftSegmentTap(number) {
				// 传递的参数
				//console.log("eeeeeeee__" + number);
				// var test = Test()
				// test.age = 10;
				// test.name = "gg";
				// setTimeout(function() {
				// 	console.log("setTimeout:");
				// }, 5000);

				// uni.navigateTo({
				// 	url: './student-review/student-review'
				// })


				// let obj = { name: '张三', age: 20 };
				// let paramsStr = JSON.stringify(obj); // 将对象序列化成字符串
				// uni.navigateTo({
				//   url: '/pages/index/index?params=' + encodeURIComponent(paramsStr) // 将参数添加到URL中并编码
				// });

				uni.scanCode({
					success: (res) => {
						let data = JSON.stringify(res);
						uni.setStorageSync('data', data);
						console.log("aaaa");
						uni.navigateTo({
							url: '/pages/index/index'
						})
					}
				})

			},

			onRightSegmentTap(value) {
				//console.log("asdasdadadasda__" + value);
				uni.navigateTo({
					url: './student-review/student-review'
				})

			},
		},
	}
</script>




<style lang="scss">
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


	.review-student-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: aqua;

		.top-area {
			margin-left: 20rpx;
			margin-right: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			background-color: red;
		}

		.middle-area {
			margin-left: 20rpx;
			margin-right: 20rpx;
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

		.bottom-area {
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
</style>