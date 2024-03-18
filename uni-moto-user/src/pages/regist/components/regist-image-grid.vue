<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  maxCount: Number,
});

interface ItemModel {
  isAdd: boolean;
  url: string;
}
const addItem: ItemModel = {
  isAdd: true,
  url: "",
};

let dataList = ref<ItemModel[]>([addItem]);

const gridColumn = 4;

function chooseImage() {
  console.log("chooseImage");
  uni.chooseImage({
    sourceType: ["camera", "album"],
    sizeType: ["original", "compressed"],
    count: 1, // props.maxCount - dataList.value.filter((i) => i.isAdd == false).length,
    success: (res) => {
      const tempFilePaths = res.tempFilePaths; //获取到本地图片地址
      for (let i = 0; i < res.tempFilePaths.length; i++) {
        const image: ItemModel = {
          url: res.tempFilePaths[i],
          isAdd: false,
        };
        dataList.value.push(image);
      }
      checkAddImageItem();

      /* 上传图片 */
      //   const uploadTask = uni.uploadFile({
      //     url: "http://*********",
      //     filePath: tempFilePaths[0],
      //     name: "file",
      //     header: {
      //       Authorization: token,
      //     },
      //     formData: {
      //       user: "test",
      //     },
      //     success: function (res) {
      //       let toJsonRes = JSON.parse(res.data); //获取到后台处理过的地址
      //       let list = [];
      //       list.push("http://*********" + toJsonRes.data);
      //       _self.imageList = _self.imageList.concat(list);
      //     },
      //   });
    },
  });
}

function deleteImage(index: number) {
  console.log("deleteImage", index);
  dataList.value.splice(index, 1);
  checkAddImageItem();
}

function checkAddImageItem() {
  //先删除Add，再判断是否需要添加
  dataList.value = dataList.value.filter((i) => i.isAdd == false);
  if (dataList.value.length < props.maxCount) {
    dataList.value.push(addItem);
  }
}
</script>

<template>
  <view class="warp">
    <uni-grid :column="gridColumn" border-color="#222222">
      <uni-grid-item v-for="(item, index) in dataList" :index="index">
        <view v-if="item.isAdd === false" class="grid-item-box">
          <image class=".grid-item-image" :src="item.url" mode="aspectFit">
            <view
              class=".grid-item-image-delete"
              @click="deleteImage(index)"
            ></view>
          </image>
        </view>
        <view
          v-if="item.isAdd === true"
          class="grid-item-box"
          @click="chooseImage"
        >
          <text>添加图片</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<style lang="scss">
.warp {
  display: flex;
  flex-direction: column;
}

.grid-item-box {
  flex: 1;
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: red;
  // padding: 15px 15rpx;

  .grid-item-image {
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
  }

  .grid-item-image-delete {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    width: 50rpx;
    height: 50rpx;
    background-color: black;
  }
}

.popupWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  background-color: #fff;
  padding-top: 80rpx;
  padding-bottom: 80rpx;
}
</style>
