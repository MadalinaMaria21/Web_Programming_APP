self.onmessage = function(event) {
    console.log("Worker: Am primit notificare de la scriptul principal.");

    // Trimitem înapoi un mesaj către scriptul principal pentru a notifica că worker-ul a fost activat
    self.postMessage("Worker: Notificare primită cu succes.");
};