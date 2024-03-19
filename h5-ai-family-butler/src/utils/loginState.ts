export function isLogin () {
    let userVO = uni.getStorageSync('userInfo');
    if (userVO && userVO.userInfoVO) {
        return true;
    }
    return false;
}