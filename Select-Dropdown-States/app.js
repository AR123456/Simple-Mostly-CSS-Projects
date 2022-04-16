import Select from "./select.js";
// added a custom data attribute to the select div in the html to select all
const selectElements = document.querySelectorAll("[data-custom]");

// instansiate to use in my project

selectElements.forEach((selectElement) => {
  console.log(new Select(selectElement));
});
