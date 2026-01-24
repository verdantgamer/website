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

