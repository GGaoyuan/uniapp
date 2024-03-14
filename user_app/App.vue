<script>
	import {
		onLoad,
		onReady,
		onShareAppMessage
	} from "@dcloudio/uni-app";
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.appBlueColor {
		/* color: #3D77F0  蓝色*/
		/* color: #222222; 黑色 */
		/* #999999  灰色 */	
	}
</style>
