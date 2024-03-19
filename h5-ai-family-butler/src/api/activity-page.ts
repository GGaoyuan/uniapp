import http from '@/utils/request';

const activity = {
    // 分享接口
    share: (data: any) =>
        http.post<any>('/spring/activity/share', data),
};

export default activity;