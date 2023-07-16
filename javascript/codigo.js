let productos;
obtenerJsonProds();

function renderizarProductos(productos) {
    const contenedorProds = document.getElementById('cartas');
    contenedorProds.innerHTML = '';
    for (const prod of productos) {
        const card = document.createElement('div');
        card.className = 'card col-sm-2';
        card.innerHTML = `
            <img class="card-img-top" src=${prod.foto} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">$ ${prod.precio}</p>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" min="1" max="10" value="1" id="cantidad-${prod.id}">
                    <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
                </div>
            </div>
        `;
        const boton = card.querySelector('.compra');
        boton.addEventListener('click', () => {
            const cantidadInput = card.querySelector(`#cantidad-${prod.id}`);
            const cantidad = parseInt(cantidadInput.value);
            const prodACarro = productos.find((producto) => producto.id == boton.id);
            agregarACarrito(prodACarro, cantidad);
        });

        boton.onmouseover = () => {
            boton.classList.replace('btn-dark', 'btn-danger');
        };

        boton.onmouseout = () => {
            boton.classList.replace('btn-danger', 'btn-dark');
        };

        contenedorProds.appendChild(card);
    }
}

function agregarACarrito(producto, cantidad) {
    const carro = JSON.parse(localStorage.getItem('carro')) || [];

    const productoExistente = carro.find((prod) => prod.id === producto.id);
    if (productoExistente) {
        if (productoExistente.cantidad + cantidad > 10) {
            Swal.fire({
                title: '¡Cantidad máxima alcanzada!',
                text: 'No puedes agregar más unidades de este producto.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        productoExistente.cantidad += cantidad;
    } else {
        producto.cantidad = cantidad;
        carro.push(producto);
    }

    Swal.fire({
        title: 'Fantástico!',
        text: `Agregaste ${cantidad} ${producto.nombre} al carrito! 💪`,
        imageUrl: producto.foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: producto.nombre,
    });

    const tablaBody = document.getElementById('tablabody');
    tablaBody.innerHTML = '';

    let total = 0;

    for (const prod of carro) {
        tablaBody.innerHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>${prod.cantidad}</td>
                <td>
                    <button class="btn btn-light" onclick="eliminar(${prod.id})">🗑️</button>
                </td>
            </tr>
        `;
        total += prod.precio * prod.cantidad;
    }

    document.getElementById('totalCompra').innerText = `Total a pagar $:${total}`;

    localStorage.setItem('carro', JSON.stringify(carro));
}

async function obtenerJsonProds() {
    const URLJSON = './productos.json';
    const respuesta = await fetch(URLJSON);
    const data = await respuesta.json();
    console.log(data);
    productos = data;
    renderizarProductos(productos);
}

function eliminar(id) {
    const carro = JSON.parse(localStorage.getItem('carro')) || [];
    const productoExistente = carro.find((prod) => prod.id === id);
    if (productoExistente) {
        Swal.fire({
            title: 'Eliminar producto',
            html: `
                <p>Selecciona la cantidad a eliminar:</p>
                <input type="number" id="cantidadEliminar" min="1" max="${productoExistente.cantidad}" value="1">
            `,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                return document.getElementById('cantidadEliminar').value;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const cantidadEliminar = parseInt(result.value);
                productoExistente.cantidad -= cantidadEliminar;
                if (productoExistente.cantidad <= 0) {
                    const indice = carro.findIndex((prod) => prod.id == id);
                    carro.splice(indice, 1);
                }
                renderizarCarrito(carro);
                localStorage.setItem('carro', JSON.stringify(carro));
            }
        });
    }
}

function renderizarCarrito(carro) {
    const tablaBody = document.getElementById('tablabody');
    tablaBody.innerHTML = '';

    let total = 0;

    for (const prod of carro) {
        tablaBody.innerHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>${prod.cantidad}</td>
                <td>
                    <button class="btn btn-light" onclick="eliminar(${prod.id})">🗑️</button>
                </td>
            </tr>
        `;
        total += prod.precio * prod.cantidad;
    }

    document.getElementById('totalCompra').innerText = `Total a pagar $:${total}`;
}

const filtroBtn = document.getElementById('filtro');
filtroBtn.addEventListener('click', () => {
    const minPrecio = document.getElementById('min').value;
    const maxPrecio = document.getElementById('max').value;
    const productosFiltrados = productos.filter(
        (producto) => producto.precio >= minPrecio && producto.precio <= maxPrecio
    );
    renderizarProductos(productosFiltrados);
});

const borrarFiltrosBtn = document.getElementById('borrarFiltros');
borrarFiltrosBtn.addEventListener('click', () => {
    document.getElementById('min').value = '';
    document.getElementById('max').value = '';
    renderizarProductos(productos);
});

const finalizarCompraBtn = document.getElementById('finalizarCompra');
finalizarCompraBtn.addEventListener('click', () => {
    Swal.fire({
        title: '¡Gracias por tu compra!',
        text: 'Pronto recibirás tu pedido',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
        }
    });
});

function vaciarCarrito() {
    const carro = [];
    localStorage.removeItem('carro');
    const tablaBody = document.getElementById('tablabody');
    tablaBody.innerHTML = '';
    document.getElementById('totalCompra').textContent = '';
}
