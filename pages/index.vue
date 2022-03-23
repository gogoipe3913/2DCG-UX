<template>
  <SamplePixiUniformCanvas />
</template>

<script lang="ts">
import Vue from "vue";
import ScrollImages from "../components/organisms/ScrollImages/index.vue";
import SamplePixiCanvas from "../components/organisms/SamplePixiCanvas/index.vue";
import SamplePixiUniformCanvas from "../components/organisms/SamplePixiUniformCanvas/index.vue";

export default Vue.extend({
  name: "IndexPage",
  components: {
    ScrollImages,
    SamplePixiCanvas,
    SamplePixiUniformCanvas
  }
});
</script>

<style scoped></style>
