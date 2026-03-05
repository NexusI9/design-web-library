import * as THREE from 'three';
import RoundRectangle from './roundRectangle';

export default class {

    initPosition = { x: 0, y: 0 };
    currentPosition = { x: 0, y: 0 };
    lastMovement = 0;
    ease = 0.75;
    divider = 10;
    picture;
    thumbnail;

    constructor({ element, parent, container, id, active = true, width = 0, height = 0, position = [0, 0, 0], rotation = [0, 0, 0], borderRadius = 0, borderSmooth = 8 }) {
        this.element = element; //orinial img element
        this.parent = parent; //parent Glitch gl parent 
        this.id = id; //id in list, will be used to be updated
        this.active = active;
        this.container = container;
        this.sizes = new THREE.Vector2(width, height);
        this.position = position;
        this.rotation = rotation;
        this.borderRadius = borderRadius;
        this.borderSmooth = borderSmooth;

    }


    getDimensions() {
        const { width, height, top, left } = this.element.getBoundingClientRect();
        this.sizes.set(width, height);
    }

    cover(texture, aspect) {

        var imageAspect = texture.image.width / texture.image.height;

        if (aspect < imageAspect) {
            texture.matrix.setUvTransform(0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5);
        } else {
            texture.matrix.setUvTransform(0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5);
        }

    }

    init() {


        //assign picture (full picture) and Thumbnail
        this.thumbnail = this.element.src;
        this.picture = this.element.getAttribute("data-full-picture") || this.thumbnail;

        //set CSS & Event movement
        this.initPosition.x = this.element.getBoundingClientRect().left;
        this.initPosition.y = this.element.getBoundingClientRect().top;

        //generate mesh
        this.geometry = (this.borderRadius == 0) && new THREE.PlaneGeometry(this.sizes.width, this.sizes.height) || new RoundRectangle(this.sizes.width, this.sizes.height, this.borderRadius, this.borderSmooth ).geometry;


        this.imageTexture = new THREE.TextureLoader().load(this.thumbnail, () => {
            this.cover(this.imageTexture, this.sizes.width / this.sizes.height);
        });
        this.imageTexture.matrixAutoUpdate = false;
        this.imageTexture.colorSpace = THREE.SRGBColorSpace;

        this.material = new THREE.MeshBasicMaterial({
            map: this.imageTexture,
            wireframe: false
        });

        this.material.needsUpdate = true;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.parent.add(this.mesh);

        //const box = new THREE.BoxHelper(this.mesh, 0x000000);
        //this.parent.add(box);
        //assign full picture
    }

    render() {
        if (!this.active) {
            return;
        }
        // this function is repeatidly called for each instance in the above 
    }


}
