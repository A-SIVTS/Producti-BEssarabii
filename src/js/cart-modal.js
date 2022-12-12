const busketBtn = document.querySelector(".header__busket");
const closeCartBtn = document.querySelectorAll(".cart__close");
const cart = document.querySelector(".cart");
busketBtn.addEventListener("click", () => {
  cart.classList.add("cart-display");
});

// closeCartBtn.addEventListener("click", () => {
//   cart.classList.remove("cart-display");
// });

closeCartBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    cart.classList.remove("cart-display");
  });
});
