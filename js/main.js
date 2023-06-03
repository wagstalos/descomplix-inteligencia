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

  $(".success").hide();
  $(".error").hide();
  $("#telefone").mask("(00) 90000-0000");
  $("#celular").mask("(00) 90000-0000");
  $("#demo-modal").show();

  const btn = document.getElementById("menu-mob");
  const menuMobile = document.getElementById("menu-mobile");

  btn.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
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
  let btnEconomizar = document.getElementsByClassName("btn-gtm-economizar");
  let btnFaleConosco = document.getElementsByClassName("btn-gtm-conosco");
  // let btnWhats = document.getElementsByClassName("btn-whats");

  function gtmClickBtnWhats() {
    gtag("event", "whatsapp", { debug_mode: true });
  }

  function gtmClickBtn() {
    gtag("event", "click_quero_economizar", { debug_mode: true });
  }

  function gtmClickBtnConosco() {
    gtag("event", "click_fale_conosco", { debug_mode: true });
  }

  btnFaleConosco[0].addEventListener("click", gtmClickBtnConosco);
  btnEconomizar[0].addEventListener("click", gtmClickBtn);
  // btnWhats[0].addEventListener("click", gtmClickBtnWhats);
}

function scrollTarget() {
  $('a[href^="#"]').on("click", function (event) {
    //event.preventDefault(); // Impede o comportamento padrão de clicar em um link

    var target = $(this.hash); // Obtem o elemento alvo da rolagem
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top, // Anima a rolagem até o elemento alvo
        },
        800
      ); // Tempo de duração da animação em milissegundos
    }
  });
}

//modal
$(".campo").keyup(function () {
  var preenchido = true;
  $(".campo").each(function () {
    if ($(this).val() === "") {
      preenchido = false;
    }
  });

  if (preenchido) {
    $("#btn-submit").prop("disabled", false);
    $("#btn-submit").text("Enviar");
  } else {
    $("#btn-submit").prop("disabled", true);
    $("#btn-submit").text("Preencha os campos");
  }
});

function SubForm() {
  $.ajax({
    url: "https://api.apispreadsheets.com/data/e0NJgxlQcdVr1uYf/",
    type: "post",
    data: $("#myForm").serializeArray(),
    success: function () {
      console.log("Form Data Submitted :)");
      $(".success").show();
      $("#demo-modal").show();
      setTimeout(function () {
        $(".success").hide();
        $("#demo-modal").hide();
      }, 5000);
    },
    error: function () {
      console.log("There was an error :(");
      $(".error").show();

      setTimeout(function () {
        $(".error").hide();
        $("#demo-modal").hide();
      }, 5000);
    },
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("../sw.js")
      .then(function (registration) {
        // Registro do Service Worker bem-sucedido
        console.log(
          "Service Worker registrado com sucesso:",
          registration.scope
        );
      })
      .catch(function (error) {
        // O registro do Service Worker falhou
        console.log("Falha no registro do Service Worker:", error);
      });
  });
}

function submitForm() {
  var form = document.getElementById("my-form");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form";
            }
          });
        }
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
  }
  form.addEventListener("submit", handleSubmit);
}

function counterUp() {
  var startValue = 0; // Valor inicial do contador
  var endValue = 526789; // Valor final do contador
  var duration = 3000; // Duração total da animação em milissegundos
  var interval = 30; // Intervalo de atualização em milissegundos
  var current = startValue;
  var increment = (endValue - startValue) * (interval / duration);

  var intervalId = setInterval(function () {
    current += increment;
    var formattedValue = current.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    $("#contador").text(formattedValue);

    if (current >= endValue) {
      clearInterval(intervalId);
    }
  }, interval);
}

// Chame a função para iniciar o contador
counterUp();

const init = () => {
  start();
  swiperHome();
  accordionHome();
  displayFullYear(".myDate");
  gtm();
  scrollTarget();
  submitForm();
};

init();
