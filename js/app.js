// Products data
const products = [
    {
        id: 'netflix-vip',
        name: 'نتفليكس و شاهد VIP',
        icon: '🍿',
        price: 75,
        desc: 'للآيفون - معدل - بدون إعلانات',
        category: 'streaming',
        badge: 'الأكثر مبيعاً'
    },
    {
        id: 'whatsapp-plus',
        name: 'واتساب بلس المعدل',
        icon: '🟢',
        price: 75,
        desc: 'مميزات حصرية - خصوصية كاملة',
        category: 'apps',
        badge: 'جديد'
    },
    {
        id: 'apps-package-100',
        name: 'باقة تطبيقات البلس',
        icon: '📦',
        price: 180,
        desc: 'مضمونة 100 يوم - 80,000+ تطبيق',
        category: 'packages',
        badge: 'عرض خاص'
    },
    {
        id: 'apps-package-30',
        name: 'باقة تطبيقات البلس',
        icon: '📦',
        price: 105,
        desc: 'مضمونة 30 يوم - 80,000+ تطبيق',
        category: 'packages'
    },
    {
        id: 'pubg-60',
        name: '60 UC ببجي',
        icon: '🎮',
        price: 12,
        desc: 'شحن فوري - مضمون 100%',
        category: 'games'
    },
    {
        id: 'pubg-325',
        name: '325 UC ببجي',
        icon: '🎮',
        price: 50.5,
        desc: 'شحن فوري - مضمون 100%',
        category: 'games'
    },
    {
        id: 'pubg-660',
        name: '660 UC ببجي',
        icon: '🎮',
        price: 98,
        desc: 'شحن فوري - مضمون 100%',
        category: 'games',
        badge: 'الأفضل'
    },
    {
        id: 'pubg-1800',
        name: '1800 UC ببجي',
        icon: '🎮',
        price: 240.5,
        desc: 'شحن فوري - مضمون 100%',
        category: 'games'
    },
    {
        id: 'pubg-3850',
        name: '3850 UC ببجي',
        icon: '🎮',
        price: 478,
        desc: 'شحن فوري - مضمون 100%',
        category: 'games'
    },
    {
        id: 'pubg-8100',
        name: '8100 UC ببجي',
        icon: '🎮',
        price: 953,
        desc: 'شحن فوري - مضمون 100%',
        category: 'games'
    },
    {
        id: 'freefire-1',
        name: 'Free Fire 1$',
        icon: '🔥',
        price: 14.9,
        desc: 'شحن فوري',
        category: 'games'
    },
    {
        id: 'freefire-5',
        name: 'Free Fire 5$',
        icon: '🔥',
        price: 54.5,
        desc: 'شحن فوري',
        category: 'games'
    },
    {
        id: 'freefire-10',
        name: 'Free Fire 10$',
        icon: '🔥',
        price: 104,
        desc: 'شحن فوري',
        category: 'games'
    },
    {
        id: 'valorant-5',
        name: 'فالورانت 5$',
        icon: '🎯',
        price: 53.5,
        desc: 'شحن فوري',
        category: 'games'
    },
    {
        id: 'valorant-10',
        name: 'فالورانت 10$',
        icon: '🎯',
        price: 102,
        desc: 'شحن فوري',
        category: 'games'
    },
    {
        id: 'roblox-10',
        name: 'Roblox 10$',
        icon: '🟥',
        price: 104,
        desc: 'شحن فوري',
        category: 'games'
    },
    {
        id: 'roblox-50',
        name: 'Roblox 50$',
        icon: '🟥',
        price: 500,
        desc: 'شحن فوري',
        category: 'games'
    },
    {
        id: 'xbox-10',
        name: 'Xbox 10$',
        icon: '🎮',
        price: 104,
        desc: 'شحن فوري',
        category: 'games'
    },
    {
        id: 'amazon-25',
        name: 'Amazon 25$',
        icon: '📦',
        price: 252.5,
        desc: 'شحن فوري',
        category: 'gift-cards'
    },
    {
        id: 'steam-20',
        name: 'Steam TR 20$',
        icon: '🎮',
        price: 219,
        desc: 'شحن فوري',
        category: 'games'
    },
    // ==========================================
    // منتجات سناب شات بلس الجديدة
    // ==========================================
    {
        id: 'snapchat-plus-3m',
        name: 'سناب شات بلس - 3 أشهر',
        icon: '👻',
        price: 55,
        desc: 'اشتراك سناب شات بلس رسمي لمدة 3 أشهر',
        category: 'apps',
        badge: 'عرض مميز'
    },
    {
        id: 'snapchat-plus-6m',
        name: 'سناب شات بلس - 6 أشهر',
        icon: '👻',
        price: 85,
        desc: 'اشتراك سناب شات بلس رسمي لمدة 6 أشهر',
        category: 'apps',
        badge: 'توفير'
    },
    {
        id: 'snapchat-plus-12m',
        name: 'سناب شات بلس - 12 شهر',
        icon: '👻',
        price: 240,
        desc: 'اشتراك سناب شات بلس رسمي لمدة 12 شهر',
        category: 'apps',
        badge: 'أفضل قيمة'
    },
    // ==========================================
    // خدمات تعزيز SMM (مستوحاة من libyaplus1.com)
    // ==========================================
    {
        id: 'smm-instagram-followers',
        name: 'متابعين انستجرام',
        icon: '📸',
        price: 5,
        desc: 'زيادة متابعين انستجرام حقيقيين وتفاعليين',
        category: 'smm',
        badge: 'SMM'
    },
    {
        id: 'smm-instagram-likes',
        name: 'إعجابات انستجرام',
        icon: '❤️',
        price: 5,
        desc: 'زيادة الإعجابات على منشورات انستجرام بسرعة',
        category: 'smm',
        badge: 'SMM'
    },
    {
        id: 'smm-youtube-views',
        name: 'مشاهدات يوتيوب',
        icon: '📺',
        price: 5,
        desc: 'زيادة مشاهدات فيديوهات يوتيوب لتحسين الخوارزمية',
        category: 'smm',
        badge: 'SMM'
    },
    {
        id: 'smm-youtube-subscribers',
        name: 'مشتركين يوتيوب',
        icon: '🔴',
        price: 5,
        desc: 'زيادة عدد المشتركين في قناتك على يوتيوب',
        category: 'smm',
        badge: 'SMM'
    },
    {
        id: 'smm-twitter-followers',
        name: 'متابعين تويتر (X)',
        icon: '🐦',
        price: 5,
        desc: 'زيادة متابعين تويتر لرفع تفاعل حسابك',
        category: 'smm',
        badge: 'SMM'
    },
    {
        id: 'smm-facebook-likes',
        name: 'إعجابات فيسبوك',
        icon: '👍',
        price: 5,
        desc: 'زيادة إعجابات صفحة أو منشور فيسبوك',
        category: 'smm',
        badge: 'SMM'
    }
];

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featured = products.slice(0, 6);
    container.innerHTML = featured.map(product => `
        <div class="product-card" data-aos="fade-up">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-icon">${product.icon}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="product-price">${product.price} دينار</div>
            <div class="product-actions">
                <button class="btn btn-primary btn-full" onclick="addToCartById('${product.id}')">
                    أضف للسلة
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart by ID
function addToCartById(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product);
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
});
