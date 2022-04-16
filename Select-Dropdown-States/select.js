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

// this is outside the constructor so that it is not exposed
// it takes in the class
function setupCustomElement(select) {
  // first adding CSS classes to style
  // appending custom-select to each so that it doesent interfear with
  // any other css on the page
  select.customElement.classList.add("custom-select-container");
  select.labelElement.classList.add("custom-select-value");
  // need the getter get selectedOption above for this to work
  select.labelElement.innerText = select.selectedOption.value;
  // add this to the custom element ( so it is in the container we created)
  select.customElement.append(select.labelElement);
  // do the same for options
  select.optionsCustomElement.classList.add("custom-select-options");
  // append the ___ to the ___
  select.options.forEach((option) => {
    /// add as a li in the ul created above
    const optionElement = document.createElement("li");
    optionElement.classList.add("custom-selected-option");
    // if it is selected add selected class
    optionElement.classList.toggle("selected", option.selected);
    optionElement.innerText = option.label;
    // get access to the value too
    optionElement.dataset.value = option.value;
  });
  select.customElement.append(select.optionsCustomElement);
  // then add some JS for functionality
}
// dont want this exposed to end user so define this funciton here
function getFormattedOptions(optionElements) {
  // this is a node list so put it into an array
  return [...optionElements].map((optionElement) => {
    // return each one as an object
    return {
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement,
    };
  });
}
// https://www.youtube.com/watch?v=Fc-oyl31mRI
