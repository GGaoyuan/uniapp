import { isDevelopment, isH5 } from './platform';
import { forward } from './router';
import { getCommonParams } from '@/config/commonParams';
import env from '@/config/env';
import { hideLoading, showLoading } from '@/config/serviceLoading';
import { messageCenter } from '@/components/ipViewComponents/core/message/MessageCenter';
import { AniType } from '@/constants/MainPageConstants';

function reject(err: { errno: number; errmsg: string }, cb) {
  const { errmsg = '系统错误', errno = -1 } = err;
  switch (errno) {
    case 10000:
      // 特殊异常处理
      forward('login');
      break;

    default:
      uni.showToast({
        title: errmsg,
        icon: 'none'
      });
      messageCenter.dispatch('playAnimate', AniType.ERROR);
      break;
  }
  if (cb) cb(err);
}

// h5环境开启代理
const apiBaseUrl = isH5 && isDevelopment ? '/api' : env.apiBaseUrl;
function baseRequest(
  method:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
    | undefined,
  url: string,
  data: { isLoading: any }
) {
  return new Promise((resolve, _reject) => {
    showLoading(data.isLoading);
    delete data.isLoading;
    let responseDate: unknown;
    uni.request({
      url: apiBaseUrl + url,
      method,
      timeout: 20000,
      header: {
        'content-type': 'application/json; charset=utf-8',
        Authorization: uni.getStorageSync('token')
        // method === 'GET'
        //   ? 'application/json; charset=utf-8'
        //   : 'application/x-www-form-urlencoded'
      },
      data,
      // success: (res: any) => {
      //   // if (res.statusCode >= 200 && res.statusCode < 400) {
      //   //   if (res.data.code === 200) {
      //   //     responseDate = res.data;
      //   //   } else {
      //   //     reject(res.data);
      //   //   }
      //   // } else {
      //   //   reject(
      //   //     {
      //   //       errno: -1,
      //   //       errmsg: '错误'
      //   //     },
      //   //     _reject
      //   //   );
      //   // }
      // },
      fail: () => {
        reject(
          {
            errno: -1,
            errmsg: '网络不给力，请检查你的网络设置~'
          },
          _reject
        );
      },
      complete: (res) => {
        // console.log(data, 'data');
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (res.data.code === 200) {
            responseDate = res.data.data;
            resolve(responseDate);
          } else {
            reject(
              {
                errno: -1,
                errmsg: `${res.data?.msg}` || '错误'
              },
              _reject
            );
          }
        } else {
          reject(
            {
              errno: -1,
              errmsg: '错误'
            },
            _reject
          );
        }
        // resolve(responseDate);
        hideLoading();
      }
    });
  });
}

const http = {
  get: <T>(api: string, params: any) =>
    baseRequest('GET', api, {
      ...getCommonParams(),
      ...params
    }) as Http.Response<T>,
  post: <T>(api: string, params: any) =>
    baseRequest('POST', api, {
      ...getCommonParams(),
      ...params
    }) as Http.Response<T>
};

export default http;
