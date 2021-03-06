!(function (e) {
    "function" != typeof e.matches &&
        (e.matches =
            e.msMatchesSelector ||
            e.mozMatchesSelector ||
            e.webkitMatchesSelector ||
            function (e) {
                for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t; ) ++n;
                return Boolean(o[n]);
            }),
        "function" != typeof e.closest &&
            (e.closest = function (e) {
                for (var t = this; t && 1 === t.nodeType; ) {
                    if (t.matches(e)) return t;
                    t = t.parentNode;
                }
                return null;
            });
})(window.Element.prototype);

document.addEventListener("DOMContentLoaded", function () {
    /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
    var modalButtons = document.querySelectorAll(".btn__modal-open"),
        overlay = document.querySelector(".overlay__modal"),
        closeButtons = document.querySelectorAll(".modal-signup__close-icon"),
        bodyScroll = document.querySelector(".body");

    /* Перебираем массив кнопок */
    modalButtons.forEach(function (item) {
        /* Назначаем каждой кнопке обработчик клика */
        item.addEventListener("click", function (e) {
            /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
            e.preventDefault();

            /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
            var modalId = this.getAttribute("data-modal"),
                modalElem = document.querySelector('.modal-signup[data-modal="' + modalId + '"]');

            /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
            modalElem.classList.add("modal-signup_active");
            overlay.classList.add("overlay__modal_active");
            bodyScroll.classList.add("scroll-none");
        }); // end click
    }); // end foreach

    closeButtons.forEach(function (item) {
        item.addEventListener("click", function (e) {
            var parentModal = this.closest(".modal-signup");

            parentModal.classList.remove("modal-signup_active");
            overlay.classList.remove("overlay__modal_active");
            bodyScroll.classList.remove("scroll-none");
        });
    }); // end foreach

    document.body.addEventListener(
        "keyup",
        function (e) {
            var key = e.keyCode;

            if (key == 27) {
                document.querySelector(".modal-signup").classList.remove("modal-signup_active");
                document.querySelector(".overlay__modal").classList.remove("overlay__modal_active");
                document.querySelector(".body").classList.remove("scroll-none");
            }
        },
        false
    );

    overlay.addEventListener("click", function () {
        document.querySelector(".modal-signup").classList.remove("modal-signup_active");
        this.classList.remove("modal-signup_active");
        document.querySelector(".overlay").classList.remove("overlay__modal_active");
        document.querySelector("body").classList.remove("scroll-none");
    });
}); // end ready

const burgerIcon = document.querySelector(".header__burger");
const menu = document.querySelector(".header__right");
const body = document.querySelector(".body");
const subMenuResources = document.getElementById("header__submenu-resources");
const subMenuCompany = document.getElementById("header__submenu-company");
const subMenuItemResources = document.getElementById("header__item-resources");
const subMenuItemCompany = document.getElementById("header__item-company");
const subMenuListCompany = document.getElementById("header__submenu-list-company");
const subMenuListResources = document.getElementById("header__submenu-list-resources");
const arrowBack = document.querySelector(".header__right-arrow");
const headerNav = document.querySelector(".header__nav");
const headerItem = document.querySelector(".header__item");
const headerLink = document.querySelector(".header__link");
const btnHeader = document.querySelector(".btn__header");

subMenuItemCompany.addEventListener("click", () => {
    if (subMenuCompany.classList.contains("header__submenu-company_active")) {
        subMenuCompany.classList.remove("header__submenu-company_active");
        arrowBack.classList.remove("header__right-arrow_active");
        subMenuCompany.removeAttribute("id");
        headerLink.classList.remove("inactive");
        subMenuListCompany.style.display = "none";
        btnHeader.removeAttribute("style");
    } else {
        subMenuCompany.classList.add("header__submenu-company_active");
        arrowBack.classList.add("header__right-arrow_active");
        subMenuCompany.removeAttribute("id");
        headerLink.classList.add("inactive");
        btnHeader.style.display = "none";
        subMenuListCompany.style.display = "flex";
    }
});

subMenuItemResources.addEventListener("click", () => {
    if (subMenuResources.classList.contains("header__submenu-resources_active")) {
        subMenuResources.classList.remove("header__submenu-resources_active");
        arrowBack.classList.remove("header__right-arrow_active");
        subMenuResources.removeAttribute("id");
        headerLink.classList.remove("inactive");
        subMenuListResources.style.display = "none";
        btnHeader.removeAttribute("style");
    } else {
        subMenuResources.classList.add("header__submenu-resources_active");
        arrowBack.classList.add("header__right-arrow_active");
        subMenuResources.removeAttribute("id");
        headerLink.classList.add("inactive");
        btnHeader.style.display = "none";
        subMenuListResources.style.display = "flex";
    }
});

arrowBack.addEventListener("click", () => {
    subMenuCompany.classList.remove("header__submenu-company_active");
    subMenuResources.classList.remove("header__submenu-resources_active");
    arrowBack.classList.remove("header__right-arrow_active");
    headerLink.classList.remove("inactive");
    btnHeader.removeAttribute("style");
    subMenuListCompany.style.display = "none";
    subMenuListResources.style.display = "none";
});

if (menu && burgerIcon) {
    burgerIcon.addEventListener("click", () => {
        menu.classList.toggle("active");
        burgerIcon.classList.toggle("active-burger");
        body.classList.toggle("scroll-lock");
        subMenuCompany.classList.remove("header__submenu-company_active");
        subMenuResources.classList.remove("header__submenu-resources_active");
        arrowBack.classList.remove("header__right-arrow_active");
        headerLink.classList.remove("inactive");
        btnHeader.removeAttribute("style");
        subMenuListCompany.style.display = "none";
        subMenuListResources.style.display = "none";
    });

    // menu.querySelectorAll(".header__link").forEach((link) => {
    //     link.addEventListener("click", () => {
    //         menu.classList.remove("active");
    //         burgerIcon.classList.remove("active-burger");
    //         body.classList.remove("scroll-lock");
    //     });
    // });
}