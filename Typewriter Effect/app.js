// js file
class TypeWriter extends HTMLElement {
  connectedCallback() {
    console.log("in the html");
  }
}
customElements.define("type-writer", TypeWriter);
