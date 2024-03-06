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
				<view style="height: 10rpx; background-color: red;"></view>
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
				<view style="height: 10rpx; background-color: red;"></view>
				<view class="bottom-area">
					<view style="width: 50%; display: flex; justify-content: center;">fff</view>
					<view style="width: 10rpx; background-color: red;"></view>
					<view style="width: 50%; display: flex; justify-content: center;">fff</view>
				</view>
				<view class="segmented-control">
					<view class="segment left-segment" @click="onLeftSegmentTap('8848')">取消</view>
					<view class="segment-divider"></view>
					<view class="segment right-segment" @click="onRightSegmentTap('aaaaaaa')">确认</view>
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
				}, 3000);
			},

			onLeftSegmentTap(number) {
				// 传递的参数
				//console.log("eeeeeeee__" + number);
				// var test = Test()
				// test.age = 10;
				// test.name = "gg";
				setTimeout(function() {
					console.log("setTimeout:");
				}, 5000);

				// uni.navigateTo({
				// 	url: './student-review/student-review'
				// })
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
			background-color: yellow;
			width: 50%;
			justify-content: center;
			align-content: center;
		}

		.segmented-control {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			border: 1px solid #e6e6e6;
			border-radius: 5px;
			overflow: hidden;
			// margin-left: 20rpx;
			// margin-right: 20rpx;
		}

		.segment {
			flex: 1;
			text-align: center;
			padding: 10px 0;
			font-size: 14px;
		}

		.left-segment {
			color: #333333;
			border-right: 1px solid #e6e6e6;
		}

		.right-segment {
			color: #1E90FF;
		}

		.segment-divider {
			width: 1px;
			background-color: red;
			// height: 30px;
			/* Adjust the height as needed */
		}
	}

	.text-area {
		display: flex;
		justify-content: center;
		background-color: aqua;
	}

	.test {
		display: flex;
		justify-content: center;
		background-color: aqua;
		height: 200rpx;
	}

	.chat-custom-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}
</style>