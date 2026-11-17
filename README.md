# Intrecci a Due · sito

Sito del brand Intrecci a Due: borse e accessori all'uncinetto fatti a mano da Chiara e Alessia.

## Dove si modifica cosa

| Cosa | File |
|---|---|
| Prodotti, prezzi, misure, colori, personalizzazioni, decorazioni di Natale | `js/prodotti.js` |
| Recensioni delle clienti | `js/recensioni.js` |
| Testi delle sezioni (chi siamo, mercatini, domande frequenti) | `index.html` |
| Colori e caratteri del sito | `css/style.css`, all'inizio, nella parte `:root` |
| Foto | cartella `img/` |
| Condizioni di vendita e privacy (bozze da completare: parti evidenziate in giallo) | `condizioni.html`, `privacy.html` |
| Caratteri tipografici (ospitati sul sito) | cartella `fonts/` |

## Aggiungere le foto

1. Mettere la foto nella cartella `img/`, con un nome semplice senza spazi (es. `confetto.jpg`).
2. In `js/prodotti.js`, nel prodotto giusto, scrivere `foto: "img/confetto.jpg"`.

Le foto rendono meglio se sono verticali (proporzione 4:5), luminose e con lo stesso sfondo.
Finché un prodotto non ha la foto, il sito mostra un disegno provvisorio nei colori del prodotto.

## Ordini

Il modulo d'ordine usa Netlify Forms. Su Netlify bisogna:

1. attivare il rilevamento dei moduli (Forms → Enable form detection) e ripubblicare;
2. aggiungere la notifica via email (Forms → Form notifications → Add notification → Email notification).

Se l'invio non riesce, il sito propone di mandare l'ordine via email a intrecciadue@gmail.com.
