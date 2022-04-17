// this is like a library I would import
// export this class I am creating with the constructor in it

export default class Select {
  // pass in any element as  Element
  constructor(element) {
    this.element = element;
    // getting all the avalible options from select and putting them into a function

    this.options = getFormattedOptions(element.querySelectorAll("option"));
    // get the wrapper that goes around the custom element code
    this.customElement = document.createElement("div");
    this.labelElement = document.createElement("span");
    this.optionsCustomElement = document.createElement("ul");
    // here "this" is the entire class
    setupCustomElement(this);
    // this addes our custom stuff to the page
    element.after(this.customElement);
  }

  get selectedOption() {
    return this.options.find((option) => option.selected);
  }
}

function setupCustomElement(select) {
  select.customElement.classList.add("custom-select-container");
  select.labelElement.classList.add("custom-select-value");
  select.labelElement.innerText = select.selectedOption.label;
  select.customElement.append(select.labelElement);
  select.optionsCustomElement.classList.add("custom-select-options");
  select.options.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("custom-selected-option");
    optionElement.classList.toggle("selected", option.selected);
    optionElement.innerText = option.label;
    optionElement.dataset.value = option.value;
    // this is getting the ul to appear
    select.optionsCustomElement.append(optionElement);
  });
  select.customElement.append(select.optionsCustomElement);
}

function getFormattedOptions(optionElements) {
  return [...optionElements].map((optionElement) => {
    return {
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement,
    };
  });
}
// https://www.youtube.com/watch?v=Fc-oyl31mRI
