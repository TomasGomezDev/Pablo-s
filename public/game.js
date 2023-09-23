document.addEventListener("DOMContentLoaded", function () {

    const cartasEspanolas = [
        { valor: 1, palo: "bastos" },
        { valor: 2, palo: "bastos" },
        { valor: 3, palo: "bastos" },
        { valor: 4, palo: "bastos" },
        { valor: 5, palo: "bastos" },
        { valor: 6, palo: "bastos" },
        { valor: 7, palo: "bastos" },
        { valor: 8, palo: "bastos" },
        { valor: 9, palo: "bastos" },
        { valor: 10, palo: "bastos" },
        { valor: 11, palo: "bastos" },
        { valor: 12, palo: "bastos" },
        { valor: 1, palo: "oro" },
        { valor: 2, palo: "oro" },
        { valor: 3, palo: "oro" },
        { valor: 4, palo: "oro" },
        { valor: 5, palo: "oro" },
        { valor: 6, palo: "oro" },
        { valor: 7, palo: "oro" },
        { valor: 8, palo: "oro" },
        { valor: 9, palo: "oro" },
        { valor: 10, palo: "oro" },
        { valor: 11, palo: "oro" },
        { valor: 12, palo: "oro" },
        { valor: 1, palo: "espadas" },
        { valor: 2, palo: "espadas" },
        { valor: 3, palo: "espadas" },
        { valor: 4, palo: "espadas" },
        { valor: 5, palo: "espadas" },
        { valor: 6, palo: "espadas" },
        { valor: 7, palo: "espadas" },
        { valor: 8, palo: "espadas" },
        { valor: 9, palo: "espadas" },
        { valor: 10, palo: "espadas" },
        { valor: 11, palo: "espadas" },
        { valor: 12, palo: "espadas" },
        { valor: 1, palo: "copa" },
        { valor: 2, palo: "copa" },
        { valor: 3, palo: "copa" },
        { valor: 4, palo: "copa" },
        { valor: 5, palo: "copa" },
        { valor: 6, palo: "copa" },
        { valor: 7, palo: "copa" },
        { valor: 8, palo: "copa" },
        { valor: 9, palo: "copa" },
        { valor: 10, palo: "copa" },
        { valor: 11, palo: "copa" },
        { valor: 12, palo: "copa" },
      ];
      
   // Función para repartir 4 cartas al azar para el jugador y 4 para el rival
   function repartirCartas() {
    const manoJugador = [];
    const manoRival = [];
    const cartasMezcladas = [...cartasEspanolas].sort(() => Math.random() - 0.5);

    // Repartir 4 cartas para el jugador
    for (let i = 0; i < 4; i++) {
      manoJugador.push(cartasMezcladas.pop());
    }

    // Repartir 4 cartas para el rival
    for (let i = 0; i < 4; i++) {
      manoRival.push(cartasMezcladas.pop());
    }

    return { jugador: manoJugador, rival: manoRival };
  }

  // Llamar a la función para repartir las cartas
  const manos = repartirCartas();
  console.log("Mano del jugador:", manos.jugador);
  console.log("Mano del rival:", manos.rival);

  // Actualizar la representación visual de las cartas del jugador en el HTML
  const jugadorContainer = document.querySelector(".player");
  manos.jugador.forEach((carta) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
      <span class="card-value">${carta.valor}</span>
      <span class="card-suit">${carta.palo}</span>
    `;
    jugadorContainer.appendChild(cardDiv);
  });

  // Actualizar la representación visual de las cartas del rival en el HTML
  const rivalContainer = document.querySelector(".opponent");
  manos.rival.forEach((carta) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
      <span class="card-value">?</span>
      <span class="card-suit">?</span>
    `;
    rivalContainer.appendChild(cardDiv);
  });
});