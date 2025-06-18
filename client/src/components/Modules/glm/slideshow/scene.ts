import ThreePlanarScene from '../lib/three-planar-scene';
import { configFromDataSet } from '../lib/utils';
import { ISceneConfig } from '../types/Scene';
import './styles/index.scss';

//Vertex Shader
import VertexShader from './shaders/default.vert';

//Fragment Shader
import DefaultFragShader from './shaders/default.frag';
import LensFragShader from './shaders/lens.frag';
import StoreFragShader from './shaders/store.frag';
import SwipeFragShader from './shaders/swipe.frag';

import { ShaderMaterial, Texture, Vector2 } from 'three';
import { Timer } from '../lib/timer';


const shaderMap = {
    lens: LensFragShader,
    store: StoreFragShader,
    swipe: SwipeFragShader
};

export interface ISlideshowConfig {
    transitionType: 'slice' | 'hexagon' | 'wave' | 'store',
    transitionDuration: number,
    mode: "default" | "automatic" | "manual",
    slideDuration: number
}

export default class extends ThreePlanarScene {

    config: ISceneConfig = {
        transitionType: 'wave',
        transitionDuration: 200,
        mode: 'default',
        slideDuration: 500
    };

    //Textures
    images?: NodeListOf<Element>;
    sources: string[] = [];
    textures: Texture[] = [];

    //Transition
    currentIndex: number = 0;
    timer?: Timer;

    constructor(container: HTMLElement) {
        super(container);
        this.config = configFromDataSet(this.config, container.dataset);
    }

    init() {
        super.init();

        //retrieve pictures
        this.images = this.container.querySelectorAll(".glm-slideshow-img");
        //remove pictures and replace by src only, store Texture at the same time
        this.images.forEach((img, i) => {
            const src = String(img.getAttribute("src"));
            this.sources[i] = src;
            this.textures[i] = this.loadTexture(src);
            img.remove();
        });

        //set initial thumbnail
        this.thumbnail = String(this.sources[0]);
        this.drawPlane();
        this.orthographicCamera();

        //setup material
        this.setShaderMaterial(VertexShader, shaderMap[this.config.transitionType as keyof typeof shaderMap] || DefaultFragShader, {
            u_time: { value: 0.0 },
            u_texture0: { value: this.textures[this.currentIndex] },
            u_texture1: { value: this.textures[(this.currentIndex + 1) % this.textures.length] },
            u_resolution: { value: new Vector2(this.viewport.width, this.viewport.height) }
        });
        this.updateTextureUniforms();

        //set play mode
        if (this.config.mode == 'default' || this.config.mode == 'automatic') {
            this.autoplay();
        }



    }

    updateTimeUniform(time: number) {

        if (this.material && (this.material as ShaderMaterial).uniforms) {
            (this.material as ShaderMaterial).uniforms.u_time.value = time;
        }
    }

    updateTextureUniforms() {
        if (this.material && (this.material as ShaderMaterial).uniforms) {
            (this.material as ShaderMaterial).uniforms.u_time.value = 0.0;
            (this.material as ShaderMaterial).uniforms.u_texture0.value = this.textures[this.currentIndex];
            (this.material as ShaderMaterial).uniforms.u_texture1.value = this.textures[(this.currentIndex + 1) % this.textures.length];
        }
    }

    autoplay() {
        //set timer
        this.timer = new Timer({
            duration: parseInt(this.config.transitionDuration),
            delay: parseInt(this.config.slideDuration),
            onUpdate: ({ completion }) => {
                //update u_time uniform
                this.updateTimeUniform(completion);
            },
            onComplete: () => {
                //switch currentIndex + update texture uniforms + reset time uniform
                this.nextSlide();
                this.updateTextureUniforms();
            },
            loop: true,
        });
        this.timer.start();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % (this.sources.length);
    }

    previousSlide() {

    }

    goToSlide(index: number) {

    }

    render() {
        if (!this.play) return;

        if (this.camera) this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}
