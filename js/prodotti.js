/* ==========================================================================
   INTRECCI A DUE — Catalogo
   Qui si modificano prodotti, misure, colori e opzioni.
   - Sul sito non compaiono prezzi: il listino aggiornato è nel foglio
     "Listino prezzi Intrecci a Due". Le opzioni con "sovrapprezzo: true"
     mostrano solo la dicitura "con sovrapprezzo", senza cifra.
   - Per aggiungere una foto: mettere il file nella cartella /img e scrivere
     il nome in "foto", per esempio foto: "img/confetto.jpg"
   ========================================================================== */

window.CATALOGO = {

  categorie: [
    { id: "borse",    nome: "Borse",               intro: "Le nostre creazioni più golose: ogni borsa nasce punto dopo punto, nel colore e nei dettagli che scegli tu." },
    { id: "telefono", nome: "Per il telefono",     intro: "Lacci e custodie per portare sempre con sé un piccolo intreccio." },
    { id: "piccoli",  nome: "Accessori",           intro: "Portachiavi, presine e altri accessori da regalare, o da regalarsi." },
    /* "nascosta": non compare tra i filtri della vetrina, ha una sezione tutta sua (Cestini regalo) */
    { id: "cestini",  nome: "Cestini regalo",      intro: "", nascosta: true },
    /* anche questa è "nascosta": le decorazioni stanno nella sezione Natale */
    { id: "natale",   nome: "Collezione di Natale", intro: "", nascosta: true }
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

  /* Colori in più per i regali di Natale (cestini e decorazioni, con "coloriNatale: true") */
  coloriNatale: [
    { nome: "Rosso",        hex: "#B0263A" },
    { nome: "Verde",        hex: "#3F6B45" },
    { nome: "Bianco",       hex: "#FFFFFF" }
  ],

  /* Personalizzazioni disponibili per le borse */
  materiali: [
    { nome: "Soft" },
    { nome: "Pelle", sovrapprezzo: true }
  ],
  extra: [
    { id: "bicolor",   nome: "Borsa bicolore", sovrapprezzo: true },
    { id: "perline",   nome: "Perline",        sovrapprezzo: true },
    { id: "paillettes",nome: "Paillettes",     sovrapprezzo: true },
    { id: "iniziali",  nome: "Iniziali",       sovrapprezzo: true },
    { id: "tracolla",  nome: "Tracolla",       sovrapprezzo: true }
  ],

  /* Prodotti
     - misure: elenco delle varianti (misure)
     - personalizzabile: true = mostra materiale ed extra (solo borse)
     - coloriExtra (facoltativo): colori in più disponibili solo per quel prodotto
     - tinta: i due colori dello sfondo provvisorio finché non c'è la foto */
  prodotti: [
    { id: "confetto",   nome: "Confetto Bag",   categoria: "borse", foto: "img/confetto.jpg", personalizzabile: true,
      misure: [ { nome: "Clutch media · 21 cm" }, { nome: "Clutch grande · 25,5 cm" } ],
      tinta: ["#F6E7E4", "#E9B7BD"] },
    { id: "bonbon",     nome: "Bonbon Bag",     categoria: "borse", foto: "img/bonbon.jpg", personalizzabile: true,
      misure: [ { nome: "25 cm" } ],
      tinta: ["#F3E1D6", "#D9A79A"] },
    { id: "tavoletta",  nome: "Tavoletta Bag",  categoria: "borse", foto: "img/tavoletta.jpg", personalizzabile: true,
      misure: [ { nome: "20 cm" }, { nome: "30 cm" } ],
      tinta: ["#EADBCF", "#7A5236"] },
    { id: "cassata",    nome: "Cassata Bag",    categoria: "borse", foto: "img/cassata.jpg", personalizzabile: true,
      misure: [ { nome: "17 cm" }, { nome: "33 cm" } ],
      tinta: ["#F4EEE2", "#B9CFA8"] },
    { id: "lampone",    nome: "Lampone Bag",    categoria: "borse", foto: "img/lampone.jpg", personalizzabile: true,
      misure: [ { nome: "19 cm" } ],
      tinta: ["#F6DDE1", "#C2455E"] },
    { id: "tortellino", nome: "Tortellino Bag", categoria: "borse", foto: "img/tortellino.jpg", personalizzabile: true,
      misure: [ { nome: "25 cm" } ],
      tinta: ["#F7EBD3", "#E2B86B"] },
    { id: "amarena",    nome: "Amarena Bag",    categoria: "borse", foto: "img/amarena.jpg", personalizzabile: true,
      misure: [ { nome: "28 cm" } ],
      tinta: ["#F2DADF", "#6E1F2E"] },
    { id: "confetto-pelle", nome: "Confetto in pelle", categoria: "borse", foto: "img/confetto-pelle.jpg", personalizzabile: true, soloPelle: true,
      misure: [ { nome: "24 cm" } ],
      tinta: ["#EFE2D6", "#8A5A44"] },
    { id: "mezzaluna",  nome: "Mezzaluna Bag",  categoria: "borse", foto: "img/mezzaluna.jpg", personalizzabile: true,
      misure: [ { nome: "Taglia unica" } ],
      /* colori in più solo per questa borsa */
      coloriExtra: [ { nome: "Verde", hex: "#3F6B45" }, { nome: "Blu", hex: "#1F3A68" } ],
      tinta: ["#F1E9DD", "#C9A989"] },

    { id: "laccio-polso",     nome: "Laccio da polso",               categoria: "telefono", foto: "img/laccio-polso.jpg",
      misure: [ { nome: "" } ],  tinta: ["#F4E6E6", "#E9B7BD"] },
    { id: "laccio-fettuccia", nome: "Laccio da collo in fettuccia",  categoria: "telefono", foto: "img/laccio-fettuccia.jpg",
      misure: [ { nome: "" } ],  tinta: ["#EEE6DB", "#A9C8E0"] },
    { id: "laccio-cordino",   nome: "Laccio da collo in cordino",    categoria: "telefono", foto: "img/laccio-cordino.jpg",
      misure: [ { nome: "" } ],  tinta: ["#F1E4DA", "#8A3A55"] },
    { id: "porta-tablet",     nome: "Porta tablet",                  categoria: "telefono", foto: "img/porta-tablet.jpg",
      misure: [ { nome: "" } ], tinta: ["#ECE3D6", "#5B7896"] },
    { id: "porta-iqos",       nome: "Porta Iqos",                    categoria: "telefono", foto: "img/porta-iqos.jpg",
      misure: [ { nome: "" } ], tinta: ["#F2E8DF", "#7A5236"] },
    { id: "porta-airpods",    nome: "Porta AirPods",                 categoria: "telefono", foto: "img/porta-airpods.jpg",
      misure: [ { nome: "" } ],  tinta: ["#F5ECE4", "#D9A79A"] },

    { id: "portachiavi",  nome: "Portachiavi con decoro", categoria: "piccoli", foto: "img/portachiavi.jpg",
      misure: [ { nome: "" } ],  tinta: ["#F6E7E4", "#C2455E"] },
    { id: "fiocco",       nome: "Portachiavi fiocco",     categoria: "piccoli", foto: "img/fiocco.jpg",
      misure: [ { nome: "" } ],  tinta: ["#F7EEF0", "#E9B7BD"] },
    { id: "presina",      nome: "Presina / Sottopentola", categoria: "piccoli", foto: "img/presina.jpg",
      misure: [ { nome: "" } ],  tinta: ["#F3EAD9", "#B9CFA8"] },
    { id: "portamonete",  nome: "Porta monete",           categoria: "piccoli", foto: "img/portamonete.jpg",
      misure: [ { nome: "" } ],  tinta: ["#F1E4DA", "#6E1F2E"] },
    { id: "scrunchies",   nome: "Scrunchies",             categoria: "piccoli", foto: "img/scrunchies.jpg",
      misure: [ { nome: "" } ], tinta: ["#F6E9EC", "#8A3A55"] },

    /* Cestini regalo: si vende solo il cestino (i cioccolatini nella foto sono un esempio) */
    { id: "cestino",      nome: "Cestino regalo",         categoria: "cestini", foto: "img/cestino.jpg", coloriNatale: true,
      descrizione: "Un piccolo cestino da riempire con cioccolatini, dolcetti o un pensiero speciale.",
      misure: [ { nome: "" } ], tinta: ["#F3EAD9", "#B0263A"] },

    /* Collezione di Natale: compaiono nella sezione Natale e si aggiungono alla richiesta come gli altri prodotti.
       - "nota" (facoltativa): la riga sotto il nome; se manca si legge "All'uncinetto · su richiesta"
       - "domanda" (facoltativa): una casella di testo nella scheda, per chiedere un dettaglio alla cliente */
    { id: "natale-pallina",   nome: "Pallina",                 categoria: "natale", foto: "img/natale-pallina.jpg", coloriNatale: true,
      misure: [ { nome: "" } ], tinta: ["#F4E3E3", "#B0263A"] },
    { id: "natale-stella",    nome: "Stella",                  categoria: "natale", foto: "img/natale-stella.jpg", coloriNatale: true,
      misure: [ { nome: "" } ], tinta: ["#F6EEDC", "#D4A645"] },
    { id: "natale-omino",     nome: "Omino di pan di zenzero", categoria: "natale", foto: "img/natale-omino.jpg", coloriNatale: true,
      misure: [ { nome: "" } ], tinta: ["#F1E2D2", "#A9663B"] },
    { id: "natale-alberello",                   nome: "Alberello",                      categoria: "natale", foto: "img/natale-alberello.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#EAF0E3", "#2F5A3E"] },
    /* Ghirlande: pezzi già pronti, come in foto (niente scelta del colore).
       - "disponibili": quante ne restano. Aggiornarlo a ogni vendita; con 0 la ghirlanda risulta esaurita. */
    { id: "natale-ghirlanda", nome: "Ghirlanda renna",                 categoria: "natale", foto: "img/natale-ghirlanda.jpg", coloreFisso: true, disponibili: 7,
      misure: [ { nome: "" } ], tinta: ["#F1E2D2", "#7A5236"] },
    { id: "natale-ghirlanda-bianca-bordeaux",   nome: "Ghirlanda bianca e bordeaux",    categoria: "natale", foto: "img/natale-ghirlanda-bianca-bordeaux.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#F7F0E8", "#6E1F2E"] },
    { id: "natale-ghirlanda-pon-pon",           nome: "Ghirlanda bianca con pon pon",   categoria: "natale", foto: "img/natale-ghirlanda-pon-pon.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#F7F0E8", "#B0263A"] },
    { id: "natale-ghirlanda-intrecciata",       nome: "Ghirlanda rossa e verde",        categoria: "natale", foto: "img/natale-ghirlanda-intrecciata.jpg", coloreFisso: true, disponibili: 3,
      misure: [ { nome: "" } ], tinta: ["#B0263A", "#3F6B45"] },
    { id: "natale-ghirlanda-verde-bordo-rosso", nome: "Ghirlanda verde con bordo rosso", categoria: "natale", foto: "img/natale-ghirlanda-verde-bordo-rosso.jpg", coloreFisso: true, disponibili: 5,
      misure: [ { nome: "" } ], tinta: ["#3F6B45", "#B0263A"] },
    { id: "natale-ghirlanda-verde",             nome: "Ghirlanda verde",                categoria: "natale", foto: "img/natale-ghirlanda-verde.jpg", coloreFisso: true, disponibili: 7,
      misure: [ { nome: "" } ], tinta: ["#EAF0E3", "#3F6B45"] },
    { id: "natale-ghirlanda-marrone",           nome: "Ghirlanda marrone e panna",      categoria: "natale", foto: "img/natale-ghirlanda-marrone.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#F7F0E8", "#6B4A33"] },
    { id: "natale-ghirlanda-stivaletto",        nome: "Ghirlanda bianca con stivaletto", categoria: "natale", foto: "img/natale-ghirlanda-stivaletto.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#F7F0E8", "#6B4A33"] },
    { id: "natale-ghirlanda-bordeaux",          nome: "Ghirlanda bordeaux con campanelle", categoria: "natale", foto: "img/natale-ghirlanda-bordeaux.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#F4E3E3", "#6E1F2E"] },
    { id: "natale-ghirlanda-rossa-fiocco",      nome: "Ghirlanda rossa con fiocco di neve", categoria: "natale", foto: "img/natale-ghirlanda-rossa-fiocco-di-neve.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#F7F0E8", "#B0263A"] },
    { id: "natale-ghirlanda-rossa-campanella",  nome: "Ghirlanda rossa con campanella", categoria: "natale", foto: "img/natale-ghirlanda-rossa-campanella.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#F4E3E3", "#B0263A"] },
    { id: "natale-ghirlanda-blu",               nome: "Ghirlanda blu con renna",        categoria: "natale", foto: "img/natale-ghirlanda-blu.jpg", coloreFisso: true, disponibili: 4,
      misure: [ { nome: "" } ], tinta: ["#E6EAF2", "#1F2A4D"] },
    { id: "natale-cuore",                       nome: "Cuore panna e marrone",          categoria: "natale", foto: "img/natale-cuore.jpg", coloreFisso: true, disponibili: 4, nota: "All'uncinetto · pronto · venduto singolo",
      misure: [ { nome: "" } ], tinta: ["#F7F0E8", "#5A3A30"] }
  ]

};
