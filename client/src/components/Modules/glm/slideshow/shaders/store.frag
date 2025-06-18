uniform sampler2D u_texture0;
uniform sampler2D u_texture1;
uniform float u_time;
uniform vec2 u_resolution;

in vec2 vUv;

#define innerSpread 0.01
#define outerSpread 0.01

#define PI 3.1415926538

#define division 20.0
#define degree 15.0

float EaseInOutQuint(float x)
{
  //  x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
  float inValue = 16.0 * x * x * x * x * x;
  float outValue = 1.0 - pow(-2.0 * x + 2.0, 5.0) / 2.0;
  return step(inValue , 0.5) * inValue + step(0.5,outValue) * outValue;
}


vec2 distortUV(vec2 uv, float time, bool inverted){
    
    if(inverted){ time = abs(1.0f - time); }

    float width = 1.0f/division;
    float n = floor(uv.x/width);
    float xOffset = width * n + (width / 2.0f);

    //shift uv to offset X
    uv -= vec2(xOffset, 0.5f);

    //skew image around image center
    uv *= mat2(1.0f, 0.0f, -2.0f * time, 1.0f);

    //put uv back to initial after transformation
    uv += vec2(xOffset, 0.5f);
    return uv;
}


void main() {

    vec2 uv = vUv - vec2(0.5f);
    float aspect = u_resolution.y/u_resolution.x;
    uv.y *= aspect;

    float easeTime = EaseInOutQuint(u_time);

    //textures
    vec4 tex0 = texture2D(u_texture0, distortUV(vUv, easeTime, false));
    vec4 tex1 = texture2D(u_texture1, distortUV(vUv, easeTime, true));

    gl_FragColor = mix(tex0, tex1, easeTime);
}