/* ------------------------------------------- JUEGO DE CARTAS PABLO ---------------------------------------------------- */
/*
             ."-,.__
                 `.     `.  ,
              .--'  .._,'"-' `.
             .    .'         `'
             `.   /          ,'
               `  '--.   ,-"'
                `"`   |  \
                   -. \, |
                    `--Y.'      ___.
                         \     L._, \
               _.,        `.   <  <\                _
             ,' '           `, `.   | \            ( `
          ../, `.            `  |    .\`.           \ \_
         ,' ,..  .           _.,'    ||\l            )  '".
        , ,'   \           ,'.-.`-._,'  |           .  _._`.
      ,' /      \ \        `' ' `--/   | \          / /   ..\
    .'  /        \ .         |\__ - _ ,'` `        / /     `.`.
    |  '          ..         `-...-"  |  `-'      / /        . `.
    | /           |L__           |    |          / /          `. `.
   , /            .   .          |    |         / /             ` `
  / /          ,. ,`._ `-_       |    |  _   ,-' /               ` \
 / .           \"`_/. `-_ \_,.  ,'    +-' `-'  _,        ..,-.    \`.
.  '         .-f    ,'   `    '.       \__.---'     _   .'   '     \ \
' /          `.'    l     .' /          \..      ,_|/   `.  ,'`     L`
|'      _.-""` `.    \ _,'  `            \ `.___`.'"`-.  , |   |    | \
||    ,'      `. `.   '       _,...._        `  |    `/ '  |   '     .|
||  ,'          `. ;.,.---' ,'       `.   `.. `-'  .-' /_ .'    ;_   ||
|| '              V      / /           `   | `   ,'   ,' '.    !  `. ||
||/            _,-------7 '              . |  `-'    l         /    `||
. |          ,' .-   ,' ||               | .-.        `.      .'     ||
 `'        ,'    `".'    |               |    `.        '. -.'       `'
          /      ,'      |               |,'    \-.._,.'/'
          .     /        .               .       \    .''
        .`.    |         `.             /         :_,'.'
          \ `...\   _     ,'-.        .'         /_.-'
           `-.__ `,  `'   .  _.>----''.  _  __  /
                .'        /"'          |  "'   '_
               /_|.-'\ ,".             '.'`__'-( \
                 / ,"'"\,'               `/  `-.|" 


                - PROPIEDAD INTELECTUAL DE ARIEL CURUCHAGA Y TOMÁS GOMEZ-
*/


/* ------------------------------------------- LOGICA RELACIONADA AL JUEGO ---------------------------------------------- */

      let mazo = [];
      let nuevaCartaJugador = [];
      let pozoDeDescartes = [];
      let cardHold = [];

/// Función para repartir 4 cartas al azar para el jugador y 4 para el rival
  function repartirCartas() {
    const manoJugador = [];
    const manoRival = [];
    const cartasMezcladas = [...cartasEspanolas].sort(() => Math.random() - 0.5);
    const pozoDescartes = [];
    mazo = cartasMezcladas;
      
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

// Hold card

function takeCard() {
    const cartaRobada = mazo.pop();
    console.log("Carta robada ", cartaRobada);
    console.log("mazo luego de robar ", mazo);
    cardHold = cartaRobada;
    return cartaRobada;
  }
// Add card to hand

function addCartToHand() {
    console.log("carta Robada ===> " , cardHold);
    nuevaCartaJugador.push(cardHold);
    cardHold = []

    const jugadorContainer = document.querySelector(".player");
    actualizarCartasEnHTML(jugadorContainer, nuevaCartaJugador);
    nuevaCartaJugador = [];
 }

// Discard card
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
    addCartToHand(cardHold); 
  }
}
function discardCard(arrayDescarte) {
  for(let i = 0; i < arrayDescarte.length; i++) {
    pozoDeDescartes.push(arrayDescarte[i]);
  }
}




/* ------------------------------------------- MANEJO DE EVENTOS  ---------------------------------------------------- */




// Función para manejar el clic en el mazo
function handleClickOnMazo() {
  // Verificar si el mazo está vacío
  if (mazo.length === 0) {
    alert("El mazo está vacío.");
    return;
  }
  // Tomar una carta del mazo
  const cartaTomada = takeCard();
  // Mostrar la carta al jugador en una ventana emergente
  const decision = prompt(`Has tomado la siguiente carta del mazo:\nValor: ${cartaTomada.valor}\nPalo: ${cartaTomada.palo}\n\n¿Quieres quedarte con esta carta? (Sí/No)`);
  // Verificar la decisión del jugador
  if (decision && decision.toLowerCase() === "si") {

    alert('Selecciona una o más cartas para descartar!');
    

    /* yo aca quiero una Función que me permita seleccionar una carta de mi mano y descartarla. */
    
    addCartToHand();

  } else {
    
    discardCard([cartaTomada]);
  }
}

 function handleClickOnPozo() {
  console.log("handleClickOnpozo");
  console.log(pozoDeDescartes) 
 }


 /* ------------------------------------------- ACTUALIZACIÓN DEL HTML ---------------------------------------------------- */



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






/* ------------------------------------------- LOGICA NO RELACIONADA AL JUEGO ---------------------------------------------------- */


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














  export {
    repartirCartas,
    takeCard,
    addCartToHand,
    discardCard,
    calcularPuntuacionManoJugador,
    handleClickOnPozo,
    handleClickOnMazo,
    actualizarCartasEnHTML

  };

  /*
  GRACIAS POR VENIR!

  
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠿⠟⠛⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡏⠁⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡇⠀⠀⠀⠀⠀⢠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⠤⠶⠶⠒⠛⢻⣿⣿⣿⣿⣿⡿⠃⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠴⠖⠚⠉⠁⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⠟⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠁⠀⠀⢀⣀⡤⠿⠶⠒⠒⠒⠒⠒⠲⠶⠶⠶⢤⣀⣀⠀⠀⣀⣠⠶⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠟⠋⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣀⡴⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢉⣽⠞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠶⠞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡤⠶⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣀⣠⡤⠶⠚⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⡏⠀⣠⣶⡶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⠀⠀⠀⠀⠀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⠤⠶⠶⠶⠶⠒⠒⡷
⠀⠀⠀⠀⠀⠀⠀⠀⣸⠃⢸⣿⣿⣀⣼⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⡏⠉⣿⣶⡄⠀⠀⠀⠀⣿⠀⠀⠀⠀⣀⣠⠤⠶⠖⠋⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⣸⠇
⠀⠀⠀⠀⠀⠀⠀⢀⡟⠀⠘⣿⣿⣿⡿⠏⠀⠀⢠⣤⡄⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⢿⣠⡴⠖⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡏⠀
⠀⠀⠀⠀⠀⠀⢀⣼⠁⠀⠀⠀⠉⠉⠀⠀⠀⢀⣤⣍⣀⠀⠀⠀⠀⠀⠀⠉⠻⠿⠛⠉⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡏⠀⠀
⠀⠀⠀⠀⠀⠀⣸⡏⠉⠳⣆⠀⠀⠘⢷⡶⣶⠛⠉⠈⠉⠳⠦⣄⣀⣤⠖⠀⠀⠀⠀⢀⣀⣀⡀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⣹⡄⠀⠀⠀⣿⠋⠀⠀⠀⠀⠀⠀⠀⢸⠇⠀⠀⠀⠀⣶⠋⠁⠈⠙⢶⡀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣇⣀⣴⡟⠀⠀⠀⠀⠹⡄⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠐⣇⠀⠀⠀⠀⢠⣏⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠻⣏⠁⠀⠀⠀⠀⠀⠀⢻⡄⠀⠀⠀⠀⠀⣴⠃⠀⠀⠀⠀⠀⠙⠦⣄⣀⡴⠟⢰⠇⠀⠀⠀⠀⣶⠶⠶⠶⠶⠶⠶⠶⠶⠶⠶⠟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⡀⠀⠀⠀⠀⠀⠀⢳⣄⠀⠀⢀⣴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⣦⠀⠀⠀⠀⢻⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⢦⣀⠀⠀⠀⠀⠀⠙⠳⠶⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠿⡇⠘⢷⡀⠀⠀⠈⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠀⠉⠳⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⡴⠞⠁⠀⣿⠀⠀⠻⣄⠀⠀⠹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣇⠀⠀⠀⠀⠉⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⢹⣦⠴⠞⠋⠀⠀⠀⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⡏⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⠀⣀⣠⠶⠖⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣀⠀⠀⠀⠀⠀⢰⡏⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠘⣾⠋⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣾⣿⣿⡄⢀⣴⠶⠛⠓⠶⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡇⣠⠶⠿⠷⠶⣄⣠⣾⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡿⡟⣯⢻⡏⠁⠀⠀⠀⠀⠈⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣷⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠀⠁⠀⠀⠀⠀⣼⢧⣿⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣧⠛⠛⠉⣧⠀⠀⠀⠀⠀⠀⢸⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠃⠀⠀⠀⠀⠀⣼⠋⠈⠈⣸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢿⡆⠀⠀⠸⣇⠀⠀⠀⠀⠀⠀⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠋⠀⠀⠀⠀⠀⠀⠁⠀⠀⢀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⣧⠀⠀⠀⢿⡄⠀⠀⠀⠀⠀⠈⣷⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⣴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⡀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⡾⠁⠀⠀⠀⠀⠀⠀⢠⡄⠀⠀⣼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠸⣇⠀⢰⣆⠀⠀⠀⠀⠀⠀⠀⠈⢳⣄⠀⠀⠀⠀⠀⣇⠀⠀⠀⠀⠀⣀⡾⠁⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⣴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠓⠛⠉⠉⠉⠉⠓⠒⠒⠒⠲⠿⣽⣼⣤⣦⡴⣾⡯⣄⣰⣀⣤⣠⣹⣶⠶⠶⠶⠦⠤⠤⠤⠶⠾⠷⠞⠁⠀⠀⠀⠀


  HASTA LUEGO!



- PROPIEDAD INTELECTUAL DE TOMÁS GOMEZ Y ARIEL CURUCHAGA -



  */ 