export default class {

    elt = {
        get container() {
            return document.querySelector('.glm-carousel-viewer');
        },
        get close() {
            return document.querySelector('.glm-carousel-viewer-close');
        },
        get picture() {
            return document.querySelector('.glm-carousel-viewer-picture');
        }
    }

    constructor({ onClose = () => {}, onShow = () => {} }) {
        this.onClose = onClose;
        this.onShow = onShow;
    }

    init() {
        this.events();
    }

    events() {
        this.elt.close?.addEventListener('click', this.close.bind(this));
    }

    close() {
        //external callback
        this.onClose();
        this.hide();
    }

    show() {
        //external callback
        this.onShow();
        this.elt.container.setAttribute('data-display', 'true');
    }

    hide() {
        this.elt.container.setAttribute('data-display', 'false');
    }

    loadPicture(src) {
        this.elt.picture.setAttribute("src", src);
    }

}
