// ========== js/custom-order.js ==========
// Скрипт для страницы "Под заказ"

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Получаем элементы формы
        const elements = {
            name: document.getElementById('nameInput'),
            email: document.getElementById('emailInput'),
            phone: document.getElementById('phoneInput'),
            consent: document.getElementById('consentInput'),
            marketing: document.getElementById('marketingInput')
        };
        
        const form = document.getElementById('customOrderForm');
        
        // Если форма не найдена на странице — выходим
        if (!form) return;
        
        // Маска телефона
        if (elements.phone && typeof initPhoneMask === 'function') {
            initPhoneMask(elements.phone);
        }
        
        // ОПТИМИЗАЦИЯ: единый обработчик для всех полей ввода
        const inputFields = [elements.name, elements.email, elements.phone];
        inputFields.forEach(field => {
            if (field) {
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            }
        });
        
        // Валидация имени (только буквы, пробелы и дефисы)
        if (elements.name) {
            elements.name.addEventListener('input', function() {
                this.value = this.value.replace(/[^а-яА-Яa-zA-Z\s\-]/g, '');
            });
        }
        
        // Валидация формы
        function validateForm() {
            let isValid = true;
            
            // Проверка имени
            if (!elements.name || elements.name.value.trim() === '') {
                if (elements.name) elements.name.classList.add('error');
                isValid = false;
            } else {
                if (elements.name) elements.name.classList.remove('error');
            }
            
            // Проверка email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!elements.email || elements.email.value.trim() === '' || !emailRegex.test(elements.email.value.trim())) {
                if (elements.email) elements.email.classList.add('error');
                isValid = false;
            } else {
                if (elements.email) elements.email.classList.remove('error');
            }
            
            // Проверка телефона (должно быть 11 цифр)
            if (elements.phone) {
                const phoneDigits = elements.phone.value.replace(/[^0-9]/g, '');
                if (phoneDigits.length !== 11) {
                    elements.phone.classList.add('error');
                    isValid = false;
                } else {
                    elements.phone.classList.remove('error');
                }
            }
            
            // Проверка согласия на обработку персональных данных
            if (!elements.consent || !elements.consent.checked) {
                if (elements.consent) {
                    elements.consent.classList.add('error');
                    const consentContainer = document.getElementById('consentCheckbox');
                    if (consentContainer) {
                        const checkbox = consentContainer.querySelector('.form-check-input');
                        if (checkbox) checkbox.classList.add('error');
                    }
                }
                isValid = false;
            } else {
                if (elements.consent) {
                    elements.consent.classList.remove('error');
                    const consentContainer = document.getElementById('consentCheckbox');
                    if (consentContainer) {
                        const checkbox = consentContainer.querySelector('.form-check-input');
                        if (checkbox) checkbox.classList.remove('error');
                    }
                }
            }
            
            return isValid;
        }
        
        // Функция сброса формы
        function resetForm() {
            if (elements.name) {
                elements.name.value = '';
                elements.name.classList.remove('error');
            }
            if (elements.email) {
                elements.email.value = '';
                elements.email.classList.remove('error');
            }
            if (elements.phone) {
                elements.phone.value = '';
                elements.phone.classList.remove('error');
            }
            if (elements.consent) {
                elements.consent.checked = false;
                elements.consent.classList.remove('error');
                const consentContainer = document.getElementById('consentCheckbox');
                if (consentContainer) {
                    const checkbox = consentContainer.querySelector('.form-check-input');
                    if (checkbox) checkbox.classList.remove('error');
                }
            }
            if (elements.marketing) {
                elements.marketing.checked = false;
            }
        }
        
        // Обработчик отправки формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                resetForm();
                showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            } else {
                showNotification('Пожалуйста, заполните все обязательные поля правильно.');
            }
        });
        
        // Убираем ошибку с чекбокса при клике на него
        if (elements.consent) {
            elements.consent.addEventListener('change', function() {
                if (this.checked) {
                    this.classList.remove('error');
                    const consentContainer = document.getElementById('consentCheckbox');
                    if (consentContainer) {
                        const checkbox = consentContainer.querySelector('.form-check-input');
                        if (checkbox) checkbox.classList.remove('error');
                    }
                }
            });
        }
    });
})();