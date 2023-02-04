// index.js

window.addEventListener('load', () => { window.app = new App() });

//----------------------------------------------------------------------------------------
class App {
  constructor() {
    this.ui = new Ui(document.body);
  }
}

//----------------------------------------------------------------------------------------
class Ui {
  constructor(el) {
    this.legend = new LegendList(
      el.querySelector('.legend') || 
      el.appendChild(LegendList.createElement({ className: 'legend' }))
    );
  }

  render({ legend }) {
    if (legend) { this.legend.render(legend) }
  }
}

//----------------------------------------------------------------------------------------
class LegendList {
  static createElement({ className }) {
    const el = document.createElement('ul');
    el.classList.add(...className.split(' ').filter(Boolean).concat('legend', 'list'));
    return el;
  }

  constructor(el) { this.el = el }

  render({ items }) {
    this.el.querySelectorAll('.item').forEach(el => el.remove());
    (items || []).forEach(item => {
      new LegendItem(this.el.appendChild(LegendItem.createElement()))
        .render(item)
    });
  }
}

class LegendItem {
  static createElement() {
    const el = document.createElement('li');
    el.classList.add('item');
    el.appendChild(document.createElement('span'));
    return el;
  }

  constructor(el) { this.el = el }

  render({ color, text }) {
    if (color) { this.el.style.color = color }
    if (text) { this.el.childNodes[0].textContent = text }
  }
}
