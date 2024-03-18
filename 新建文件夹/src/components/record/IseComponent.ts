import { stt } from '@/net/websocket/STTConnect';
// import { TranscodeWorker } from "@/utils/lat/TranscodeWorker";
class IseClass {
    // 音频流数据
    private audioDataList: ArrayBuffer[] = []; 
    private handlerInterval;

    // private transWorker = new TranscodeWorker();

    /**
     * 添加语音数据
     * @param frameBuffer 帧数据
     */
    public pushAudioData(frameBuffer: any) {
      if (frameBuffer) {
          this.audioDataList.push(frameBuffer);
      }
      
      if (!this.handlerInterval) {
        this.sendAudioData();
      }
    }

    // mergeArrayBuffers() {

    //   let totalLength = 0;
    //   for (const buffer of this.audioDataList) {
    //     totalLength += buffer.byteLength;
    //   }
    
    //   const mergedBuffer = new ArrayBuffer(totalLength);
    //   const uint8Array = new Uint8Array(mergedBuffer);
    
    //   let offset = 0;
    //   for (const buffer of this.audioDataList) {
    //     const sourceArray = new Uint8Array(buffer);
    //     uint8Array.set(sourceArray, offset);
    //     offset += sourceArray.length;
    //   }
    //   this.sendData = mergedBuffer;
    //   return mergedBuffer;
    // }

    /**
     * 发送语音数据
     */
    public sendAudioData() {

      const audioData = this.audioDataList.splice(0, 1);
      this.send(audioData[0]);

      
      this.handlerInterval = setInterval(() => {
   
        if (!stt) { 
          return this.clearHandlerInterval(); 
        }
       
        // 最后一帧
        if (this.audioDataList.length === 0 && this.isEnd) {
          console.log('bytes 全部发送完毕')
          ise.send(JSON.stringify({type: 1}));
          this.clearHandlerInterval();
          return;
        }

        if (this.audioDataList.length) {
          const audioData = this.audioDataList.splice(0, 1);
          this.send(audioData[0]);
        }

      }, 50);
    }

    private isEnd = false;
    public endPushAudioData () {
      this.isEnd = true;
    }

    public send (msg) {
      if (typeof msg === 'string') {
        console.log('send type')
        stt.send(msg);
      } else {
        console.log('send msg', msg && msg.byteLength || 'null')
        stt && msg.byteLength > 0 && stt.send(msg);
      }
      //   if (msg.byteLength % 4 === 0) {
      //     var data = new Float32Array(msg);
      //     msg = this.transWorker.to16BitPCM(data);
      //     stt.send(msg);
      //   } else {
      //     console.log('send bytes: ', msg);
      //   }
      // } else {
       
      // }
    }

    private clearHandlerInterval () {
      this.isEnd = false;
      if (this.handlerInterval) {
        clearInterval(this.handlerInterval);
        this.handlerInterval = null;
      }
    }

    public toBase64(buffer: ArrayBuffer) {
      return uni.arrayBufferToBase64(buffer);
    }
  }

  export var ise = new IseClass();