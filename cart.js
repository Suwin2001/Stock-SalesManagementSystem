let cartItems = {};

function addToCart(productId, productCode, productName, price) {
    if (cartItems[productId]) {
        cartItems[productId].qty++;
    } else {
        cartItems[productId] = {
            code: productCode,
            name: productName,
            price: price,
            qty: 1
        };
    }
    updateCartUI();
}

function updateCartUI() {
    const cartContent = document.querySelector(".cart-content");
    let html = '';
    let total = 0;

    for (const id in cartItems) {
        const item = cartItems[id];
        total += item.qty * item.price;
        html += `
            <div class="cart-item">
                <p class="cart_item_name">${item.name} - Rs.${item.price}</p>

                <div class="number-input">
                <button onclick="decrementValue('${id}')" class="minus"></button>
                <input id="input-${id}" class="cart_item_qty" type="number" value="${item.qty}" onchange="updateItemQty('${id}', this.value)">
                <button onclick="incrementValue('${id}')" class="plus"></button>
                </div>
                <p class="cart_item_total">Subtotal: Rs.${(item.price * item.qty).toFixed(2)}</p>
                <button class="btn_removecart" onclick="removeFromCart('${id}')">Delete</button>
            </div>
        `;
    }

    html += `<div class="cart-total"><strong>Total: Rs.${total.toFixed(2)}</strong></div>`;
    cartContent.innerHTML = html;
}

function updateItemQty(productId, qty) {
    cartItems[productId].qty = parseInt(qty);
    updateCartUI();
}

function incrementValue(id) {
    var input = document.getElementById('input-' + id);
    input.value = parseInt(input.value, 10) + 1;
    updateItemQty(id, input.value);
}

function decrementValue(id) {
    var input = document.getElementById('input-' + id);
    var currentValue = parseInt(input.value, 10);
    if (currentValue > 0) {  // Check if the current value is greater than 0
        input.value = currentValue - 1;  // Decrement the value
        updateItemQty(id, input.value);  // Trigger update function
    }
}

function removeFromCart(productId) {
    delete cartItems[productId]; // Remove the item from the cartItems object
    updateCartUI(); // Update the cart UI
}

