document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartTime = document.getElementById('cart-time');
    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const button = event.target;
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const img = button.getAttribute('data-img');

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.img}" alt="${item.name}" width="50">
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(li);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        updateCartTime();

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function removeFromCart(event) {
        const id = event.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    function updateCartTime() {
        const now = new Date();
        cartTime.textContent = `Last updated: ${now.toLocaleString()}`;
    }
});
