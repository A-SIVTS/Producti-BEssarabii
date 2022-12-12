function _createModal(options) {
  console.log(options.title);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
 <div class="modal__overlay">
	 <div class="modal__container">
		 <div class="modal__window">
			 <div class="modal__header">${options.title || ""}</div>
			 <div class="modal__content"></div>
			 <div class="modal__footer">
			 	<a href=${options.href} class="modal__btn btn" id="modalCloseBtn">${
      options.btnText || "ok"
    }</a>
			 </div>
		 </div>
	 </div>
 </div>

 `
  );
  document.body.appendChild(modal);

  return modal;
}

$.modal = function (options) {
  console.log(options);

  const $modal = _createModal(options);

  return {
    open() {
      $modal.classList.add("open");
    },
    close() {
      $modal.classList.remove("open");
    },
    destroy() {},
  };
};
