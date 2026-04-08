// ========== js/cart.js ==========
// Корзина (использует общие данные из products.js)

(function() {
    let cart = {};

    function loadCart() {
        const savedCart = localStorage.getItem('vinylCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        } else {
            cart = {};
        }
        updateCartCount();
        updateCartDisplay();
    }

    function saveCart() {
        localStorage.setItem('vinylCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(span => {
            span.textContent = totalItems;
        });
    }

    function getCartTotal() {
        let total = 0;
        for (let id in cart) {
            const product = getProductById(id);
            if (product) {
                total += product.price * cart[id].quantity;
            }
        }
        return total;
    }

    window.updateQuantity = function(productId, newQuantity) {
        if (newQuantity <= 0) {
            delete cart[productId];
        } else {
            if (cart[productId]) {
                cart[productId].quantity = newQuantity;
            } else {
                cart[productId] = { id: productId, quantity: newQuantity };
            }
        }
        saveCart();
        updateCartCount();
        updateCartDisplay();
    };

    window.removeItem = function(productId) {
        delete cart[productId];
        saveCart();
        updateCartCount();
        updateCartDisplay();
    };

    window.addToCart = function(productId) {
        const product = getProductById(productId);
        if (!product) return;
        
        if (cart[productId]) {
            cart[productId].quantity += 1;
        } else {
            cart[productId] = { id: productId, quantity: 1 };
        }
        saveCart();
        updateCartCount();
        showNotification(`${product.name} — ${product.album} добавлен в корзину!`);
        
        if (document.getElementById('cartContainer')) {
            updateCartDisplay();
        }
    };

    function updateCartDisplay() {
        const container = document.getElementById('cartContainer');
        if (!container) return;
        
        const cartItems = Object.keys(cart);
        
        if (cartItems.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <span class="cart-empty-subtitle">тут пусто...</span>
                    <a href="catalog.html" class="btn">начать покупки</a>
                </div>
            `;
            return;
        }
        
        let itemsHtml = '<div class="cart-grid">';
        
        for (let id of cartItems) {
            const product = getProductById(id);
            const item = cart[id];
            if (!product) continue;
            
            itemsHtml += `
                <div class="cart-item-card" data-id="${id}">
                    <img src="images/${product.image}" alt="${product.fullTitle}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">
                            ${product.name}<br>
                            ${product.album}
                        </div>
                        <div class="cart-item-price" id="price-${id}">
                            ${(product.price * item.quantity).toLocaleString()} р
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity('${id}', ${item.quantity - 1})">−</button>
                            <span class="quantity-value" id="qty-${id}">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${id}', ${item.quantity + 1})">+</button>
                        </div>
                        <button class="cart-item-delete" onclick="removeItem('${id}')">✕</button>
                    </div>
                </div>
            `;
        }
        
        itemsHtml += '</div>';
        
        const total = getCartTotal();
        itemsHtml += `
            <div class="cart-summary">
                <div class="cart-total">
                    Сумма: <span>${total.toLocaleString()} р</span>
                </div>
                <button onclick="checkout()" class="btn-checkout">Оплатить</button>
            </div>
        `;
        
        container.innerHTML = itemsHtml;
    }

    window.checkout = function() {
        const cartItems = Object.keys(cart);
        if (cartItems.length === 0) {
            showNotification('Корзина пуста. Добавьте товары для оформления заказа.');
            return;
        }
        
        cart = {};
        saveCart();
        updateCartCount();
        updateCartDisplay();
        
        const modal = document.getElementById('successModal');
        if (modal) modal.classList.add('active');
    };

    document.addEventListener('DOMContentLoaded', loadCart);
})();