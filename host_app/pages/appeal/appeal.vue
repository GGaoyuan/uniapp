<template>
	<view>
		<text class="title">{{test}}</text>
		<view @click="onClickTest">扫一扫</view>
	</view>
</template>

<script>
	var test = 'aaa';
	export default {
		data() {
			return {
				test,
			}
		},
		onLoad() {

		},
		methods: {
			onClickTest() {
				uni.scanCode({
					success: (res) => {
						this.test = res.result
						
					}
				})
			}
		}
	}
</script>

<style>

</style>