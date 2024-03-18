const apiEnv: ApiEnv = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const envMap = {
  dev: {
    baseUrl: 'https://m.xxx.com',
    apiBaseUrl: 'https://ivr.migu.cn/ai-family-butler/client' //  橙汁：http://10.40.112.7:8181   http://10.40.112.66:8181 徐灵
  },
  prod: {
    baseUrl: 'https://m.xxx.com',
    apiBaseUrl: 'https://ivr.migu.cn/ai-family-butler/client'
  },
  beta: {
    baseUrl: 'http://m.beta.xxx.com',
    apiBaseUrl: 'https://m.betaapi.xxx.com'
  },
  local: {
    baseUrl: 'http://m.dev.xxx.com',
    apiBaseUrl: 'https://m.devapi.xxx.com'
  }
};

type ApiEnv = keyof typeof envMap;
type Env<T extends ApiEnv> = {
  apiEnv: T;
} & (typeof envMap)[T];

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
  return Object.assign({ apiEnv }, envMap[apiEnv]);
}

const env = createEnv(apiEnv);
export default env;
