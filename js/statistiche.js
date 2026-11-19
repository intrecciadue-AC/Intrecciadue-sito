/* ==========================================================================
   INTRECCI A DUE — Statistiche anonime delle visite
   Nessun cookie e nessun dato personale: il sito chiede al server il file
   vuoto /s.gif con poche informazioni nell'indirizzo (da dove arriva la
   visita, quale prodotto è stato aperto, per quanto tempo). Netlify registra
   queste richieste e la dashboard le conta.
   Tempi a fasce: 0-5, 5-15, 15-30, 30-60, 60-120, 120+ secondi.
   ========================================================================== */
(function () {
  "use strict";

  function invia(dati) {
    try {
      const q = Object.keys(dati).map((k) => k + "=" + encodeURIComponent(dati[k])).join("&");
      fetch("/s.gif?" + q, { method: "GET", keepalive: true, credentials: "omit", cache: "no-store" }).catch(() => {});
    } catch (e) { /* le statistiche non devono mai disturbare il sito */ }
  }

  function fascia(secondi) {
    if (secondi < 5) return "0-5";
    if (secondi < 15) return "5-15";
    if (secondi < 30) return "15-30";
    if (secondi < 60) return "30-60";
    if (secondi < 120) return "60-120";
    return "120+";
  }

  /* ---------- Da dove arriva la visita ---------- */
  function provenienza() {
    const par = new URLSearchParams(location.search);
    const utm = (par.get("utm_source") || "").toLowerCase();
    if (utm === "ig" || utm.includes("instagram")) return "instagram";
    if (utm.includes("tiktok")) return "tiktok";
    if (utm.includes("facebook") || utm === "fb") return "facebook";
    if (par.has("fbclid")) return "instagram";
    const rif = document.referrer;
    if (!rif) return "diretto";
    let host = "";
    try { host = new URL(rif).hostname.replace(/^www\./, ""); } catch (e) { return "altro"; }
    if (host === location.hostname || host.endsWith("intrecciadue.netlify.app")) return "interno";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("google")) return "google";
    if (host.includes("tiktok")) return "tiktok";
    if (host.includes("facebook") || host === "l.facebook.com" || host === "m.facebook.com") return "facebook";
    if (host.includes("bing") || host.includes("duckduckgo") || host.includes("yahoo") || host.includes("ecosia")) return "altri motori";
    if (host.includes("whatsapp")) return "whatsapp";
    return "altro";
  }
  const dispositivo = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "telefono" : "computer";
  const pagina = location.pathname.replace(/\.html$/, "").replace(/^\/$/, "/home") || "/home";

  // una visita conta una volta sola per scheda del browser
  let da = "interno";
  try { da = sessionStorage.getItem("ia2-da") || ""; } catch (e) { da = ""; }
  if (!da) {
    da = provenienza();
    try { sessionStorage.setItem("ia2-da", da); } catch (e) { /* niente */ }
    if (da !== "interno") invia({ e: "visita", da: da, d: dispositivo, pg: pagina });
  }
  invia({ e: "pagina", pg: pagina });

  /* ---------- Eventi chiamati dal sito (main.js) ---------- */
  let schedaAperta = null, inizioScheda = 0;
  function chiudiTimerScheda() {
    if (!schedaAperta) return;
    invia({ e: "tempo", p: schedaAperta, t: fascia((Date.now() - inizioScheda) / 1000) });
    schedaAperta = null;
  }
  window.IA2statistiche = {
    apertaScheda(id) {
      chiudiTimerScheda();
      schedaAperta = id; inizioScheda = Date.now();
      invia({ e: "scheda", p: id, da: da });
    },
    chiusaScheda: chiudiTimerScheda,
    aggiunto(id) { invia({ e: "aggiungi", p: id, da: da }); },
    filtro(cat) { invia({ e: "filtro", c: cat }); },
    carrello() { invia({ e: "carrello" }); },
    inviata(pezzi) { invia({ e: "invio", n: pezzi, da: da }); }
  };

  /* ---------- Tempo passato su ogni sezione della pagina ---------- */
  const sezioni = Array.from(document.querySelectorAll("main section[id]"));
  const tempo = {}, inVista = {};
  function aggiorna() {
    const ora = Date.now();
    Object.keys(inVista).forEach((id) => {
      if (inVista[id]) { tempo[id] = (tempo[id] || 0) + (ora - inVista[id]); inVista[id] = ora; }
    });
  }
  if (sezioni.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((voci) => {
      aggiorna();
      voci.forEach((v) => { inVista[v.target.id] = v.isIntersecting && !document.hidden ? Date.now() : 0; });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 }); // la sezione che sta a metà schermo
    sezioni.forEach((s) => io.observe(s));
  }
  let inviate = false;
  function fine() {
    aggiorna();
    chiudiTimerScheda();
    if (inviate) return;
    inviate = true;
    Object.keys(tempo).forEach((id) => {
      if (tempo[id] >= 2000) invia({ e: "sezione", s: id, t: fascia(tempo[id] / 1000) });
    });
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) fine();
    else {
      // la persona torna sulla pagina: si riparte a contare
      inviate = false;
      Object.keys(tempo).forEach((id) => { tempo[id] = 0; });
      Object.keys(inVista).forEach((id) => { if (inVista[id] === 0) return; inVista[id] = Date.now(); });
    }
  });
  window.addEventListener("pagehide", fine);
})();
