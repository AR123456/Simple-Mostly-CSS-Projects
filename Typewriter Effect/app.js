// js file
class TypeWriter extends HTMLElement {
  // when the browser parses html <type-writer></type-writer> , we have a new TypeWriter
  constructor() {
    super();
    this._gen = 0;
    this._paused = false;
    this._running = false;
    this._idx = 0;
    this._nodes = [];
  }
  connectedCallback() {}
  disconnectedCallback() {}
  _flattenNodes(node) {}
  async start() {}
  pause() {}
  resume() {}
  complete() {}
  reset() {}
  setText(html) {}
}
customElements.define("type-writer", TypeWriter);

// document.addEventListener(eventtype,callbackFunction);
document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
});
