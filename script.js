
// Seleziono tutte le parole con data-img
document.querySelectorAll("li[data-img]").forEach(li => {
  li.addEventListener("click", () => {

    // Evita duplicati: controlla se esiste già un box con la stessa immagine
    const existing = document.querySelector(`.image-toggle[data-img="${li.dataset.img}"]`);
    if (!existing) {

      // Creo il div che conterrà l'immagine
      const div = document.createElement("div");
      div.classList.add("image-toggle"); // classe base
      if (li.dataset.class) div.classList.add(li.dataset.class); // classe posizione/dimensione
      div.dataset.img = li.dataset.img;

      // Creo il tag <img>
      const img = document.createElement("img");
      img.src = `images/${li.dataset.img}.png`;
      img.alt = li.textContent;

      // Inserisco immagine nel div
      div.appendChild(img);

      // Aggiungo il div al body
      document.body.appendChild(div);

      // Mostro il box
      div.style.display = "block";

      /*AUTO-CHIUSURA DOPO 2 MINUTI */
      const delay = li.dataset.time ? parseInt(li.dataset.time) : 120000;
      const autoClose = setTimeout(() => {
        div.remove();
      }, delay);

      /*CHIUSURA MANUALE AL CLICK */
      div.addEventListener("click", () => {
        clearTimeout(autoClose); // cancella il timer
        div.remove();
      });
    }
  });
});
// 1. Seleziono gli elementi necessari
const stars = document.querySelectorAll('.star');
const allListItems = document.querySelectorAll('.list-centrate li');
const resetBtn = document.getElementById('reset-btn');

// --- LOGICA DEI FILTRI (STELLE) ---
stars.forEach(star => {
    star.addEventListener('click', () => {
        // Attiva/disattiva la stella cliccata
        star.classList.toggle('active');

        // Crea un array con i filtri attualmente attivi
        const activeFilters = Array.from(document.querySelectorAll('.star.active'))
                                   .map(s => s.getAttribute('data-filter'));

        allListItems.forEach(li => {
            const itemTag = li.getAttribute('data-tags');

            if (activeFilters.length === 0) {
                // Se nessun filtro è attivo, tutto è visibile
                li.classList.remove('is-filtered');
            } else {
                // Se il li ha uno dei tag attivi, rimane visibile, altrimenti trasparente
                if (activeFilters.includes(itemTag)) {
                    li.classList.remove('is-filtered');
                } else {
                    li.classList.add('is-filtered');
                }
            }
        });
    });
});

// --- LOGICA TASTO RESET (PULISCI TUTTO) ---
resetBtn.addEventListener('click', () => {
    // A. Disattiva tutte le stelle
    stars.forEach(s => s.classList.remove('active'));

    // B. Rendi di nuovo visibili tutte le parole delle liste
    allListItems.forEach(li => {
        li.classList.remove('is-filtered');
    });

    // C. Chiudi tutte le immagini/box aperti
    const openImages = document.querySelectorAll('.image-toggle');
    openImages.forEach(imgDiv => {
        imgDiv.remove();
    });
});