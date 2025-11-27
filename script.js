class Producto {
    constructor(id, nombre, precio, categoria, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

class Tienda {
    constructor() {
        this.productos = [];
        this.carrito = [];

        this.cargarProductos();
        this.mostrarProductos(this.productos);
        this.agregarEventos();
    }

    cargarProductos() {
        this.productos = [
            new Producto('P001', 'Smartphone Android', 6500.00, 'electronica', 'imagen/smartphone.webp'),
            new Producto('P002', 'Laptop Gaming', 4500.00, 'electronica', 'imagen/laptop.webp'),
            new Producto('P003', 'Auriculares Inalámbricos', 70.00, 'electronica', 'imagen/auriculares.webp'),
            new Producto('P004', 'Camiseta Básica', 150.00, 'ropa', 'imagen/camiseta.jpeg'),
            new Producto('P005', 'Jeans Slim Fit', 120.00, 'ropa', 'imagen/Jeans.webp'),
            new Producto('P006', 'Zapatos Deportivos', 650.00, 'ropa', 'imagen/Zapatos deportivos.jpeg'),
            new Producto('P007', 'Juego de Sábanas', 120.00, 'hogar', 'imagen/sabanas.webp'),
            new Producto('P008', 'Lámpara de Mesa', 50.00, 'hogar', 'imagen/lampara.jpg'),
            new Producto('P009', 'Utensilios Cocina', 30.00, 'hogar', 'imagen/utensilios.png')
        ];
    }

    mostrarProductos(lista) {
        const contenedor = document.getElementById("productos");
        contenedor.innerHTML = "";

        lista.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${producto.imagen}">
                <h3>${producto.nombre}</h3>
                <p>Categoría: ${producto.categoria}</p>
                <p class="price">S/. ${producto.precio}</p>
                <button class="btn btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
            `;

            contenedor.appendChild(card);
        });

        document.querySelectorAll(".btn-agregar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                this.agregarAlCarrito(id);
            });
        });
    }

    agregarEventos() {
        document.getElementById("busqueda").addEventListener("input", () => {
            this.filtrarProductos();
        });

        document.getElementById("filtro").addEventListener("change", () => {
            this.filtrarProductos();
        });

        document.getElementById("btnCarrito").addEventListener("click", () => {
            document.getElementById("sidebarCarrito").classList.toggle("active");
        });

        document.getElementById("vaciarCarrito").addEventListener("click", () => {
            this.carrito = [];
            this.actualizarCarrito();
        });
    }

    filtrarProductos() {
        const texto = document.getElementById("busqueda").value.toLowerCase();
        const categoria = document.getElementById("filtro").value;

        let lista = this.productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );

        if (categoria !== "todos") {
            lista = lista.filter(p => p.categoria === categoria);
        }

        this.mostrarProductos(lista);
    }

    agregarAlCarrito(id) {
        const producto = this.productos.find(p => p.id === id);
        this.carrito.push(producto);
        this.actualizarCarrito();
    }

    actualizarCarrito() {
        const lista = document.getElementById("listaCarrito");
        const totalSpan = document.getElementById("totalCarrito");

        lista.innerHTML = "";

        let total = 0;

        this.carrito.forEach((item, index) => {
            total += item.precio;

            const div = document.createElement("div");
            div.classList.add("item-carrito");

            div.innerHTML = `
                <img src="${item.imagen}">
                <div class="item-info">
                    <p>${item.nombre}</p>
                    <p>S/. ${item.precio}</p>
                </div>
                <button class="btn-eliminar" data-index="${index}">X</button>
            `;

            lista.appendChild(div);
        });

        totalSpan.textContent = total.toFixed(2);

        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                this.carrito.splice(index, 1);
                this.actualizarCarrito();
            });
        });
    }
}

const tienda = new Tienda();
