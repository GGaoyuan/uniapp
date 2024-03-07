<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{test}}</text>
		</view>
	</view>
</template>

<script>
	var test = 'aaa';
	export default {
		data() {
			return {
				title: 'aaaasdasdad',
				text: 'text',
				test,
				//res: '',
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// let queryParams = this.$route.query; // 获取URL参数
			// if (queryParams && queryParams.params) {
			// 	let paramsStr = decodeURIComponent(queryParams.params); // 解码URL参数
			// 	let obj = JSON.parse(paramsStr); // 反序列化字符串得到对象
			// 	console.log('接收到的对象：', obj);
			// } else {
			// 	console.error('未能正确接收到对象');
			// }
			//console.log(option.res); //打印出上个页面传递的参数。
			console.log("asd");
			var data = uni.getStorageSync('data');
			uni.removeStorageSync('data')
			var obj = JSON.parse(data);
			test = 'asdasdads'
			// test = obj["result"]
			// console.log(obj["result"]);
			// test = 'asdasdads'
			
		},
		// onLoad: function(option) {
		// 	console.log(option.res)
		// 	res = option.res;
		// 	result = option.res;
		// },
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 0rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		background-color: aqua;
	}

	.title {
		font-size: 36rpx;
		color: #800f94;
	}

	.newTextArea {
		display: flex;
		justify-content: center;
		background-color: aqua;
		height: 80rpx;
		width: 100rpx;
	}
</style>