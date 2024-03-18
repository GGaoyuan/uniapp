 /**
   * FIXME 方法有问题，暂时不用
   */
export function checkRecord(funcObj) {
    // var that = this;
    uni.getSetting({
      success(res) {
        //判断是否第一次获取录音功能
        if (!res.authSetting['scope.record']) {
          //调用后会立刻弹窗询问用户是否同意授权录音给小程序
          uni.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log('startRecord', res.authSetting)

              funcObj && funcObj();
            }
          })
          //判断录音是否是开启状态false没开启就跳转到开启页面
          if (res.authSetting['scope.record'] == false) {
            uni.openSetting({
              success(res) {
                console.log('scope.record == false  success', res.authSetting)
              }
            });
          }
        } else if (res.authSetting['scope.record'] == true) {
          console.log('scope.record == true')

          funcObj && funcObj();
        }
      }
    })
}