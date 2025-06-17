import { products } from "./data.js";
import formatNumber from "./formatNumber.js";
import { addBasket } from "./addBasket.js";
import { updateBasket } from "./addBasket.js";
import { updateCount } from "./addBasket.js";

const card__listTemplate = document.querySelector("#card__list-template");
const card__list = document.querySelector(".card__list");

function productsADD(products) {
  products.forEach((product) => {
    const liELClone = card__listTemplate.content.cloneNode(true);

    const image = liELClone.getElementById("card__item__image");
    const card__item__infoTitle = liELClone.querySelector(
      ".card__item__info-title"
    );
    const card__item__infoDescription = liELClone.querySelector(
      ".card__item__info-description"
    );
    const card__item__infoPrice = liELClone.querySelector(
      ".card__item__info-price"
    );

    const add_to_card = liELClone.querySelector(".add_to_card");
    const card__item = liELClone.querySelector(".card__item");
    const add_to_cardActive = liELClone.querySelector(".add_to_card-active");
    const addCount = liELClone.querySelector(".add-count");

    add_to_card.addEventListener("click", () => {
      addBasket({ ...product, count: 1 });
      add_to_card.style.display = "none";
      add_to_cardActive.style.display = "flex";
      addCount.textContent = "1";
    });

    const plusCount = liELClone.querySelector(".plus-count");
    const minusCount = liELClone.querySelector(".minus-count");

    plusCount.addEventListener("click", (e) => {
      updateCount(e, "+");
    });
    minusCount.addEventListener("click", (e) => {
      updateCount(e, "-");
    });

    image.src = product.thumb;
    card__item.dataset.id = product.id;
    card__item__infoTitle.textContent = product.title;
    card__item__infoDescription.textContent = product.descraption;
    card__item__infoPrice.textContent = formatNumber(product.price);
    card__list.appendChild(liELClone);
  });
  updateBasket();
}

productsADD(products);

const order__confirmedBtn = document.querySelector(".order__confirmed-btn");
const order_conform = document.querySelector(".order_conform");
order__confirmedBtn.addEventListener("click", () => {
  document.querySelector(".order__confirmed-wrapper").style.display = "none";
});
order_conform.addEventListener("click", () => {
  document.querySelector(".order__confirmed-wrapper").style.display = "flex";
});
