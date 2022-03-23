const vertexShaderSrc: string = `
  precision mediump float;
  uniform float time;

  attribute vec2 aVertexPosition;
  attribute vec2 aUvs;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;

  varying vec2 vUvs;

  void main() {

    // 横方向
    float amp = 0.03; // 振幅（の役割） 大きくすると波が大きくなる
    float freq = 0.01 * uTime; // 振動数（の役割） 大きくすると波が細かくなる
  
    // 縦方向
    // float tension = -0.001 * uTime; // 上下の張り具合

    vUvs = aUvs;
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

  }
`;

export default vertexShaderSrc;
