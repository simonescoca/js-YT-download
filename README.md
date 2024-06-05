# YouTube Video / Audio Downloader

## Descrizione
Questo progetto permette di scaricare video da YouTube, oppure solo la parte audio di un video.

## Requisiti
L'applicazione necessita di FFmpeg. Se non l'hai già installato, l'esecuzione dell'applicazione
ti dirà quali sono i passaggi da fare per installare FFmpeg a seconda del tuo sistema operativo.

## Installazione
Esegui `npm i` seguente per installare le dipendenze.

## Utilizzo
Nella directory del progetto eseguire `node src/main/app.js` per eseguire l'app.
Incollare l'URL del video desiderato. Se si vuole sia video che audio, precedere l'URL con l'istruzione `-fv <URL>` altrimenti, se si desidera solo l'audio incollare l'URL senza nessuna istruzione.

## Consigli
Per convertire il progetto in un eseguibile per MacOS, installare globalmente la dipendenza PKG con il comando `npm i -g pkg`. Una volta installata la dipendenza, posizionarsi sulla directory del progetto ed eseguire `pkg -t node18-macos-arm64 src/main/app.js`.