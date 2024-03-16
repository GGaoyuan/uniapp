<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const title = ref("Hello");
let a = false;
import jsonData from "../../static/data/my.json";

onLoad((option) => {
  console.log("script:onLoad");

  // 使用json数据
  
  
  const resArr = jsonData.list;
  console.log(resArr);
});

function change() {

}

</script>

<template >
  <view class="warp">
			<uni-grid :column="4" border-color="#03a9f4" @change="change">
				<uni-grid-item :index="0">
					<view class="grid-item-box">
						<text class="text">文本信息</text>
					</view>
				</uni-grid-item>
				<uni-grid-item :index="1">
					<view class="grid-item-box">
						<text class="text">文本信息</text>
					</view>
				</uni-grid-item>
				<uni-grid-item :index="2">
					<view class="grid-item-box">
						<text class="text">文本信息</text>
					</view>
				</uni-grid-item>
				<uni-grid-item :index="3">
					<view class="grid-item-box">
						<text class="text">文本信息</text>
					</view>
				</uni-grid-item>
			</uni-grid>
  </view>
</template>



<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		// display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-item-box-row {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}

	/* #ifdef H5 */
	@media screen and (min-width: 768px) and (max-width: 1425px) {
		.swiper {
			height: 630px;
		}
	}

	@media screen and (min-width: 1425px) {
		.swiper {
			height: 830px;
		}
	}

	/* #endif */
</style>

