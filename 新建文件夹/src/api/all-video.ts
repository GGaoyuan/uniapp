import http from '@/utils/request';

const allVideo = {
    // 查询视频列表信息
    getVideoList: (data: any) =>
        http.post<any>('/api/settings/videoCallsPerson/find', data),
    // 保存视频列表信息
    saveOrUpdate: (data: any) =>
        http.post<any>('/api/settings/videoCallsPerson/saveOrUpdate', data),
};

export default allVideo;