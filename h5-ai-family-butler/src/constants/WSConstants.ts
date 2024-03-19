
export enum SocketMsgType {
    /**
     * 用户输入
     */
    INPUT = 'INPUT',
    /**
     * 机器人
     */
    ROBOT = 'ROBOT'
}

export enum SocketCmd {

    /**
     * AI 心跳检测
     */
    PING = 'PING',

    /**
     * 心跳响应
     */
    PONG = 'PONG',

    /**
     * 对话
     */
    CHAT = 'CHAT',

    /**
     * 对话完成
     */
    FINISH = 'FINISH',

    /**
    * 进入loading状态
    */
    LOADING = 'LOADING',

    /**
     * 重连
     */
    RECONNECTION = 'RECONNECTION',

    /**
     * 下线
     */
    CLOSE = 'CLOSE',

    /**
     * 错误
     */
    ERROR = 'ERROR',

    /**
     * STT心跳
     */
    HEART = 'heart',

    /**
     * STT 结束状态
     */
    STTFINISH = '1'
    
}


