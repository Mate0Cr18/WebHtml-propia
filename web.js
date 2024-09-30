let cart = [];
function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar la página: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('products').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('products').innerHTML = `<p>${error.message}</p>`;
        });
}
// Añade productos al carrito
function addToCart(productName, price) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    if (cart[productName]) {
        cart[productName].quantity += 1;
        cart[productName].totalPrice += price;
    } else {
        // Si el producto no está en el carrito, añádelo con cantidad 1
        cart[productName] = { quantity: 1, price: price, totalPrice: price };
    }
    updateCart();
}
// Actualiza la visualización del carrito
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    // Calcula el número total de productos
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    // Limpia la lista del carrito
    cartList.innerHTML = '';
    let total = 0;
    // Itera sobre los productos en el carrito y actualiza la lista
    for (const [productName, item] of Object.entries(cart)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${productName} x ${item.quantity} - ${item.totalPrice.toFixed(2)}€`;
        cartList.appendChild(listItem);
        total += item.totalPrice;
    }
    // Actualiza el total del carrito
    cartTotal.textContent = total.toFixed(2);
}
function toggleCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.classList.toggle('hidden');
}
function purchase() {
    alert('Compra realizada con éxito.');
    fetch('', {
        method: '',
        headers: {
            '': ''
        },
        body: JSON.stringify({ cart })
    })
        .then(response => response.text())
        .then(data => {
            alert('Compra realizada con éxito. La empresa ha sido notificada.');
            cart = [];
            updateCart();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con tu compra.');
        });
}