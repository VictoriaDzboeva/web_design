// ========== СКРИПТЫ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ ==========
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        
        // ========== 1. ТАБЫ (О НАС / ДОСТАВКА / ЗАКАЗ) ==========
        const tabData = {
            about: {
                text: 'Мы не просто магазин пластинок. Мы — команда меломанов, которые каждый день ищут музыку, способную тронуть вас. Наша коллекция собиралась годами: здесь и классика, которую знают все, и редкие издания, о которых мечтают коллекционеры. «СТУДИЯ ’48» родилась из любви к аналоговому звуку. Мы верим, что винил — это не просто формат. Это ритуал. Это момент, когда ты достаёшь пластинку из конверта, ставишь иглу и мир замирает. Мы здесь, чтобы вы нашли свою музыку. Ту самую, которая будет звучать в вашем доме снова и снова.',
                image: 'images/about.jpg'
            },
            delivery: {
                text: 'Мы знаем, как вы волнуетесь за свою будущую коллекцию, поэтому упаковке уделяем особое внимание. Как мы упаковываем: Специальные усиленные коробки для винила Дополнительный слой пупырчатой плёнки Наклейка «Хрупкое» для больших заказов Сроки и стоимость: Отправляем в течение 24 часов после оформления заказа Доставка по всей России от 2 до 7 дней Стоимость рассчитывается индивидуально при оформлении Если заказ всё же пришёл с повреждениями — сразу сфотографируйте упаковку и содержимое и напишите нам. Мы разберёмся в ситуации в течение 24 часов.',
                image: 'images/delivery.jpg'
            },
            order: {
                text: 'Бывает, что нужного альбома нет в каталоге. Мы это понимаем и готовы помочь. Индивидуальный заказ пластинки (если нет в каталоге): Перейдите в раздел «Под заказ» Заполните форму Отправьте заявку Что дальше? Мы найдём пластинку у дистрибьюторов в Европе, США или Великобритании, свяжемся с вами в течение 1–2 дней и обсудим детали. Предоплата — 1000 ₽, остальное при получении. Срок — от 2 до 8 недель. Экономия до 20% по сравнению с самостоятельным заказом.',
                image: 'images/order.jpg'
            },
        };
        
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabText = document.getElementById('tabText');
        const tabImage = document.getElementById('tabImage');
        
        function switchTab(tabId) {
            if (tabText && tabImage && tabData[tabId]) {
                tabText.innerHTML = tabData[tabId].text;
                tabImage.src = tabData[tabId].image;
            }
            if (tabButtons.length) {
                tabButtons.forEach(btn => {
                    if (btn.dataset.tab === tabId) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        }
        
        if (tabButtons.length) {
            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => switchTab(btn.dataset.tab));
            });
        }
        
        // ========== 2. SWIPER СЛАЙДЕР ==========
        if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
            new Swiper('.mySwiper', {
                slidesPerView: 'auto',
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                speed: 3000,
                freeMode: true,
                freeModeMomentum: false,
            });
        }
        
        // ========== 3. МОДАЛЬНОЕ ОКНО ПОДПИСКИ ==========
        const newsModal = document.getElementById('newsModal');
        const openNewsModalBtn = document.getElementById('openNewsModal');
        const closeNewsModalBtn = document.getElementById('closeNewsModal');
        
        if (newsModal && openNewsModalBtn) {
            // Открытие
            openNewsModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                newsModal.classList.add('active');
            });
            
            // Закрытие
            function closeNewsModal() {
                newsModal.classList.remove('active');
            }
            
            if (closeNewsModalBtn) {
                closeNewsModalBtn.addEventListener('click', closeNewsModal);
            }
            
            // Закрытие по клику на оверлей
            newsModal.addEventListener('click', (e) => {
                if (e.target === newsModal) closeNewsModal();
            });
            
            // Чекбоксы
            const newsConsentContainer = document.getElementById('newsConsentCheckbox');
            const newsMarketingContainer = document.getElementById('newsMarketingCheckbox');
            
            let newsConsent, newsMarketing;
            
            if (newsConsentContainer && typeof initCheckbox === 'function') {
                newsConsent = initCheckbox(newsConsentContainer);
            }
            if (newsMarketingContainer && typeof initCheckbox === 'function') {
                newsMarketing = initCheckbox(newsMarketingContainer);
            }
            
            // Элементы формы
            const newsName = document.getElementById('newsName');
            const newsEmail = document.getElementById('newsEmail');
            const newsGenre = document.getElementById('newsGenre');
            const newsForm = document.getElementById('newsForm');
            
            if (newsForm) {
                function validateNewsForm() {
                    let isValid = true;
                    
                    if (newsName.value.trim() === '') {
                        newsName.classList.add('error');
                        isValid = false;
                    } else {
                        newsName.classList.remove('error');
                    }
                    
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (newsEmail.value.trim() === '' || !emailRegex.test(newsEmail.value.trim())) {
                        newsEmail.classList.add('error');
                        isValid = false;
                    } else {
                        newsEmail.classList.remove('error');
                    }
                    
                    if (newsConsent && !newsConsent.isChecked()) {
                        newsConsent.setError();
                        isValid = false;
                    } else if (newsConsent) {
                        newsConsent.clearError();
                    }
                    
                    return isValid;
                }
                
                function resetNewsForm() {
                    newsName.value = '';
                    newsEmail.value = '';
                    newsGenre.value = '';
                    if (newsConsent) newsConsent.setChecked(false);
                    if (newsMarketing) newsMarketing.setChecked(false);
                    newsName.classList.remove('error');
                    newsEmail.classList.remove('error');
                }
                
                newsForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (validateNewsForm()) {
                        resetNewsForm();
                        closeNewsModal();
                        if (typeof showNotification === 'function') {
                            showNotification('Спасибо за подписку! Будем делиться новостями о виниле.');
                        }
                    } else {
                        if (typeof showNotification === 'function') {
                            showNotification('Пожалуйста, заполните все обязательные поля.');
                        }
                    }
                });
            }
        }
        
    });
})();