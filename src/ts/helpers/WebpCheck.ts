"use strict";

(function () {
	const html: HTMLElement = document.documentElement;
	const WebP: HTMLImageElement = new Image();

	WebP.onload = WebP.onerror = function () {
		const isSupported: boolean = WebP.height === 2;

		html.classList.toggle("webp", isSupported);
		html.classList.toggle("no-webp", !isSupported);
	};

	WebP.src =
		"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
})();
