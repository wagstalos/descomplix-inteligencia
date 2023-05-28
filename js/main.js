function start() {
  dataLayer.push({ pageTitle: document.title });
  const allCards = document.querySelectorAll(".card");

  allCards.forEach(function (itemAtual, index, array) {
    itemAtual.addEventListener("mouseleave", function () {
      gtag("event", "mouseover_card", {
        view: `card ${index}`,
        debug_mode: true,
      });
    });
  });
}

function swiperHome() {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: false,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      900: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
}

function accordionHome() {
  const items = document.querySelectorAll(".accordion button");
  function toggleAccordion() {
    const itemToggle = this.getAttribute("aria-expanded");

    for (i = 0; i < items.length; i++) {
      items[i].setAttribute("aria-expanded", "false");
    }

    if (itemToggle == "false") {
      this.setAttribute("aria-expanded", "true");
    }
  }

  items.forEach((item) => item.addEventListener("click", toggleAccordion));
}

function displayFullYear(element) {
  const year = document.querySelector(element);
  const getYear = new Date().getFullYear();

  year.innerText = getYear;
}

function gtm() {
  let btn = document.getElementsByClassName("btn");
  let btnWhats = document.getElementsByClassName("btn-whats");

  function gtmClickBtnWhats() {
    gtag("event", "whatsapp", { debug_mode: true });
  }

  function gtmClickBtn() {
    gtag("event", "click_aula_gratis", { debug_mode: true });
  }

  function gtmClickBtnPurple() {
    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    dataLayer.push({
      event: "purchase",
      ecommerce: {
        transaction_id: "T12345",
        affiliation: "Online Store",
        value: "59.89",
        tax: "4.90",
        shipping: "5.99",
        currency: "EUR",
        coupon: "SUMMER_SALE",
        items: [
          {
            item_name: "Triblend Android T-Shirt",
            item_id: "12345",
            price: "15.25",
            item_brand: "Google",
            item_category: "Apparel",
            item_variant: "Gray",
            quantity: 1,
          },
          {
            item_name: "Donut Friday Scented T-Shirt",
            item_id: "67890",
            price: 33.75,
            item_brand: "Google",
            item_category: "Apparel",
            item_variant: "Black",
            quantity: 1,
          },
        ],
      },
      debug_mode: true,
    });
  }

  btn[0].addEventListener("click", gtmClickBtnPurple);
  btn[1].addEventListener("click", gtmClickBtn);
  btnWhats[0].addEventListener("click", gtmClickBtnWhats);
}

const init = () => {
  start();
  swiperHome();
  accordionHome();
  displayFullYear(".myDate");
  gtm();
};

init();
