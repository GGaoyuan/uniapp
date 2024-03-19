<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, defineComponent, defineExpose } from "vue";
import { forward, back } from "@/utils/router";
import feedbackApi from "@/api/feedback";
import env from "@/config/env";
import { isDevelopment, isH5 } from "@/utils/platform";
import { onShareAppMessage } from "@dcloudio/uni-app";

// 1.发送给朋友
onShareAppMessage((res) => {
  return {
    title: "AI亲情提醒",
    path: `pages/main/index`,
    imageUrl: 'https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/share-img/share-img.png',
  };
  // return res;
});

//2.分享到朋友圈
const onShareTimeline = (res) => {
  return res;
};
const apiBaseUrl = isH5 && isDevelopment ? "/api" : env.apiBaseUrl;
onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
});

// const files = ref<any>null;

watch(
  () => imageValue,
  (newVal, oldVal) => {
    if (newVal) {
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      console.log(newVal);
    } else {
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      console.log(oldVal);
    }
  }
);

const userFeedBack = reactive({
  screenshots: [],
});
const imageValue = ref({});
let allFileTempPaths = reactive([]); //临时的存放地址
let allFileServePaths = reactive([]); //服务器上的存放地址
const uploadSelect = (data) => {
  console.log(data, "选择文件");

  // if(){

  // }else{
  //   upload()
  // }
};
const uploadProgress = (data) => {
  console.log(data, "上传进度");
};
const uploadSuccess = (data) => {
  console.log(data, "我是上传成功");
};
const uploadFail = (data) => {
  console.log(data, "我是上传失败");
};
const delImg = (ind: number) => {
  allFileTempPaths.splice(ind, 1);
  allFileServePaths.splice(ind, 1);
};
const uploadImage = () => {
  console.log("触发了uploadImage方法");
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album"], //从相册选择
    success: function (chooseImageRes) {
      console.log(chooseImageRes, "选择的文件");
      let tempFiles = chooseImageRes.tempFiles;
      let tempFilePaths = chooseImageRes.tempFilePaths;
      for (var i = 0; i < tempFiles.length; i++) {
        publicUpload(tempFiles[i], tempFilePaths[i]);
      }
    },
  });
};
const publicUpload = (file: any, filePath: string) => {
  console.log(file, filePath, "要上传 的内容");
  uni.uploadFile({
    url: apiBaseUrl + "/api/file/up",
    filePath,
    name: "file", //对应后台接口参数名
    method: "POST",
    header: {
      Authorization: uni.getStorageSync("token"),
    },
    formData: {
      //要上传的文件
      file,
    },
    complete(res: any) {
      console.log(res, "这儿");
      if (res.statusCode >= 200 && res.statusCode < 400) {
        let responseDate = JSON.parse(res.data);
        console.log(responseDate, "结果");
        if (responseDate.code === 200) {
          if (responseDate.data) {
            allFileTempPaths.push(filePath);
            allFileServePaths.push(responseDate.data);
            console.log(allFileTempPaths, allFileServePaths, "所有值");

            uni.showToast({
              title: "提交成功",
            });
            back(-1);
          }
        }
      }
    },
    fail(error: any) {
      console.log(error);
      uni.showToast({
        icon: "error",
        title: "图片上传失败!",
      });
    },
  });
};
// 数据接口请求
// 保存用户反馈
async function nagetProfileDatame() {
  await feedbackApi.feedbackSave(userFeedBack);
}

function confirm() {
  userFeedBack.screenshots = allFileServePaths;
  nagetProfileDatame();
}
</script>

<template>
  <div class="feedback-container">
    <div class="feedback-box">
      <div class="feedback-content">
        <p class="title-text">
          建议/问题描述<span class="notice">（必填）</span>
        </p>

        <textarea
          class="qestion-input"
          name="question"
          id="question"
          placeholder="请填你的问题描述…"
          v-model="userFeedBack.content"
        ></textarea>

        <p class="title-text qestion-title">
          问题截图<span class="notice">（选填）</span>
        </p>
        <div class="upload_column">
          <div
            class="each_temp_img"
            :key="item"
            v-for="(item, ind) in allFileTempPaths"
          >
            <image
              src="@/static/userInfo/close.png"
              @click="delImg(ind)"
              class="close_icon"
            ></image>
            <image :src="item" class="img_self"></image>
          </div>
          <div class="upload_box" @click="uploadImage">
            <image
              src="@/static/userInfo/camera.png"
              class="camera_icon"
            ></image>
            <div>添加照片</div>
          </div>
        </div>
        <p class="title-text qestion-title">
          联系方式<span class="notice">（选填）</span>
        </p>

        <input
          type="text"
          class="phone-input"
          placeholder="请输入你的联系方式"
          v-model="userFeedBack.phone"
        />
      </div>
    </div>

    <div class="bottom-box">
      <div class="add-button" @click="confirm()">确定</div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.feedback-container {
  padding-bottom: 241.54rpx;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  .feedback-box {
    box-sizing: border-box;
    padding: 38.46rpx;
    width: 100%;
    .feedback-content {
      box-sizing: border-box;
      margin: auto;
      padding: 38.46rpx;
      border-radius: 26.92rpx;
      width: 100%;
      height: 948.08rpx;
      background: #fff;
      .title-text {
        text-align: left;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        font-size: 34.62rpx;
        color: #272727;
        .notice {
          text-align: left;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 23.08rpx;
          color: #7079ff;
        }
      }
      .qestion-input {
        box-sizing: border-box;
        margin-top: 38rpx;
        padding: 19.23rpx;
        border-radius: 15.38rpx;
        width: 100%;
        height: 250rpx;
        background: #f5f5f5;
      }
      .qestion-title {
        margin-top: 57rpx;
        margin-bottom: 38rpx;
      }
      .upload_column {
        display: flex;
        .each_temp_img {
          position: relative;
          margin-right: 30rpx;
          width: 153.85rpx;
          height: 153.85rpx;
          .img_self {
            border-radius: 19.23rpx;
            width: 100%;
            height: 100%;
          }
          .close_icon {
            position: absolute;
            right: 5rpx;
            top: 0;
            width: 40rpx;
            height: 40rpx;
          }
        }
        .upload_box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 19.23rpx;
          width: 153.85rpx;
          height: 153.85rpx;
          background: #f5f5f5;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          font-size: 26.92rpx;
          color: #111;
          .camera_icon {
            margin-bottom: 17.63rpx;
            width: 53.85rpx;
            height: 53.85rpx;
          }
        }
      }
      .phone-input {
        display: block;
        padding: 23rpx 19rpx;
        border-radius: 15.38rpx;
        background: #f5f5f5;
      }
    }
  }
  .bottom-box {
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding-top: 57rpx;
    width: 100%;
    height: 211.54rpx;
    background: #fff;
    .add-button {
      margin: 0 auto;
      border-radius: 48.08rpx;
      width: 423.08rpx;
      height: 96.15rpx;
      background: #7079ff;
      line-height: 96.15rpx;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 38.46rpx;
      color: #fff;
    }
  }
}
</style>