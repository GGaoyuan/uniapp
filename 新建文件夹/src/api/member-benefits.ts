import http from '@/utils/request';

const memberBenefits = {
  // 查询会员权益信息
  getVipInfo: (data: any) =>
    http.post<any>('/api/settings/vip/goods', data),
  // 支付接口
  orderBefit: (data: any) =>
    http.post<any>('/api/settings/vip/orderBefit', data),
};

export default memberBenefits;