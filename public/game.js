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

      let mazo = [];
      let manoJug = [];
      let manoRival = [];
      let pozoDeDescartes = [];
      let puntajeTotalJugador = 0;
      let puntajeTotalRival = 0;
      let cardHold = [];
      let cartaDescartada = [];

  // Función para repartir 4 cartas al azar para el jugador y 4 para el rival
  function repartirCartas() {
    const manoJugador = [];
    const manoRival = [];
    const cartasMezcladas = [...cartasEspanolas].sort(() => Math.random() - 0.5);
    const pozoDescartes = [];
      
    // Repartir 4 cartas para el jugador
    for (let i = 0; i < 4; i++) {
      manoJugador.push(cartasMezcladas.pop());
    }
    // Repartir 4 cartas para el rival
    for (let i = 0; i < 4; i++) {
      manoRival.push(cartasMezcladas.pop());
    }
  pozoDescartes.push(cartasMezcladas.pop());
    
    return { jugador: manoJugador, rival: manoRival, mazo: cartasMezcladas, pozo: pozoDescartes};
  }

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




// Hold card

function takeCard() {
  const cartaRobada = mazo.pop();
  console.log("Carta robada ", cartaRobada);
  console.log("mazo luego de robar ", mazo);

  return cartaRobada
}

const cartaHoldeada = takeCard();
console.log("Carta holdeada ", cartaHoldeada);
cardHold = cartaHoldeada

// Add card to hand

 function addCartToHand(cardHold) {
   manoJug.push(cardHold.pop());
  console.log("Nueva mano", manoJug);
}

// Discard card

function discardCard(arrayDescarte) {
    for(let i = 0; i < arrayDescarte.length; i++) {
      pozoDeDescartes.push(arrayDescarte[i]);
    }

}

function discardCardValidation(arrayDescarte){

  if(arrayDescarte.length === 1){
    discardCard(arrayDescarte);
    console.log("Carta descartada ", arrayDescarte);
  }
  else{
    const numeroComparacion = arrayDescarte[0].valor; // Tomamos el número de la primera carta

    for (let i = 1; i < arrayDescarte.length; i++) {
      if (arrayDescarte[i].valor !== numeroComparacion) {
          addCartToHand(cardHold);
      }
    }

    discardCard(arrayDescarte);
    addCartToHand(cardHold); // Todas las cartas tienen el mismo número
    //addCardFunction
}
}



  // Funcion para sumar puntaje de mano de jugador
  function calcularPuntuacionManoJugador(manoJugador) {
    let puntuacionJugador = 0;
    for (const carta of manoJugador) {
      if (carta.valor === 12 && carta.palo === "bastos") {
        puntuacionJugador += 0; // 12 de basto suma 0 puntos
      } else {
        puntuacionJugador += carta.valor; // Suma el valor de la carta
      }
    }
    return puntuacionJugador;
  }





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
});





