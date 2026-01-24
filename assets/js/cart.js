// assets/js/cart.js

document.addEventListener("DOMContentLoaded", function () {

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
		const itemDiv = document.createElement("div");
		itemDiv.className = "cart-item";

		const itemTotal = item.price * item.qty;
		total += itemTotal;

		itemDiv.innerHTML = `
			<h3>${item.name}</h3>
			<p>Quantity: ${item.qty}</p>
			<p>$${item.price.toFixed(2)}</p>
		`;

		container.appendChild(itemDiv);
	});

	totalEl.innerHTML = "<strong>Total:</strong> $" + total.toFixed(2);
}

	// ---- Add to Cart Buttons ----
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
				cart.push({
					id,
					name,
					price,
					qty: 1
				});
			}

			saveCart(cart);

			// ---- "Added!" feedback ----
			const originalText = this.textContent;
			this.textContent = "Added!";
			this.disabled = true;

			setTimeout(() => {
				this.textContent = originalText;
				this.disabled = false;
			}, 900);
		});
	});

	// ---- Init count on page load ----
	updateCartCount();
});
document.addEventListener("DOMContentLoaded", function () {
	if (document.getElementById("cart-items")) {
		renderCart();
	}
});
function clearCart() {
	localStorage.removeItem("cart");
	renderCart();
	updateCartCount();
}


