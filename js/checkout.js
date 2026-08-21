// Checkout functionality
function initCheckout() {
    const checkoutData = JSON.parse(localStorage.getItem('flashcards_checkout')) || [];
    displayOrderSummary(checkoutData);
}

// Display order summary
function displayOrderSummary(items) {
    const summaryContainer = document.getElementById('orderSummary');
    
    if (!summaryContainer) return;
    
    if (items.length === 0) {
        summaryContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>لا يوجد طلبات</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 1rem;">
                    التسوق الآن
                </a>
            </div>
        `;
        return;
    }
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    summaryContainer.innerHTML = `
        <h2 style="margin-bottom: 1.5rem;">📋 ملخص الطلب</h2>
        ${items.map(item => `
            <div class="order-item">
                <span>${item.icon || ''} ${item.name} × ${item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(1)} دينار</span>
            </div>
        `).join('')}
        <div class="order-total">
            <span>الإجمالي:</span>
            <span>${total.toFixed(1)} دينار</span>
        </div>
    `;
}

// Copy phone number to clipboard
function copyPhoneNumber() {
    const phoneNumber = '0917511511';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        showNotification('تم نسخ الرقم بنجاح! 📋');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('تم نسخ الرقم بنجاح! ');
    });
}

// Send order via WhatsApp
function sendOrderWhatsApp() {
    const checkoutData = JSON.parse(localStorage.getItem('flashcards_checkout')) || [];
    
    if (checkoutData.length === 0) {
        showNotification('لا يوجد طلبات لإرسالها ⚠️', 'error');
        return;
    }
    
    const total = checkoutData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = '*طلب جديد من FLASH CARDS*%0A%0A';
    message += '*المنتجات:*%0A';
    
    checkoutData.forEach(item => {
        message += `- ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(1)} دينار%0A`;
    });
    
    message += `%0A*الإجمالي: ${total.toFixed(1)} دينار*`;
    message += '%0A%0Aيرجى تأكيد الطلب وشكراً!';
    
    const whatsappURL = `https://wa.me/218917511511?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Clear cart after order
function clearCartAfterOrder() {
    localStorage.removeItem('flashcards_cart');
    localStorage.removeItem('flashcards_checkout');
    
    // Update cart UI if exists
    if (typeof updateCartUI === 'function') {
        updateCartUI();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCheckout);
