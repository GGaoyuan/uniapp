import http from '@/utils/request';

const feedback = {
    // 查询会员权益信息
    feedbackSave: (data: any) =>
        http.post<any>('/api/settings/feedback/saveConfig', data),
};

export default feedback;