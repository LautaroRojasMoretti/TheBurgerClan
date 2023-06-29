let inputNombreUsuario = document.getElementById('nombreUsuario');

let bienvenida = document.getElementById('tituloSaludo');

bienvenida.innerText = 'Bienvenid@ '+nombreUsuario+' a la casa del Clan';
bienvenida.style.background='Black';
bienvenida.style.color='whitesmoke';

let totalCompra = document.getElementById('totalCompra');

totalCompra.innerText = 'El total de la compra es de:$ '+total;
totalCompra.style.background='Black';
totalCompra.style.color='whitesmoke';

console.table(productos);
let contenedorProds = document.getElementById('cartas');

function renderizarProductos(productos){
    //vaciamos en contenedor para evitar duplicados
    contenedorProds.innerHTML='';
    //cargamos las cartas de los productos solicitados
    for(const prod of productos){
        contenedorProds.innerHTML+=`
            <div class="card col-sm-2">
                <img class="card-img-top" src=${prod.foto} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">$ ${prod.precio}</p>
                    <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
                </div>
            </div>
        `;
    }
}
renderizarProductos(productos);