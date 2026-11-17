/* ==========================================================================
   INTRECCI A DUE — Catalogo
   Qui si modificano prodotti, prezzi, colori e opzioni.
   - Per aggiungere una foto: mettere il file nella cartella /img e scrivere
     il nome in "foto", per esempio foto: "img/confetto.jpg"
   - I prezzi sono in euro, senza simbolo.
   ========================================================================== */

window.CATALOGO = {

  categorie: [
    { id: "borse",    nome: "Borse",               intro: "Le nostre creazioni più golose: ogni borsa nasce punto dopo punto, nel colore e nei dettagli che scegli tu." },
    { id: "telefono", nome: "Per il telefono",     intro: "Lacci e custodie per portare sempre con sé un piccolo intreccio." },
    { id: "piccoli",  nome: "Piccoli dolci",       intro: "Portachiavi, presine e accessori da regalare, o da regalarsi." }
  ],

  /* Colori disponibili (gratuiti). "hex" serve solo per il campione di colore sul sito. */
  colori: [
    { nome: "Panna",        hex: "#F3EAD9" },
    { nome: "Rosa",         hex: "#E9B7BD" },
    { nome: "Bordeaux",     hex: "#6E1F2E" },
    { nome: "Jeans",        hex: "#5B7896" },
    { nome: "Marrone",      hex: "#7A5236" },
    { nome: "Azzurro",      hex: "#A9C8E0" },
    { nome: "Vinaccia",     hex: "#8A3A55" },
    { nome: "Testa di moro",hex: "#3E2A22" }
  ],

  /* Personalizzazioni disponibili per le borse */
  materiali: [
    { nome: "Soft",  prezzo: 0 },
    { nome: "Pelle", prezzo: 10 }
  ],
  extra: [
    { id: "bicolor",   nome: "Borsa bicolore", prezzo: 5 },
    { id: "perline",   nome: "Perline",        prezzo: 5 },
    { id: "paillettes",nome: "Paillettes",     prezzo: 5 },
    { id: "iniziali",  nome: "Iniziali",       prezzo: 3 },
    { id: "tracolla",  nome: "Tracolla",       prezzo: 5 }
  ],

  /* Prodotti
     - misure: elenco delle varianti con il loro prezzo
     - personalizzabile: true = mostra materiale ed extra (solo borse)
     - tinta: i due colori dello sfondo provvisorio finché non c'è la foto */
  prodotti: [
    { id: "confetto",   nome: "Confetto Bag",   categoria: "borse", foto: "img/confetto.jpg", personalizzabile: true,
      misure: [ { nome: "Clutch media · 21 cm", prezzo: 30 }, { nome: "Clutch grande · 25,5 cm", prezzo: 35 } ],
      tinta: ["#F6E7E4", "#E9B7BD"] },
    { id: "bonbon",     nome: "Bonbon Bag",     categoria: "borse", foto: "img/bonbon.jpg", personalizzabile: true,
      misure: [ { nome: "25 cm", prezzo: 35 } ],
      tinta: ["#F3E1D6", "#D9A79A"] },
    { id: "tavoletta",  nome: "Tavoletta Bag",  categoria: "borse", foto: "img/tavoletta.jpg", personalizzabile: true,
      misure: [ { nome: "20 cm", prezzo: 20 }, { nome: "30 cm", prezzo: 25 } ],
      tinta: ["#EADBCF", "#7A5236"] },
    { id: "cassata",    nome: "Cassata Bag",    categoria: "borse", foto: "img/cassata.jpg", personalizzabile: true,
      misure: [ { nome: "17 cm", prezzo: 25 }, { nome: "33 cm", prezzo: 35 } ],
      tinta: ["#F4EEE2", "#B9CFA8"] },
    { id: "lampone",    nome: "Lampone Bag",    categoria: "borse", foto: "img/lampone.jpg", personalizzabile: true,
      misure: [ { nome: "19 cm", prezzo: 35 } ],
      tinta: ["#F6DDE1", "#C2455E"] },
    { id: "tortellino", nome: "Tortellino Bag", categoria: "borse", foto: "img/tortellino.jpg", personalizzabile: true,
      misure: [ { nome: "25 cm", prezzo: 30 } ],
      tinta: ["#F7EBD3", "#E2B86B"] },
    { id: "amarena",    nome: "Amarena Bag",    categoria: "borse", foto: "img/amarena.jpg", personalizzabile: true,
      misure: [ { nome: "28 cm", prezzo: 30 } ],
      tinta: ["#F2DADF", "#6E1F2E"] },
    { id: "confetto-pelle", nome: "Confetto in pelle", categoria: "borse", foto: "img/confetto-pelle.jpg", personalizzabile: true, soloPelle: true,
      misure: [ { nome: "24 cm", prezzo: 45 } ],
      tinta: ["#EFE2D6", "#8A5A44"] },
    { id: "mezzaluna",  nome: "Mezzaluna Bag",  categoria: "borse", foto: "img/mezzaluna.jpg", personalizzabile: true,
      misure: [ { nome: "Taglia unica", prezzo: 35 } ],
      tinta: ["#F1E9DD", "#C9A989"] },

    { id: "laccio-polso",     nome: "Laccio da polso",               categoria: "telefono", foto: "img/laccio-polso.jpg",
      misure: [ { nome: "", prezzo: 3 } ],  tinta: ["#F4E6E6", "#E9B7BD"] },
    { id: "laccio-fettuccia", nome: "Laccio da collo in fettuccia",  categoria: "telefono", foto: "img/laccio-fettuccia.jpg",
      misure: [ { nome: "", prezzo: 5 } ],  tinta: ["#EEE6DB", "#A9C8E0"] },
    { id: "laccio-cordino",   nome: "Laccio da collo in cordino",    categoria: "telefono", foto: "img/laccio-cordino.jpg",
      misure: [ { nome: "", prezzo: 8 } ],  tinta: ["#F1E4DA", "#8A3A55"] },
    { id: "porta-tablet",     nome: "Porta tablet",                  categoria: "telefono", foto: "img/porta-tablet.jpg",
      misure: [ { nome: "", prezzo: 15 } ], tinta: ["#ECE3D6", "#5B7896"] },
    { id: "porta-iqos",       nome: "Porta Iqos",                    categoria: "telefono", foto: "img/porta-iqos.jpg",
      misure: [ { nome: "", prezzo: 10 } ], tinta: ["#F2E8DF", "#7A5236"] },
    { id: "porta-airpods",    nome: "Porta AirPods",                 categoria: "telefono", foto: "img/porta-airpods.jpg",
      misure: [ { nome: "", prezzo: 8 } ],  tinta: ["#F5ECE4", "#D9A79A"] },

    { id: "portachiavi",  nome: "Portachiavi con decoro", categoria: "piccoli", foto: "img/portachiavi.jpg",
      misure: [ { nome: "", prezzo: 5 } ],  tinta: ["#F6E7E4", "#C2455E"] },
    { id: "fiocco",       nome: "Portachiavi fiocco",     categoria: "piccoli", foto: "img/fiocco.jpg",
      misure: [ { nome: "", prezzo: 5 } ],  tinta: ["#F7EEF0", "#E9B7BD"] },
    { id: "presina",      nome: "Presina / Sottopentola", categoria: "piccoli", foto: "img/presina.jpg",
      misure: [ { nome: "", prezzo: 5 } ],  tinta: ["#F3EAD9", "#B9CFA8"] },
    { id: "portamonete",  nome: "Porta monete",           categoria: "piccoli", foto: "img/portamonete.jpg",
      misure: [ { nome: "", prezzo: 8 } ],  tinta: ["#F1E4DA", "#6E1F2E"] },
    { id: "scrunchies",   nome: "Scrunchies",             categoria: "piccoli", foto: "img/scrunchies.jpg",
      misure: [ { nome: "", prezzo: 10 } ], tinta: ["#F6E9EC", "#8A3A55"] }
  ],

  /* Collezione di Natale: senza prezzo, si chiedono informazioni */
  natale: [
    { nome: "Pallina",                    foto: "", tinta: ["#F4E3E3", "#B0263A"] },
    { nome: "Stella",                     foto: "", tinta: ["#F6EEDC", "#D4A645"] },
    { nome: "Omino di pan di zenzero",    foto: "", tinta: ["#F1E2D2", "#A9663B"] },
    { nome: "Ghirlandina",                foto: "", tinta: ["#EAF0E3", "#4F6B45"] }
  ]
};
