// this is like a library I would import
// export this class I am creating with the constructor in it

export default class Select {
  // pass in any element as  Element
  constructor(element) {
    this.element = element;
    // get the wrapper that goes around the custom element code
    this.customElement = document.createElement("div");
    this.labelElement = document.createElement("span");
    this.optionsCustomElement = document.createElement("ul");
    // here "this" is the entire class
    setupCustomElement(this);
    // this addes our custom stuff to the page
    element.after(this.customElement);
  }
}
// this is outside the constructor so that it is not exposed
// it takes in the class
function setupCustomElement(select) {
  // first adding CSS classes to style
  // appending custom-select to each so that it doesent interfear with
  // any other css on the page
  select.customElement.classList.add("custom-select-container");
  select.labelElement.classList.add("custom-select-value");
  // add this to the custom element ( so it is in the container we created)
  select.customElement.append(select.labelElement);
  // do the same for options
  select.optionsCustomElement.classList.add("custom-select-options");
  select.customElement.append(select.optionsCustomElement);
  // then add some JS for functionality
}
