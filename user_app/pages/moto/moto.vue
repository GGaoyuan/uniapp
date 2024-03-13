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
			console.log("loadList complete");
		}, 500);
	}
	
	function registAction() {
		uni.navigateTo({
			url:'../regist/regist'
		});
		//console.log("registAction");
	}
	
</script>

<template>
	<view>
		<view v-if="dataSource.length == 0 && dataLoaded" class="no-data">
			<image class="no-data-image" src="/static/logo.png"></image>
			<text class="no-data-title">空的</text>
		</view>

		<view class="list" v-if="dataSource.length != 0 && dataLoaded">
			<view class="regist-moto" @click="registAction()">
				<text>注册车辆信息</text>
			</view>

			<scroll-view class="list-content" scroll-y rebound="false" enable-flex="true">
				<apply-item v-for="item in dataSource" :key="item.id" :data="item"></apply-item>
				<view style="height: 150rpx;"></view>
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
			display: flex;
			flex-direction: column;
			position: fixed;
			bottom: 20rpx;
			left: 50rpx;
			right: 50rpx;
			background-color: #3D77F0;
			color: #fff;
			height: 80rpx;
			text-align: center;
			justify-content: center;
			align-items: center;
			border: 1rpx solid #3D77F0;
			border-radius: 20rpx;
			z-index: 99;
		}

		.list-content {
			display: flex;
			flex-direction: column;
			position: sticky;
			background-color: #F2F2F2;
			// padding-bottom: 100rpx;
			margin-bottom: 100rpx;
			//margin-top: 80rpx;
			flex: 1;
			// overflow: auto;
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