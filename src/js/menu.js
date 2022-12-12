const menuBtn = document.querySelector(".menu__gumg");
const menuList = document.querySelector(".menu-list");
const menuCloseBtn = document.querySelector(".menu__close");

menuBtn.addEventListener("click", () => {
  menuList.classList.add("display");
});

menuCloseBtn.addEventListener("click", () => {
  menuList.classList.remove("display");
});
