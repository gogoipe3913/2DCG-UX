<template>
  <li class="image-item">
    <a href="https://taikikishiyama-port.web.app/" class="image-wrapper">
      <img :src="image.url" alt="" />
    </a>
  </li>
</template>

<script>
export default {
  name: "ImageItem",
  props: {
    image: {
      url: String
    }
  }
};
</script>

<style scoped>
.image-item {
  width: 100%;
}

.image-item:not(:first-of-type) {
  margin-top: 180px;
}

.image-wrapper {
  display: block;
  width: 100%;
  height: 500px;
}

.image-wrapper > img {
  height: 100%;
  object-fit: contain;
  opacity: 0;
}
</style>
