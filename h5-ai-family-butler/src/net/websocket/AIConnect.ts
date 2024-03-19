import { messageCenter } from "@/components/ipViewComponents/core/message/MessageCenter";
import { SocketCmd, SocketMsgType } from "@/constants/WSConstants";

class AIConnect {

	constructor() {
		
	} 

    public socketTask;

    private url;
    private status;
    private lockReconnect;

    private timeout;
    private timeoutObj;
    private reconnectTimeOutObj;
	public initRequest(url, time) {
        // websocket是否关闭
        this.status = null; 
        //避免重复连接
		this.lockReconnect = false;
		this.url = url;

		//心跳多少秒执行检测
		this.timeout= time;
         //检测服务器端是否还活着
		this.timeoutObj= null;
         //重连之后多久再次重连
		this.reconnectTimeOutObj= null;

	
		this.socketTask = uni.connectSocket({
			url: this.url, //接口地址。
			success: () => {
				// console.log('AI: 连接成功');
				// 返回实例
				return this.socketTask
			}
		})
		
		this.socketTask.onOpen(res => {
			// console.log(res, 'AI: 连接打开');
			// 清除重连定时器
			clearTimeout(this.reconnectTimeOutObj);
			// // 开启检测
			this.start();
			
		})

		// 如果希望websocket连接一直保持，在close或者error上绑定重新连接方法。
		this.socketTask.onClose((res) => {
			// console.log(res, 'AI: 连接关闭');
			this.reconnect();
		})

		this.socketTask.onError((res) => {
			// console.log(res, 'AI: 连接错误'); 
			this.reconnect();
		})
		
		this.socketTask.onMessage(res => {
			//接受任何消息都说明当前连接是正常的
			this.reset();
			// console.log(res, 'AI: pong');

			// TODO 加500毫秒延时，防止消息列表位移动画逻辑互斥
			setTimeout(() => {
				let msg = JSON.parse(res.data);
				messageCenter.dispatch('wsMessage', msg);
			}, 500);
		})

	}

	public send(value, type) {
		// console.log('AI: send:', value);
		let _json = {
			"msg": value,
			"socketCmd": type,
			"socketMsgType": SocketMsgType.INPUT
		}
		let jsonStr = JSON.stringify(_json);
		return new Promise((resovle,reject)=>{
			this.socketTask.send({
				data: jsonStr,
				success:()=>{
					resovle('AI: 发送成功')
				}
			})
		})
	}

	// reset和start方法主要用来控制心跳的定时。
	public reset(){
		// 清除定时器重新发送一个心跳信息
		clearTimeout(this.timeoutObj);
        this.start();
	}

	public start(){
		this.timeoutObj = setTimeout(() => {
			//这里发送一个心跳
			// console.log('AI: ping');
			let _json = {"msg":"ping","socketCmd": SocketCmd.PING,"socketMsgType": SocketMsgType.INPUT};
			let parseStr = JSON.stringify(_json);
			this.socketTask.send({
				data: parseStr
			});
			
		}, this.timeout);
	}

	// 重连
	public reconnect() {
		// 防止多个方法调用，多处重连
		if (this.lockReconnect) {
			return;
		};
		this.lockReconnect = true;
		
		// console.log('AI: 准备重连');
		
		//没连接上会一直重连，设置延迟避免请求过多
		this.reconnectTimeOutObj = setTimeout(()=>{
			// 重新连接
			this.initRequest(this.url, this.timeout);

			this.lockReconnect = false;
		}, 1000);
	}

	// 手动关闭
	public close() {
		this.socketTask.close();
	}
}

export var ws = new AIConnect();