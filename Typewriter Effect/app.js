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
// customElements.define(tagName, class, options);
customElements.define("type-writer", TypeWriter);

// document.addEventListener(eventtype,callbackFunction);
document.addEventListener("DOMContentLoaded", () => {
  // loop the demo elements on the  buttons
  const demoEl = document.getElementById("demo");
  const progress = document.getElementById("progress");
  // check if a demo build progress bar text
  if (demoEl && progress) {
    demoEl.addEventListener("progress", (ev) => {
      progress.textContent = `Progress: ${ev.detail.percent.toFixed(1)}% (${ev.detail.current}/${ev.detail.total})`;
      //
    });
  }
  // update buttons

  // map typewriterStates

  document.querySelectorAll("type-writer").forEach((el) => {});

  document.addEventListener("click", () => {});
});
