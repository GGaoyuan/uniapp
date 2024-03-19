"use strict";
const apiEnv = "dev";
const envMap = {
  dev: {
    baseUrl: "https://m.xxx.com",
    apiBaseUrl: "https://ivr.migu.cn/ai-family-butler/client"
    //  橙汁：http://10.40.112.7:8181   http://10.40.112.66:8181 徐灵
  },
  prod: {
    baseUrl: "https://m.xxx.com",
    apiBaseUrl: "https://ivr.migu.cn/ai-family-butler/client"
  },
  beta: {
    baseUrl: "http://m.beta.xxx.com",
    apiBaseUrl: "https://m.betaapi.xxx.com"
  },
  local: {
    baseUrl: "http://m.dev.xxx.com",
    apiBaseUrl: "https://m.devapi.xxx.com"
  }
};
function createEnv(apiEnv2) {
  return Object.assign({ apiEnv: apiEnv2 }, envMap[apiEnv2]);
}
const env = createEnv(apiEnv);
exports.env = env;
