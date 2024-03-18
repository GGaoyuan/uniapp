import http from '@/utils/request';

const login = {
    // 客户端获取用户家庭成员列表
    login: (data: any) =>
        http.post<any>('/api/settings/user/login', data),
};

export default login;
