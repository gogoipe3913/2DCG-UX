import * as THREE from "three";

function setThreeRender(element) {
  const canvasEl = document.getElementById("webgl-canvas");
  // const canvasEl = element;
  const canvasSize = {
    w: window.innerWidth,
    h: window.innerHeight
  };

  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasSize.w, canvasSize.h);

  // ウィンドウとwebGLの座標を一致させるため、描画がウィンドウぴったりになるようカメラを調整
  const fov = 60; // 視野角
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = canvasSize.h / 2 / Math.tan(fovRad);
  const camera = new THREE.PerspectiveCamera(
    fov,
    canvasSize.w / canvasSize.h,
    0.1,
    1000
  );
  camera.position.z = dist;

  const scene = new THREE.Scene();

  const loader = new THREE.TextureLoader();

  // 画像をテクスチャにしたplaneを扱うクラス
  class ImagePlane {
    constructor(mesh, img) {
      this.refImage = img;
      this.mesh = mesh;
    }

    setParams() {
      // 参照するimg要素から大きさ、位置を取得してセット
      const rect = this.refImage.getBoundingClientRect();

      this.mesh.scale.x = rect.width;
      this.mesh.scale.y = rect.height;

      const x = rect.left - canvasSize.w / 2 + rect.width / 2;
      const y = -rect.top + canvasSize.h / 2 - rect.height / 2;
      this.mesh.position.set(x, y, this.mesh.position.z);
    }

    update(offset) {
      this.setParams();

      this.mesh.material.uniforms.uTime.value = offset;
    }
  }

  // Planeメッシュを作る関数
  const createMesh = img => {
    const texture = loader.load(img.src);

    const uniforms = {
      uTexture: { value: texture },
      uImageAspect: { value: img.naturalWidth / img.naturalHeight },
      uPlaneAspect: { value: img.clientWidth / img.clientHeight },
      uTime: { value: 0 }
    };
    const geo = new THREE.PlaneBufferGeometry(1, 1, 100, 100); // 後から画像のサイズにscaleするので1にしておく

    const vertexShader = `
      varying vec2 vUv;
      uniform float uTime;
  
      float PI = 3.1415926535897932384626433832795;
  
      void main(){
        vUv = uv;
        vec3 pos = position;
  
        // 横方向
        float amp = 0.03; // 振幅（の役割） 大きくすると波が大きくなる
        float freq = 0.01 * uTime; // 振動数（の役割） 大きくすると波が細かくなる
  
        // 縦方向
        float tension = -0.001 * uTime; // 上下の張り具合
  
        pos.x = pos.x + sin(pos.y * PI  * freq) * amp;
        pos.y = pos.y + (cos(pos.x * PI) * tension);
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uImageAspect;
      uniform float uPlaneAspect;
      uniform float uTime;
  
      void main(){
        // 画像のアスペクトとプレーンオブジェクトのアスペクトを比較し、短い方に合わせる
        vec2 ratio = vec2(
          min(uPlaneAspect / uImageAspect, 1.0),
          min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
        );
  
        // 計算結果を用いてテクスチャを中央に配置
        vec2 fixedUv = vec2(
          (vUv.x - 0.5) * ratio.x + 0.5,
          (vUv.y - 0.5) * ratio.y + 0.5
        );
  
        // RGBシフト
        vec2 offset = vec2(0.0, uTime * 0.0005);
        float r = texture2D(uTexture, fixedUv + offset).r;
        float g = texture2D(uTexture, fixedUv + offset * 0.5).g;
        float b = texture2D(uTexture, fixedUv).b;
        vec3 texture = vec3(r, g, b);
  
        gl_FragColor = vec4(texture, 1.0);
      }
    `;
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    const mesh = new THREE.Mesh(geo, mat);

    return mesh;
  };

  // スクロール追従
  let targetScrollY = 0; // スクロール位置
  let currentScrollY = 0; // 線形補間を適用した現在のスクロール位置
  let scrollOffset = 0; // 上記2つの差分

  // 開始と終了をなめらかに補間する関数
  const lerp = (start, end, multiplier) => {
    return (1 - multiplier) * start + multiplier * end;
  };

  const updateScroll = () => {
    // スクロール位置を取得
    targetScrollY = document.documentElement.scrollTop;
    // リープ関数でスクロール位置をなめらかに追従
    currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

    scrollOffset = targetScrollY - currentScrollY;
  };

  // 慣性スクロール
  const scrollArea = document.querySelector(".scrollable");
  document.body.style.height = `${scrollArea.getBoundingClientRect().height}px`;

  const imagePlaneArray = [];

  // 毎フレーム呼び出す
  const loop = () => {
    updateScroll();

    scrollArea.style.transform = `translate3d(0,${-currentScrollY}px,0)`;
    for (const plane of imagePlaneArray) {
      plane.update(scrollOffset);
    }
    renderer.render(scene, camera);

    requestAnimationFrame(loop);
  };

  // リサイズ処理
  let timeoutId = 0;
  const resize = () => {
    // three.jsのリサイズ
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvasSize.w = width;
    canvasSize.h = height;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // カメラの距離を計算し直す
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = canvasSize.h / 2 / Math.tan(fovRad);
    camera.position.z = dist;
  };

  const executeThree = () => {
    window.addEventListener("load", () => {
      const imageArray = [...document.querySelectorAll("img")];
      for (const img of imageArray) {
        const mesh = createMesh(img);
        scene.add(mesh);

        const imagePlane = new ImagePlane(mesh, img);
        imagePlane.setParams();

        imagePlaneArray.push(imagePlane);
      }
      loop();
    });

    // リサイズ（負荷軽減のためリサイズが完了してから発火する）
    window.addEventListener("resize", () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(resize, 200);
    });
  };

  executeThree();
}

export default setThreeRender;
