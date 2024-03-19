"use strict";
const easycom = {
  autoscan: true,
  custom: {
    "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
  }
};
const pages = [
  {
    name: "first-guide",
    path: "pages/first-guide/index",
    style: {
      navigationBarTitleText: "新人引导页",
      "app-plus": {
        titleNView: false
      },
      navigationStyle: "custom"
    }
  },
  {
    name: "index",
    path: "pages/main/index",
    style: {
      navigationBarTitleText: "首页",
      "app-plus": {
        titleNView: false
      },
      navigationStyle: "custom"
    }
  },
  {
    name: "remind",
    path: "pages/remind/index",
    style: {
      navigationBarTitleText: "记录提醒",
      navigationStyle: "custom"
    }
  },
  {
    name: "remindDetail",
    path: "pages/remind/detail",
    style: {
      navigationBarTitleText: "提醒详情"
    }
  },
  {
    name: "profile",
    path: "pages/profile/index",
    style: {
      navigationBarTitleText: "个人设置",
      "app-plus": {
        titleNView: false
      },
      navigationStyle: "custom",
      "mp-weixin": {
        usingComponents: {
          myPlugin: "plugin://myPlugin/migulogin"
        }
      }
    }
  },
  {
    name: "myFamily",
    path: "pages/my-family/index",
    style: {
      navigationBarTitleText: "我的家庭成员"
    }
  },
  {
    name: "userInfo",
    path: "pages/user-info/index",
    style: {
      navigationBarTitleText: "个人信息"
    }
  },
  {
    name: "voice",
    path: "pages/all-voice/index",
    style: {
      navigationBarTitleText: "视频特效发音"
    }
  },
  {
    name: "video",
    path: "pages/all-video/index",
    style: {
      navigationBarTitleText: "视频通话人物形象"
    }
  },
  {
    name: "guide",
    path: "pages/guide/index",
    style: {
      navigationBarTitleText: "新手指导"
    }
  },
  {
    name: "feedBack",
    path: "pages/feedback/index",
    style: {
      navigationBarTitleText: "意见反馈"
    }
  },
  {
    name: "memberBenefits",
    path: "pages/member-benefits/index",
    style: {
      navigationBarTitleText: "权益中心"
    }
  },
  {
    name: "migu-pay",
    path: "pages/migu-pay/index",
    style: {
      navigationBarTitleText: "咪咕支付"
    }
  },
  {
    name: "activity-page",
    path: "pages/activity-page/index",
    style: {
      navigationBarTitleText: "活动首页"
    }
  },
  {
    name: "activity-share-page",
    path: "pages/activity-share-page/index",
    style: {
      navigationBarTitleText: "活动分享首页"
    }
  },
  {
    name: "activity-h5-page",
    path: "pages/activity-h5-page/index",
    style: {
      navigationBarTitleText: "活动H5页面",
      "app-plus": {
        titleNView: false
      },
      navigationStyle: "custom"
    }
  }
];
const subPackages = [
  {
    root: "pages/test",
    pages: [
      {
        name: "test",
        path: "test",
        style: {
          navigationBarTitleText: "测试"
        }
      }
    ]
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "亲情管家",
  navigationBarBackgroundColor: "#FFF",
  backgroundColor: "#F8F8F8"
};
const style = {
  "app-plus": {
    softinputMode: "adjustResize"
  }
};
const pagesJson = {
  easycom,
  pages,
  subPackages,
  globalStyle,
  style
};
const tabBarPagesMap = pagesJson.pages.map((i) => {
  return {
    type: "tabBarPage",
    name: i.name,
    path: `/${i.path}`
  };
});
const subPagesMap = pagesJson.subPackages.flatMap((i) => {
  return i.pages.map((x) => {
    return {
      type: "subPage",
      name: x.name,
      path: `/${i.root}/${x.path}`
    };
  });
});
const h5HsqMap = ["member-center"];
const pagesMap = [...tabBarPagesMap, ...subPagesMap];
const needAuthPath = ["member-center", "service"];
const types = {
  h5Hsq: /(m(\.dev|\.beta)?\.haoshiqi\.net\/v2)/i,
  topicType: /(topic(\.dev|\.beta)?\.doweidu\.com)/i,
  h5: /^(https|http):\/\//i
};
function getUrlType(url) {
  if (types.h5Hsq.test(url))
    return "h5Hsq";
  if (types.topicType.test(url))
    return "topic";
  if (types.h5.test(url))
    return "h5";
  return "other";
}
exports.getUrlType = getUrlType;
exports.h5HsqMap = h5HsqMap;
exports.needAuthPath = needAuthPath;
exports.pagesMap = pagesMap;
