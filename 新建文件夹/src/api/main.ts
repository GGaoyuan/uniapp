import http from '@/utils/request';

const main = {
    // 查询会员权益信息
    getRecommendList: (data: any) =>
        http.post<any>('/api/recommend/config/homepage', data),
};

export default main;