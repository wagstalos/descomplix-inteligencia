self.addEventListener("install", function (event) {
  // Realize ações de instalação aqui, como armazenar em cache os arquivos estáticos necessários
  console.log("Service Worker instalado");
  event.waitUntil(
    caches.open("nome-do-cache").then(function (cache) {
      return cache.addAll([
        "index.html",
        "css/main.min.css",
        "js/main.js",
        "js/manifest.json",
        "js/sw.js",
        "img/001-facebook.svg",
        "img/004-instagram.svg",
        "img/clinica.png",
        "img/estudos.png",
        "img/hero-personagem.png",
        "img/icon-horario.png",
        "img/marcelo.jpg",
        "img/medico-avatar.jpg",
        "img/preview.jpg",
        "img/selo.svg",
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  // Realize ações de ativação aqui, como limpar caches antigos
  console.log("Service Worker ativado");
});

self.addEventListener("fetch", function (event) {
  // Responda a solicitações de rede aqui, como recuperar arquivos em cache
  console.log("Service Worker interceptando uma solicitação de rede");
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Retorna a resposta em cache, se existir, ou busca a resposta na rede
      return response || fetch(event.request);
    })
  );
});
