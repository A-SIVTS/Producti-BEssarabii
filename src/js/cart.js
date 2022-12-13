import { shopItems } from "./data.js";
import { sendMessageWithTg } from "./tg.js";
import { tabsFilter } from "./tabs.js";

addEventListener("DOMContentLoaded", () => {
  //   const showModalDelivery = () => {
  //     let key = localStorage.getItem("exitModal");
  //     const modal = $.modal({
  //       title:
  //         "Доставка осуществляется по всей Украине каждую пятницу и субботу.",
  //       href: "#",
  //       btnText: "не показывать больше",
  //     });
  //     function showModal() {
  //       modal.open();
  //       localStorage.setItem("exitModal", 1);
  //     }

  //     if (!key) {
  //       showModal();
  //     }

  //     const closeBtn = document.querySelector("#modalCloseBtn");
  //     closeBtn.addEventListener("click", () => {
  //       modal.close();
  //     });
  //   };

  //   showModalDelivery();

  const cartBtn = document.querySelector(".header__busket");
  const btnOpenOrdering = document.querySelector(".cart__btn");
  const cartProductsList = document.querySelector(".cart__catalog-prod");
  const cart = document.querySelector(".cart");
  const cartQuantity = document.querySelector(".header__busket-quantity");
  const fullPrce = document.querySelector(".cart__fullprice");
  const productsBtn = document.querySelectorAll(".product__btn");
  const cartNone = document.querySelector(".cart__none");
  const cartOrdering = document.querySelector(".cart__ordering-body ");
  let price = 0;
  const shopBody = document.querySelector(".shop__catalog");

  /*----------------------------------------------*/
  //ORDERING!
  const modalOrdering = document.querySelector(".ordering");
  const form = document.querySelector(".ordering__form");
  const formBtn = form.querySelector(".ordering__btn");
  const orderingWindow = document.querySelector(".window");
  const displayListOrder = orderingWindow.querySelector(
    ".window__open-content"
  );
  const fullPriceOrder = orderingWindow.querySelector(".ordering__fullprice");
  const productsBodyOrder = orderingWindow.querySelector(
    ".ordering__products-body"
  );
  const productsOrderList = orderingWindow.querySelector(
    ".ordering__products-list"
  );

  let productArray = [];

  const s_modal = $.modal({
    title: "Дані успішно відправлені! Скоро з вами зв'яжеться наш менеджер",
    btnText: "На головну",
    href: "/",
  });

  /*-------------------------------------------------*/

  const showCartDetails = () => {
    const supportLink = "https://t.me/sivts_company";
    let lenght =
      cartProductsList.querySelector(".simplebar-content").children.length;
    console.log(lenght);

    if (lenght > 0) {
      console.log(typeof lenght);

      cartNone.classList.remove("display");
      cartOrdering.classList.add("display");
    }
    if (lenght < 0) {
      cartNone.classList.add("display");
      cartOrdering.classList.remove("display");
    }
    if (lenght == 0) {
      cartNone.classList.add("display");
      cartOrdering.classList.remove("display");
    }
  };

  /*-------------------------------------------------*/

  const generateShopItems = (img, title, price, id, link, kategory) => {
    return `
		<a href="${link}" class="shop__item box ${kategory}" id="${id}">
			<div class="shop__item-content">
				<img src="${img}" alt="" class="shop__item-img">
			</div>
			<div class="shop__item-body">
				<h2 class="shop__item-text text-xl">${title}</h2>
				<p class="shop__item-price text-xl">${price}</p>
			</div>
		</a>
		`;
  };

  /*-------------------------------------------------*/

  const linkHost = "http://localhost:3002/shop.html";
  const linkPublik = "https://producti-bessarabii.com.ua/shop.html";

  if (window.location.href === linkPublik) {
    shopItems.forEach((product) => {
      const id = product.id;
      const title = product.title;
      const price = product.price;
      const img = product.img;
      const link = product.link;
      const kategory = product.kategory;

      shopBody.insertAdjacentHTML(
        "afterbegin",
        generateShopItems(img, title, price, id, link, kategory)
      );
    });
  }

  tabsFilter();

  /*-------------------------------------------------*/

  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, "");
  };

  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1");
  };

  const plusFullPrice = (currentPrice) => {
    return (price += currentPrice);
  };
  const minusFullPrice = (currentPrice) => {
    return (price -= currentPrice);
  };

  /*-------------------------------------------------*/

  const printQuantity = () => {
    let lenght =
      cartProductsList.querySelector(".simplebar-content").children.length;
    cartQuantity.textContent = `(${lenght})`;
  };

  const printFullPrice = () => {
    fullPrce.textContent = `${normalPrice(price)} ₴`;
  };

  /*-------------------------------------------------*/

  function addCartProductsToOrder(img, title, price) {
    return `
	 <li class="ordering__product">
		 <img src="${img}" alt="">
		<div class="ordering__product-content">
			<p class="ordering__product-title">${title}</p>
			<p class="ordering__product-weight">вага уточнюється з менеджером</p>
		</div>
	 	<p class="ordering__product-price">${price} ₴</p>
 	</li>
	`;
  }

  function generateCartProduct(img, title, price, id, weight) {
    return `
  <li class="cart__catalog-item">
  		<article class="cart-content__product cart-product" id="${id}">
	  		<img src="${img}" alt="" class="cart-product__img">
	  		<div class="cart-product__text">
		  		<h3 class="cart-product__title text-xl">${title}</h3>
				<div class="cart-product__details">
					<p class="cart-product__weight text-xl"><span>Вес</span>уточнюється з менеджером</p>
				</div>
	  		</div>
			<div class='cart-product__footer'>
				<button class="cart-product__delete text-xl">видалити</button>
				<span class="cart-product__price text-xl">${price} ₴</span>
			</div>
	  		
  		</article>
	</li>
	`;
  }

  // delete product from cart

  const deleteProducts = (productParent) => {
    let id = productParent.querySelector(".cart-product").id;
    const product = document.querySelector(".product");
    const productId = product.id;

    if (productId === id) {
      product.querySelector(".product__btn").disabled = false;
    }
    let currentPrice = parseInt(
      priceWithoutSpaces(
        productParent.querySelector(".cart-product__price").textContent
      )
    );
    minusFullPrice(currentPrice);
    printFullPrice();
    productParent.remove();
    printQuantity();
    showCartDetails();

    localStorage.removeItem(id);
  };

  const showSaveProducts = (index) => {
    const saveArrayString = localStorage.getItem(index);
    const saveArray = JSON.parse(saveArrayString);
    console.log(saveArray);
    const title = saveArray[0];
    const img = saveArray[1];
    const price = saveArray[2];
    const id = saveArray[3];
    cartProductsList
      .querySelector(".simplebar-content")
      .insertAdjacentHTML(
        "afterbegin",
        generateCartProduct(img, title, price, id)
      );
    plusFullPrice(price);
    printFullPrice();
    printQuantity();
  };

  if (localStorage.getItem("1")) {
    showSaveProducts("1");
  }
  if (localStorage.getItem("2")) {
    showSaveProducts("2");
  }
  if (localStorage.getItem("3")) {
    showSaveProducts("3");
  }
  if (localStorage.getItem("4")) {
    showSaveProducts("4");
  }
  if (localStorage.getItem("5")) {
    showSaveProducts("5");
  }

  if (localStorage.getItem("6")) {
    showSaveProducts("6");
  }

  if (localStorage.getItem("7")) {
    showSaveProducts("7");
  }
  if (localStorage.getItem("8")) {
    showSaveProducts("8");
  }
  if (localStorage.getItem("9")) {
    showSaveProducts("9");
  }
  if (localStorage.getItem("10")) {
    showSaveProducts("10");
  } else {
    console.log("none");
  }

  showCartDetails();

  productsBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      let id = el.closest(".product").getAttribute("id");
      let self = e.currentTarget;
      let parent = self.closest(".product");
      console.log(id);

      let img = parent.querySelector(".product__img").getAttribute("src");
      console.log(img);

      let title = parent.querySelector(".product__title").textContent;
      let priceString = parent.querySelector(".product__price").textContent;
      let priceNumber = parseInt(
        priceWithoutSpaces(parent.querySelector(".product__price").textContent)
      );

      plusFullPrice(priceNumber);
      printFullPrice();
      cartProductsList
        .querySelector(".simplebar-content")
        .insertAdjacentHTML(
          "afterbegin",
          generateCartProduct(img, title, priceNumber, id)
        );
      printQuantity();

      // w_modal.open();
      cart.classList.add("cart-display");
      showCartDetails();

      const saveArray = [title, img, priceNumber, id];
      localStorage.setItem(id, JSON.stringify(saveArray));

      self.disabled = true;

      // productsOrderList.insertAdjacentHTML(
      //   "afterbegin",
      //   addCartProductsToOrder(img, title, price)
      // );
    });
  });

  cartProductsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-product__delete")) {
      deleteProducts(e.target.closest(".cart__catalog-item"));
    }
  });

  btnOpenOrdering.addEventListener("click", () => {
    modalOrdering.classList.add("display");
    const simplebarContent =
      cartProductsList.querySelector(".simplebar-content").children;
    console.log(simplebarContent);
    const array = Array.from(simplebarContent);
    console.log(array);
    price = 0;
    for (let item of array) {
      let title = item.querySelector(".cart-product__title").textContent;
      let img = item.querySelector(".cart-product__img").getAttribute("src");
      let priceNumber = parseInt(
        priceWithoutSpaces(
          item.querySelector(".cart-product__price").textContent
        )
      );

      const fullPrice = plusFullPrice(priceNumber);
      fullPriceOrder.textContent = `${fullPrice} ₴`;
      orderingWindow.querySelector(
        ".ordering__products-result"
      ).textContent = `${fullPrice} ₴`;
      orderingWindow.querySelector(
        ".ordering__sum-result"
      ).textContent = `${fullPrice} ₴`;

      productsOrderList.insertAdjacentHTML(
        "afterbegin",
        addCartProductsToOrder(img, title, priceNumber)
      );
      let obj = {};
      obj.title = title;
      obj.price = priceNumber;
      productArray.push(obj);
      // fullPriceOrder.textContent = fullPrice;
    }
  });

  displayListOrder.addEventListener("click", () => {
    productsBodyOrder.classList.toggle("display");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let self = e.currentTarget;
    let arraySubmit = [...productArray];

    const userName = self.querySelector('[name="userName"]').value;
    const userSurname = self.querySelector('[name="userSurname"]').value;
    const userAdress = self.querySelector('[name="userAdress"]').value;
    const userPhone = self.querySelector('[name="userPhone"]').value;
    let finalyData = {};
    finalyData.userName = userName;
    finalyData.userPhone = userPhone;
    finalyData.userSurname = userSurname;
    finalyData.userAdress = userAdress;
    finalyData.products = arraySubmit;
    console.log(finalyData);
    sendMessageWithTg(JSON.stringify(finalyData));
    self.reset();
    localStorage.clear();
    s_modal.open();
  });
});
