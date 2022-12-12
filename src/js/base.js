const $ = {};
window.$ = $;

const shopInfo = document.querySelector(".shop__info-title");
const shopInfoBg = document.querySelector(".shop__info-content");
const shopInfoContent = document.querySelector(".shop__info-text");

if (!shopInfo) {
  console.log("noo");
} else {
  shopInfo.addEventListener("click", () => {
    shopInfoBg.classList.add("display");
    shopInfoContent.classList.add("display");
  });

  shopInfoBg.addEventListener("click", () => {
    shopInfoContent.classList.remove("display");
    shopInfoBg.classList.remove("display");
  });
}
