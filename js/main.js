/* ==========================================================================
   INTRECCI A DUE — Funzionamento del sito
   (vetrina, scheda prodotto, richiesta, invio della richiesta di informazioni)
   ========================================================================== */
(function () {
  "use strict";

  const EMAIL_ORDINI = "intrecciadue@gmail.com";
  const CHIAVE_CARRELLO = "intrecciadue-carrello";
  const C = window.CATALOGO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const stat = (nome, ...arg) => { try { const S = window.IA2statistiche; if (S && S[nome]) S[nome](...arg); } catch (e) { /* niente */ } };
  const sicuro = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Figura: foto oppure segnaposto disegnato ---------- */
  function figura(p, conScopri) {
    const iniziale = p.nome.replace(/^(Porta|Laccio da )/i, "").trim().charAt(0).toUpperCase();
    const interno = p.foto
      ? `<img src="${sicuro(p.foto)}" alt="${sicuro(p.nome)}" loading="lazy">`
      : `<div class="segnaposto" style="--t1:${p.tinta[0]};--t2:${p.tinta[1]}"><span>${iniziale}</span></div>`;
    return interno + (conScopri ? `<span class="scopri">Scegli e personalizza</span>` : "");
  }
  const SOVRAPPREZZO = `<small>con sovrapprezzo</small>`;

  /* ---------- Vetrina ---------- */
  const griglia = $("#griglia");
  const filtri = $("#filtri");
  const introCategoria = $("#introCategoria");
  let categoriaAttiva = "tutti";

  function disegnaFiltri() {
    const voci = [{ id: "tutti", nome: "Tutto" }, ...C.categorie.filter((c) => !c.nascosta)];
    filtri.innerHTML = voci.map((c) =>
      `<button class="filtro" role="tab" data-categoria="${c.id}" aria-selected="${c.id === categoriaAttiva}">${c.nome}</button>`
    ).join("");
  }
  function disegnaVetrina() {
    const nascoste = C.categorie.filter((c) => c.nascosta).map((c) => c.id);
    const elenco = C.prodotti.filter((p) => categoriaAttiva === "tutti" ? !nascoste.includes(p.categoria) : p.categoria === categoriaAttiva);
    const cat = C.categorie.find((c) => c.id === categoriaAttiva);
    introCategoria.textContent = cat ? cat.intro : "Borse, accessori per il telefono e piccoli regali: tutto fatto a mano, nel colore che preferisci.";
    griglia.innerHTML = elenco.map((p, i) => `
      <button class="prodotto" data-id="${p.id}" style="animation-delay:${Math.min(i, 8) * 60}ms" aria-label="${sicuro(p.nome)}">
        <div class="prodotto-figura">${figura(p, true)}</div>
        <div>
          <div class="prodotto-nome">${sicuro(p.nome)}</div>
        </div>
      </button>`).join("");
  }
  filtri.addEventListener("click", (e) => {
    const b = e.target.closest(".filtro");
    if (!b) return;
    categoriaAttiva = b.dataset.categoria;
    stat("filtro", categoriaAttiva);
    disegnaFiltri();
    disegnaVetrina();
  });
  griglia.addEventListener("click", (e) => {
    const b = e.target.closest(".prodotto");
    if (b) apriScheda(b.dataset.id, b);
  });

  /* ---------- Natale ---------- */
  const grigliaNatale = $("#nataleGriglia");
  grigliaNatale.innerHTML = C.prodotti.filter((p) => p.categoria === "natale").map((d, i) => `
    <button class="decorazione rivela" data-id="${d.id}" style="--ritardo:${i * 0.1}s" aria-label="${sicuro(d.nome)}: scegli e aggiungi alla richiesta">
      <div class="prodotto-figura">${figura(d, false)}</div>
      <h3>${sicuro(d.nome)}</h3>
      <p>${sicuro(d.nota || "All'uncinetto · su richiesta")}</p>
      <span class="decorazione-scegli">Scegli</span>
    </button>`).join("");
  grigliaNatale.addEventListener("click", (e) => {
    const b = e.target.closest(".decorazione");
    if (b) apriScheda(b.dataset.id, b);
  });

  /* ---------- Cestini regalo ---------- */
  const grigliaCestini = $("#cestiniGriglia");
  if (grigliaCestini) {
    grigliaCestini.innerHTML = C.prodotti.filter((p) => p.categoria === "cestini").map((p, i) => `
      <button class="prodotto cestino rivela" data-id="${p.id}" style="--ritardo:${i * 0.1}s" aria-label="${sicuro(p.nome)}">
        <div class="prodotto-figura">${figura(p, true)}</div>
        <div>
          <div class="prodotto-nome">${sicuro(p.nome)}</div>
          ${p.descrizione ? `<p class="cestino-testo">${sicuro(p.descrizione)}</p>` : ""}
        </div>
      </button>`).join("");
    grigliaCestini.addEventListener("click", (e) => {
      const b = e.target.closest(".prodotto");
      if (b) apriScheda(b.dataset.id, b);
    });
  }

  /* ---------- Recensioni ---------- */
  const rec = window.RECENSIONI || [];
  $("#recensioniGriglia").innerHTML = rec.length
    ? rec.map((r, i) => `
      <article class="recensione rivela" style="--ritardo:${(i % 3) * 0.1}s">
        ${r.foto ? `<img src="${sicuro(r.foto)}" alt="${sicuro(r.prodotto || "")} di ${sicuro(r.nome)}" loading="lazy">` : ""}
        <div class="recensione-testo">
          <blockquote>«${sicuro(r.testo)}»</blockquote>
          <p>${sicuro(r.nome)}${r.prodotto ? " · " + sicuro(r.prodotto) : ""}</p>
        </div>
      </article>`).join("")
    : `<div class="recensioni-invito rivela">
        <p class="grande">Hai già una nostra creazione?</p>
        <p>Mandaci una foto su Instagram taggando @intrecciadue: ci piacerebbe moltissimo mostrarla qui.</p>
        <a class="bottone bottone-chiaro" href="https://www.instagram.com/intrecciadue" target="_blank" rel="noopener">Mandaci la tua foto</a>
      </div>`;

  /* ---------- Velo e blocco dello scorrimento ---------- */
  function mostra(el, velo) {
    el.hidden = false; velo.hidden = false;
    requestAnimationFrame(() => { el.classList.add("aperto"); velo.classList.add("aperto"); });
    document.body.classList.add("bloccato");
  }
  function nascondi(el, velo, subito) {
    el.classList.remove("aperto"); velo.classList.remove("aperto");
    const fine = () => { if (el.id === "scheda") el.hidden = true; velo.hidden = true; };
    subito ? fine() : setTimeout(fine, 450);
    if (!$(".scheda.aperto") && !$(".carrello.aperto")) document.body.classList.remove("bloccato");
  }

  /* ---------- Scheda prodotto ---------- */
  const scheda = $("#scheda"), veloScheda = $("#veloScheda");
  let prodottoAperto = null, origineFocus = null;

  function apriScheda(id, origine) {
    const p = C.prodotti.find((x) => x.id === id);
    if (!p) return;
    prodottoAperto = p; origineFocus = origine || null; coloreToccato = false;
    const cat = C.categorie.find((c) => c.id === p.categoria);
    $("#schedaFigura").innerHTML = figura(p, false);
    $("#schedaCategoria").textContent = cat ? cat.nome : "";
    $("#schedaTitolo").textContent = p.nome;

    let html = "";
    if (p.misure.length > 1 || p.misure[0].nome) {
      html += gruppo("Misura", `<div class="scelte">${p.misure.map((m, i) => `
        <label class="scelta"><input type="radio" name="misura" value="${i}" ${i === 0 ? "checked" : ""}><span>${sicuro(m.nome)}</span></label>`).join("")}</div>`);
    }
    html += gruppo("Colore", campioni("colore"));
    if (p.personalizzabile) {
      if (!p.soloPelle) {
        html += gruppo("Materiale", `<div class="scelte">${C.materiali.map((m, i) => `
          <label class="scelta"><input type="radio" name="materiale" value="${i}" ${i === 0 ? "checked" : ""}><span>${m.nome}${m.sovrapprezzo ? " " + SOVRAPPREZZO : ""}</span></label>`).join("")}</div>`);
      }
      html += gruppo("Dettagli", `<div class="scelte">${C.extra.map((x) => `
        <label class="scelta"><input type="checkbox" name="extra" value="${x.id}"><span>${x.nome}${x.sovrapprezzo ? " " + SOVRAPPREZZO : ""}</span></label>`).join("")}</div>
        <div id="secondoColore" hidden><p class="nome-colore" style="margin-top:14px">Secondo colore</p>${campioni("colore2")}</div>
        <input type="text" class="campo-testo" id="testoIniziali" maxlength="4" placeholder="Quali iniziali? (es. C.A.)" hidden>`);
    }
    if (p.domanda) {
      html += gruppo("Dettagli", `<input type="text" class="campo-testo" id="testoDomanda" maxlength="80" placeholder="${sicuro(p.domanda)}">`);
    }
    quantitaScheda = 1;
    html += gruppo("Quantità", `<div class="quantita quantita-scheda">
        <button type="button" data-q="meno" aria-label="Togli uno">−</button>
        <span id="quantitaScheda">1</span>
        <button type="button" data-q="piu" aria-label="Aggiungi uno">+</button>
      </div>`);
    $("#schedaOpzioni").innerHTML = html;
    aggiornaPrezzoScheda();
    mostra(scheda, veloScheda);
    stat("apertaScheda", p.id);
    setTimeout(() => $("#chiudiScheda").focus(), 60);
  }
  function gruppo(titolo, contenuto) {
    return `<fieldset class="gruppo"><legend>${titolo}</legend>${contenuto}</fieldset>`;
  }
  /* Colori della scheda aperta: per i regali di Natale si aggiungono rosso, verde e bianco */
  function coloriDi(p) {
    return p && p.coloriNatale ? [...C.colori, ...(C.coloriNatale || [])] : C.colori;
  }
  function campioni(nome) {
    const elenco = coloriDi(prodottoAperto);
    return `<div class="campioni">${elenco.map((c, i) => `
      <label class="campione" title="${c.nome}"><input type="radio" name="${nome}" value="${c.nome}" ${nome === "colore" && i === 0 ? "checked" : ""} aria-label="${c.nome}"><span style="--col:${c.hex}"></span></label>`).join("")}</div>
      ${nome === "colore" ? `<p class="nome-colore" id="nomeColore">${C.colori[0].nome}</p>` : ""}`;
  }
  function sceltaCorrente() {
    const p = prodottoAperto;
    const misura = p.misure[+(($('input[name="misura"]:checked', scheda) || {}).value || 0)];
    const colore = ($('input[name="colore"]:checked', scheda) || {}).value || C.colori[0].nome;
    let sovrapprezzo = false;
    const dettagli = [];
    if (misura.nome) dettagli.push(misura.nome);
    dettagli.push("Colore: " + colore);
    if (p.personalizzabile) {
      if (p.soloPelle) dettagli.push("Pelle");
      else {
        const mat = C.materiali[+(($('input[name="materiale"]:checked', scheda) || {}).value || 0)];
        if (mat.sovrapprezzo) { sovrapprezzo = true; dettagli.push(mat.nome); }
      }
      $$('input[name="extra"]:checked', scheda).forEach((inp) => {
        const x = C.extra.find((e) => e.id === inp.value);
        if (x.sovrapprezzo) sovrapprezzo = true;
        if (x.id === "bicolor") {
          const c2 = ($('input[name="colore2"]:checked', scheda) || {}).value;
          dettagli.push("Bicolore" + (c2 ? " con " + c2 : ""));
        } else if (x.id === "iniziali") {
          const t = ($("#testoIniziali").value || "").trim();
          dettagli.push("Iniziali" + (t ? " " + t : ""));
        } else dettagli.push(x.nome);
      });
    }
    const risposta = ($("#testoDomanda") || {}).value;
    if (risposta && risposta.trim()) dettagli.push("Versione: " + risposta.trim());
    return { sovrapprezzo, dettagli };
  }
  function aggiornaPrezzoScheda() {
    if (!prodottoAperto) return;
    const s = sceltaCorrente();
    $("#schedaPrezzo").textContent = s.sovrapprezzo
      ? "Con le scelte aggiunte il prezzo aumenta: te lo diciamo noi quando ci scrivi."
      : "Aggiungilo alla richiesta: ti rispondiamo noi con il prezzo.";
    const col = $('input[name="colore"]:checked', scheda);
    if ($("#nomeColore") && col) $("#nomeColore").textContent = col.value;
    // l'anteprima provvisoria prende il colore scelto
    const anteprima = $("#schedaFigura .segnaposto");
    const scelto = col && coloriDi(prodottoAperto).find((c) => c.nome === col.value);
    if (anteprima && scelto && coloreToccato) {
      anteprima.style.setProperty("--t2", scelto.hex);
      anteprima.style.setProperty("--t1", "#E6D8CA");
    }
    const bic = $('input[name="extra"][value="bicolor"]', scheda);
    if (bic) $("#secondoColore").hidden = !bic.checked;
    const ini = $('input[name="extra"][value="iniziali"]', scheda);
    if (ini) $("#testoIniziali").hidden = !ini.checked;
  }
  let coloreToccato = false;
  let quantitaScheda = 1;
  $("#schedaOpzioni").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-q]");
    if (!b) return;
    quantitaScheda = Math.max(1, Math.min(99, quantitaScheda + (b.dataset.q === "piu" ? 1 : -1)));
    $("#quantitaScheda").textContent = quantitaScheda;
  });
  scheda.addEventListener("change", (e) => {
    if (e.target.name === "colore") coloreToccato = true;
    aggiornaPrezzoScheda();
  });
  scheda.addEventListener("input", (e) => { if (e.target.id === "testoIniziali") aggiornaPrezzoScheda(); });

  function chiudiScheda() {
    stat("chiusaScheda");
    nascondi(scheda, veloScheda);
    if (origineFocus) origineFocus.focus({ preventScroll: true });
    prodottoAperto = null;
  }
  $("#chiudiScheda").addEventListener("click", chiudiScheda);
  veloScheda.addEventListener("click", chiudiScheda);

  $("#aggiungi").addEventListener("click", () => {
    const p = prodottoAperto;
    const s = sceltaCorrente();
    const chiave = p.id + "|" + s.dettagli.join("|");
    const esistente = carrello.find((v) => v.chiave === chiave);
    if (esistente) esistente.quantita += quantitaScheda;
    else carrello.push({ chiave, id: p.id, nome: p.nome, dettagli: s.dettagli, quantita: quantitaScheda });
    salvaCarrello();
    disegnaCarrello(true);
    stat("chiusaScheda");
    stat("aggiunto", p.id);
    nascondi(scheda, veloScheda, true);
    prodottoAperto = null;
    avviso(quantitaScheda > 1 ? `${quantitaScheda} × ${p.nome} nella tua richiesta` : p.nome + " è nella tua richiesta");
  });

  /* ---------- Richiesta (ex carrello) ---------- */
  let carrello = [];
  try { carrello = JSON.parse(localStorage.getItem(CHIAVE_CARRELLO)) || []; } catch (e) { carrello = []; }
  function salvaCarrello() {
    try { localStorage.setItem(CHIAVE_CARRELLO, JSON.stringify(carrello)); } catch (e) { /* memoria del browser non disponibile */ }
  }
  const pezzi = () => carrello.reduce((t, v) => t + v.quantita, 0);

  function disegnaCarrello(saltello) {
    const conta = $("#contaCarrello");
    conta.textContent = pezzi();
    conta.classList.toggle("visibile", pezzi() > 0);
    if (saltello) { conta.classList.remove("salta-su"); void conta.offsetWidth; conta.classList.add("salta-su"); }
    const vuoto = carrello.length === 0;
    $("#carrelloVuoto").hidden = !vuoto;
    $("#carrelloTotale").hidden = vuoto;
    $("#carrelloLista").innerHTML = carrello.map((v, i) => {
      const p = C.prodotti.find((x) => x.id === v.id) || { nome: v.nome, tinta: ["#F4DADC", "#E8B4B8"], foto: "" };
      return `<li class="voce">
        <div class="voce-figura">${figura(p, false)}</div>
        <div>
          <h4>${sicuro(v.nome)}</h4>
          <p class="voce-dettagli">${v.dettagli.map(sicuro).join(" · ")}</p>
          <div class="quantita">
            <button data-azione="meno" data-i="${i}" aria-label="Togli uno">−</button>
            <span>${v.quantita}</span>
            <button data-azione="piu" data-i="${i}" aria-label="Aggiungi uno">+</button>
          </div>
        </div>
        <div class="voce-destra">
          <button class="togli" data-azione="togli" data-i="${i}">Rimuovi</button>
        </div>
      </li>`;
    }).join("");
  }
  $("#carrelloLista").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-azione]");
    if (!b) return;
    const v = carrello[+b.dataset.i];
    if (b.dataset.azione === "piu") v.quantita++;
    if (b.dataset.azione === "meno") v.quantita--;
    if (b.dataset.azione === "togli" || v.quantita < 1) carrello.splice(+b.dataset.i, 1);
    salvaCarrello();
    disegnaCarrello();
  });

  const pannello = $("#carrello"), veloCarrello = $("#veloCarrello");
  function passo(id) {
    ["passoCarrello", "passoModulo", "passoGrazie", "passoErrore"].forEach((p) => { $("#" + p).hidden = p !== id; });
  }
  function apriCarrello() {
    passo("passoCarrello");
    stat("carrello");
    $("#avviso").classList.remove("visibile");
    pannello.setAttribute("aria-hidden", "false");
    mostra(pannello, veloCarrello);
    setTimeout(() => $("#chiudiCarrello").focus(), 60);
  }
  function chiudiCarrello() {
    pannello.setAttribute("aria-hidden", "true");
    nascondi(pannello, veloCarrello);
    $("#apriCarrello").focus({ preventScroll: true });
  }
  $("#apriCarrello").addEventListener("click", apriCarrello);
  $("#chiudiCarrello").addEventListener("click", chiudiCarrello);
  veloCarrello.addEventListener("click", chiudiCarrello);
  $$("[data-chiudi-carrello]").forEach((a) => a.addEventListener("click", chiudiCarrello));
  $("#procedi").addEventListener("click", () => { passo("passoModulo"); $('#moduloOrdine input[name="nome"]').focus(); });
  $("#indietro").addEventListener("click", () => passo("passoCarrello"));
  $("#riprova").addEventListener("click", () => passo("passoModulo"));

  /* ---------- Invio della richiesta (Netlify Forms) ---------- */
  function testoOrdine() {
    return carrello.map((v) => `• ${v.quantita} × ${v.nome} — ${v.dettagli.join(", ")}`).join("\n");
  }
  const modulo = $("#moduloOrdine");
  modulo.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!carrello.length) { passo("passoCarrello"); return; }
    $("#campoOrdine").value = testoOrdine();
    const dati = new FormData(modulo);
    const invia = $("#invia");
    invia.disabled = true; invia.textContent = "Invio in corso…";

    const corpo = `Ciao Chiara e Alessia,\nvorrei avere informazioni e il prezzo per:\n\n${testoOrdine()}\n\nNome: ${dati.get("nome")}\nEmail: ${dati.get("email")}\nTelefono: ${dati.get("telefono") || "-"}\nNote: ${dati.get("note") || "-"}`;
    $("#inviaEmail").href = `mailto:${EMAIL_ORDINI}?subject=${encodeURIComponent("Richiesta di informazioni dal sito")}&body=${encodeURIComponent(corpo)}`;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(dati).toString()
    })
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        stat("inviata", pezzi());
        carrello = []; salvaCarrello(); disegnaCarrello(); modulo.reset();
        passo("passoGrazie");
      })
      .catch(() => passo("passoErrore"))
      .finally(() => { invia.disabled = false; invia.textContent = "Invia la richiesta"; });
  });

  /* ---------- Avviso in basso ---------- */
  let timerAvviso;
  function avviso(testo) {
    const a = $("#avviso");
    a.textContent = testo;
    a.classList.add("visibile");
    clearTimeout(timerAvviso);
    timerAvviso = setTimeout(() => a.classList.remove("visibile"), 2600);
  }

  /* ---------- Menu, intestazione, tasto Esc ---------- */
  const menu = $("#menu"), hamburger = $("#hamburger");
  hamburger.addEventListener("click", () => {
    const aperto = menu.classList.toggle("aperto");
    hamburger.setAttribute("aria-expanded", aperto);
    document.body.classList.toggle("bloccato", aperto);
  });
  $$("a", menu).forEach((a) => a.addEventListener("click", () => {
    menu.classList.remove("aperto");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("bloccato");
  }));
  const testata = $("#testata");
  const suScorrimento = () => testata.classList.toggle("scorsa", window.scrollY > 30);
  window.addEventListener("scroll", suScorrimento, { passive: true });
  suScorrimento();
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (scheda.classList.contains("aperto")) chiudiScheda();
    else if (pannello.classList.contains("aperto")) chiudiCarrello();
    else if (menu.classList.contains("aperto")) hamburger.click();
  });

  /* ---------- Comparsa degli elementi durante lo scorrimento ---------- */
  function osserva() {
    const el = $$(".rivela:not(.visto)");
    if (!("IntersectionObserver" in window)) { el.forEach((x) => x.classList.add("visto")); return; }
    const io = new IntersectionObserver((voci) => {
      voci.forEach((v) => { if (v.isIntersecting) { v.target.classList.add("visto"); io.unobserve(v.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    el.forEach((x) => io.observe(x));
  }

  /* ---------- Avvio ---------- */
  disegnaFiltri();
  disegnaVetrina();
  disegnaCarrello();
  osserva();
})();
