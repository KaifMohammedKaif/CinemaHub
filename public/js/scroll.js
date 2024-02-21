let scrollContainer = document.querySelectorAll(".cus-card-container");
scrollContainer.forEach((element) => {
  element.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    element.scrollLeft += evt.deltaY;
  });
});
