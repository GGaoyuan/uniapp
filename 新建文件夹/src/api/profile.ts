import http from '@/utils/request';

const profile = {
    // 获取个人设置页用户信息
    findHomePageUserInfo: (data: any) =>
        http.post<any>('/api/settings/user/findHomePageUserInfo', data),
    // 查询默认提醒人称
    reminderContentSelect: (data: any) =>
        http.post<any>('/api/settings/reminderContentSelect/find', data),
    // 保存默认提醒人称
    reminderContentSave: (data: any) =>
        http.post<any>('/api/settings/reminderContentSelect/saveOrUpdate', data),
    // 默认提醒方式查询
    reminderWaySelect: (data: any) =>
        http.post<any>('/api/settings/reminderWayConfig/findConfig', data),
    // 默认提醒方式保存
    reminderWaySave: (data: any) =>
        http.post<any>('/api/settings/reminderWayConfig/saveOrUpdateConfig', data),
    // mock登录操作
    mockLogin: (data: any) =>
        http.post<any>('/api/settings/user/mockLogin', data),
    // 模拟查询所有可用账号
    mockAllUser: (data: any) =>
        http.post<any>('/api/settings/user/mockAllUser', data),
};

export default profile;