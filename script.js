document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.querySelector('#cart-total span');
  
    const updateCart = () => {
      cartItemsContainer.innerHTML = '';
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      } else {
        cart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
          `;
          cartItemsContainer.appendChild(cartItem);
        });
      }
  
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotalElement.textContent = total.toFixed(2);
    };
  
    const addToCart = (name, price) => {
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
      }
      updateCart();
    };
  
    const removeFromCart = (index) => {
      cart.splice(index, 1);
      updateCart();
    };
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        addToCart(name, price);
      });
    });
  
    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        removeFromCart(index);
      }
    });
  });