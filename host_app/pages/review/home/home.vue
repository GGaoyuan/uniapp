<template>
	<view>
		<uni-list :border="true">
			<!-- 显示圆形头像 -->
			<uni-list-chat :avatar-circle="true" title="uni-app"
				avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息1"
				time="2020-02-02 20:20"></uni-list-chat>
			<!-- 右侧带角标 -->
			<uni-list-chat title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				note="您收到一条新的消息2" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
			<!-- 头像显示圆点 -->
			<uni-list-chat title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				note="您收到一条新的消息3" time="2020-02-02 20:20" badge-positon="left" badge-text="dot"></uni-list-chat>
			<!-- 头像显示角标 -->
			<uni-list-chat title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				note="您收到一条新的消息4" time="2020-02-02 20:20" badge-positon="left" badge-text="99"></uni-list-chat>
			<!-- 显示多头像 -->
			<uni-list-chat title="uni-app" :avatar-list="avatarList" note="您收到一条新的消息5" time="2020-02-02 20:20"
				badge-positon="left" badge-text="dot"></uni-list-chat>
			<!-- 自定义右侧内容 -->
			<uni-list-chat title="uni-app" :avatar-list="avatarList" note="您收到一条新的消息6" time="2020-02-02 20:20"
				badge-positon="left" badge-text="dot">
				<view class="chat-custom-right">
					<text class="chat-custom-text">刚刚</text>
					<!-- 需要使用 uni-icons 请自行引入 -->
					<uni-icons type="star-filled" color="#999" size="18"></uni-icons>
				</view>
			</uni-list-chat>

			<view class="text-area">
				<text class="title">aaaa</text>
			</view>
			<uni-list-item title="列表文字"></uni-list-item>



			<view class="review-student-info">
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
	export default {
		
		components: {},
		data() {
			return {
				avatarList: [{
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}, {
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}, {
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}]
			}
		},
		methods: {
			onLeftSegmentTap(number) {
				// 传递的参数
				console.log("eeeeeeee__" + number);
				uni.navigateTo({
					url:'/pages/review/student-review/student-review'
				})
			},
			
			onRightSegmentTap(value) {
				console.log("asdasdadadasda__" + value);
				
			},
		},
	}
</script>




<style lang="scss">
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