<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="popup-container" :style="{ width: popupWidth + 'px', height: popupHeight + 'px' }">
      <slot></slot> <!-- 使用插槽来插入自定义内容 -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Popup',
  setup() {
    const isOpen = ref(false);
    const popupWidth = ref(300);
    const popupHeight = ref(200);

    const openPopup = () => {
      isOpen.value = true;
    };

    const closePopup = () => {
      isOpen.value = false;
    };

    // onMounted(() => {
    //   document.addEventListener('click', closePopup); // 监听全局点击事件来关闭弹窗
    // });

    // onUnmounted(() => {
    //   document.removeEventListener('click', closePopup); // 在组件卸载时移除全局点击事件监听器
    // });

    return {
      isOpen,
      popupWidth,
      popupHeight,
      openPopup,
      closePopup,
    };
  },
};
</script>