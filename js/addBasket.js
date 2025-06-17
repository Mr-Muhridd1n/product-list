import formatNumber from "./formatNumber.js";

const order_total__price = document.querySelector(".order_total__price");
const your__card__default = document.querySelector(".your__card__default");
const card__counter = document.querySelector("#card__counter");
const your__card__active = document.querySelector(".your__card__active");
const your__card__active__list = document.querySelector(
  ".your__card__active__list"
);
const your__card__active__listTemplate = document.querySelector(
  "#your__card__active__list"
);
const order__confirmed__active__list = document.querySelector(
  "#order__confirmed__active__list"
);

const products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

export const updateBasket = function updateBasket() {
  const card__item = document.querySelector(".card__item");
  let itemCounter = 0;
  your__card__active__list.textContent = "";
  order_total__price.dataset.price = "0";
  order_total__price.textContent = formatNumber(0);
  your__card__default.style.display = "flex";
  your__card__active.style.display = "none";

  const orderConfirmedList = document.querySelector(
    ".order__confirmed__active__list"
  );
  if (orderConfirmedList) orderConfirmedList.innerHTML = "";

  products.forEach((product) => {
    your__card__default.style.display = "none";
    your__card__active.style.display = "block";
    const cardItem = document.querySelector(
      `.card__item[data-id="${product.id}"]`
    );
    if (cardItem) {
      const add_to_card = cardItem.querySelector(".add_to_card");
      const add_to_cardActive = cardItem.querySelector(".add_to_card-active");
      const addCount = cardItem.querySelector(".add-count");

      if (add_to_card) add_to_card.style.display = "none";
      if (add_to_cardActive) add_to_cardActive.style.display = "flex";
      if (addCount) addCount.textContent = product.count;
      cardItem
        .querySelector("#card__item__image")
        .setAttribute("class", "card__item__image");
    }
    const yourCardCopy =
      your__card__active__listTemplate.content.cloneNode(true);
    const order__confirmed__active__listcopy =
      order__confirmed__active__list.content.cloneNode(true);
    const your__card__active__item = yourCardCopy.querySelector(
      ".your__card__active__item"
    );
    const your__card__active__title = yourCardCopy.querySelector(
      ".your__card__active__title"
    );
    const your__card__active__count = yourCardCopy.querySelector(
      ".your__card__active__count"
    );
    const your__card__active__price = yourCardCopy.querySelector(
      ".your__card__active__price"
    );
    const your__card__active__allPrice = yourCardCopy.querySelector(
      ".your__card__active__allPrice"
    );
    const your__card__active__delete = yourCardCopy.querySelector(
      ".your__card__active__delete"
    );

    your__card__active__delete.addEventListener("click", (e) => {
      updateCount(e, "delete");
    });
    const order__confirmed__active__image =
      order__confirmed__active__listcopy.querySelector(
        ".order__confirmed__active__image"
      );
    const order__confirmed__active__title =
      order__confirmed__active__listcopy.querySelector(
        ".order__confirmed__active__title"
      );
    const order__confirmed__active__count =
      order__confirmed__active__listcopy.querySelector(
        ".order__confirmed__active__count"
      );
    const order__confirmed__active__price =
      order__confirmed__active__listcopy.querySelector(
        ".order__confirmed__active__price"
      );
    const order__confirmed__active__allPrice =
      order__confirmed__active__listcopy.querySelector(
        ".order__confirmed__active__allPrice"
      );
    const order_total__price_1 = document.querySelector(
      ".order_total__price_1"
    );

    order__confirmed__active__image.src = product.thumb;
    order__confirmed__active__title.textContent = product.descraption;
    order__confirmed__active__count.textContent = `${product.count}x`;
    order__confirmed__active__price.textContent = formatNumber(product.price);
    order__confirmed__active__allPrice.textContent = formatNumber(
      product.price * product.count
    );
    your__card__active__item.dataset.id = product.id;
    your__card__active__title.textContent = product.descraption;
    your__card__active__count.textContent = `${product.count}x`;
    your__card__active__price.textContent = formatNumber(product.price);
    your__card__active__allPrice.textContent = formatNumber(
      product.price * product.count
    );
    your__card__active__list.appendChild(yourCardCopy);

    if (orderConfirmedList) {
      orderConfirmedList.appendChild(order__confirmed__active__listcopy);
    }

    const currentTotal = Number(order_total__price.dataset.price) || 0;
    const newTotal = currentTotal + product.price * product.count;
    order_total__price.dataset.price = newTotal;
    order_total__price.textContent = formatNumber(newTotal);
    itemCounter += product.count;
    if (order_total__price_1)
      order_total__price_1.textContent = formatNumber(newTotal);
  });
  card__counter.textContent = itemCounter;
};

export const addBasket = function (product) {
  const item = products.find((p) => p.id == product.id);

  if (item) {
    item.count += 1;
  } else {
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  }
  updateBasket();
};

export const updateCount = function updateCount(product, value) {
  if (value == "delete") {
    const id = product.target.parentElement.parentElement;
    const items = document.querySelector(
      `.card__item[data-id="${id.dataset.id}"]`
    );

    const index = products.findIndex((p) => p.id == id.dataset.id);
    const card__item__image = items.querySelector("#card__item__image");
    items.querySelector(".add_to_card-active").style.display = "none";
    items.querySelector(".add_to_card").style.display = "flex";
    card__item__image.removeAttribute("class");

    if (index !== -1) {
      products.splice(index, 1);
    }
    localStorage.setItem("products", JSON.stringify(products));
    updateBasket();
    return;
  }
  const id =
    product.target.parentElement.parentElement.parentElement.parentElement;

  const item = products.find((p) => p.id == id.dataset.id);
  if (value == "+") {
    item.count += 1;
  } else {
    if (item.count == 1) {
      id.querySelector(".add_to_card-active").style.display = "none";
      id.querySelector(".add_to_card").style.display = "flex";
      id.querySelector("#card__item__image").removeAttribute("class");

      const index = products.findIndex((p) => p.id == id.dataset.id);
      if (index !== -1) {
        products.splice(index, 1);
      }
    } else {
      item.count -= 1;
    }
  }
  localStorage.setItem("products", JSON.stringify(products));
  updateBasket();
};
