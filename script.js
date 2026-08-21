// ===== CART SYSTEM =====
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCartUI();
    showToast('success', 'تمت الإضافة!', `${name} أُضيف إلى السلة`);

    // Button animation
    const btns = document.querySelectorAll('.btn-add-cart');
    btns.forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(name)) {
            btn.classList.add('added');
            btn.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = '<i class="fas fa-cart-plus"></i> أضف للسلة';
            }, 1500);
        }
    });

    // Cart count bump
    const countEl = document.getElementById('cartCount');
    countEl.classList.remove('bump');
    void countEl.offsetWidth;
    countEl.classList.add('bump');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>السلة فارغة</p>
                <span>أضف منتجات للبدء</span>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>${(item.price * item.qty).toFixed(1)} د.ل</span>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${index}, -1)">−</button>
                    <span class="qty-number">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
        cartTotal.textContent = totalPrice.toFixed(1) + ' د.ل';
    }
}

// ===== SIDEBAR TOGGLES =====
function toggleCategories() {
    const sidebar = document.getElementById('categoriesSidebar');
    const overlay = document.getElementById('categoriesOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

// ===== FILTER CATEGORIES =====
function filterCategories() {
    const query = document.getElementById('sidebarSearch').value.toLowerCase();
    const cats = document.querySelectorAll('.sidebar-cat');
    cats.forEach(cat => {
        const name = cat.getAttribute('data-name').toLowerCase();
        const text = cat.textContent.toLowerCase();
        cat.style.display = (name.includes(query) || text.includes(query)) ? 'flex' : 'none';
    });
}

// ===== FILTER PRODUCTS =====
function filterProducts(type, btn) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const blocks = document.querySelectorAll('.category-block');
    blocks.forEach(block => {
        if (type === 'all') {
            block.classList.remove('hidden');
        } else {
            const blockType = block.getAttribute('data-type') || '';
            if (blockType.includes(type)) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        }
    });
}

// ===== CHECKOUT =====
function checkout() {
    if (cart.length === 0) {
        showToast('error', 'السلة فارغة!', 'أضف منتجات أولاً');
        return;
    }

    toggleCart();

    setTimeout(() => {
        const modal = document.getElementById('orderModal');
        const orderItems = document.getElementById('orderItems');
        const orderTotal = document.getElementById('orderTotal');

        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        orderItems.innerHTML = cart.map(item => `
            <div class="order-summary-item">
                <span>${item.name} × ${item.qty}</span>
                <span>${(item.price * item.qty).toFixed(1)} د.ل</span>
            </div>
        `).join('');

        orderTotal.textContent = totalPrice.toFixed(1) + ' د.ل';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 400);
}

function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
    document.body.style.overflow = '';
}

function submitOrder(e) {
    e.preventDefault();

    const name = document.getElementById('orderName').value;
    const phone = document.getElementById('orderPhone').value;
    const payment = document.getElementById('orderPayment').value;
    const notes = document.getElementById('orderNotes').value;

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Build order message
    let orderMsg = `🛒 *طلب جديد*\n\n`;
    orderMsg += `👤 *الاسم:* ${name}\n`;
    orderMsg += `📱 *الهاتف:* ${phone}\n`;
    orderMsg += `💳 *الدفع:* ${payment}\n`;
    if (notes) orderMsg += `📝 *ملاحظات:* ${notes}\n`;
    orderMsg += `\n📦 *المنتجات:*\n`;

    cart.forEach(item => {
        orderMsg += `• ${item.name} × ${item.qty} = ${(item.price * item.qty).toFixed(1)} د.ل\n`;
    });

    orderMsg += `\n💰 *المجموع:* ${totalPrice.toFixed(1)} د.ل`;

    // Show success
    showToast('success', 'تم إرسال الطلب!', 'سيتم التواصل معك قريباً');

    // Clear cart
    cart = [];
    updateCartUI();
    closeModal();

    // Reset form
    document.getElementById('orderForm').reset();

    console.log('Order:', orderMsg);
}

// ===== TOAST NOTIFICATIONS =====
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        </div>
        <div class="toast-text">
            <strong>${title}</strong>
            <span>${message}</span>
        </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===== ALERT (Contact) =====
function showAlert(platform) {
    const names = {
        whatsapp: 'واتساب',
        telegram: 'تيليجرام',
        instagram: 'انستجرام'
    };
    showToast('success', `فتح ${names[platform]}`, 'سيتم تحويلك...');
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString() + '+';
        }, 16);
    });
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    // Observe elements
    document.querySelectorAll('.category-block, .app-card, .payment-card, .contact-card, .feature-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStats.classList.add('fade-in');
        observer.observe(heroStats);
    }

    // Create particles
    createParticles();
});

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['var(--primary-light)', 'var(--secondary)', 'var(--accent)'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        `;
        container.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ===== SIDEBAR CATEGORY CLICK - CLOSE & SCROLL =====
document.querySelectorAll('.sidebar-cat').forEach(cat => {
    cat.addEventListener('click', (e) => {
        e.preventDefault();
        const target = cat.getAttribute('href');
        toggleCategories();
        setTimeout(() => {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
    });
});

// ===== CLOSE MODAL ON OVERLAY CLICK =====
document.getElementById('orderModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('orderModal')) {
        closeModal();
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        const catSidebar = document.getElementById('categoriesSidebar');
        const cartSidebar = document.getElementById('cartSidebar');
        if (catSidebar.classList.contains('active')) toggleCategories();
        if (cartSidebar.classList.contains('active')) toggleCart();
    }
});// ===== CART SYSTEM =====
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCartUI();
    showToast('success', 'تمت الإضافة!', `${name} أُضيف إلى السلة`);

    // Button animation
    const btns = document.querySelectorAll('.btn-add-cart');
    btns.forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(name)) {
            btn.classList.add('added');
            btn.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = '<i class="fas fa-cart-plus"></i> أضف للسلة';
            }, 1500);
        }
    });

    // Cart count bump
    const countEl = document.getElementById('cartCount');
    countEl.classList.remove('bump');
    void countEl.offsetWidth;
    countEl.classList.add('bump');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>السلة فارغة</p>
                <span>أضف منتجات للبدء</span>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>${(item.price * item.qty).toFixed(1)} د.ل</span>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${index}, -1)">−</button>
                    <span class="qty-number">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
        cartTotal.textContent = totalPrice.toFixed(1) + ' د.ل';
    }
}

// ===== SIDEBAR TOGGLES =====
function toggleCategories() {
    const sidebar = document.getElementById('categoriesSidebar');
    const overlay = document.getElementById('categoriesOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

// ===== FILTER CATEGORIES =====
function filterCategories() {
    const query = document.getElementById('sidebarSearch').value.toLowerCase();
    const cats = document.querySelectorAll('.sidebar-cat');
    cats.forEach(cat => {
        const name = cat.getAttribute('data-name').toLowerCase();
        const text = cat.textContent.toLowerCase();
        cat.style.display = (name.includes(query) || text.includes(query)) ? 'flex' : 'none';
    });
}

// ===== FILTER PRODUCTS =====
function filterProducts(type, btn) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const blocks = document.querySelectorAll('.category-block');
    blocks.forEach(block => {
        if (type === 'all') {
            block.classList.remove('hidden');
        } else {
            const blockType = block.getAttribute('data-type') || '';
            if (blockType.includes(type)) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        }
    });
}

// ===== CHECKOUT =====
function checkout() {
    if (cart.length === 0) {
        showToast('error', 'السلة فارغة!', 'أضف منتجات أولاً');
        return;
    }

    toggleCart();

    setTimeout(() => {
        const modal = document.getElementById('orderModal');
        const orderItems = document.getElementById('orderItems');
        const orderTotal = document.getElementById('orderTotal');

        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        orderItems.innerHTML = cart.map(item => `
            <div class="order-summary-item">
                <span>${item.name} × ${item.qty}</span>
                <span>${(item.price * item.qty).toFixed(1)} د.ل</span>
            </div>
        `).join('');

        orderTotal.textContent = totalPrice.toFixed(1) + ' د.ل';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 400);
}

function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
    document.body.style.overflow = '';
}

function submitOrder(e) {
    e.preventDefault();

    const name = document.getElementById('orderName').value;
    const phone = document.getElementById('orderPhone').value;
    const payment = document.getElementById('orderPayment').value;
    const notes = document.getElementById('orderNotes').value;

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Build order message
    let orderMsg = `🛒 *طلب جديد*\n\n`;
    orderMsg += `👤 *الاسم:* ${name}\n`;
    orderMsg += `📱 *الهاتف:* ${phone}\n`;
    orderMsg += `💳 *الدفع:* ${payment}\n`;
    if (notes) orderMsg += `📝 *ملاحظات:* ${notes}\n`;
    orderMsg += `\n📦 *المنتجات:*\n`;

    cart.forEach(item => {
        orderMsg += `• ${item.name} × ${item.qty} = ${(item.price * item.qty).toFixed(1)} د.ل\n`;
    });

    orderMsg += `\n💰 *المجموع:* ${totalPrice.toFixed(1)} د.ل`;

    // Show success
    showToast('success', 'تم إرسال الطلب!', 'سيتم التواصل معك قريباً');

    // Clear cart
    cart = [];
    updateCartUI();
    closeModal();

    // Reset form
    document.getElementById('orderForm').reset();

    console.log('Order:', orderMsg);
}

// ===== TOAST NOTIFICATIONS =====
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        </div>
        <div class="toast-text">
            <strong>${title}</strong>
            <span>${message}</span>
        </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===== ALERT (Contact) =====
function showAlert(platform) {
    const names = {
        whatsapp: 'واتساب',
        telegram: 'تيليجرام',
        instagram: 'انستجرام'
    };
    showToast('success', `فتح ${names[platform]}`, 'سيتم تحويلك...');
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString() + '+';
        }, 16);
    });
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    // Observe elements
    document.querySelectorAll('.category-block, .app-card, .payment-card, .contact-card, .feature-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStats.classList.add('fade-in');
        observer.observe(heroStats);
    }

    // Create particles
    createParticles();
});

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['var(--primary-light)', 'var(--secondary)', 'var(--accent)'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        `;
        container.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ===== SIDEBAR CATEGORY CLICK - CLOSE & SCROLL =====
document.querySelectorAll('.sidebar-cat').forEach(cat => {
    cat.addEventListener('click', (e) => {
        e.preventDefault();
        const target = cat.getAttribute('href');
        toggleCategories();
        setTimeout(() => {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
    });
});

// ===== CLOSE MODAL ON OVERLAY CLICK =====
document.getElementById('orderModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('orderModal')) {
        closeModal();
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        const catSidebar = document.getElementById('categoriesSidebar');
        const cartSidebar = document.getElementById('cartSidebar');
        if (catSidebar.classList.contains('active')) toggleCategories();
        if (cartSidebar.classList.contains('active')) toggleCart();
    }
});
