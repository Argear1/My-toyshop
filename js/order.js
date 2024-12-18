// JavaScript для изменения цвета кнопок и обновления текста
function selectDelivery(button) {
   // Удаляем класс 'selected' у всех кнопок
   const buttons = document.querySelectorAll('.delivery-option');

   buttons.forEach(btn => {
       btn.classList.remove('selected');
   });

   // Добавляем класс 'selected' к нажатой кнопке
   button.classList.add('selected');
}


// Function to remove an item from the cart
function removeItem(productId) {
  const productElement = document.getElementById(productId);
  if (productElement) {
    productElement.remove(); // Remove the product from the DOM
    updateTotalPrice(); // Update total price after removal

    // Update localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.title !== productElement.querySelector('h4').innerText);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}

// Function to update the total price displayed on the page
function updateTotalPrice() {
  const productItems = document.querySelectorAll('.product-item');
  let totalSum = 0;

  productItems.forEach(item => {
    const quantityText = item.querySelector('.quantity').innerText; // Get quantity text
    const priceValue = parseFloat(item.dataset.price); // Get price value from data attribute
    const quantityValue = parseInt(quantityText);

    const itemTotalPrice = priceValue * quantityValue; // Calculate total sum for this item
    totalSum += itemTotalPrice; // Add to overall total sum

    // Update total price for this item
    item.querySelector('.total-price').innerText = `${itemTotalPrice.toFixed(0)} ₽`;

    // Debugging output to console
    console.log(`Item: ${item.querySelector('h4').innerText}, Quantity: ${quantityValue}, Unit Price: ${priceValue}, Item Total Price: ${itemTotalPrice}`);
  });

  document.getElementById('totalSumPrice').innerText = totalSum.toFixed(0) + ' ₽'; // Update overall total price display

  // Debugging output for total sum
  console.log(`Total Sum of All Products: ${totalSum}`);
}

// Load cart items from localStorage and populate the product list on page load
document.addEventListener('DOMContentLoaded', function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const productList = document.getElementById('productList');

  cartItems.forEach((item, index) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.id = 'product' + (index + 1); // Unique ID for each product
    productDiv.dataset.price = item.price; // Store price as data attribute for easy access
    productDiv.innerHTML = `
                <div class="product-img">
                  <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="product-flex-column">
                  <div class="product-flex">
                    <h4>${item.title}</h4>
                    <div class="quantity-controls">
                        <button class="circle-button" onclick="changeQuantity('${item.title}', -1)">&minus;</button>
                        <span class="quantity" id="${item.title}-quantity">${item.quantity}</span> <!-- Уникальный ID для количества -->
                        <button class="circle-button" onclick="changeQuantity('${item.title}', 1)">&plus;</button>
                    </div>
                    <button class="remove-button" onclick="removeItem('${productDiv.id}')">&#65794;</button>
                  </div>
                <p class="total-price">${item.totalPrice} ₽</p> <!-- Общая цена для данного товара -->
                </div>  `;
    productList.appendChild(productDiv);
  });

  updateTotalPrice(); // Calculate and display total price after loading products
});

function changeQuantity(title, amount) {
  const quantitySpan = document.getElementById(`${title}-quantity`);

  if (!quantitySpan) {
    console.error(`Quantity span not found for title "${title}"`);
    return;
  }

  let currentQuantity = parseInt(quantitySpan.innerText);

  currentQuantity += amount;

  // Ensure quantity does not go below 1
  if (currentQuantity < 1) {
    currentQuantity = 1;
  }

  quantitySpan.innerText = currentQuantity;

  // Update total price for this item
  const productItem = Array.from(document.querySelectorAll('.product-item')).find(item => item.querySelector('h4').innerText === title);

  if (productItem) {
    const pricePerUnit = parseFloat(productItem.dataset.price); // Get price value from data attribute
    const totalPrice = (pricePerUnit * currentQuantity).toFixed(0);
    productItem.querySelector('.total-price').innerText = `${totalPrice} ₽`;

    updateTotalPrice(); // Update overall total price

    // Update localStorage here if needed
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.title === title);
    if (itemIndex > -1) {
      cartItems[itemIndex].quantity = currentQuantity;
      cartItems[itemIndex].totalPrice = totalPrice;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    console.log(`Updated quantity for "${title}" to ${currentQuantity}. New total price is ${totalPrice} ₽`);
  } else {
    console.error(`Product item not found for title "${title}"`);
  }
}