const navLinks = document.querySelectorAll("nav a");
// console.log(navLinks[0].textContent);
const navTextCopy = document.getElementById("nav_big_text");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("mouseover", function () {
    let navLinkText = this.textContent;
    navTextCopy.textContent = navLinkText;
    navTextCopy.classList.add("big_text_active");
  });
  navLinks[i].addEventListener("mouseout", function () {
    let navLinkText = this.textContent;
    navTextCopy.textContent = navLinkText;
    navTextCopy.classList.remove("big_text_active");
  });
}
// pull in this year as the copy right year
function copyrightYear() {
  const yearEl = document.querySelector(".year");
  const date = new Date();
  yearEl.textContent = date.getFullYear();
}

copyrightYear();
