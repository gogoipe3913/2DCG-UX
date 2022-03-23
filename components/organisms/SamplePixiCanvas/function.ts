// import * as PIXI from "pixi.js";
// import vertexShaderSrc from "./shader/vertexShader";
// import fragmentShaderSrc from "./shader/fragmentShader";

// const canvasSize = {
//   w: window.innerWidth,
//   h: window.innerHeight
// };
// const loader = new PIXI.TextureLoader();

// class ImagePlane {
//   refImage: HTMLImageElement;
//   mesh: PIXI.Mesh<PIXI.MeshMaterial>;

//   constructor(mesh: PIXI.Mesh<PIXI.MeshMaterial>, img: HTMLImageElement) {
//     this.refImage = img;
//     this.mesh = mesh;
//   }

//   setParams() {
//     // 参照するimg要素から大きさ、位置を取得してセット
//     const rect = this.refImage.getBoundingClientRect();

//     this.mesh.scale.x = rect.width;
//     this.mesh.scale.y = rect.height;

//     const x: number = rect.left - canvasSize.w / 2 + rect.width / 2;
//     const y: number = -rect.top + canvasSize.h / 2 - rect.height / 2;
//     this.mesh.position.set(x, y);
//   }

//   update(offset: any) {
//     this.setParams();

//     this.mesh.material.uniforms.uTime.value = offset;
//   }
// }

// // Planeメッシュを作る関数
// const createMesh = (img: HTMLImageElement) => {
//   const texture = PIXI.Texture.fromLoader(img, img.src);

//   const geometry = new PIXI.PlaneGeometry(1, 1, 100, 100); // 後から画像のサイズにscaleするので1にしておく
//   const uniforms = {
//     uTexture: { value: texture },
//     uImageAspect: { value: img.naturalWidth / img.naturalHeight },
//     uPlaneAspect: { value: img.clientWidth / img.clientHeight },
//     uTime: { value: 0 }
//   };

//   const material = new PIXI.MeshMaterial({
//     // uniforms,
//     vertexShader: vertexShaderSrc,
//     fragmentShader: fragmentShaderSrc
//   });

//   const mesh = new PIXI.Mesh(geometry, material);

//   return mesh;
// };

// // スクロール追従
// let targetScrollY = 0; // スクロール位置
// let currentScrollY = 0; // 線形補間を適用した現在のスクロール位置
// let scrollOffset = 0; // 上記2つの差分

// // 開始と終了をなめらかに補間する関数
// const lerp = (start, end, multiplier) => {
//   return (1 - multiplier) * start + multiplier * end;
// };

// const updateScroll = () => {
//   // スクロール位置を取得
//   targetScrollY = document.documentElement.scrollTop;
//   // リープ関数でスクロール位置をなめらかに追従
//   currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

//   scrollOffset = targetScrollY - currentScrollY;
// };

// // 慣性スクロール
// const scrollArea = document.querySelector(".scrollable");
// document.body.style.height = `${scrollArea.getBoundingClientRect().height}px`;

// const imagePlaneArray = [];

// // 毎フレーム呼び出す
// const loop = () => {
//   updateScroll();

//   scrollArea.style.transform = `translate3d(0,${-currentScrollY}px,0)`;
//   for (const plane of imagePlaneArray) {
//     plane.update(scrollOffset);
//   }
//   renderer.render(scene, camera);

//   requestAnimationFrame(loop);
// };
