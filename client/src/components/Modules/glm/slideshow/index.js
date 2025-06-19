import Scene from './scene.ts';

window.onload = () => document.querySelectorAll('.glm-slideshow').forEach(container => new Scene(container).init() );
