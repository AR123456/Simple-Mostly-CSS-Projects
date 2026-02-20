// this is chat GPT simple version with no custom events
// it works kind of but the buttons do not work
class TypeWriter extends HTMLElement {
  constructor() {
    super();
    this._text = "";
    this._speed = 100;
  }

  connectedCallback() {
    this._text = this.textContent.trim();
    this._speed = parseInt(this.getAttribute("speed")) || 100;

    this.textContent = "";
    this._type();
  }

  _type() {
    let i = 0;

    const interval = setInterval(() => {
      this.textContent += this._text[i];
      i++;

      if (i >= this._text.length) {
        clearInterval(interval);
      }
    }, this._speed);
  }
}

customElements.define("type-writer", TypeWriter);
