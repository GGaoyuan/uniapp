let loadingCount = 0;

export function showLoading(isLoading: boolean) {
  if (isLoading) {
    try {
      uni.showLoading({
        title: '加载中'
      });
    } catch (e) {

    }
    loadingCount = loadingCount + 1;
  }
}

export function hideLoading() {
  loadingCount = loadingCount - 1;
  if (loadingCount === 0) {
    try {
      uni.hideLoading();
    } catch (e) {

    }
  }
}
