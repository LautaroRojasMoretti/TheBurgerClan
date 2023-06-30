const carro = JSON.parse(localStorage.getItem('carro')) || [];
let tablaBody = document.getElementById('tablabody');
let totalCompra = document.getElementById('totalCompra');

console.table(productos);
let contenedorProds = document.getElementById('cartas');

function renderizarProductos(productos) {
    contenedorProds.innerHTML = '';
    for (const prod of productos) {
        contenedorProds.innerHTML += `
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

    let botones = document.getElementsByClassName('compra');
    for (const boton of botones) {
        boton.addEventListener('click', () => {
            const prodACarro = productos.find((producto) => producto.id == boton.id);
            agregarACarrito(prodACarro);
        });

        boton.onmouseover = () => {
            boton.classList.replace('btn-dark', 'btn-danger');
        };

        boton.onmouseout = () => {
            boton.classList.replace('btn-danger', 'btn-dark');
        };
    }
}

renderizarProductos(productos);

function agregarACarrito(producto) {
    carro.push(producto);
    tablaBody.innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$ ${producto.precio}</td>
        </tr>
    `;

    localStorage.setItem('carro', JSON.stringify(carro));
    mostrarTotal();
}

function mostrarTotal() {
    let total = 0;
    for (const producto of carro) {
        total += producto.precio;
    }
    totalCompra.textContent = `Total de la compra: $ ${total}`;
}

mostrarTotal();

let filtroBtn = document.getElementById('filtro');
filtroBtn.addEventListener('click', () => {
    let minPrecio = document.getElementById('min').value;
    let maxPrecio = document.getElementById('max').value;
    let productosFiltrados = productos.filter(
        (producto) => producto.precio >= minPrecio && producto.precio <= maxPrecio
    );
    renderizarProductos(productosFiltrados);
});

let borrarFiltrosBtn = document.getElementById('borrarFiltros');
borrarFiltrosBtn.addEventListener('click', () => {
    document.getElementById('min').value = '';
    document.getElementById('max').value = '';
    renderizarProductos(productos);
});

let finalizarCompraBtn = document.getElementById('finalizarCompra');
finalizarCompraBtn.addEventListener('click', () => {
    alert('Gracias por tu compra!');
    carro.length = 0;
    tablaBody.innerHTML = '';
    totalCompra.textContent = '';
    localStorage.removeItem('carro');
});
