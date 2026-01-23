/*
	Strongly Typed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			hoverDelay: 150,
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
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
const buttons = document.querySelectorAll('.add-to-cart');

buttons.forEach(button => {
	button.addEventListener('click', () => {
		const item = {
			id: button.dataset.id,
			name: button.dataset.name,
			price: Number(button.dataset.price),
			qty: 1
		};

		addToCart(item);
	});
});

function addToCart(item) {
	let cart = getCart();

	const existing = cart.find(p => p.id === item.id);

	if (existing) {
		existing.qty += 1;
	} else {
		cart.push(item);
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	updateCartCount();
}

	function getCart() {
	return JSON.parse(localStorage.getItem('cart')) || [];
}
function showAddedFeedback(button) {
	const originalText = button.textContent;

	button.textContent = 'Added!';
	button.disabled = true;

	setTimeout(() => {
		button.textContent = originalText;
		button.disabled = false;
	}, 1200);
}

function updateCartCount() {
	const cart = getCart();
	let count = 0;

	cart.forEach(item => {
		count += item.qty;
	});

	const cartCount = document.getElementById('cart-count');
	if (cartCount) {
		cartCount.textContent = count;
	}
}

/* Mobile hamburger toggle */
document.addEventListener('DOMContentLoaded', function () {
	var toggle = document.querySelector('.nav-toggle');
	var nav = document.getElementById('nav');

	if (toggle && nav) {
		toggle.addEventListener('click', function (e) {
			e.preventDefault();
			nav.classList.toggle('visible');
		});
	}
});

	const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartDiv = document.getElementById('cart');
let total = 0;

cart.forEach(item => {
	const line = document.createElement('p');
	line.textContent = `${item.name} x ${item.qty} - $${item.price * item.qty}`;
	cartDiv.appendChild(line);
	total += item.price * item.qty;
});

document.getElementById('total').textContent =
	'Total: $' + total.toFixed(2);
document.addEventListener('DOMContentLoaded', () => {
	updateCartCount();
});

})(jQuery);








