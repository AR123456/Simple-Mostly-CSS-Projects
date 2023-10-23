const seeRecipe = document.querySelector(".see-recipe");
const recipe = document.querySelector(".recipe-container");

// seeRecipe.addEventListener("click", (e) => {
//   console.log("clicked");
// });
// or
seeRecipe.onclick = (e) => {
  console.log("also clicked ");
  // on  .recipe-container  change visibility to visable
  //    look at toggle
  recipe.style.visibility = "visible";
  recipe.style.opacity = "1";
  recipe.style.transition = "visibility 0s linear 0s, opacity 300ms";
};
