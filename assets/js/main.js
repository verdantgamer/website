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

	$('#navPanel')
    .panel({
        delay: 300,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        side: 'left',
        target: $('body'),
        visibleClass: 'navPanel-visible'
    });

	// ----------------------------
	// Mobile Hamburger Menu
	// ----------------------------

	$(document).ready(function() {
		const $hamburger = $('#hamburger');
		const $navPanel = $('#navPanel');
		
		// Create overlay element
		const $overlay = $('<div class="nav-overlay"></div>');
		$body.append($overlay);
		
		// Toggle menu function
		function toggleMenu() {
			$navPanel.toggleClass('open');
			$overlay.toggleClass('active');
		}
		
		// Click hamburger to open/close
		$hamburger.on('click', function(e) {
			e.preventDefault();
			toggleMenu();
		});
		
		// Click overlay to close
		$overlay.on('click', function() {
			toggleMenu();
		});
		
		// Close menu when clicking a link
		$navPanel.find('.link').on('click', function() {
			$navPanel.removeClass('open');
			$overlay.removeClass('active');
		});
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

		const cartCount = document.querySelector('.cart-count');
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
		renderCart();
	}

	function clearCart() {
		localStorage.removeItem('cart');
		updateCartCount();
		renderCart();
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

		if (!cartDiv || !totalEl) return;

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

		// Add-to-cart delegation
		document.addEventListener('click', function (e) {
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



		// Init cart UI
		updateCartCount();
		renderCart();
	});

	// ----------------------------
	// GLOBAL EXPORTS
	// ----------------------------
	window.removeItem = removeItem;
	window.clearCart = clearCart;

})(jQuery);








