import http from '@/utils/request';

const myFamily = {
  // 客户端获取用户家庭成员列表
  getRelationList: (data: any) =>
    http.post<any>('/api/user/relation/list', data),
};

export default myFamily;
