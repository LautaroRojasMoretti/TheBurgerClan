let nombreUsuario = prompt('Ingresa tu nombre');
while((nombreUsuario == '') || (nombreUsuario == ' ') ){
    alert('Nombre invalido😒');
    nombreUsuario = prompt('Ingresa tu nombre');
}
alert('Bienvenid@ '+nombreUsuario+' a la casa del Clan');

let nombreUbicacion = prompt('Ingresa tu ciudad');
while((nombreUbicacion == '') || (nombreUbicacion == ' ') ){
    alert('Ubicación NO valida 🗺️');
    nombreUbicacion = prompt('Ingresa tu ciudad');
}
alert('QUÉ BIEN! LLEGAMOS A '+nombreUbicacion);

let mensaje = prompt('Queres ver el menú? (s-si)');
let total = 0;

while(mensaje.toLowerCase() == 's'){
    let menu = prompt('1-Hamburguesa $2700\n2-Papas fritas $1100\n3-Hot dogs $500\n4-Nuggets $1100\n5-Ensaladas $850');
    switch(menu){
        case '1':
            alert('Agregaste Hamburguesa al carrito de compras 🛒');
            sumarTotal(2700)
            break;
        case '2':
            alert('Agregaste Papas fritas al carrito de compras 🛒');
            sumarTotal(1100)
            break;
        case '3':
            alert('Agregaste Hot dog al carrito de compras 🛒');
            sumarTotal(500)
            break;
        case '4':
            alert('Agregaste Nuggets al carrito de compras 🛒');
            sumarTotal(1100)
            break;    
        case '5':
            alert('Agregaste Ensalada al carrito de compras 🛒');
            sumarTotal(850)
            break; 
        default:
            alert('codigo inexistente');
        break;   
        }
        mensaje = prompt('Queres comprar algo más? (s-si)')
}

alert('Monto total de la compra $'+total)

function sumarTotal(precio){
    total = total + precio;
    alert('Subtotal hasta el momento $'+total);
}
console.log('La compra de '+nombreUsuario+' es de $ '+total);
let mensaje1 = prompt('Queres que te lo llevemos?🛵 s-si');
while (mensaje1.toLowerCase() == 's'){
    direccion = prompt('Cual es tu direccion?\n(Calles y número)🗺️');
    console.log(nombreUsuario+' quiere que le llevemos el pedido a '+direccion);
    break;
}
alert('Gracias '+nombreUsuario+' por tu compra!🍔🍟\nTe avisamos cuando salga hacia tu direccion!👍')

console.table(productos);