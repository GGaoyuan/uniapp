<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad,
		onReady,
		onShareAppMessage
	} from "@dcloudio/uni-app";
	import applyItem from "/pages/moto/components/moto-apply-item.vue"
	
	let dataSource = ref([]);
	let dataLoaded = ref(false);
	
	let testa= "ref(false)";
	
	onLoad((option) => {
		console.log("script:onLoad");
	});

	onReady(() => {
		console.log("script:onReady");
		loadList();
	});
	
	function loadList() {
		console.log("loadList");
		uni.showLoading({
			title: '加载中'
		});
		setTimeout(() => {
			dataLoaded.value = true

			const json = JSON.stringify(require("../../static/data/testjson.js").reviewData);
			const resArr = JSON.parse(json)["list"]
			
			for (let index = 0; index < resArr.length; index++) {
				let data = resArr[index];
				const model = {
					motoType: data["motoType"],
					status: data["status"],
					motoColor: data["motoColor"],
					motoBrand: data["motoBrand"],
					motoNumber: data["motoNumber"],
				};
				dataSource.value.push(model);
				//console.log(model);
			}
			//console.log("list:" + list);
			uni.hideLoading()
			
			//for (let i = 0; i < list; i++) {
				
				// const data = {
				// 	id: i,
				// }
				// dataSource.value.push(data);
			// }
			console.log("loadList complete");
		}, 500);
	}

	function onLeftListItemTap(number) {
		console.log("onLeftListItemTap");
	}

	function onRightListItemTap(value) {
		console.log("onRightListItemTap");

	}
	
</script>

<template>
	<view>
		<view v-if="dataSource.length == 0 && dataLoaded" class="no-data">
			<image class="no-data-image" src="/static/logo.png"></image>
			<text class="no-data-title">空的</text>
		</view>

		<view class="list" v-if="dataSource.length != 0 && dataLoaded">
			<view class="regist-moto">
				Headerbbb
			</view>

			<scroll-view class="list-content" scroll-y rebound="false">
				<apply-item v-for="item in dataSource" :key="item.id" :data="item" :title="testa"></apply-item>
				<!-- <view class="list-content-item" v-for="item in dataSource" :key="item.id">
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
				</view> -->

			</scroll-view>

		</view>

	</view>
</template>


<style lang="scss" scoped>
	.list {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #F2F2F2;
		.regist-moto {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #333;
			color: #fff;
			height: 80rpx;
			text-align: center;
			z-index: 99;
		}

		.list-content {
			display: flex;
			flex-direction: column;
			position: sticky;
			margin-bottom: 100rpx;
			//margin-top: 80rpx;
			flex: 1;
			overflow: auto;
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