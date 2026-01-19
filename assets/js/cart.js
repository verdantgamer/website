function getCart() {
	return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
	updateCartCount();
}

function addToCart(name, price) {
	let cart = getCart();
	cart.push({ name: name, price: price });
	saveCart(cart);
}

function updateCartCount() {
	let cart = getCart();
	let count = cart.length;
	let badge = document.querySelector('.cart-count');

	if (badge) {
		badge.textContent = count;
	}
}

updateCartCount();
