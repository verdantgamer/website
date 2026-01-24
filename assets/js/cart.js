// assets/js/cart.js

// ---- Helpers ----
function getCart() {
	return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
	updateCartCount();
}

function updateCartCount() {
	const cart = getCart();
	const count = cart.reduce((sum, item) => sum + item.qty, 0);

	document.querySelectorAll(".cart-count").forEach(el => {
		el.textContent = count;
	});
}

// ---- Render Cart ----
function renderCart() {
	const cart = getCart();
	const container = document.getElementById("cart-items");
	const totalEl = document.getElementById("cart-total");

	if (!container) return;

	container.innerHTML = "";

	if (cart.length === 0) {
		container.innerHTML = "<p>Your cart is empty.</p>";
		totalEl.innerHTML = "<strong>Total:</strong> $0";
		return;
	}

	let total = 0;

	cart.forEach(item => {
		const itemTotal = item.price * item.qty;
		total += itemTotal;

		const div = document.createElement("div");
		div.className = "cart-item";
		div.innerHTML = `
			<h3>${item.name}</h3>
			<p>Quantity: ${item.qty}</p>
			<p>$${item.price.toFixed(2)}</p>
		`;

		container.appendChild(div);
	});

	totalEl.innerHTML = "<strong>Total:</strong> $" + total.toFixed(2);
}

// ---- Clear Cart ----
function clearCart() {
	localStorage.removeItem("cart");
	renderCart();
	updateCartCount();
}

// ---- Page Init ----
document.addEventListener("DOMContentLoaded", function () {

	// Add to cart buttons
	document.querySelectorAll(".add-to-cart").forEach(button => {
		button.addEventListener("click", function () {

			const id = this.dataset.id;
			const name = this.dataset.name;
			const price = parseFloat(this.dataset.price);

			let cart = getCart();
			let existing = cart.find(item => item.id === id);

			if (existing) {
				existing.qty += 1;
			} else {
				cart.push({ id, name, price, qty: 1 });
			}

			saveCart(cart);

			const originalText = this.textContent;
			this.textContent = "Added!";
			this.disabled = true;

			setTimeout(() => {
				this.textContent = originalText;
				this.disabled = false;
			}, 900);
		});
	});

	updateCartCount();

	if (document.getElementById("cart-items")) {
		renderCart();
	}
});




