# Intrecci a Due · sito

Sito del brand Intrecci a Due: borse e accessori all'uncinetto fatti a mano da Chiara e Alessia.

## Dove si modifica cosa

| Cosa | File |
|---|---|
| Prodotti, misure, colori, personalizzazioni, decorazioni di Natale (senza prezzi: il listino è nel foglio «Listino prezzi Intrecci a Due») | `js/prodotti.js` |
| Recensioni delle clienti | `js/recensioni.js` |
| Testi delle sezioni (chi siamo, mercatini, domande frequenti) | `index.html` |
| Colori e caratteri del sito | `css/style.css`, all'inizio, nella parte `:root` |
| Foto | cartella `img/` |
| Condizioni di vendita e privacy (se cambia qualcosa, aggiornare anche la data in cima alla pagina) | `condizioni.html`, `privacy.html` |
| Caratteri tipografici (ospitati sul sito) | cartella `fonts/` |

## Aggiungere le foto

1. Mettere la foto nella cartella `img/`, con un nome semplice senza spazi (es. `confetto.jpg`).
2. In `js/prodotti.js`, nel prodotto giusto, scrivere `foto: "img/confetto.jpg"`.

Le foto rendono meglio se sono verticali (proporzione 4:5), luminose e con lo stesso sfondo.
Finché un prodotto non ha la foto, il sito mostra un disegno provvisorio nei colori del prodotto.

## Richieste di informazioni

Sul sito non ci sono prezzi: la cliente sceglie prodotti e personalizzazioni (quelle a pagamento compaiono con la dicitura «con sovrapprezzo»), li aggiunge alla sua richiesta (icona dell'aeroplanino) e la invia. Il prezzo lo comunicate voi rispondendo.

Il modulo (che su Netlify si chiama ancora «ordine») usa Netlify Forms. Su Netlify bisogna:

1. attivare il rilevamento dei moduli (Forms → Enable form detection) e ripubblicare;
2. aggiungere la notifica via email (Forms → Form notifications → Add notification → Email notification).

Se l'invio non riesce, il sito propone di mandare la richiesta via email a intrecciadue@gmail.com.
