import { SwiperOptions } from "swiper";

export const MainSliderMobile: SwiperOptions = {
	slidesPerView: 1,
	loop: true,
	autoplay: {
		delay: 8000,
		disableOnInteraction: true,
		pauseOnMouseEnter: true
	},
	navigation: {
		nextEl: ".main-slider__next-slide-button",
		prevEl: ".main-slider__previous-slide-button"
	},
	keyboard: {
		enabled: true
	},
	grabCursor: true,
	effect: "creative",
	creativeEffect: {
		prev: {
			translate: ["-100%", 0, -600],
			opacity: 0,
			origin: "center center",
			scale: 0
		},
		next: {
			translate: ["100%", 0, -600],
			opacity: 0,
			origin: "center center",
			scale: 0
		}
	}
};
