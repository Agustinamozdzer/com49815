// Declaración de variables
let nombre, apellido, edad, colegio, pais;
let puntos = 0, errores = 0, problemas = 0;
let inicio, fin;
let ranking = JSON.parse(localStorage.getItem('ranking')) || []; // Recupera el ranking del almacenamiento local o inicializa un array vacío si no existe
let cronometro;

// Evento que se dispara cuando se envía el formulario de usuario
document.getElementById('usuario').style.display = 'none';
document.getElementById('cronometro').style.display = 'none';
document.getElementById('contadorProblemas').style.display = 'none';
document.getElementById('puntos').style.display = 'none';
document.getElementById('problema').style.display = 'none';
document.getElementById('respuesta').style.display = 'none';
document.getElementById('tecladoNumerico').style.display = 'none';
document.getElementById('borrar').style.display = 'none';
document.getElementById('enviarRespuesta').style.display = 'none';
document.getElementById('reiniciarJuego').style.display = 'none';
document.getElementById('mensaje').style.display = 'none';
document.getElementById('tituloJuegos').style.display = 'none'
document.getElementById('userForm').addEventListener('submit', function(e) {
e.preventDefault(); // Evita que la página se recargue
// Recoge los valores del formulario
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    edad = document.getElementById('edad').value;
    colegio = document.getElementById('colegio').value;
    pais = document.getElementById('pais').value;
// Muestra el nombre del usuario en la página
    document.getElementById('usuario').textContent = nombre + ' ' + apellido;
// Oculta el formulario y muestra el juego
document.getElementById('userForm').style.display = 'none';
document.getElementById('juego').style.display = 'block';
document.getElementById('usuario').style.display = ' block';
document.getElementById('cronometro').style.display = 'block';
document.getElementById('contadorProblemas').style.display = 'block';
document.getElementById('puntos').style.display = 'block';
document.getElementById('problema').style.display = 'block';
document.getElementById('respuesta').style.display = 'block';
document.getElementById('tecladoNumerico').style.display = 'block';
document.getElementById('borrar').style.display = 'block';
document.getElementById('enviarRespuesta').style.display = 'block';
document.getElementById('mensaje').style.display = 'block';
document.getElementById('tituloJuegos').style.display = 'block'

// Inicia el cronómetro
    inicio = Date.now();
    cronometro = setInterval(function() {
        let tiempo = Math.round((Date.now() - inicio) / 1000);
        document.getElementById('cronometro').textContent = 60 - tiempo;
        if (tiempo >= 60) {
            finJuego(); // Si el tiempo supera los 60 segundos, termina el juego
        }
    }, 1000);
    generarProblema(); // Genera el primer problema
});
// Evento que se dispara cuando se hace clic en un botón numérico
document.querySelectorAll('#tecladoNumerico .numero').forEach(function(boton) {
    boton.addEventListener('click', function() {
        // Añade el número al campo de respuesta
        document.getElementById('respuesta').value += this.textContent;
    });
});
document.getElementById('borrar').addEventListener('click', function() {
// Borra el último número del campo de respuesta
    let respuesta = document.getElementById('respuesta');
    respuesta.value = respuesta.value.slice(0, -1);
});

// Evento que se dispara cuando se envía una respuesta
document.getElementById('reiniciarJuego').style.display = 'none'
document.getElementById('top10').style.display = 'none'
document.getElementById('mensaje').textContent = '¡A JUGAR!, TENES 3 VIDAS';

document.getElementById('enviarRespuesta').addEventListener('click', function() {
    let respuesta = parseInt(document.getElementById('respuesta').value); // Recoge la respuesta del usuario
    if (respuesta === resultado) { // Si la respuesta es correcta...
        puntos += 60 - Math.round((Date.now() - inicio) / 1000); // ... suma puntos
        // document.getElementById('mensaje').textContent = '¡Bien hecho!'; // ... y muestra un mensaje positivo
        // SweetAlert "respuesta correcta"
        Swal.fire({
            position: "center",
            icon: "success",
            title: "BIEN HECHO! SIGUE ASI!",
            showConfirmButton: false,
            timer: 1500
        });
    } else { // Si la respuesta es incorrecta...
        errores++; // ... incrementa el contador de errores
        document.getElementById('mensaje').textContent = 'Te quedan ' + (3 - errores) + ' vida/s'; // ... y muestra un mensaje de error
        // SweetAlert "resputa incorrecta"
        Swal.fire({
            position: "center",
            icon: "error",
            title: "OH! NO! NO BAJES LOS BRAZOS!",
            showConfirmButton: false,
            timer: 1500
        });       
    }
    if (errores === 3 || problemas === 10) { // Si el usuario ha cometido 3 errores o ha resuelto 10 problemas...
        finJuego(); // ... termina el juego
    } else { // Si no...
        generarProblema(); // ... genera un nuevo problema
    }
});    

// Función para generar un problema de matemáticas
function generarProblema() {
// Genera dos números aleatorios entre 10 y 99
    let num1 = Math.floor(Math.random() * 9) + 10;
    let num2 = Math.floor(Math.random() * 9) + 10;
// Decide aleatoriamente si la operación será una suma o una resta
    let operacion = Math.random() < 0.5 ? '+' : '-';
// Si es una resta y el segundo número es mayor que el primero, los intercambia
    if (operacion === '-' && num2 > num1) {
        let temp = num1;
        num1 = num2;
        num2 = temp;
    }
// Calcula el resultado de la operación
    resultado = operacion === '+' ? num1 + num2 : num1 - num2;
// Muestra el problema en la página
    document.getElementById('problema').textContent = `${num1} ${operacion} ${num2} = `;
// Limpia el campo de respuesta
    document.getElementById('respuesta').value = '';
// Incrementa el contador de problemas
    problemas++;
// Actualiza los contadores en la página
    document.getElementById('contadorProblemas').textContent = problemas + '/10';
    document.getElementById('puntos').textContent = puntos;
// Reinicia el cronómetro
    inicio = Date.now();
}

// Función para terminar el juego
function finJuego() {
//SweetAlert finalizacion del juego    
    Swal.fire("Felicitaciones terminaste el nivel!");
// Detiene el cronómetro
    clearInterval(cronometro);
// Registra el tiempo final
    fin = Date.now();
// Calcula el tiempo total
    let tiempo = Math.round((fin - inicio) / 1000);
// Muestra el tiempo y los puntos en la página
    document.getElementById('cronometro').textContent = `Tiempo: ${tiempo} segundos`;
    document.getElementById('puntos').textContent = `Puntos: ${puntos}`;
// Añade el jugador al ranking
    ranking.push({nombre: nombre, apellido: apellido, colegio: colegio, puntos: puntos});
// Ordena el ranking por puntos
    ranking.sort((a, b) => b.puntos - a.puntos);
// Se queda solo con los 10 primeros
    ranking = ranking.slice(0, 10);
// Guarda el ranking en el almacenamiento local
    localStorage.setItem('ranking', JSON.stringify(ranking));
// Muestra el ranking
    mostrarRanking();
}

// Función para mostrar el ranking
function mostrarRanking() {
    // Oculta el juego y muestra el ranking
    document.getElementById('juego').style.display = 'none';
    document.getElementById('ranking').style.display = 'block';
    document.getElementById('tecladoNumerico').style.display = 'none';
    document.getElementById('reiniciarJuego').style.display = 'block'
    document.getElementById('top10').style.display = 'block';
    document.getElementById('borrar').style.display = 'none';
    document.getElementById('enviarRespuesta').style.display = 'none';

// Obtiene la lista de jugadores
    let listaJugadores = document.getElementById('listaJugadores');
// Limpia la lista
    listaJugadores.innerHTML = '';
// Añade cada jugador al ranking
    for (let jugador of ranking) {
        let li = document.createElement('li');
        li.textContent = `${jugador.nombre} ${jugador.apellido} ${jugador.colegio}: ${jugador.puntos} puntos`;
        listaJugadores.appendChild(li);
    }
}

function mostrarRanking() {
    // Oculta el juego y muestra el ranking
    document.getElementById('juego').style.display = 'none';
    document.getElementById('ranking').style.display = 'block';
    document.getElementById('tecladoNumerico').style.display = 'none';
    document.getElementById('reiniciarJuego').style.display = 'block'
    document.getElementById('top10').style.display = 'block';
    document.getElementById('borrar').style.display = 'none';
    document.getElementById('enviarRespuesta').style.display = 'none';

    // Obtiene el contenedor de la tabla
    let tablaJugadores = document.getElementById('listaJugadores');
    // Limpia la tabla
    tablaJugadores.innerHTML = '';
    // Crea el encabezado de la tabla
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.textContent = 'Nombre';
    let th2 = document.createElement('th');
    th2.textContent = 'Apellido';
    let th3 = document.createElement('th');
    th3.textContent = 'Colegio';
    let th4 = document.createElement('th');
    th4.textContent = 'Puntos';
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    thead.appendChild(tr);
    tablaJugadores.appendChild(thead);
    // Crea el cuerpo de la tabla
    let tbody = document.createElement('tbody');
    for (let jugador of ranking) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = jugador.nombre;
        let td2 = document.createElement('td');
        td2.textContent = jugador.apellido;
        let td3 = document.createElement('td');
        td3.textContent = jugador.colegio;
        let td4 = document.createElement('td');
        td4.textContent = jugador.puntos;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
    }
    tablaJugadores.appendChild(tbody);
}


document.getElementById('reiniciarJuego').addEventListener('click', function() {
// Limpia el intervalo del cronómetro existente
    clearInterval(cronometro);

    puntos = 0;
    errores = 0;
    problemas = 0;

    document.getElementById('ranking').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    document.getElementById('tecladoNumerico').style.display = 'block';
    document.getElementById('borrar').style.display = 'block';
    document.getElementById('enviarRespuesta').style.display = 'block';
    document.getElementById('reiniciarJuego').style.display = 'none';
    document.getElementById('mensaje').textContent = '¡A JUGAR!, TENES 3 VIDAS';


// Establece un nuevo intervalo para el cronómetro
    inicio = Date.now();
    cronometro = setInterval(function() {
        let tiempo = Math.round((Date.now() - inicio) / 1000);
        document.getElementById('cronometro').textContent = 60 - tiempo;
        if (tiempo >= 60) {
            finJuego(); 
        }
    }, 1000);

    generarProblema();
});
