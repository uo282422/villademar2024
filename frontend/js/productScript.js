
function openCart() {
    const cart = Carrito.getInstance();
    const productCardsContainer = document.querySelector('.product-cards');
    productCardsContainer.innerHTML = '';
    let precioTotal=0;
    for (const p of cart.productos) {
        
       crearTarjeta(p);
       precioTotal+=p.precio;
    }
   
    document.getElementById('total').textContent = precioTotal;
    document.getElementById('overlayCart').style.display = 'flex';
}
function crearTarjeta(product){
     const productCardsContainer = document.querySelector('.product-cards');
     const newProductCard = document.createElement('div');
     newProductCard.classList.add('product-card');
     
     // Crea y agrega el contenido a la nueva tarjeta de producto
     newProductCard.innerHTML = `
         <h3>${product.tipo}</h3>
         <p>Precio: ${product.precioUnit}€</p>
         <p>Unidades: ${product.unidades}</p>
         <p>Total: ${product.precio}€</p>
     `;
     // Agrega la nueva tarjeta de producto al contenedor de tarjetas de producto
     productCardsContainer.appendChild(newProductCard);
}

function closeCart() {
    document.getElementById('overlayCart').style.display = 'none';
}


function pay() {
    alert('Pagar');
}

function openProduct(pIndex) {
    // Obtener el producto correspondiente al índice pIndex
    const productoBase = obtenerProducto(pIndex);
    const productoTemp = {
        
        precioUnit : productoBase.precio,
        precio : productoBase.precio,
        tipo : productoBase.tipo,
        unidades : 1,
    }

    // Crear elementos HTML dinámicamente
    const overlay = document.createElement('div');
    overlay.classList.add('overlayProduct');
    overlay.id = 'overlayProduct';
    // Mostrar el overlay
overlay.style.display = 'flex';

    // Centrar verticalmente y horizontalmente el overlay usando CSS
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';

    const popup = document.createElement('div');
    popup.classList.add('popup');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeProduct;

    const title = document.createElement('h2');
    title.textContent = 'Detalles del producto';

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productName = document.createElement('h3');
    productName.textContent = productoTemp.tipo;

    const unitsDiv = document.createElement('div');
    unitsDiv.classList.add('units');

    const decreaseBtn = document.createElement('button');
    decreaseBtn.classList.add('btn-unit');
    decreaseBtn.textContent = '-';
    decreaseBtn.onclick = () => {
        decreaseUnits(productoTemp);
    };

    const unitCount = document.createElement('span');
    unitCount.classList.add('unit-count');
    unitCount.textContent = productoTemp.unidades   ;

    const increaseBtn = document.createElement('button');
    increaseBtn.classList.add('btn-unit');
    increaseBtn.textContent = '+';
    increaseBtn.onclick = () => {
        increaseUnits(productoTemp);
    };

    const totalPricePara = document.createElement('p');
    totalPricePara.id = 'totalPrice';
    totalPricePara.textContent = `Precio total: ${productoTemp.precio}€`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('btn-add-to-cart');
    addToCartBtn.textContent = 'Agregar al carrito';
    addToCartBtn.onclick = () => {
        addToCart(productoTemp);
    };

    // Agregar los elementos al DOM
    unitsDiv.appendChild(decreaseBtn);
    unitsDiv.appendChild(unitCount);
    unitsDiv.appendChild(increaseBtn);

    productCard.appendChild(productName);
    productCard.appendChild(unitsDiv);

    popup.appendChild(closeBtn);
    popup.appendChild(title);
    popup.appendChild(productCard);
    popup.appendChild(totalPricePara);
    popup.appendChild(addToCartBtn);

    overlay.appendChild(popup);

    
    const container = document.querySelector('.container');
    document.body.insertBefore(overlay, container);
    console.log(document.body)
   
}

function obtenerProducto(pIndex) {
    switch (pIndex) {
        case 0:
          return new EBasica();
          
        case 1:
            return new EPremium();
          
        case 2:
            return new EGold();
          
        case 3:
            return new EDiamond();
            
        default:
          console.log("Opción no reconocida");
    }

}


function closeProduct() {
    const overlayProduct = document.getElementById('overlayProduct');
    overlayProduct.parentNode.removeChild(overlayProduct);
}
// Función para aumentar las unidades
function increaseUnits(productoTemp) {
    console.log("a")
    var unitCountElement = document.querySelector('.unit-count');
   
    productoTemp.unidades++;
    
    unitCountElement.innerText = productoTemp.unidades;

    // Actualizar el precio total
    updateTotalPrice(productoTemp);
}

// Función para disminuir las unidades
function decreaseUnits(productoTemp) {
    console.log("b")
    var unitCountElement = document.querySelector('.unit-count');
    
    if ( productoTemp.unidades > 1) {
        productoTemp.unidades--;
        
        unitCountElement.innerText =  productoTemp.unidades;

        // Actualizar el precio total
        updateTotalPrice(productoTemp);
    }
}

// Función para actualizar el precio total basado en las unidades
function updateTotalPrice(productoTemp) {
    var totalPriceElement = document.getElementById('totalPrice');
    
    productoTemp.precio = productoTemp.precioUnit * productoTemp.unidades;
    
    totalPriceElement.innerText = `Precio total: ${productoTemp.precio}€`;
}

async function addToCart(productoTemp) {
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoTemp)
        });

        if (response.ok) {
            updateCartNotification();
            crearMensaje('Agregado al carrito');
            closeProduct();
        } else {
            crearMensaje('Error al agregar al carrito');
        }
    } catch (error) {
        crearMensaje('Error de red al agregar al carrito');
    }
}

async function updateCartNotification() {
    try {
        const response = await fetch('/api/cart');
        const cart = await response.json();
        document.getElementById('cartNotification').style.display = 'block';
        document.getElementById('cartNotification').innerText = cart.length;
    } catch (error) {
        console.error('Error al actualizar la notificación del carrito', error);
    }
}

function crearMensaje(text) {
    const container = document.querySelector('.container');
    const message = document.createElement('div');
    message.style.display = 'flex';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.classList.add('message');
    message.textContent = text;

    document.body.insertBefore(message, container);
    setTimeout(() => {
        message.remove();
    }, 1000);
}
/*
// Función para manejar el evento de hacer clic en el botón "Agregar al carrito"
function addToCart(productoTemp) {
    
    Carrito.getInstance().agregarProducto(productoTemp);
    updateCartNotification()
    crearMensaje('Agregado al carrito')
    closeProduct()
   
}
function updateCartNotification() {
    
    document.getElementById('cartNotification').style.display = 'block';
    
    document.getElementById('cartNotification').innerText = Carrito.getInstance().productos.length;
}
function crearMensaje(text){
    const container = document.querySelector('.container');
    const message = document.createElement('div');
    // Mostrar el overlay
    message.style.display = 'flex';

    // Centrar verticalmente y horizontalmente el overlay usando CSS
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.classList.add('message');
    message.textContent = text;

    document.body.insertBefore(message, container);
    setTimeout(() => {
        message.remove();
      }, 1000);

    
}




// Definición del objeto Carrito
class Carrito {
    constructor() {
        Carrito.instance = this;
        this.productos = [];
    }

    // Método para agregar un producto al carrito
    agregarProducto(producto) {
        this.productos.push(producto);
    }

    // Método estático para obtener la instancia única del carrito
    static getInstance() {
        if (!Carrito.instance) {
            return new Carrito();
        }else return Carrito.instance;
    }
}*/

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    
}

// Definición de la clase Entrada que hereda de Producto
class Entrada extends Producto {
    constructor(precio, tipo) {
        super(tipo, precio);
        this.id = 0;
        this.tipo = tipo;
    }

}

// Definición de la clase EBasica, que hereda de Entrada
class EBasica extends Entrada {
    constructor() {
        super(3.5, "Básica"); 
    }
}

// Definición de la clase EPremium, que hereda de Entrada
class EPremium extends Entrada {
    constructor() {
        super( 5, "Premium"); 
    }
}

// Definición de la clase EGold, que hereda de Entrada
class EGold extends Entrada {
    constructor() {
        super( 12, "Gold"); 
    }
}

// Definición de la clase EDiamond, que hereda de Entrada
class EDiamond extends Entrada {
    constructor() {
        super( 18, "Diamond"); 
    }
}

function generarId() {
    let id = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = 5;
    for (let i = 0; i < longitud; i++) {
        id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return id;
}