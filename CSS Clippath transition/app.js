// only for demo // random nr of slices each time
const el = document.querySelector(".slice-clip-path-transition");
el.addEventListener("blur", () => {
  setTimeout(
    () =>
      el.style.setProperty("--sliceCount", Math.floor(Math.random() * 20) + 1),
    1000
  );
});
