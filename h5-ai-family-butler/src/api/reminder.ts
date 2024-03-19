import http from '@/utils/request';

const reminder = {
  // 客户端获取用户家庭成员列表
  getRelationList: (data?: any) =>
    http.post<any>('/api/user/relation/list', data),
  // 客户端根据时间范围获取提醒详情列表
  getListTaskInfoGroupByDay: (data: any) =>
    http.post<any>('/api/reminder/listTaskInfoGroupByDay', data),
  // 客户端获取提醒详情列表
  getListTaskInfo: (data: any) =>
    http.post<any>('/api/reminder/listTaskInfo', data),
  // 客户端获取提醒详情
  getFindTaskInfo: (data: any) =>
    http.post<any>('/api/reminder/findTaskInfo', data),
  // 客户端获取提醒周期配置
  getListReminderCycle: (data: any) =>
    http.post<any>('/api/reminder/listReminderCycle', data),
  // 查看权益提醒方式剩余量
  getReminderWay: (data?: any) =>
    http.post<any>('/api/settings/vip/getReminderWay', data),
  // 客户端新增提醒
  saveTask: (data?: any) => http.post<any>('/api/reminder/saveTask', data),
  // 客户端修改提醒
  updateTask: (data?: any) => http.post<any>('/api/reminder/updateTask', data),
  // 客户端删除提醒
  delTask: (data?: any) => http.post<any>('/api/reminder/delTask', data),
  // 客户端获取用户家庭成员详情
  findInfo: (data?: any) => http.post<any>('/api/user/relation/findInfo', data),
  // 客户端新增用户家庭成员关系
  relationSave: (data?: any) => http.post<any>('/api/user/relation/save', data),
  // 通过开始日期和结束日期查询节日和假期
  startAndEndDate: (data?: any) =>
    http.post<any>('/api/homepage/festival/startAndEndDate', data),
  // 客户端获取用户家庭成员关系
  findType: (data?: any) => http.post<any>('/api/user/relation/findType', data),
  // 客户端家庭成员关系验证码
  relationSms: (data?: any) => http.post<any>('/api/user/relation/sms', data),
  // 客户端删除用户家庭成员关系
  relationDel: (data?: any) => http.post<any>('/api/user/relation/delete', data)
};

export default reminder;
