
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
