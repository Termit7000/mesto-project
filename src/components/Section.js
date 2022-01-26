export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(clearing = true) {
    if (clearing) {
      this.clear();
    }

    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(itemElement) {
    this._container.prepend(itemElement);
  }
}
