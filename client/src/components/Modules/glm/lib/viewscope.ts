/*
ScopeView
Detect if an elements is entering or exiting the viewport and provides callback
Nassim El Khantour 2022
*/

interface IViewScope {
  container: HTMLElement;
  onEnter: () => void;
  onExit: () => void;
}


export default class {

  container: HTMLElement;
  state:boolean;
  onEnter: () => void;
  onExit: () => void;
  box: DOMRect;

  constructor({ container, onEnter = () => { }, onExit = () => { } }: IViewScope) {
    this.container = container;
    this.onEnter = onEnter;
    this.onExit = onExit;
    this.box = this.containerBox;

    this.state = false;
  }

  get containerBox() {
    return this.container.getBoundingClientRect();
  }

  init() {
    if (!this.container) {
      return console.warn('[ViewScope] no container defined');
    }
    this.check();

    window.addEventListener('scroll', this.check.bind(this));

    window.addEventListener('resize', () => this.box = this.containerBox)
  }

  check() {

    const scrollPos = window.pageYOffset;
    this.box = this.containerBox;
    //console.log(this.box);
    if (this.box.top <= window.innerHeight &&
      this.box.bottom >= 0
    ) {

      if (!this.state) { this.onEnter(); }

      return this.state = true;
    } else {
      if (this.state) {
        this.onExit();
      }
      return this.state = false;
    }
  }


}