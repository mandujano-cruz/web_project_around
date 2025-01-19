class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer () {
    this._container.innerHTML = "";
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem (element) {
    this._container.append(element);
  }
}