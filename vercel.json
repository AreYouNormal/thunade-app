// THuNade service worker — network-first so the app always shows latest data.
const CACHE = "thunade-v1";

self.addEventListener("install", (e) => {
  self.skipWaiting(); // activate immediately, don't wait for old tabs to close
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Never cache Supabase API calls — always go to network for live data.
  if (req.url.includes("supabase.co")) {
    e.respondWith(fetch(req));
    return;
  }
  // Network-first for everything else: try network, fall back to cache offline.
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req))
  );
});
