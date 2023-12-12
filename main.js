

let ingresarNombre = prompt("Ingrese su nombre");

let ingreseApellido = prompt("ingrese su apellido");

if ((ingresarNombre !="") && (ingreseApellido !="")){
    alert("nombre: "+ingresarNombre +"\napellido: "+ingreseApellido);
}

let notainvalida = true ;


while (notainvalida) {

    let promedio = prompt ("ingrese su promedio");

if ( promedio >= 8 ) {
    console.log ("estas aprobado")
    alert ("pasaste de año!")
} else if  (promedio == 7) {
console.log ("buen trabajo")
alert ("pasaste raspando")
} else if (promedio <= 6) {
    console.log ("desaprobado")
    alert ("vas a tener que repetir")

notainvalida = false;
}else {
    alert ("ingrese una nota valida");
}
    }


