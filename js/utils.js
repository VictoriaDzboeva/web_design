// ========== УВЕДОМЛЕНИЯ ==========
function showNotification(message) {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// ========== ЧЕКБОКСЫ ==========
function initCheckbox(container, options = {}) {
    const customCheckbox = container.querySelector('.checkbox-custom, .checkbox-custom-news');
    let isChecked = false;
    
    function toggleCheck() {
        isChecked = !isChecked;
        if (isChecked) {
            customCheckbox.classList.add('checked');
        } else {
            customCheckbox.classList.remove('checked');
        }
        if (options.onChange) options.onChange(isChecked);
    }
    
    if (customCheckbox) {
        customCheckbox.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCheck();
        });
    }
    
    container.addEventListener('click', (e) => {
        if (e.target === container || container.contains(e.target)) {
            toggleCheck();
        }
    });
    
    return {
        isChecked: () => isChecked,
        setChecked: (value) => {
            isChecked = value;
            if (isChecked) {
                customCheckbox.classList.add('checked');
            } else {
                customCheckbox.classList.remove('checked');
            }
        },
        setError: () => {
            customCheckbox.classList.add('error-checkbox');
        },
        clearError: () => {
            customCheckbox.classList.remove('error-checkbox');
        }
    };
}

// ========== МАСКА ТЕЛЕФОНА ==========
function initPhoneMask(inputElement) {
    inputElement.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        let formatted = '';
        if (value.length > 0) {
            formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.slice(1, 4);
            }
            if (value.length >= 4) {
                formatted += ') ' + value.slice(4, 7);
            }
            if (value.length >= 7) {
                formatted += '-' + value.slice(7, 9);
            }
            if (value.length >= 9) {
                formatted += '-' + value.slice(9, 11);
            }
        }
        e.target.value = formatted;
        e.target.classList.remove('error', 'success');
    });
}