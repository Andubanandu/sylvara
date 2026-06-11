/* GDPR küpsiste nõusoleku bänner.
   Näidatakse esimesel külastusel; valik salvestatakse localStorage'i
   võtme "cookieConsent" alla ("all" või "necessary"), pärast mida
   bännerit enam ei kuvata. */
(function () {
  var KEY = "cookieConsent";

  try {
    if (localStorage.getItem(KEY)) return;
  } catch (e) {
    return; // localStorage pole saadaval — bännerit pole võimalik meelde jätta
  }

  var banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Küpsiste nõusolek");
  banner.innerHTML =
    '<p>Kasutame küpsiseid, et parandada sinu kasutuskogemust ja analüüsida veebiliiklust.</p>' +
    '<div class="cookie-banner-actions">' +
    '<button type="button" class="btn btn-primary" data-consent="all">Nõustun</button>' +
    '<button type="button" class="btn btn-ghost" data-consent="necessary">Ainult vajalikud</button>' +
    "</div>";

  banner.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-consent]") : null;
    if (!btn) return;
    try {
      localStorage.setItem(KEY, btn.getAttribute("data-consent"));
    } catch (err) {}
    banner.remove();
  });

  function mount() {
    document.body.appendChild(banner);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
