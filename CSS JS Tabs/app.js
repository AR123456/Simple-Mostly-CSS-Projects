function openTab(evt, tab) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("content-inner");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].getElementsByClassName.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";
}
//Horizontal scroll for the tabs on mousewheel. If tabs are longer than the content section, there's a scroll bar but it's hidden to retain the design.
if (window.innerWidth > 800) {
  const scrollContainter = document.querySelector(".tabs");
  scrollContainter.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainter.scrollLeft += evt.deltaY;
  });
}
