    /*
    * 2C = Two of Clubs
    * 2D = Two of Diamonds
    * 2H = Two of Hearts
    * 2S = Two of Spades
    */

    let deck         = [];
    const tipos      = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    let puntosJugador = 0;
    let  puntosComputadora = 0;

    //Referencia de HTML
    const puntosHtml = document.querySelectorAll('small');
    const divCartaJugador     = document.querySelector('#jugador-cartas');
    const divCartaComputadora = document.querySelector('#computadora-cartas');
    //botones
    const botonPedir   = document.querySelector('#botonPedir');
    const botonDetener = document.querySelector('#botonDetener');
    const botonNuevo   = document.querySelector('#botonNuevo');

    //esta funcion crea un nuevo deck (una nueva baraja)
    const crearDeck = () => {
    for ( let i = 2; i <= 10; i++) {
        for(let tipo of tipos)
        deck.push(i + tipo);
    }

    for (let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    //console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck)
    return deck;
    }

    crearDeck();

    // Esta funcion me permite tomar una carta

    const perdircarta = () =>
    {
        if (deck.length === 0){
            throw 'No hay cartas en el deck'
        }
        const carta  = deck.pop();
        //console.log(deck);
        //console.log(carta);
        return carta;
    }

    //perdircarta();

    

    const valorcarta = ( carta ) => {
        
        const valor = carta.substring (0, carta.length - 1);
        return(isNaN(valor) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
        }
    
        const valor = valorcarta(perdircarta());
        console.log({valor});


    //turno de la computadora
    const turnoComputadora = (puntosminimos) => {
        do{
            const carta = perdircarta();

            puntosComputadora = puntosComputadora + valorcarta(carta);
            puntosHtml[1].innerText = puntosComputadora;
        
            // img class="carta" src="./cartas/2C.png"
            const imgCarta = document.createElement('img');
            imgCarta.src = `./cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartaComputadora.append(imgCarta);
        if (puntosminimos > 21){
            break;
        }

        } while((puntosComputadora < puntosminimos) && (puntosminimos <= 21));

        setTimeout(() => {
        
        if(puntosComputadora === puntosminimos){
            alert('Nadie gana')
        } else if (puntosminimos > 21){
            alert('Computadora Gana!');
        } else if (puntosComputadora > 21){
            alert('Jugador Gana!');
        } else{
         alert('computadora Gana!');   
        }

    }, 1000);


    }

    //Turno Jugador
    botonPedir.addEventListener('click', () => {

    const carta = perdircarta();

    puntosJugador = puntosJugador + valorcarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    // img class="carta" src="./cartas/2C.png"
    const imgCarta = document.createElement('img');
    imgCarta.src = `./cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartaJugador.append(imgCarta);

        setTimeout(() =>{

        }, 10);

    if(puntosJugador > 21){
        console.warn('Perdiste');
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('Ganaste!!');
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    });

    botonDetener.addEventListener('click', () => {
    botonPedir.disabled = true;
    botonDetener.disabled = true;

    turnoComputadora(puntosJugador);
    });

    botonNuevo.addEventListener('click', () =>{
       
        console.clear();
        deck = crearDeck();
       
       puntosJugador = 0;
       puntosComputadora = 0;
    
       puntosHtml[0].innerText = 0;
       puntosHtml[1].innerText = 0;

       divCartaComputadora.innerHTML = '';
       divCartaJugador.innerHTML = '';

       botonPedir.disabled = false;
       botonDetener.disabled = false;
    });
