import {
  repartirCartas,
  takeCard,
  addCartToHand,
  discardCard,
  calcularPuntuacionManoJugador,
  handleClickOnPozo,
  handleClickOnMazo,
} from './gameFunctions.js';

document.addEventListener("DOMContentLoaded", function () {
  // Declaración de variables
  let mazo = [];
  let manoJug = [];
  let manoRival = [];
  let pozoDeDescartes = [];
  let puntajeTotalJugador = 0;
  let puntajeTotalRival = 0;
  let cardHold = [];
  let cartaDescartada = [];

  // Función para actualizar la representación visual de las cartas en el HTML
  function actualizarCartasEnHTML(container, cartas) {
    cartas.forEach((carta) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.innerHTML = `
        <span class="card-value">${carta.valor}</span>
        <span class="card-suit">${carta.palo}</span>
      `;
      container.appendChild(cardDiv);
    });
  }

  // Llamar a la función para repartir las cartas
  const manos = repartirCartas();
  mazo = manos.mazo;
  manoJug = manos.jugador;
  manoRival = manos.rival;
  pozoDeDescartes = manos.pozo;

  // Actualizar la representación visual de las cartas del jugador en el HTML
  const jugadorContainer = document.querySelector(".player");
  actualizarCartasEnHTML(jugadorContainer, manos.jugador);

  // Actualizar la representación visual de las cartas del rival en el HTML
  const rivalContainer = document.querySelector(".opponent");
  actualizarCartasEnHTML(rivalContainer, manos.rival);

  // Actualizar la representación visual de las cartas del pozo de descartes
  const pozoContainer = document.querySelector(".discardDeck");
  actualizarCartasEnHTML(pozoContainer, manos.pozo);

  // ...

  // Obtener los elementos del mazo y el pozo de descartes
  const mazoElement = document.querySelector(".mazo");
  const pozoElement = document.querySelector(".discardDeck");

  // Agregar manejadores de eventos a los elementos del mazo y el pozo de descartes
  mazoElement.addEventListener("click", handleClickOnMazo);
  pozoElement.addEventListener("click", handleClickOnPozo);
});
