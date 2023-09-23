import {
  repartirCartas,
  takeCard,
  addCartToHand,
  discardCard,
  calcularPuntuacionManoJugador,
} from './gameFunctions.js';

document.addEventListener("DOMContentLoaded", function () {


      let mazo = [];
      let manoJug = [];
      let manoRival = [];
      let pozoDeDescartes = [];
      let puntajeTotalJugador = 0;
      let puntajeTotalRival = 0;
      let cardHold = [];
      let cartaDescartada = [];

 

  // Llamar a la función para repartir las cartas
  const manos = repartirCartas();
  console.log("Mano del jugador: ", manos.jugador);
  console.log("Mano del rival: ", manos.rival);
  console.log("Mazo: ", manos.mazo);
  console.log("pOzo: ", manos.pozo);
  mazo = manos.mazo;
  manoJug = manos.jugador;
  manoRival = manos.rival;
  pozoDeDescartes = manos.pozo;

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
  manos.rival.forEach((carta, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
      <span class="card-value">?</span>
      <span class="card-suit">?</span>
    `;
    rivalContainer.appendChild(cardDiv);
  });




// 

const cartaHoldeada = takeCard();
console.log("Carta holdeada ", cardHold);

//Puntos Final de Ronda
// Llama a la función para calcular la puntuación del jugador
const puntuacionJugador = calcularPuntuacionManoJugador(manos.jugador);
console.log("Puntuación del jugador:", puntuacionJugador);

// Llama a la función para calcular la puntuación del rival
const puntuacionRival = calcularPuntuacionManoJugador(manos.rival);
console.log("Puntuación del rival:", puntuacionRival);

// Suma los puntajes de la ronda actual a los puntajes totales
puntajeTotalJugador += puntuacionJugador;
puntajeTotalRival += puntuacionRival;

const puntuacionJugadorElement = document.getElementById("puntuacionJugador");
const puntuacionRivalElement = document.getElementById("puntuacionRival");

// Selecciona los elementos HTML donde deseas mostrar los puntajes
puntuacionJugadorElement.classList.add("puntuacion");
puntuacionRivalElement.classList.add("puntuacion");

// Actualiza el contenido de los elementos con los puntajes totales
puntuacionJugadorElement.textContent = `Puntuación total del jugador: ${puntajeTotalJugador}`;
puntuacionRivalElement.textContent = `Puntuación total del rival: ${puntajeTotalRival}`;

addCartToHand();
discardCardValidation(manoJug[0]);
console.log("card hold", cardHold);

});





