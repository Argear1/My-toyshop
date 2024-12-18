// Функция для настройки слайдера
function setupSlider(sliderId) {
    let currentIndex = 0;
    const slides = document.querySelectorAll(`#${sliderId} > div`);
    const totalSlides = slides.length;

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Переход к следующему индексу
        const slider = document.getElementById(sliderId);
        slider.style.transform = `translateX(-${currentIndex * 370}px)`; // Перемещение слайдера
    }

    return setInterval(showNextSlide, 3000); // Автоматическое переключение каждые 3 секунды
}

// Проверяем ширину экрана и настраиваем слайдеры
const mediaQuery = window.matchMedia('(max-width: 900px)');
let popularSliderInterval;
let catalogSliderInterval;

function checkSlider() {
    if (mediaQuery.matches) {
        if (!popularSliderInterval) {
            popularSliderInterval = setupSlider('slider'); // Запускаем первый слайдер
        }
        
        if (!catalogSliderInterval) {
            catalogSliderInterval = setupSlider('catalogSlider'); // Запускаем второй слайдер
        }
    } else {
        // Останавливаем слайдеры при ширине больше 900px и сбрасываем их позицию
        clearInterval(popularSliderInterval);
        clearInterval(catalogSliderInterval);
        
        popularSliderInterval = null;
        catalogSliderInterval = null;

        // Сброс позиции слайдеров
        document.getElementById('slider').style.transform = 'translateX(0)';
        document.getElementById('catalogSlider').style.transform = 'translateX(0)';
    }
}

// Инициализация проверки при загрузке страницы и изменении размера окна
checkSlider();
mediaQuery.addListener(checkSlider);