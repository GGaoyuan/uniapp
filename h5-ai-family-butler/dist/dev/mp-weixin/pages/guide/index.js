"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useInit = require("../../hooks/useInit.js");
require("../../utils/shared.js");
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent$1({
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage((res) => {
      return {
        title: "AI亲情提醒",
        path: `pages/main/index`,
        imageUrl: "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/share-img/share-img.png"
      };
    });
    common_vendor.onLoad(() => {
      const { pageName, pagePath, pageQuery } = hooks_useInit.useInit();
      console.log(pageName, pagePath, pageQuery, "pageName,pagePath, pageQuery");
    });
    const allContent = common_vendor.reactive([
      {
        title: "如何注册亲情提醒？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "点击左上方的头像图标进入【个人设置】页面，选择【点击登录】"
          },
          {
            label: "第二步",
            content: "您可选择【微信一键登录】，可以直接获取微信账号进行一键登录"
          },
          {
            label: "第三步",
            content: "您也可选择【其他手机号登录】，填写手机号、验证码进行登录"
          }
        ]
      },
      {
        title: "如何录入家庭信息？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "点击左上方的头像图标进入【个人设置】页面，在【我的家庭成员】卡片点击【添加】，点击下方【添加成员】"
          },
          {
            label: "第二步",
            content: "设置与对方的关系，包括父母、子女、配偶还有其他亲属关系"
          },
          {
            label: "第三步",
            content: "输入对方手机号，通过手机短信接收验证码，完成验证"
          },
          {
            label: "第四步",
            content: "点击【确定】，则录入成功"
          }
        ]
      },
      {
        title: "如何设置提醒？",
        isExpand: false,
        children: [
          {
            label: "第一种",
            content: "语音输入设置提醒，您可以按住语音键，说出提醒时间、对象、事项等元素进行设置"
          },
          {
            label: "第二种",
            content: "文字对话设置提醒，您可以以文字方式描述提醒时间、对象、事项等元素进行设置"
          },
          {
            label: "第三种",
            content: "手动录入设置提醒，您可以手动选择提醒时间、对象、事项等元素进行设置"
          }
        ]
      },
      {
        title: "如何语音输入设置提醒？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "进入首页，选择右下角麦克风图标"
          },
          {
            label: "第二步",
            content: "进入弹窗页面并长按按钮说话，您可以语音发送类似这样语句 “明天8点提醒妈妈送孩子上学“，明确提醒时间、对象、事项等元素"
          },
          {
            label: "第三步",
            content: "说完后放开语音按钮，并点击确认提交提醒"
          },
          {
            label: "第四步",
            content: "确认提醒对象、提醒方式、提醒周期、提醒时间、提醒内容，有问题可手动修改"
          },
          {
            label: "第五步",
            content: "确认无问题后，点击【设置提醒】完成提醒设置"
          }
        ]
      },
      {
        title: "如何文字对话设置提醒？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "进入首页，选择底部输入框"
          },
          {
            label: "第二步",
            content: "文字输入类似这样语句 “明天8点提醒妈妈送孩子上学“，明确提醒时间、对象、事项等元素"
          },
          {
            label: "第三步",
            content: "点击发送，提交开始设置"
          },
          {
            label: "第四步",
            content: "确认提醒对象、提醒方式、提醒周期、提醒时间、提醒内容，有问题可手动修改"
          },
          {
            label: "第五步",
            content: "确认无问题后，点击【设置提醒】完成提醒设置"
          }
        ]
      },
      {
        title: "如何手动录入设置提醒？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "进行首页，点击左下方的加号键"
          },
          {
            label: "第二步",
            content: "设置提醒对象，选择想要提醒的对象，也可点击右上方的添加键，添加亲情联系人"
          },
          {
            label: "第三步",
            content: "设置提醒方式，你可选择短信提醒、语音电话提醒、视频电话提醒等方式"
          },
          {
            label: "第四步",
            content: "设置提醒周期，你可选择重复提醒的周期"
          },
          {
            label: "第五步",
            content: "设置提醒时间，时间可精确到年月时分秒"
          },
          {
            label: "第六步",
            content: "设置提醒内容，你可设置提醒你与亲情联系人的生日、纪念日、重要活动等"
          },
          {
            label: "第七步",
            content: "点击【设置提醒】，当到达设定的时间点时，对方将会收到相应的提醒内容"
          }
        ]
      },
      {
        title: "如何查看提醒结果？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "打开小程序，在首页点击喇叭图标，进入提醒列表页面"
          },
          {
            label: "第二步",
            content: "您可根据不同的提醒对象，查看具体的提醒事宜。点击具体事宜，你可查看提醒方式，提醒频率，提醒内容，提醒结果和提醒反馈"
          },
          {
            label: "第三步",
            content: "你也可选择不同的提醒时间，查看具体的提醒事宜。你可查看所有待处理的提醒事项，可向下滑动页面，查看更多的提醒事项"
          }
        ]
      },
      {
        title: "如何修改提醒事宜？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "打开小程序，在首页点击喇叭图标，进入提醒列表页面"
          },
          {
            label: "第二步",
            content: "点击具体事宜，你可查看并编辑提醒方式，提醒频率，提醒内容，提醒结果和提醒反馈"
          }
        ]
      },
      {
        title: "如何查看会员权益的内容？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "打开小程序，点击左上方的头像图标进入【个人设置】页面，登录账号，新用户可按照提示填写相关信息，完成注册"
          },
          {
            label: "第二步",
            content: "点击【开通会员】，进入权益中心页面，可查看权益具体内容"
          }
        ]
      },
      {
        title: "如何设置外呼发音人形象？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "打开小程序，点击左上方的头像图标进入【个人设置】页面，登录账号，新用户可按照提示填写相关信息，完成注册"
          },
          {
            label: "第二步",
            content: "您可点击外呼发音人卡片，你可点击播放按钮进行试听，根据自己的喜好和需求进行选择"
          },
          {
            label: "第三步",
            content: "点击下方【确定】完成外呼发音人设置"
          }
        ]
      },
      {
        title: "如何设置视频外呼形象？",
        isExpand: false,
        children: [
          {
            label: "第一步",
            content: "打开小程序，点击左上方的头像图标进入【个人设置】页面，登录账号，新用户可按照提示填写相关信息，完成注册。"
          },
          {
            label: "第二步",
            content: "登录成功后，可点击视频外呼人选项进行试看"
          },
          {
            label: "第三步",
            content: "点击下方【确定】完成视频外呼形象设置"
          }
        ]
      },
      {
        title: "系统的兼容性如何呢？",
        isExpand: false,
        children: [
          {
            label: "",
            content: "目前iPhone手机暂时无法接收视频外呼。当为iPhone机主设置视频外呼时，系统会以音频外呼的方式进行通知，并使用视频外呼的条数。"
          }
        ]
      }
    ]);
    function listChange(ind) {
      console.log(ind, "我是变化");
      allContent[ind].isExpand = !allContent[ind].isExpand;
    }
    const handleArrow = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(allContent, (item, ind, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: item.isExpand
          }, item.isExpand ? {} : {}, {
            c: common_vendor.f(item.children, (x, xind, i1) => {
              return {
                a: common_vendor.t(x.label),
                b: x.label,
                c: common_vendor.t(x.content),
                d: x.content,
                e: xind + 1
              };
            }),
            d: common_vendor.o(handleArrow, ind + 1),
            e: "e1e3c98c-1-" + i0 + "," + ("e1e3c98c-0-" + i0),
            f: common_vendor.o(($event) => listChange(ind), ind + 1),
            g: "e1e3c98c-0-" + i0,
            h: ind + 1
          });
        }),
        b: common_vendor.p({
          ["show-arrow"]: false,
          border: false,
          ["title-border"]: "none"
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-e1e3c98c"], ["__file", "/Users/apple/cd_iflytek_work/ai-family/h5-ai-family-butler/src/pages/guide/index.vue"]]);
wx.createPage(MiniProgramPage);
