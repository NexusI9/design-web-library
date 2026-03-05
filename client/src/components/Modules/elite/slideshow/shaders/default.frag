uniform sampler2D u_texture0;
uniform sampler2D u_texture1;
uniform float u_time;
uniform vec2 u_resolution;

in vec2 vUv;

float EaseInOutQuint(float x)
{
  //  x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
  float inValue = 16.0 * x * x * x * x * x;
  float outValue = 1.0 - pow(-2.0 * x + 2.0, 5.0) / 2.0;
  return step(inValue , 0.5) * inValue + step(0.5,outValue) * outValue;
}


void main() {
    vec2 uv = vUv - vec2(0.5f);
    float aspect = u_resolution.y/u_resolution.x;
    uv.y *= aspect;

    float easeTime = EaseInOutQuint(u_time);

    //textures
    vec4 tex0 = texture2D(u_texture0, vUv);
    vec4 tex1 = texture2D(u_texture1, vUv);

    gl_FragColor = mix(tex0, tex1, u_time);
}