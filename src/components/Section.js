export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    items.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }
}
