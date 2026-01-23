(function ($) {

	// ----------------------------
	// Page + Nav setup (unchanged)
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

	$(
		'<div id="titleBar">' +
			'<a href="#navPanel" class="toggle"></a>' +
		'</div>'
	).appendTo($body);

	$(
		'<div id="navPanel">' +
			'<nav>' +
				$('#nav').navList() +
			'</nav>' +
		'</div>'
	)
	.appendTo($body)
	.panel({
		delay: 500,
		hideOnClick: true,
		hideOnSwipe: true,
		resetScroll: true,
		resetForms: true,
		side: 'left',
		target: $body,
		visibleClass: 'navPanel-visible'
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

		const cartCount = document.getElementById('cart-count');
		if (cartCount) cartCount.textContent = count;
	}

	function addToCart(item) {
		let cart = getCart();
		const existing = cart.find(p => p.id === item.id);

		if (existing) {
			existing.qty += 1;
		} else {
			cart.push(item);
		}

		saveCart(cart);
		updateCartCount();
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

	function renderCart(cartDiv) {
		const cart = getCart();
		let total = 0;

		cartDiv.innerHTML = '';

		cart.forEach(item => {
			const line = document.createElement('p');
			line.textContent = `${item.name} x ${item.qty} — $${(item.price * item.qty).toFixed(2)}`;
			cartDiv.appendChild(line);
			total += item.price * item.qty;
		});

		const totalLine = document.createElement('p');
		totalLine.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
		cartDiv.appendChild(totalLine);
	}

// ----------------------------
// DOM READY (ONE PLACE)
// ----------------------------
document.addEventListener('DOMContentLoaded', function () {

    // Cart clicks via delegation
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

    // Update cart icon count on every page
    updateCartCount();

    // Only render cart on cart.html
    const cartDiv = document.getElementById('cart');
    if (cartDiv) {
        renderCart(cartDiv);
    }
});


})(jQuery);


















