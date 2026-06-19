// ==========================================
// KANCHKART - PREMIUM GLASS ECOMMERCE
// JAVASCRIPT FUNCTIONALITY
// ==========================================

// Product Database
const products = [
    {
        id: 1,
        name: 'Premium Glass Water Bottle',
        category: 'bottles',
        price: 1499,
        originalPrice: 1999,
        rating: 5,
        reviews: 245,
        image: 'https://via.placeholder.com/400x400?text=Glass+Water+Bottle',
        images: [
            'https://via.placeholder.com/400x400?text=Glass+Water+Bottle+1',
            'https://via.placeholder.com/400x400?text=Glass+Water+Bottle+2',
            'https://via.placeholder.com/400x400?text=Glass+Water+Bottle+3'
        ],
        description: 'Premium borosilicate glass water bottle with sleek design. Keep your water pure and fresh.',
        features: [
            'Food-grade borosilicate glass',
            'Eco-friendly & recyclable',
            '1000ml capacity',
            'Temperature resistant (-5°C to 120°C)',
            'Comes with protective sleeve',
            '2-year warranty'
        ],
        badge: 'Popular',
        bestseller: true
    },
    {
        id: 2,
        name: 'Glass Mason Jar Set',
        category: 'jars',
        price: 999,
        originalPrice: 1499,
        rating: 4.8,
        reviews: 189,
        image: 'https://via.placeholder.com/400x400?text=Mason+Jars',
        images: [
            'https://via.placeholder.com/400x400?text=Mason+Jar+1',
            'https://via.placeholder.com/400x400?text=Mason+Jar+2',
            'https://via.placeholder.com/400x400?text=Mason+Jar+3'
        ],
        description: 'Set of 4 premium glass mason jars perfect for storage and preservation.',
        features: [
            'Set of 4 jars (500ml each)',
            'Airtight lid system',
            'Perfect for storage & organization',
            'Dishwasher safe',
            'Vintage-inspired design',
            'BPA-free'
        ],
        badge: 'Offer',
        bestseller: true
    },
    {
        id: 3,
        name: 'Premium Beer Mug',
        category: 'mugs',
        price: 799,
        originalPrice: 999,
        rating: 4.9,
        reviews: 156,
        image: 'https://via.placeholder.com/400x400?text=Beer+Mug',
        images: [
            'https://via.placeholder.com/400x400?text=Beer+Mug+1',
            'https://via.placeholder.com/400x400?text=Beer+Mug+2',
            'https://via.placeholder.com/400x400?text=Beer+Mug+3'
        ],
        description: 'Elegant glass beer mug with perfect grip and premium finish.',
        features: [
            '500ml capacity',
            'Thick glass construction',
            'Ergonomic handle design',
            'Crystal clear glass',
            'Perfect for serving cold beverages',
            'Scratch-resistant'
        ],
        badge: 'Hot',
        bestseller: false
    },
    {
        id: 4,
        name: 'Glass Storage Container',
        category: 'storage',
        price: 599,
        originalPrice: 899,
        rating: 4.7,
        reviews: 98,
        image: 'https://via.placeholder.com/400x400?text=Storage+Container',
        images: [
            'https://via.placeholder.com/400x400?text=Container+1',
            'https://via.placeholder.com/400x400?text=Container+2',
            'https://via.placeholder.com/400x400?text=Container+3'
        ],
        description: 'Large glass storage container with airtight lid for dry goods.',
        features: [
            '1500ml capacity',
            'Borosilicate glass',
            'Airtight locking lid',
            'Food-safe materials',
            'Stackable design',
            'Transparent body'
        ],
        badge: '',
        bestseller: false
    },
    {
        id: 5,
        name: 'Glass Fridge Bottle Pro',
        category: 'bottles',
        price: 1299,
        originalPrice: 1799,
        rating: 5,
        reviews: 167,
        image: 'https://via.placeholder.com/400x400?text=Fridge+Bottle',
        images: [
            'https://via.placeholder.com/400x400?text=Fridge+1',
            'https://via.placeholder.com/400x400?text=Fridge+2',
            'https://via.placeholder.com/400x400?text=Fridge+3'
        ],
        description: 'Perfect for refrigerator storage with premium design.',
        features: [
            '750ml capacity',
            'Fridge-friendly shape',
            'Non-slip grip',
            'Leak-proof lid',
            'Keeps drinks cold',
            'Dishwasher safe'
        ],
        badge: 'New',
        bestseller: false
    },
    {
        id: 6,
        name: 'Premium Glass Drinkware Set',
        category: 'bottles',
        price: 1899,
        originalPrice: 2499,
        rating: 4.8,
        reviews: 134,
        image: 'https://via.placeholder.com/400x400?text=Drinkware+Set',
        images: [
            'https://via.placeholder.com/400x400?text=Set+1',
            'https://via.placeholder.com/400x400?text=Set+2',
            'https://via.placeholder.com/400x400?text=Set+3'
        ],
        description: 'Complete 6-piece glass drinkware set for every occasion.',
        features: [
            'Set of 6 glasses (300ml each)',
            'Premium borosilicate glass',
            'Elegant design',
            'Heat & cold resistant',
            'Comes with storage box',
            'Perfect for gifting'
        ],
        badge: 'Hot',
        bestseller: true
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupCartFunctionality();
    setupDarkMode();
    setupScrollAnimations();
    setupBackToTop();
    updateCartCount();
    updateWishlistCount();
}

// Navigation Setup
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        });
    });
}

// Cart Functionality
function setupCartFunctionality() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            renderCart();
        });
    }

    const closeCartElements = [closeCart, closeCartBtn, cartOverlay];
    closeCartElements.forEach(element => {
        if (element) {
            element.addEventListener('click', () => {
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
    
    // Show success message
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '₹0';
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
                <div class="cart-item-qty">
                    <button class="qty-small" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-small" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = '₹' + total;
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    showNotification('Proceeding to checkout...', 'success');
    setTimeout(() => {
        // In real app, redirect to checkout page
        alert('Checkout functionality - integrate with payment gateway');
    }, 1500);
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
    updateWishlistButtons();
}

function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

function updateWishlistButtons() {
    document.querySelectorAll('.product-wishlist, .wishlist-heart').forEach(btn => {
        const productId = btn.dataset.productId;
        if (wishlist.find(item => item.id == productId)) {
            btn.classList.add('active');
            btn.style.color = '#EF4444';
            btn.style.fill = '#EF4444';
        } else {
            btn.classList.remove('active');
            btn.style.color = 'currentColor';
            btn.style.fill = 'none';
        }
    });
}

// Product Display
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    setupProductCardListeners();
}

function loadFeaturedProducts() {
    const featuredProducts = document.getElementById('featuredProducts');
    if (!featuredProducts) return;

    const featured = products.slice(0, 3);
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
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="product-wishlist" data-product-id="${product.id}" onclick="addToWishlist(${product.id}); event.stopPropagation();">
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
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="product-price-box">
                    <span class="price-current">₹${product.price}</span>
                    <span class="price-original">₹${product.originalPrice}</span>
                    <span class="price-discount">${discountPercent}% OFF</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); event.stopPropagation();">Add to Cart</button>
                    <button class="quick-view-btn" onclick="openQuickView(${product.id}); event.stopPropagation();">Quick View</button>
                </div>
            </div>
        </div>
    `;
}

function setupProductCardListeners() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button')) {
                const productId = this.dataset.productId;
                window.location.href = `product.html?id=${productId}`;
            }
        });
    });
    updateWishlistButtons();
}

// Shop Page Filters
function setupFilterListeners() {
    const filters = document.querySelectorAll('input[name="category"], input[name="rating"]');
    const priceRange = document.getElementById('priceRange');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const filterToggle = document.getElementById('filterToggle');
    const shopSidebar = document.getElementById('shopSidebar');
    const closeSidebar = document.querySelector('.sidebar-close');

    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = '₹' + this.value;
            applyFilters();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            shopSidebar.classList.add('active');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            shopSidebar.classList.remove('active');
        });
    }
}

function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
}

function setupSortListener() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    let filteredProducts = [...products];

    // Category filter
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.value)
        .filter(val => val !== 'all');

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category));
    }

    // Price filter
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        const maxPrice = parseInt(priceRange.value);
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    // Rating filter
    const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
        .map(cb => parseInt(cb.value));

    if (selectedRatings.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            selectedRatings.some(rating => p.rating >= rating)
        );
    }

    // Search filter
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    // Sorting
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        switch(sortValue) {
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'popularity':
                filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
        }
    }

    renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    if (!productsGrid) return;

    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '';
        noResults.style.display = 'block';
        resultsCount.textContent = 'No products found';
        return;
    }

    noResults.style.display = 'none';
    productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    resultsCount.textContent = `Showing ${productsToShow.length} products`;
    setupProductCardListeners();
}

function clearAllFilters() {
    document.querySelectorAll('input[name="category"], input[name="rating"]').forEach(cb => {
        cb.checked = false;
    });
    document.querySelector('input[name="category"][value="all"]').checked = true;
    document.getElementById('searchInput').value = '';
    document.getElementById('priceRange').value = 5000;
    document.getElementById('priceValue').textContent = '₹5000';
    document.getElementById('sortSelect').value = 'featured';
    loadProducts();
}

// Product Detail Page
function loadProductDetail(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    // Update page title
    document.title = `${product.name} | KanchKart`;

    // Breadcrumb
    document.getElementById('breadcrumbProduct').textContent = product.name;

    // Images
    const mainImageImg = document.getElementById('mainImageImg');
    if (mainImageImg) {
        mainImageImg.src = product.image;
    }

    const thumbnailImages = document.getElementById('thumbnailImages');
    if (thumbnailImages) {
        thumbnailImages.innerHTML = (product.images || [product.image]).map((img, i) => `
            <div class="thumbnail ${i === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
                <img src="${img}" alt="Product thumbnail">
            </div>
        `).join('');
    }

    // Product info
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productStars').textContent = '★'.repeat(Math.floor(product.rating));
    document.getElementById('reviewCount').textContent = `(${product.reviews} reviews)`;
    document.getElementById('currentPrice').textContent = '₹' + product.price;
    document.getElementById('originalPrice').textContent = '₹' + product.originalPrice;
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    document.getElementById('discount').textContent = discountPercent + '% OFF';
    document.getElementById('productDescription').textContent = product.description;

    // Features
    const featuresList = document.getElementById('featuresList');
    if (featuresList) {
        featuresList.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');
    }

    // Wishlist button
    const addToWishlistBtn = document.getElementById('addToWishlist');
    if (addToWishlistBtn) {
        addToWishlistBtn.onclick = () => addToWishlist(productId);
        if (wishlist.find(item => item.id == productId)) {
            addToWishlistBtn.style.color = '#EF4444';
            addToWishlistBtn.style.fill = '#EF4444';
        }
    }

    // Add to cart
    const quantityInput = document.getElementById('quantityInput');
    const increaseQty = document.getElementById('increaseQty');
    const decreaseQty = document.getElementById('decreaseQty');

    if (increaseQty) {
        increaseQty.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
    }

    if (decreaseQty) {
        decreaseQty.addEventListener('click', () => {
            quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
        });
    }

    // Setup tabs
    setupTabs();

    // Setup zoom
    setupImageZoom(productId);
}

function changeMainImage(src, element) {
    document.getElementById('mainImageImg').src = src;
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
}

function setupImageZoom(productId) {
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const mainImage = document.getElementById('mainImageImg');
    let scale = 1;

    if (zoomIn) {
        zoomIn.addEventListener('click', () => {
            scale = Math.min(scale + 0.2, 3);
            updateZoom();
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener('click', () => {
            scale = Math.max(scale - 0.2, 1);
            updateZoom();
        });
    }

    function updateZoom() {
        if (mainImage) {
            mainImage.style.transform = `scale(${scale})`;
            mainImage.style.transition = 'transform 0.3s ease';
        }
    }
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(tabName)?.classList.add('active');
        });
    });
}

function loadRelatedProducts(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const related = products.filter(p => p.category === product.category && p.id !== product.id);
    const relatedProducts = document.getElementById('relatedProducts');
    
    if (relatedProducts) {
        relatedProducts.innerHTML = related.map(p => createProductCard(p)).join('');
        setupProductCardListeners();
    }
}

function openQuickView(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const quickViewContainer = document.getElementById('quickViewContainer');
    const quickViewModal = document.getElementById('quickViewModal');

    quickViewContainer.innerHTML = `
        <div class="quick-view-container">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-info">
                <h3>${product.name}</h3>
                <div class="quick-view-price">₹${product.price}</div>
                <p>${product.description}</p>
                <div style="margin: 20px 0;">
                    <input type="number" id="quickViewQty" value="1" min="1" style="width: 60px; padding: 8px;">
                </div>
                <button class="btn btn-primary" onclick="addToCart(${product.id}, parseInt(document.getElementById('quickViewQty').value)); closeQuickView();">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    quickViewModal.classList.add('active');
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
}

document.getElementById('closeQuickView')?.addEventListener('click', closeQuickView);
document.getElementById('quickViewModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeQuickView();
});

// Dark Mode
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const newDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', newDarkMode);
        });
    }
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
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

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Newsletter Form
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    showNotification(`Thanks for subscribing, ${email}!`);
    this.reset();
});

// Add animations CSS
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

    [data-aos] {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, addToCart, removeFromCart };
}
