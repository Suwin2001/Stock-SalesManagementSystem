document.getElementById('btn_checkout').addEventListener('click', function() {
    // Prepare the cart data to be sent to the server
    let cartData = [];

    
    for (const id in cartItems) {
        const item = cartItems[id];
        cartData.push({
            id: id,
            qty: item.qty,
            price: (item.qty * item.price).toFixed(2), // Calculate total price for the quantity
            code: item.code,
            name: item.name
        });
    }

    // Send the cart data to the server to update the quantities
    fetch('checkout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show custom popup
            document.getElementById('checkoutPopup').style.display = 'block';
            // Clear the cart after successful checkout
            cartItems = {};
            updateCartUI();
        } else {
            alert('Checkout failed!');
        }
    })
    .catch(error => console.error('Error during checkout:', error));
});

function closeCheckoutPopup() {
    document.getElementById('checkoutPopup').style.display = 'none';
    location.reload(); // Refresh the page
}
