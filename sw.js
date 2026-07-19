const CACHE = "andiamo-v16";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
const PAGE_NETWORK_TIMEOUT_MS = 3500;

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* The page (index.html) is served network-first so a new deploy shows up on
   the next launch, with the cached copy as fallback when offline or when the
   network is slower than PAGE_NETWORK_TIMEOUT_MS. All other assets (icons,
   manifest) are cache-first. */
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;

  var isPage = e.request.mode === "navigate" ||
    e.request.url.replace(/[?#].*$/, "").match(/(\/|index\.html)$/);

  if (isPage) {
    e.respondWith(new Promise(function (resolve) {
      var settled = false;
      function settle(res) { if (!settled && res) { settled = true; resolve(res); } }
      function fromCache() {
        return caches.match(e.request).then(function (c) { return c || caches.match("./index.html"); });
      }
      var timer = setTimeout(function () { fromCache().then(settle); }, PAGE_NETWORK_TIMEOUT_MS);
      fetch(e.request).then(function (res) {
        clearTimeout(timer);
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
          settle(res);
        } else {
          fromCache().then(function (c) { settle(c || res); });
        }
      }).catch(function () {
        clearTimeout(timer);
        fromCache().then(settle);
      });
    }));
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function (cached) {
      if (cached) return cached;
      return fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () { return caches.match("./index.html"); });
    })
  );
});
