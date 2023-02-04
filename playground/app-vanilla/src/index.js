// index.js

window.addEventListener('load', () => { window.app = new App() });

//----------------------------------------------------------------------------------------
class App {
  constructor() {
    this.ui = new Ui('body');
  }
}

//----------------------------------------------------------------------------------------
class UiElement {
  constructor(sel, parent) {
    this.el = sel instanceof HTMLElement ? sel : (parent ?? document).querySelector(sel);
    this.addEventListener = this.el.addEventListener.bind(this.el);
    this.dispatchEvent = this.el.dispatchEvent.bind(this.el);
    this.querySelector = this.el.querySelector.bind(this.el);
    this.appendChild = this.el.appendChild.bind(this.el);
  }

  static createElement(tagName, { sel, parent }) {
    const el = document.createElement(tagName);
    if (sel) { el.classList.add(...sel.split(' ')) }
    if (parent) { parent.appendChild(el) }
    return el;
  }
}

//----------------------------------------------------------------------------------------
class Ui extends UiElement {
}
