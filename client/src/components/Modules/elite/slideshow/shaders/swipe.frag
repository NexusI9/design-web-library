uniform sampler2D u_texture0;
uniform sampler2D u_texture1;
uniform float u_time;
uniform vec2 u_resolution;

in vec2 vUv;

#define steep 3.0
#define PI 3.14159

float lerp(float a, float b, float f) 
{
    return (a * (1.0f - f)) + (b * f);
}

float parabolic(float x) {
    return sin(PI * x);
}

float EaseInOutQuint(float x)
{
  float inValue = 16.0f * x * x * x * x * x;
  float outValue = 1.0f - pow(-2.0f * x + 2.0f, 5.0f) / 2.0f;
  return step(inValue , 0.5f) * inValue + step(0.5f,outValue) * outValue;
}

vec2 deformUv(vec2 uv, float time){

    uv -= 0.5f;
    uv /= lerp(1.4f,1.0f, time);

    uv += 0.5f;

    return uv;
}


void main() {
    vec2 uv = vUv - vec2(0.5f);
    float aspect = u_resolution.y/u_resolution.x;
    uv.y *= aspect;

    float easeTime = EaseInOutQuint(u_time);

    float dynaSteep = lerp(steep, 100.0f, pow(easeTime,5.0f));
    float mask = step(1.0f + vUv.x - vUv.y/dynaSteep, 0.5f + easeTime * 1.5f);

    //textures
    vec4 tex0 = texture2D(u_texture0, vUv);
    vec4 tex1 = texture2D(u_texture1, deformUv(vUv, easeTime));

    gl_FragColor = mix(tex0, tex1, mask);
}