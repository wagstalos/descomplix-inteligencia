var CACHE_NAME = "my-site-cache-v4";
var urlsToCache = [
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
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    /* Este método estende o evento ONINSTALL e aplica um estado ao evento chamado ONINSTALLING */
    caches
      .open(
        CACHE_NAME
      ) /* O objeto caches é criado com um namespace e retorna uma Promise */
      .then(function (cache) {
        console.log("Cache aberto");
        return cache.addAll(
          urlsToCache
        ); /* E por fim, conseguimos manipular o objeto de cache corrente */
      })
  );
});
