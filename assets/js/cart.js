// Cart functionality
let cart = [];

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('verdantCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('verdantCart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce(function(sum, item) {
        return sum + item.quantity;
    }, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(function(el) {
        el.textContent = totalItems;
    });
}

// Add item to cart
function addToCart(id, name, price, image) {
    // Check if item already exists in cart
    const existingItem = cart.find(function(item) {
        return item.id === id;
    });
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price),
            image: image || 'images/placeholder.jpg',
            quantity: 1
        });
    }
    
    saveCart();
}

// Show card flip feedback when item is added
function showCardFlipFeedback(button) {
    // Find the parent product card
    const productCard = button.closest('.product-card');
    if (productCard) {
        // Add flipped class
        productCard.classList.add('flipped');
        
        // Remove flipped class after 2 seconds
        setTimeout(function() {
            productCard.classList.remove('flipped');
        }, 2000);
    }
}



// Update item quantity
function updateQuantity(id, change) {
    const item = cart.find(function(item) {
        return item.id === id;
    });
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            displayCart();
        }
    }
}

// Display cart items on cart page
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div style="text-align: center; padding: 2rem;">' +
            '<p style="font-size: 1.2rem; color: #666;">Your cart is empty</p>' +
            '<a href="index.html" class="button primary" style="margin-top: 1rem;">Start Shopping</a>' +
            '</div>';
        cartTotalElement.innerHTML = '<strong>Total:</strong> $0.00';
        return;
    }
    
    // Create card-style layout for cart items
    let cartHTML = '<div class="row aln-center">';
    
    cart.forEach(function(item) {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        
        cartHTML += '<div class="col-4 col-6-medium col-12-small">' +
            '<section class="cart-item-card">' +
            '<div class="image featured">' +
            '<img src="' + item.image + '" alt="' + item.name + '" />' +
            '</div>' +
            '<div class="card-info">' +
            '<h3>' + item.name + '</h3>' +
            '<p class="price">$' + item.price.toFixed(2) + ' each</p>' +
            '<div class="quantity-controls">' +
            '<button class="quantity-btn" onclick="updateQuantity(\'' + item.id + '\', -1)">−</button>' +
            '<span class="quantity-display">' + item.quantity + '</span>' +
            '<button class="quantity-btn" onclick="updateQuantity(\'' + item.id + '\', 1)">+</button>' +
            '</div>' +
            '<p class="item-total"><strong>Item Total: $' + itemTotal + '</strong></p>' +
            '</div>' +
            '</section>' +
            '</div>';
    });
    
    cartHTML += '</div>';
    cartItemsContainer.innerHTML = cartHTML;
    
    // Calculate and display total
    const total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);
    cartTotalElement.innerHTML = '<strong>Total:</strong> $' + total.toFixed(2);
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        displayCart();
    }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    
    // If on cart page, display cart
    if (document.getElementById('cart-items')) {
        displayCart();
    }
    
    // Add click handlers to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            addToCart(id, name, price, image);
            showCardFlipFeedback(this);
        });
    });
});
