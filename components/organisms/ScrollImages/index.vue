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
<style scoped>
/* -- リセット系 -- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  width: 100%;
}

/* -- ここまで -- */

body {
  overscroll-behavior: none;
}

.webgl-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.webgl-canvas__body {
  width: 100%;
  height: 100%;
}

.wrapper {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.scrollable {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.container {
  width: 80vw;
  max-width: 1000px;
  margin: 0 auto;
}

.image-list-horizontal {
  width: 800px;
  margin: 0 auto;
  padding: 180px 0;

  /* スマホでは消す */
  @media screen and (max-width: 767px) {
    display: none;
  }
}

.image-list-vertical {
  width: 800px;
  margin: 0 auto;
  padding: 180px 0;

  /* PC では消す */
  @media screen and (min-width: 768px) {
    display: none;
  }
}
</style>
