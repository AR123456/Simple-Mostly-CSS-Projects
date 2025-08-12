const words = ["mother", "grandmother", "coder", "chef", "meditator"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
let speed = 100;

function type() {
  currentWord = words[i];
  if (!isDeleting) {
    document.getElementById("typewriter").textContent = currentWord.substring(
      0,
      j--
    );
    if (j < 0) {
      i = (i + 1) % words.length;
    }
  } else {
    document.getElementById("typewriter").textContent = currentWord.substring(
      0,
      j++
    );
    speed = 120;
    if (j > currentWord.length) {
      isDeleting = true;
      speed = 800;
    }
  }
  setTimeout(type, speed);
}
type();
