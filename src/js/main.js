import "../scss/media.scss";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import JustVailidate from "just-validate";
import Inputmask from "inputmask";

//  Открытие модального окна
const btns = document.querySelectorAll(".btn");
const closeBtn = document.querySelector(".modal__close-btn");
const modal = document.querySelector(".modal");
const modalSuccess = document.querySelector(".modal__success");
const closeBtnSuccess = document.querySelector(".modal__success-close-btn");
const validator = new JustVailidate("#form");
const form = document.querySelector(".modal__form");
let selector = document.querySelector("#tel");
let im = new Inputmask("+7(999) 999-99-99");
im.mask(selector);

btns.forEach(function (e) {
  e.addEventListener("click", function () {
    modal.classList.add("modal--active");
    document.body.classList.add("stop-scroll");
  });
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("modal--active");
  document.body.classList.remove("stop-scroll");
});

// Бургер
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__nav");
const menuLinks = menu.querySelectorAll("header__list-item");
const burgerBtn = document.querySelector(".header__btn-burger");

burger.addEventListener("click", function () {
  burger.classList.toggle("burger--active");
  menu.classList.toggle("header__nav--active");
  document.body.classList.toggle("stop-scroll");
});

menuLinks.forEach(function (el) {
  el.addEventListener("click", function () {
    burger.classList.remove("burger--active");
    menu.classList.remove("header__nav--active");
    document.body.classList.remove("stop-scroll");
  });
});

burgerBtn.addEventListener("click", function () {
  burger.classList.remove("burger--active");
  menu.classList.remove("header__nav--active");
});

//Свайпер
const swiper = new Swiper(".services__container", {
  modules: [Navigation, Pagination],
  speed: 400,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 25,
  loop: false,
  pagination: {
    el: ".swiper-pagination-services",
    type: "fraction",
  },
  a11y: {
    prevSlideMessage: "Предыдущий слайд",
    nextSlideMessage: "Следующий слайд",
  },
  navigation: {
    nextEl: ".swiper-button-next-services",
    prevEl: ".swiper-button-prev-services",
  },
  breakpoints: {
    576: {
      spaceBetween: 30,
    },
  },
});

validator
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Введите имя!",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!",
    },
  ])
  .addField("#tel", [
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Boolean(Number(phone) && phone.length > 0);
      },
      errorMessage: "Введите телефон",
    },
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Boolean(Number(phone) && phone.length === 10);
      },
      errorMessage: "Введите телефон полностью",
    },
  ])
  .onSuccess(async function () {
    let data = {
      name: document.getElementById("name").value,
      tel: document.getElementById("tel").value,
      msg: document.getElementById("msg").value,
    };

    let response = await fetch("php/main.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      modal.classList.remove("modal--active");
      modalSuccess.classList.add("modal--active");
      closeBtnSuccess.addEventListener("click", function () {
        modalSuccess.classList.remove("modal--active");
        document.body.classList.remove("stop-scroll");
      });
    } else {
      let result = await response.json();
      form.reset();
      alert(result.message);
    }
  });
