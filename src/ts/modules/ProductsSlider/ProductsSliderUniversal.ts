import { SwiperOptions } from "swiper";

export const ProductsSliderUniversal: SwiperOptions = {
	slidesPerView: "auto",
	loop: true,
	autoplay: {
		delay: 8000,
		disableOnInteraction: true,
		pauseOnMouseEnter: true
	},
	keyboard: {
		enabled: true
	},
	mousewheel: false,
	grabCursor: true,
	centeredSlides: true,
	spaceBetween: 18,
	speed: 500,
	navigation: {
		nextEl: ".products-slider__next-slide-button",
		prevEl: ".products-slider__previous-slide-button"
	},
	breakpoints: {
		1024: {
			spaceBetween: 17,
			mousewheel: true
		}
	}
};
