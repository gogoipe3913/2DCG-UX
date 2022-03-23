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
  name: "SamplePixiCanvas",
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

    let count = 0;

    const width = 400;
    const height = 100;
    const pointCount = 4;

    const ropeLength = width / (pointCount - 1);
    const points = [];
    for (let i = 0; i < pointCount; i++) {
      points.push(new PIXI.Point(ropeLength * i, height / 2));
    }

    // ロープのポイントをしっぽの画像に適用する
    const target = new PIXI.SimpleRope(texture, points);
    console.log(target);
    app.stage.addChild(target);

    // アニメーション中
    // app.ticker.add(delta => {
    //   // 各ポイントの位置を動かすとそれに沿うように画像が変形する
    //   for (let i = 0; i < points.length; i++) {
    //     // x, y は任意
    //     points[i].set(x, y);
    //   }
    // });

    const g = new PIXI.Graphics();
    g.x = target.x;
    g.y = target.y;
    app.stage.addChild(g);

    // start animating
    app.ticker.add(() => {
      count += 0.1;

      // make the snake
      for (let i = 0; i < points.length; i++) {
        points[i].y = Math.sin(i * 0.5 + count) * 30;
        points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 20;
      }
      renderPoints();
    });

    function renderPoints() {
      g.clear();

      // g.lineStyle(2, 0xffc2c2);
      g.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        g.lineTo(points[i].x, points[i].y);
      }

      for (let i = 1; i < points.length; i++) {
        g.beginFill(0xff0022);
        g.drawCircle(points[i].x, points[i].y, 10);
        g.endFill();
      }
    }

    // window.onscroll = () => {
    //   const scrollYNow = window.scrollY;

    //   if (scrollYNow > this.scroll) {
    //     quad.shader.uniforms.time += 0.3;
    //   } else {
    //     quad.shader.uniforms.time -= 0.3;
    //   }
    //   // quad.shader.uniforms.time += 0.1;

    //   this.scroll = window.scrollY;
    // };

    // let count = 0;

    // app.ticker.add(delta => {
    //   count += 0.1;

    // thing.clear();
    // thing.lineStyle(10, 0xff0000, 1);
    // thing.beginFill(0xffff00, 0.5);
    // thing.thing.moveTo(
    //   -120 + Math.sin(count) * 20,
    //   -100 + Math.cos(count) * 20
    // );
    // thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
    // thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
    // thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
    // thing.lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
    // thing.closePath();

    // thing.rotation = count * 0.1;
    // });
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
