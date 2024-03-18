import http from '@/utils/request';

const allVoice = {
    // 查询视频列表信息
    getVoiceList: (data: any) =>
        http.post<any>('/api/settings/voiceCallsSpeaker/find', data),
    // 保存视频列表信息
    saveOrUpdate: (data: any) =>
        http.post<any>('/api/settings/voiceCallsSpeaker/saveOrUpdate', data),
};

export default allVoice;