// js file
class TypeWriter extends HTMLElement {
  // when the browser parses html <type-writer></type-writer> , we have a new TypeWriter
  // TODO why ridiculous underscore naming convention
  constructor() {
    super();
    this._gen = 0;
    this._paused = false;
    this._running = false;
    this._idx = 0;
    this._nodes = [];
  }
  connectedCallback() {
    const dir = this.getAttribute("dir") || "ltr";
    const speed = parseInt(this.getAttribute("speed")) || 100;
    const minDur = parseInt(this.getAttribute("min-duration")) || 50;
    const maxDur = parseInt(this.getAttribute("max-duration")) || 500;
    const autostart = this.getAttribute("autostart") !== "false";
    const respectMotion =
      this.getAttribute("respect-motion-preference") === "true";

    this._original = document.createDocumentFragment();
    const children = this.childNodes;
    const len = children.length;
    for (let i = 0; i < len; i++) {
      this._original.appendChild(children[i].cloneNode(true));
    }

    this.textContent = "";

    this._container = document.createElement("div");
    this._container.className = "type-writer-container";
    this._container.setAttribute("role", "region");
    this._container.setAttribute("aria-live", "polite");
    this._container.setAttribute("aria-atomic", "false");
    this._container.style.direction = dir;

    const label = this.getAttribute("aria-label");
    if (label) this._container.setAttribute("aria-label", label);

    this.appendChild(this._container);

    this._prefersReducedMotion =
      respectMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this._cfg = { speed, minDur, maxDur };

    if (autostart) this.start();
  }
  disconnectedCallback() {
    this._gen++;
    this._running = false;
    this._paused = false;
    this._nodes.length = 0;
    this._original = null;
  }
  //TODO why underscore
  _flattenNodes(node) {
    const result = [];

    const walk = (n, parent) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const text = n.textContent;
        if (!/\S/.test(text)) return;
        const normalized = text.replace(/\s+/g, " ");
        for (let i = 0; i < normalized.length; i++) {
          result.push({ type: "char", char: normalized[i], parent });
        }
      } else if (n.nodeType === Node.ELEMENT_NODE) {
        const clone = n.cloneNode(false);
        result.push({ type: "open", node: clone, parent });
        const children = n.childNodes;
        const len = children.length;
        for (let i = 0; i < len; i++) {
          walk(children[i], clone);
        }
        result.push({ type: "close", node: clone, parent });
      }
    };

    const children = node.childNodes;
    const len = children.length;
    for (let i = 0; i < len; i++) {
      walk(children[i], this._container);
    }
    return result;
  }
  async start() {
    if (!this._original || !this._container) return;
    if (this._running) return;
  }
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
  const typewriterStates = new Map();
  document.querySelectorAll("type-writer").forEach((el) => {
    const id = el.id;
    if (!id) return;

    const autostart = el.getAttribute("autostart") !== "false";
    const state = { running: autostart, paused: false };
    typewriterStates.set(id, state);

    el.addEventListener("start", () => {
      state.running = true;
      state.paused = false;
      updateButtons(id, state);
    });

    el.addEventListener("pause", () => {
      state.paused = true;
      updateButtons(id, state);
    });

    el.addEventListener("resume", () => {
      state.paused = false;
      updateButtons(id, state);
    });

    el.addEventListener("complete", () => {
      state.running = false;
      state.paused = false;
      updateButtons(id, state);
    });

    el.addEventListener("reset", () => {
      state.running = false;
      state.paused = false;
      updateButtons(id, state);
    });

    queueMicrotask(() => updateButtons(id, state));
  });
  //
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-ctrl]");
    if (!btn || btn.disabled) return;

    const id = btn.dataset.ctrl;
    const action = btn.dataset.action;
    const el = document.getElementById(id);
    if (!el) return;

    if (action === "setText") {
      const texts = [
        "<p>The <strong>TypeWriter</strong> component dynamically replaces content and restarts animation, maintaining full HTML structure.</p>",
      ];
      el.setText(texts[0]);
      el.start();
    } else {
      el[action]?.();
    }
  });
});
