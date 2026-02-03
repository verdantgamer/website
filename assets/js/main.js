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

	// ----------------------------
	// Mobile Hamburger Menu
	// ----------------------------

	$(document).ready(function() {
		const $hamburger = $('#hamburger');
		const $navPanel = $('#navPanel');
		const $overlay = $('.nav-overlay');
		
		// Create overlay if it doesn't exist
		if ($overlay.length === 0) {
			$body.append('<div class="nav-overlay"></div>');
		}
		
		// Toggle menu function
		function toggleMenu() {
			$navPanel.toggleClass('visible');
			$('.nav-overlay').toggleClass('active');
		}
		
		// Click hamburger to open/close
		$hamburger.on('click', function(e) {
			e.preventDefault();
			toggleMenu();
		});
		
		// Click overlay to close
		$(document).on('click', '.nav-overlay', function() {
			toggleMenu();
		});
		
		// Close menu when clicking a link
		$navPanel.find('.link').on('click', function() {
			$navPanel.removeClass('visible');
			$('.nav-overlay').removeClass('active');
		});
	});

})(jQuery);
