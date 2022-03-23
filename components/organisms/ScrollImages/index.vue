<template>
  <div>
    <div class="wrapper">
      <div class="scrollable">
        <div class="container">
          <!-- <ul :v-if="!isSp" class="image-list-horizontal">
            <ImageItem
              v-for="(image, index) in horizontalImages"
              :key="index"
              :image="image"
            />
          </ul> -->
          <ul class="image-list-vertical">
            <ImageItem
              v-for="(image, index) in VerticalImages"
              :key="index"
              :image="image"
            />
          </ul>
        </div>
      </div>
    </div>
    <div class="webgl-canvas">
      <canvas
        id="webgl-canvas"
        ref="webgl_canvas"
        class="webgl-canvas__body"
      ></canvas>
    </div>
  </div>
</template>

<script>
import ImageItem from "../../atoms/ImageItem/index.vue";
import { horizontalImages, VerticalImages } from "./imageData.ts";
import setThreeRender from "./setThreeRender.js";

export default {
  name: "ScrollImages",
  components: {
    ImageItem
  },
  data() {
    return {
      horizontalImages,
      VerticalImages
    };
  },
  created() {},
  mounted() {
    setThreeRender(this.$refs.webgl_canvas);
  }
};
</script>
<style scoped></style>
