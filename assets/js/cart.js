// Cart Interactions - Clickable Product Cards
// This file handles making product cards clickable and managing the flip animation

document.addEventListener('DOMContentLoaded', function() {
    const clickableCards = document.querySelectorAll('.clickable-card .product-card-front');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = this.dataset.price;
            const image = this.dataset.image;
            
            // Use the existing addToCart function from cart.js
            if (typeof addToCart === 'function') {
                addToCart(id, name, price, image);
            }
            
            // Flip the card
            productCard.classList.add('flipped');
            
            // Flip back after 2 seconds
            setTimeout(() => {
                productCard.classList.remove('flipped');
            }, 2000);
        });
    });
});
