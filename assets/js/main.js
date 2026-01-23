// Verdant Gamer Website main java script


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
// Cart Functions
document.addEventListener('DOMContentLoaded', () => {

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
			showAddedFeedback(button);
		});
	});

	updateCartCount();

	// Only run cart display code if we're on cart.html
	const cartDiv = document.getElementById('cart');
	if (cartDiv) {
		renderCart(cartDiv);
	}
});


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



})(jQuery);










