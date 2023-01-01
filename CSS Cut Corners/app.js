const button = document.querySelector(".button");
const borderWidth = document.querySelector("#border-width");
const edgeSize = document.querySelector("#edge-size");
const borderWidthOutput = document.querySelector(".bw output");
const edgeSizeOutput = document.querySelector(".es output");

borderWidth.addEventListener("input", () => {
  button.style.setProperty("--border-width", borderWidth.value + "em");
  borderWidthOutput.innerText = borderWidth.value + "em";
});

edgeSize.addEventListener("input", () => {
  button.style.setProperty("--edge-size", edgeSize.value + "em");
  edgeSizeOutput.innerText = edgeSize.value + "em";
});
