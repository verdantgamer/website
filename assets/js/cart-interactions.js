// Cart Interactions - Clickable Product Cards
// This file handles making product cards clickable and managing the flip animation
// Works with the existing cart.js functionality

document.addEventListener('DOMContentLoaded', function() {
    const clickableCards = document.querySelectorAll('.clickable-card .product-card-front');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = this.dataset.price;
            const image = this.dataset.image;
            
            // Use the existing addToCart function from cart.js
            if (typeof addToCart === 'function') {
                addToCart(id, name, price, image);
            }
            
            // Use the existing showCardFlipFeedback function from cart.js
            // We need to create a fake button element for it to work
            const fakeButton = document.createElement('div');
            fakeButton.closest = function(selector) {
                if (selector === '.product-card') {
                    return productCard;
                }
                return null;
            };
            
            if (typeof showCardFlipFeedback === 'function') {
                showCardFlipFeedback(fakeButton);
            } else {
                // Fallback if function doesn't exist
                productCard.classList.add('flipped');
                setTimeout(function() {
                    productCard.classList.remove('flipped');
                }, 2000);
            }
        });
    });
});
