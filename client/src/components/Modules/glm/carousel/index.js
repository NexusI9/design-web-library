import Scene from './scene';

window.onload = () => document.querySelectorAll('.glm-carousel-wrapper').forEach(container => new Scene(container).init());

