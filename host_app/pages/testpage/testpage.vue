<template>
	<!-- 	<view v-if="dataSource.length == 0" class="no-data">
		<image class="no-data-image" src="/static/logo.png"></image>
		<text class="no-data-title">bbbbb</text>
	</view> -->

	<view class="container">
		<view class="header">
			<view class="" style="width: 100%;height: 80rpx;">
				aaaaaa
			</view>
		</view>
		
		<uni-list class="list-view" v-if="dataSource.length != 0" :border="true">
			<template slot="header" style="height: 200rpx; background-color: blanchedalmond;">
				
			</template>
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
	class Userinfo {
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
						let person = new Userinfo("gy");
						dataSource.push(person);
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

	.list-view {
		flex: 1;
		overflow: auto;
	}

	.list-item {
		height: 80px;
		line-height: 80px;
		border: 1px solid red;
		text-align: center;
	}
</style>