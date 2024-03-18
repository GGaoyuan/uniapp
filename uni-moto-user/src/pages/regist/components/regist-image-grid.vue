<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  maxCount: Number,
});

// interface AddModel {}
// const addModel: AddModel = {};

interface ItemModel {
  isAdd: boolean;
  url: string;
}
const addItem: ItemModel = {
  isAdd: true,
  url: "",
};
// let itemsList = ref([]);

let dataList = ref<ItemModel[]>([addItem]);

const gridColumn = 4;

// onMounted(() => {
//   // dataList.value.push(addItem);
// });

// function change(item: ItemModel) {
//   console.log("change");
// }

const popupRef = ref(null);
function addImage() {
  popupRef.value.open("bottom");
}

function openCamera() {
  console.log("openCamera");
  //popupRef.value.close();
  uni.chooseImage({
    count: 1,
    sourceType: ["camera"],
    success: (res) => {
      if (res.tempFilePaths.length > 0) {
        // const image: ItemModel = {
        //   isAdd
        //   url: res.tempFilePaths[0],
        // };
        // dataList.value.push(image);
      }
      console.log("成功");
    },
  });
}

function chooseImage() {
  console.log("chooseImage");
  //popupRef.value.close();

  //   const image: ItemModel = {
  //     url: "",
  //   };
  //   dataList.value.push(image);

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
      //先删除Add，再判断是否需要添加
      dataList.value = dataList.value.filter((i) => i.isAdd == false);
      if (dataList.value.length < props.maxCount) {
        dataList.value.push(addItem);
      }

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
</script>

<template>
  <view class="warp">
    <uni-grid :column="gridColumn" border-color="#222222">
      <uni-grid-item v-for="(item, index) in dataList" :index="index">
        <view v-if="item.isAdd === false" class="grid-item-box">
          <image class=".grid-item-image" :src="item.url" mode="aspectFit" />
          <view class=".grid-item-delete"></view>
        </view>
        <view v-if="item.isAdd === true" class="grid-item-box" @click="chooseImage">
          <text>添加图片</text>
        </view>
      </uni-grid-item>
    </uni-grid>

    <!-- <uni-grid :column="gridColumn" border-color="#222222" @change="addImage">
      <uni-grid-item :index="0">
        <view class="grid-item-box">
          <text>添加图片</text>
        </view>
      </uni-grid-item>
    </uni-grid> -->

    <!-- <popup> -->
    <!-- <uni-popup ref="popupRef" type="bottom">
      <view class="popupWrap">
        <button @click="openCamera">拍照</button>
        <view style="height: 30rpx"></view>
        <button @click="openAlbum">相册</button>
      </view>
    </uni-popup> -->
    <!-- </view> -->
  </view>
</template>

<style lang="scss">
.warp {
  display: flex;
  flex-direction: column;
}

.grid-item-box {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 15px 15rpx;

  .grid-item-image {
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
    // max-height: 100rpx;
  }
  .grid-item-delete {
    
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
