/**
 * 
 * Extended Three Scene, allows to create a new Three JS scene based on a picture 
 * to overlay some GLSL shader on top of it
 * 
 */

import ThreeScene from '../lib/three-scene';
import {
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    Texture,
    TextureLoader,
    SRGBColorSpace,
    ShaderMaterial,
    Material,
    RepeatWrapping
} from 'three';

export default class extends ThreeScene {

    imageTexture: Texture | undefined;
    thumbnail: string | undefined;

    mesh: Mesh | undefined;
    material: Material | undefined;

    constructor(container: HTMLElement) {
        super(container);
    }

    init() {
        super.init();
        this.drawPlane();
        this.orthographicCamera();
    }

    drawPlane() {
        //set rectangle
        const plane = new PlaneGeometry(this.viewport.width, this.viewport.height);

        if (this.thumbnail) {
            this.imageTexture = this.loadTexture(this.thumbnail);
        }
        this.material = new MeshBasicMaterial({
            ...(this.imageTexture && { map: this.imageTexture })
        });

        const mesh = new Mesh(plane, this.material);
        this.mesh = mesh;
        this.scene.add(this.mesh);
    }

    setShaderMaterial(vertexShader: string, fragmentShader: string, uniforms: ShaderMaterial["uniforms"] = {}) {

        this.material = new ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader
        });

        (this.material as ShaderMaterial).uniformsNeedUpdate = true;

        if (this.mesh) this.mesh.material = this.material;
    }

    loadTexture(src: string) {
        const tempTex = new TextureLoader().load(src);
        tempTex.wrapS = RepeatWrapping; 
        tempTex.wrapT = RepeatWrapping; 
        tempTex.matrixAutoUpdate = false;
        tempTex.colorSpace = SRGBColorSpace;
        return tempTex;
    }

    render() {
        if (!this.play) return;

        if (this.camera) this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}
