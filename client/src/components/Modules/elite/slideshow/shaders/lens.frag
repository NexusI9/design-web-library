uniform sampler2D u_texture0;
uniform sampler2D u_texture1;
uniform float u_time;
uniform vec2 u_resolution;

in vec2 vUv;

#define innerSpread 0.01
#define outerSpread 0.01
#define PI 3.1415926538

float EaseInOutQuint(float x)
{
  //  x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
  float inValue = 16.0 * x * x * x * x * x;
  float outValue = 1.0 - pow(-2.0 * x + 2.0, 5.0) / 2.0;
  return step(inValue , 0.5) * inValue + step(0.5,outValue) * outValue;
}

vec2 distortUV(vec2 uv, float time){
    
    float k1 = 1.2f;
    float k2 = 1.0f;
    float k3 = -3.2f;


    vec2 distort = uv - vec2(0.5f);
    distort.y *= u_resolution.y/u_resolution.x;     
    float len = length(distort);

    distort = 
            uv * k1 *
            + uv * len * k2
            + uv * 2.0f * len * k3;

    float newTime =  abs(1.0f - time); //invert;

    return mix(uv, distort, newTime);
}

float circle(in vec2 uv, in float rad, in float inSpread, in float outSpread){
    return 1. - smoothstep(
        rad - (rad * inSpread),
        rad + (rad * outSpread),
        dot(uv, uv) * 2.0f
    );
}

void main() {
    vec2 uv = vUv - vec2(0.5f);
    float aspect = u_resolution.y/u_resolution.x;
    uv.y *= aspect;

    float easeTime = EaseInOutQuint(u_time);
    
    //mask
    float transitionMask = circle(uv, easeTime, innerSpread, outerSpread);
    float deformMask = mix(circle(uv, easeTime, 0.6, 0.3), 1.0f, u_time);

    //textures
    vec4 tex0 = texture2D(u_texture0, vUv);
    vec4 tex1 = texture2D(u_texture1, distortUV(vUv, deformMask));

    gl_FragColor = mix(tex0, tex1, transitionMask);
}