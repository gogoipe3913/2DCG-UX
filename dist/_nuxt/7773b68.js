(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{229:function(e,n,t){"use strict";t.r(n);t(53),t(16),t(41),t(54),t(34),t(26),t(33),t(55),t(56),t(35);var r=t(234),o=t(129),c=t(130),l=(t(66),t(231));function f(e,n){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"==typeof e)return v(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(e,n)}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==t.return||t.return()}finally{if(l)throw o}}}}function v(e,n){(null==n||n>e.length)&&(n=e.length);for(var i=0,t=new Array(n);i<n;i++)t[i]=e[i];return t}n.default=function(element){var e=document.getElementById("webgl-canvas"),n={w:window.innerWidth,h:window.innerHeight},t=new l.g({canvas:e});t.setPixelRatio(window.devicePixelRatio),t.setSize(n.w,n.h);var v=Math.PI/180*30,m=n.h/2/Math.tan(v),d=new l.b(60,n.w/n.h,.1,1e3);d.position.z=m;var h=new l.d,w=new l.f,y=function(){function e(n,img){Object(o.a)(this,e),this.refImage=img,this.mesh=n}return Object(c.a)(e,[{key:"setParams",value:function(){var rect=this.refImage.getBoundingClientRect();this.mesh.scale.x=rect.width,this.mesh.scale.y=rect.height;var e=rect.left-n.w/2+rect.width/2,t=-rect.top+n.h/2-rect.height/2;this.mesh.position.set(e,t,this.mesh.position.z)}},{key:"update",value:function(e){this.setParams(),this.mesh.material.uniforms.uTime.value=e}}]),e}(),x=function(img){var e={uTexture:{value:w.load(img.src)},uImageAspect:{value:img.naturalWidth/img.naturalHeight},uPlaneAspect:{value:img.clientWidth/img.clientHeight},uTime:{value:0}},n=new l.c(1,1,100,100),t=new l.e({uniforms:e,vertexShader:"\n      varying vec2 vUv;\n      uniform float uTime;\n  \n      float PI = 3.1415926535897932384626433832795;\n  \n      void main(){\n        vUv = uv;\n        vec3 pos = position;\n  \n        // 横方向\n        float amp = 0.03; // 振幅（の役割） 大きくすると波が大きくなる\n        float freq = 0.01 * uTime; // 振動数（の役割） 大きくすると波が細かくなる\n  \n        // 縦方向\n        float tension = -0.001 * uTime; // 上下の張り具合\n  \n        pos.x = pos.x + sin(pos.y * PI  * freq) * amp;\n        pos.y = pos.y + (cos(pos.x * PI) * tension);\n  \n        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n      }\n    ",fragmentShader:"\n      varying vec2 vUv;\n      uniform sampler2D uTexture;\n      uniform float uImageAspect;\n      uniform float uPlaneAspect;\n      uniform float uTime;\n  \n      void main(){\n        // 画像のアスペクトとプレーンオブジェクトのアスペクトを比較し、短い方に合わせる\n        vec2 ratio = vec2(\n          min(uPlaneAspect / uImageAspect, 1.0),\n          min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)\n        );\n  \n        // 計算結果を用いてテクスチャを中央に配置\n        vec2 fixedUv = vec2(\n          (vUv.x - 0.5) * ratio.x + 0.5,\n          (vUv.y - 0.5) * ratio.y + 0.5\n        );\n  \n        // RGBシフト\n        vec2 offset = vec2(0.0, uTime * 0.0005);\n        float r = texture2D(uTexture, fixedUv + offset).r;\n        float g = texture2D(uTexture, fixedUv + offset * 0.5).g;\n        float b = texture2D(uTexture, fixedUv).b;\n        vec3 texture = vec3(r, g, b);\n  \n        gl_FragColor = vec4(texture, 1.0);\n      }\n    "});return new l.a(n,t)},P=0,A=0,T=0,I=document.querySelector(".scrollable");document.body.style.height="".concat(I.getBoundingClientRect().height,"px");var S=[],U=function e(){var n;P=document.documentElement.scrollTop,T=P-(A=(1-(n=.1))*A+n*P),I.style.transform="translate3d(0,".concat(-A,"px,0)");var r,o=f(S);try{for(o.s();!(r=o.n()).done;){r.value.update(T)}}catch(e){o.e(e)}finally{o.f()}t.render(h,d),requestAnimationFrame(e)},j=0,M=function(){var e=window.innerWidth,r=window.innerHeight;n.w=e,n.h=r,t.setPixelRatio(window.devicePixelRatio),t.setSize(e,r),d.aspect=e/r,d.updateProjectionMatrix();var o=Math.PI/180*30,c=n.h/2/Math.tan(o);d.position.z=c};window.addEventListener("load",(function(){var e,n=f(Object(r.a)(document.querySelectorAll("img")));try{for(n.s();!(e=n.n()).done;){var img=e.value,t=x(img);h.add(t);var o=new y(t,img);o.setParams(),S.push(o)}}catch(e){n.e(e)}finally{n.f()}U()})),window.addEventListener("resize",(function(){j&&clearTimeout(j),j=setTimeout(M,200)}))}}}]);