<template>
	<view>
		<view class="container-area">
			<view class="test1">A</view>
			<view class="test2">B</view>
			<view class="test3">C</view>
		</view>
	</view>
</template>


<script>
	export default {
		components: {},
		data() {
			return {

			}
		},
		onLoad() {

		},
		onReady() {

		},
		methods: {

		},
	}
</script>



<style lang="scss">
	.container-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.test1 {
			background-color: red;
		}

		.test2 {
			background-color: blue;
		}

		.test3 {
			background-color: yellow;
		}
	}
</style>