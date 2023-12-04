

let alumno = prompt("por favor ingrese su nombre").toLowerCase()

let nota1 = Number(prompt("ingrese la nota del primer TP"))
let nota2 = Number(prompt("ingrese la nota de la evaluacion"))
let nota3 = Number(prompt("ingrese nota de la integradora"))

let promedio = (nota1 + nota2 + nota3) / 3 

alert (alumno + " " + "su promedio es " + promedio)

if ( promedio >= 8 ) {
    console.log ("estas aprobado")
    alert ("pasaste de año!")
} else if  (promedio == 7) {
console.log ("buen trabajo")
alert ("pasaste raspando")
} else if (promedio <= 6) {
    console.log ("desaprobado")
    alert ("vas a tener que repetir")
}

