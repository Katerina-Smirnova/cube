precision mediump float;
uniform float uTime;

varying vec2 vUv;
void main() {
    vec3 color1 = vec3(1.0, 0.0, 0.0); // Красный
    vec3 color2 = vec3(0.0, 0.0, 1.0); // Синий
    vec3 color3 = vec3(0.0, 1.0, 0.0); // Зеленый

    float mixFactor = sin(uTime * 0.3) * 0.3 + 0.3;

    vec3 mixedColor = mix(color1, color2, mixFactor);

    float gradient = vUv.x;
    vec3 finalColor = mix(vec3(0.0), mixedColor, gradient);

    gl_FragColor = vec4(finalColor, 1.0);
}
