function openModal(title, price, image) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price + ' ₽';
    document.getElementById('modalImage').src = image;

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