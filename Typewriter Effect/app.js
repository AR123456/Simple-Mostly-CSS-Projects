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
// this should be solved with defer in the app.js script tag
//<script src="app.js" defer></script>
document.addEventListener("DOMContentLoaded", () => {
  // loop the demo elements on the  buttons
  const demoEl = document.getElementById("demo");
  const progress = document.getElementById("progress");
  // check if a demo build progress bar text
  if (demoEl && progress) {
    // progress is a custom event
    demoEl.addEventListener("progress", (ev) => {
      progress.textContent = `Progress: ${ev.detail.percent.toFixed(1)}% (${ev.detail.current}/${ev.detail.total})`;
      //complete is a custom event
      demoEl.addEventListener("complete", () => {
        progress.textContent = "Animation complete!";
      });
    });
  }
  // update buttons
  const updateButtons = (id, state) => {
    const buttons = document.querySelectorAll(`[data-ctrl="${id}"]`);
    buttons.forEach((btn) => {
      const action = btn.dataset.action;
      let disabled = false;
      switch (action) {
        case "start":
          disabled = state.running;
          break;
        case "pause":
          disabled = !state.running || state.paused;
          break;
        case "resume":
          disabled = !state.paused;
          break;
        case "complete":
          disabled = !state.running;
          break;
        case "reset":
          disabled = state.running && !state.paused;
          break;
      }
      btn.disabled = disabled;
    });
  };

  // map typewriterStates

  document.querySelectorAll("type-writer").forEach((el) => {});

  document.addEventListener("click", () => {});
});
