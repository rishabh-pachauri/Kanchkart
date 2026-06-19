// ==========================================
// ROYAL THEME - LUXURY GLASSWARE ECOMMERCE
// JavaScript Functionality
// ==========================================

// Product Database
const products = [
    {
        id: 1,
        name: 'Crystal Wine Glass Set',
        category: 'drinkware',
        price: 2499,
        originalPrice: 3499,
        rating: 5,
        reviews: 145,
        image: 'https://via.placeholder.com/400x400?text=Wine+Glass+Set',
        description: 'Elegant crystal wine glasses perfect for celebrations',
        badge: 'Best Seller',
        bestseller: true
    },
    {
        id: 2,
        name: 'Premium Serving Bowl',
        category: 'serveware',
        price: 1899,
        originalPrice: 2499,
        rating: 4.8,
        reviews: 98,
        image: 'https://via.placeholder.com/400x400?text=Serving+Bowl',
        description: 'Beautiful hand-crafted serving bowl',
        badge: 'New',
        bestseller: false
    },
    {
        id: 3,
        name: 'Glass Storage Jar Set',
        category: 'storage',
        price: 1299,
        originalPrice: 1799,
        rating: 4.9,
        reviews: 167,
        image: 'https://via.placeholder.com/400x400?text=Storage+Jars',
        description: 'Set of 4 premium glass storage containers',
        badge: 'Popular',
        bestseller: true
    },
    {
        id: 4,
        name: 'Dinner Plate Collection',
        category: 'dining',
        price: 1599,
        originalPrice: 2199,
        rating: 4.7,
        reviews: 76,
        image: 'https://via.placeholder.com/400x400?text=Dinner+Plates',
        description: 'Sophisticated glass dinner plate set',
        badge: 'Exclusive',
        bestseller: false
    },
    {
        id: 5,
        name: 'Crystal Whiskey Glass',
        category: 'drinkware',
        price: 899,
        originalPrice: 1299,
        rating: 5,
        reviews: 112,
        image: 'https://via.placeholder.com/400x400?text=Whiskey+Glass',
        description: 'Premium crystal whiskey glass with luxury finish',
        badge: 'Hot',
        bestseller: true
    },
    {
        id: 6,
        name: 'Decorative Glass Vase',
        category: 'serveware',
        price: 1499,
        originalPrice: 1999,
        rating: 4.8,
        reviews: 89,
        image: 'https://via.placeholder.com/400x400?text=Glass+Vase',
        description: 'Stunning hand-blown glass vase',
        badge: '',
        bestseller: false
    },
    {
        id: 7,
        name: 'Juice Glass Set',
        category: 'drinkware',
        price: 799,
        originalPrice: 1099,
        rating: 4.6,
        reviews: 54,
        image: 'https://via.placeholder.com/400x400?text=Juice+Glasses',
        description: 'Colorful juice glass collection',
        badge: 'Sale',
        bestseller: false
    },
    {
        id: 8,
        name: 'Champagne Flutes Pair',
        category: 'drinkware',
        price: 1199,
        originalPrice: 1699,
        rating: 4.9,
        reviews: 134,
        image: 'https://via.placeholder.com/400x400?text=Champagne+Flutes',
        description: 'Elegant champagne flutes for special occasions',
        badge: 'Best Seller',
        bestseller: true
    }
];

// Cart & Wishlist
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupCartFunctionality();
    setupBackToTop();
    loadFeaturedProducts();
    loadBestSellers();
    updateCartCount();
    updateWishlistCount();
    setupNewsletter();
}

// Navigation
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu?.classList.remove('active');
        });
    });
}

// Cart
function setupCartFunctionality() {
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            renderCart();
        });
    }

    [closeCart, cartOverlay].forEach(el => {
        if (el) {
            el.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
                cartOverlay.classList.remove('active');
            });
        }
    });
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('cartTotal').textContent = '₹0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div style="margin-top: 8px;">
                    <button onclick="removeFromCart(${item.id})" style="background: #D4AF37; color: #2D1B4E; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = '₹' + total;
}

function updateCartCount() {
    const cartCount = document.querySelectorAll('.icon-count')[1];
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    if (wishlist.find(item => item.id === productId)) {
        wishlist = wishlist.filter(item => item.id !== productId);
        showNotification('Removed from wishlist');
    } else {
        wishlist.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image
        });
        showNotification(`${product.name} added to wishlist!`);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function updateWishlistCount() {
    const wishlistCount = document.querySelectorAll('.icon-count')[0];
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Products
function loadFeaturedProducts() {
    const featuredProducts = document.getElementById('featuredProducts');
    if (!featuredProducts) return;

    const featured = products.slice(0, 4);
    featuredProducts.innerHTML = featured.map(product => createProductCard(product)).join('');
    setupProductCardListeners();
}

function loadBestSellers() {
    const bestSellers = document.getElementById('bestSellers');
    if (!bestSellers) return;

    const sellers = products.filter(p => p.bestseller);
    bestSellers.innerHTML = sellers.map(product => createProductCard(product)).join('');
    setupProductCardListeners();
}

function createProductCard(product) {
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    return `
        <div class="product-card" data-product-id="${product.id}" onclick="goToProduct(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="product-wishlist" onclick="event.stopPropagation(); addToWishlist(${product.id});">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-details">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''}</div>
                    <span style="color: #8B8B8B; font-size: 0.875rem;">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">₹${product.price}</span>
                    <span class="price-original">₹${product.originalPrice}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id});">Add to Cart</button>
                    <button class="quick-view-btn" onclick="event.stopPropagation(); addToCart(${product.id});">Buy Now</button>
                </div>
            </div>
        </div>
    `;
}

function setupProductCardListeners() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
    });
}

function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Back to Top
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Newsletter
function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            showNotification(`Thanks for subscribing, ${email}!`);
            this.reset();
        });
    }
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: #D4AF37;
        color: #2D1B4E;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(45, 27, 78, 0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
