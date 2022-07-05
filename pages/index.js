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