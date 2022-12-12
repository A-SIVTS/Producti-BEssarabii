export const tabsFilter = () => {
  const filter = document.querySelectorAll(".shop__item");

  if (filter) {
    const menu = document.querySelector(".shop__menu");

    if (menu) {
      menu.addEventListener("click", (event) => {
        if (event.target.tagName !== "LI") return false;
        const tabBtn = event.target;
        let filterClass = event.target.dataset["f"];
        let filterBtn = document.querySelectorAll(".shop__tab");

        filterBtn.forEach((elem) => {
          const dataSet = elem.dataset["f"];
          if (dataSet != filterClass) {
            elem.classList.remove("active");
          }
          if (dataSet == filterClass) {
            tabBtn.classList.add("active");
          }
        });

        console.log(filterClass);

        filter.forEach((elem) => {
          elem.classList.remove("hide");
          if (!elem.classList.contains(filterClass) & (filterClass !== "all")) {
            elem.classList.add("hide");
          }
        });
      });
    }
  }
};
