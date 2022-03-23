<template>
  <div>
    <div class="dammyDiv"></div>
    <canvas id="webglCanvas" />
    <div class="dammyDiv"></div>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import vertexShaderSrc from "./shader/vertexShader";
import fragmentShaderSrc from "./shader/fragmentShader";

export default {
  name: "SamplePixiUniformCanvas",
  data() {
    return {
      scroll: window.scrollY
    };
  },
  mounted() {
    const app = new PIXI.Application({
      view: document.querySelector("canvas")
    });

    const texture = PIXI.Texture.from(
      "https://images.unsplash.com/photo-1599140782241-144735f5949a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
    );

    const geometry = new PIXI.Geometry()
      .addAttribute(
        "aVertexPosition", // the attribute name
        [
          -100,
          -100, // x, y
          100,
          -100, // x, y
          100,
          100,
          -100,
          100
        ], // x, y
        2
      ) // the size of the attribute
      .addAttribute(
        "aUvs", // the attribute name
        [
          0,
          0, // u, v
          1,
          0, // u, v
          1,
          1,
          0,
          1
        ], // u, v
        2
      ) // the size of the attribute
      .addIndex([0, 1, 2, 0, 2, 3]);

    const uniforms = {
      uSampler2: texture,
      uTime: 0
    };

    const shader = PIXI.Shader.from(
      vertexShaderSrc,
      fragmentShaderSrc,
      uniforms
    );

    const quad = new PIXI.Mesh(geometry, shader);

    quad.position.set(400, 300);
    quad.scale.set(2);

    app.stage.addChild(quad);

    // start the animation..
    // requestAnimationFrame(animate);

    app.ticker.add(delta => {
      quad.shader.uniforms.uTime += 0.1;
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#webglCanvas {
  width: 100%;
  height: 800px;
}

.dammyDiv {
  height: 1000px;
}
</style>
