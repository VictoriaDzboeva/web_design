// ========== js/catalog.js ==========
// Фильтрация каталога (использует общие данные из products.js)

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.genre-filters .filter-btn');
        const productCards = document.querySelectorAll('.catalog-grid .product-card');
        
        if (filterButtons.length === 0 || productCards.length === 0) return;
        
        function filterProducts(genre) {
            let visibleCount = 0;
            
            productCards.forEach(card => {
                if (genre === 'all' || card.dataset.genre === genre) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Показываем сообщение, если нет товаров
            const catalogGrid = document.querySelector('.catalog-grid');
            let noProductsMsg = document.querySelector('.no-products-message');
            
            if (visibleCount === 0) {
                if (!noProductsMsg) {
                    noProductsMsg = document.createElement('div');
                    noProductsMsg.className = 'no-products-message';
                    noProductsMsg.textContent = 'Нет товаров в выбранной категории';
                    noProductsMsg.style.gridColumn = '1 / -1';
                    noProductsMsg.style.textAlign = 'center';
                    noProductsMsg.style.padding = '40px';
                    noProductsMsg.style.fontSize = '20px';
                    noProductsMsg.style.color = 'var(--brown-light)';
                    catalogGrid.appendChild(noProductsMsg);
                }
            } else {
                if (noProductsMsg) noProductsMsg.remove();
            }
            
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === genre) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const genre = btn.dataset.filter;
                filterProducts(genre);
                
                const url = new URL(window.location.href);
                if (genre === 'all') {
                    url.searchParams.delete('genre');
                } else {
                    url.searchParams.set('genre', genre);
                }
                window.history.pushState({}, '', url);
            });
        });
        
        const urlParams = new URLSearchParams(window.location.search);
        const savedGenre = urlParams.get('genre');
        if (savedGenre && savedGenre !== 'all') {
            filterProducts(savedGenre);
        }
    });
})();