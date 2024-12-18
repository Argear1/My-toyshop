let quantity = 1;

function changeQuantity(amount) {
    quantity += amount;

    // Убедитесь, что количество не меньше 1
    if (quantity < 1) {
        quantity = 1;
    }

    // Обновите отображение количества в модальном окне
    document.getElementById('modalQuantityValue').innerText = quantity;

    // Обновите цену в модальном окне
    const pricePerUnit = parseFloat(document.getElementById('modalPrice').getAttribute('data-price'));
    const totalPrice = (pricePerUnit * quantity).toFixed(0); // Убираем .00
    document.getElementById('modalPrice').innerText = totalPrice + ' ₽';
}

function addToCart() {
    const title = document.getElementById('modalTitle').innerText;
    const quantity = parseInt(document.getElementById('modalQuantityValue').innerText);
    const pricePerUnit = parseFloat(document.getElementById('modalPrice').getAttribute('data-price'));
    const totalPrice = (pricePerUnit * quantity).toFixed(0); // Убираем .00

    // Создаем объект товара
    const product = {
        title: title,
        quantity: quantity,
        price: pricePerUnit,
        totalPrice: totalPrice,
        image: document.getElementById('modalImage').src
    };

    // Получаем текущие товары из localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Добавляем новый товар в массив
    cartItems.push(product);
    
    // Сохраняем обновленный массив в localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Переход на страницу заказа
    window.location.href = 'order.html';
}

function openModal(title, price, image) {
    document.getElementById('modalTitle').innerText = title;

    // Установите изначальную цену и обновите атрибут data-price
    document.getElementById('modalPrice').innerText = price + ' ₽';
    document.getElementById('modalPrice').setAttribute('data-price', price); // Сохраняем изначальную цену для расчета

    document.getElementById('modalImage').src = image;

    // Сбросить количество при открытии модального окна
    quantity = 1; 
    document.getElementById('modalQuantityValue').innerText = quantity;

    document.getElementById('productModal').style.display = "block";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeModal();
    }
}
