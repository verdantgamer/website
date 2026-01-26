(function ($) {

	// ----------------------------
	// Page + Nav setup
	// ----------------------------

	const $window = $(window);
	const $body = $('body');

	$window.on('load', function () {
		setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	$('#nav > ul').dropotron({
		mode: 'fade',
		noOpenerFade: true,
		hoverDelay: 150,
		hideDelay: 350
	});


	// ----------------------------
	// CART LOGIC
	// ----------------------------

	function getCart() {
		return JSON.parse(localStorage.getItem('cart')) || [];
	}

	function saveCart(cart) {
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	function updateCartCount() {
		const cart = getCart();
		let count = 0;
		cart.forEach(item => count += item.qty);

		const cartCount = document.querySelector('.cart-count'); // matches your header
		if (cartCount) cartCount.textContent = count;
	}

	function addToCart(item) {
		const cart = getCart();
		const existing = cart.find(p => p.id === item.id);

		if (existing) {
			existing.qty += 1;
		} else {
			cart.push(item);
		}

		saveCart(cart);
		updateCartCount();
	}

	function removeItem(index) {
		const cart = getCart();
		cart.splice(index, 1);
		saveCart(cart);
		updateCartCount();
		renderCart(); // refresh cart page
	}

	function clearCart() {
		localStorage.removeItem('cart');
		updateCartCount();
		renderCart(); // refresh cart page
	}

	function showAddedFeedback(button) {
		const original = button.textContent;
		button.textContent = 'Added!';
		button.disabled = true;

		setTimeout(() => {
			button.textContent = original;
			button.disabled = false;
		}, 1200);
	}

	function renderCart() {
		const cartDiv = document.getElementById('cart');
		const totalEl = document.getElementById('cart-total');

		if (!cartDiv || !totalEl) return; // not on cart page

		const cart = getCart();
		let total = 0;

		cartDiv.innerHTML = '';

		if (cart.length === 0) {
			cartDiv.innerHTML = '<p>Your cart is empty.</p>';
			totalEl.innerHTML = '<strong>Total:</strong> $0';
			return;
		}

		cart.forEach((item, index) => {
			const p = document.createElement('p');
			p.innerHTML = `${item.name} x ${item.qty} — $${(item.price * item.qty).toFixed(2)} <a href="#" onclick="removeItem(${index})">[remove]</a>`;
			cartDiv.appendChild(p);
			total += item.price * item.qty;
		});

		totalEl.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
	}

	// ----------------------------
	// DOM READY
	// ----------------------------
	document.addEventListener('DOMContentLoaded', function () {

		// Event delegation for Add-to-Cart buttons
		document.addEventListener('click', function(e) {
			const button = e.target.closest('.add-to-cart');
			if (!button) return;

			const item = {
				id: button.dataset.id,
				name: button.dataset.name,
				price: Number(button.dataset.price),
				qty: 1
			};

			addToCart(item);
			showAddedFeedback(button);
		});
/*Hamburger*/
		document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.getElementById("hamburger");
	const nav = document.getElementById("nav");

	if (!hamburger || !nav) return;

	hamburger.addEventListener("click", function (e) {
		e.preventDefault();
		nav.classList.toggle("open");
	});
});


		// Expose remove/clear functions globally for inline links
		window.removeItem = removeItem;
		window.clearCart = clearCart;

		// Update cart count
		updateCartCount();

		// Render cart if on cart page
		renderCart();
	});

})(jQuery);



