const words = ["mother", "grandmother", "coder", "chef", "meditator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing");
let delay = 120;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      delay = 800; // pause before deleting
    } else {
      delay = 120; // typing speed
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400; // pause before typing new word
    } else {
      delay = 60; // deleting speed
    }
  }

  setTimeout(typeEffect, delay);
}

typeEffect();
