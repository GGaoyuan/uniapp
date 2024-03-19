<script lang="ts" setup>
import { useInit } from "@/hooks/useInit";
import { reactive, ref, defineComponent, defineExpose } from "vue";
import { forward } from "@/utils/router";
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
onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
});
const allContent = reactive([
  {
    title: "如何注册亲情提醒？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content: "点击左上方的头像图标进入【个人设置】页面，选择【点击登录】",
      },
      {
        label: "第二步",
        content: "您可选择【微信一键登录】，可以直接获取微信账号进行一键登录",
      },
      {
        label: "第三步",
        content: "您也可选择【其他手机号登录】，填写手机号、验证码进行登录",
      },
    ],
  },
  {
    title: "如何录入家庭信息？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content:
          "点击左上方的头像图标进入【个人设置】页面，在【我的家庭成员】卡片点击【添加】，点击下方【添加成员】",
      },
      {
        label: "第二步",
        content: "设置与对方的关系，包括父母、子女、配偶还有其他亲属关系",
      },
      {
        label: "第三步",
        content: "输入对方手机号，通过手机短信接收验证码，完成验证",
      },
      {
        label: "第四步",
        content: "点击【确定】，则录入成功",
      },
    ],
  },
  {
    title: "如何设置提醒？",
    isExpand: false,
    children: [
      {
        label: "第一种",
        content:
          "语音输入设置提醒，您可以按住语音键，说出提醒时间、对象、事项等元素进行设置",
      },
      {
        label: "第二种",
        content:
          "文字对话设置提醒，您可以以文字方式描述提醒时间、对象、事项等元素进行设置",
      },
      {
        label: "第三种",
        content:
          "手动录入设置提醒，您可以手动选择提醒时间、对象、事项等元素进行设置",
      },
    ],
  },
  {
    title: "如何语音输入设置提醒？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content: "进入首页，选择右下角麦克风图标",
      },
      {
        label: "第二步",
        content:
          "进入弹窗页面并长按按钮说话，您可以语音发送类似这样语句 “明天8点提醒妈妈送孩子上学“，明确提醒时间、对象、事项等元素",
      },
      {
        label: "第三步",
        content: "说完后放开语音按钮，并点击确认提交提醒",
      },
      {
        label: "第四步",
        content:
          "确认提醒对象、提醒方式、提醒周期、提醒时间、提醒内容，有问题可手动修改",
      },
      {
        label: "第五步",
        content: "确认无问题后，点击【设置提醒】完成提醒设置",
      },
    ],
  },
  {
    title: "如何文字对话设置提醒？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content: "进入首页，选择底部输入框",
      },
      {
        label: "第二步",
        content:
          "文字输入类似这样语句 “明天8点提醒妈妈送孩子上学“，明确提醒时间、对象、事项等元素",
      },
      {
        label: "第三步",
        content: "点击发送，提交开始设置",
      },
      {
        label: "第四步",
        content:
          "确认提醒对象、提醒方式、提醒周期、提醒时间、提醒内容，有问题可手动修改",
      },
      {
        label: "第五步",
        content: "确认无问题后，点击【设置提醒】完成提醒设置",
      },
    ],
  },
  {
    title: "如何手动录入设置提醒？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content: "进行首页，点击左下方的加号键",
      },
      {
        label: "第二步",
        content:
          "设置提醒对象，选择想要提醒的对象，也可点击右上方的添加键，添加亲情联系人",
      },
      {
        label: "第三步",
        content:
          "设置提醒方式，你可选择短信提醒、语音电话提醒、视频电话提醒等方式",
      },
      {
        label: "第四步",
        content: "设置提醒周期，你可选择重复提醒的周期",
      },
      {
        label: "第五步",
        content: "设置提醒时间，时间可精确到年月时分秒",
      },
      {
        label: "第六步",
        content:
          "设置提醒内容，你可设置提醒你与亲情联系人的生日、纪念日、重要活动等",
      },
      {
        label: "第七步",
        content:
          "点击【设置提醒】，当到达设定的时间点时，对方将会收到相应的提醒内容",
      },
    ],
  },
  {
    title: "如何查看提醒结果？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content: "打开小程序，在首页点击喇叭图标，进入提醒列表页面",
      },
      {
        label: "第二步",
        content:
          "您可根据不同的提醒对象，查看具体的提醒事宜。点击具体事宜，你可查看提醒方式，提醒频率，提醒内容，提醒结果和提醒反馈",
      },
      {
        label: "第三步",
        content:
          "你也可选择不同的提醒时间，查看具体的提醒事宜。你可查看所有待处理的提醒事项，可向下滑动页面，查看更多的提醒事项",
      },
    ],
  },
  {
    title: "如何修改提醒事宜？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content: "打开小程序，在首页点击喇叭图标，进入提醒列表页面",
      },
      {
        label: "第二步",
        content:
          "点击具体事宜，你可查看并编辑提醒方式，提醒频率，提醒内容，提醒结果和提醒反馈",
      },
    ],
  },
  {
    title: "如何查看会员权益的内容？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content:
          "打开小程序，点击左上方的头像图标进入【个人设置】页面，登录账号，新用户可按照提示填写相关信息，完成注册",
      },
      {
        label: "第二步",
        content: "点击【开通会员】，进入权益中心页面，可查看权益具体内容",
      },
    ],
  },
  {
    title: "如何设置外呼发音人形象？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content:
          "打开小程序，点击左上方的头像图标进入【个人设置】页面，登录账号，新用户可按照提示填写相关信息，完成注册",
      },
      {
        label: "第二步",
        content:
          "您可点击外呼发音人卡片，你可点击播放按钮进行试听，根据自己的喜好和需求进行选择",
      },
      {
        label: "第三步",
        content: "点击下方【确定】完成外呼发音人设置",
      },
    ],
  },
  {
    title: "如何设置视频外呼形象？",
    isExpand: false,
    children: [
      {
        label: "第一步",
        content:
          "打开小程序，点击左上方的头像图标进入【个人设置】页面，登录账号，新用户可按照提示填写相关信息，完成注册。",
      },
      {
        label: "第二步",
        content: "登录成功后，可点击视频外呼人选项进行试看",
      },
      {
        label: "第三步",
        content: "点击下方【确定】完成视频外呼形象设置",
      },
    ],
  },
  {
    title: "系统的兼容性如何呢？",
    isExpand: false,
    children: [
      {
        label: "",
        content:
          "目前iPhone手机暂时无法接收视频外呼。当为iPhone机主设置视频外呼时，系统会以音频外呼的方式进行通知，并使用视频外呼的条数。",
      },
    ],
  },
]);
function confirm() {
  console.log("进行选择");
}

function listChange(ind) {
  console.log(ind, "我是变化");
  allContent[ind].isExpand = !allContent[ind].isExpand;
}
const handleArrow = () => {};
</script>


<template>
  <div class="guide-container">
    <div class="guide-box" v-for="(item, ind) in allContent" :key="ind + 1">
      <uni-collapse @change="listChange(ind)">
        <uni-collapse-item
          class="guide-part"
          :show-arrow="false"
          :border="false"
          title-border="none"
          @change="handleArrow"
        >
          <template v-slot:title>
            <div class="colopse_header">
              <span>{{ item.title }}</span>
              <image
                v-if="item.isExpand"
                class="handle_icon"
                src="../../static/userInfo/up.png"
              ></image>
              <image
                v-else
                class="handle_icon"
                src="../../static/userInfo/down.png"
              ></image>
            </div>
          </template>
          <div class="colopse_content">
            <div
              v-for="(x, xind) in item.children"
              :key="xind + 1"
              class="each_sentence"
            >
              <span class="label" v-show="x.label">{{ x.label }}：</span>
              <span class="content" v-show="x.content">{{ x.content }}</span>
            </div>
          </div>
        </uni-collapse-item>
      </uni-collapse>
    </div>

    <!-- <div class="bottom-box">
      <div class="add-button" @click="confirm()">确定</div>
    </div> -->
  </div>
</template>



<style lang="scss" scoped>
.guide-container {
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 38.46rpx;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  .guide-box {
    padding: 38.46rpx 38.46rpx 0;
    border-radius: 26.92rpx;
    background: #fff;
    &:not(:last-child) {
      margin-bottom: 38.46rpx;
    }
    .colopse_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 38.46rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      font-size: 34.62rpx;
      color: #272727;
      .handle_icon {
        width: 40rpx;
        height: 40rpx;
      }
    }
    .colopse_content {
      .each_sentence {
        margin-bottom: 20rpx;
        .label {
          color: #999;
        }
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