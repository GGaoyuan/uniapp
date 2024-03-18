import http from '@/utils/request';

const userInfo = {
    // 查询会员权益信息
    changeHeadImg: (data: any) =>
        http.post<any>('/api/settings/user/changeHeadImg', data),
    // 变更用户性别
    saveSex: (data: any) =>
        http.post<any>('/api/settings/user/saveSex', data),
};

export default userInfo;