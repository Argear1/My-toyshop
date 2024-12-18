function updateNavigation() {
    const headerNavigation = document.getElementById('headerNavigation');
    
    if (window.innerWidth <= 900) {
        // Создаем новый контент для узкого экрана
        headerNavigation.innerHTML = `
            <div class="header-flex">
                <div class="logo">
                    <a href="index.html"><img src="/img/header/logo.png" alt="Логотип"></a>
                </div>
                <div class="icons">
                  <div class="header-navigation-button" id="cart-icon">
                      <a href="order.html">&#128092;</a> <!-- Значок корзины -->
                  </div>
                  <div class="header-navigation-button" id="menu-icon">
                      <a href="#" onclick="toggleMenu()">☰</a> <!-- Значок меню (три полоски) -->
                  </div>
                </div>
            </div>`;
        
          // Скрываем навигацию по умолчанию
          document.getElementById('nav-items').style.display = 'none';
          
      } else {
          // Возвращаем первоначальный контент для широкого экрана
          headerNavigation.innerHTML = `
              <div class="header-flex" id="navItems">
                  <div class="header-navigation-button">
                      <a href="toys.html">ИГРУШКИ</a>
                  </div>
                  <div class="header-navigation-button">
                      <a href="cloth.html">ОДЕЖДА</a>
                  </div>
                  <div class="header-navigation-button">
                      <a href="accessories.html">АКСЕССУАРЫ</a>
                  </div>
              </div>
              <div class="logo">
                  <a href="index.html"><img src="/img/header/logo.png" alt="Логотип"></a>
              </div>
              <div class="header-flex" id="additionalNavItems">
                  <div class="header-navigation-button">
                      <a href="aboutus.html">О НАС</a>
                  </div>
                  <div class="header-navigation-button">
                      <a href="delivery.html">ДОСТАВКА И ОПЛАТА</a>
                  </div>
              </div>`;
          
          // Убираем меню на весь экран
          closeMenu();
      }
  }

  function toggleMenu() {
      const menuOverlay = document.getElementById('menu-overlay');
      const headerNavigation = document.getElementById('headerNavigation');

      if (menuOverlay.style.display === 'flex') {
          closeMenu(); // Если меню открыто, закрываем его
      } else {
          openMenu(); // Если меню закрыто, открываем его
      }
  }

  function openMenu() {
      document.getElementById('menu-overlay').style.display = 'flex'; // Показываем меню
      document.getElementById('headerNavigation').classList.add('fixed'); // Добавляем класс фиксированного позиционирования
  }

  function closeMenu() {
      document.getElementById('menu-overlay').style.display = 'none'; // Скрываем меню
      document.getElementById('headerNavigation').classList.remove('fixed'); // Убираем класс фиксированного позиционирования
  }

  // Инициализация отображения при загрузке страницы
  window.addEventListener('resize', updateNavigation);
  window.addEventListener('load', updateNavigation);