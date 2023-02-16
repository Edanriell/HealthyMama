import { SwiperOptions } from "swiper";

const sliderSlideNames: Array<string> = ["Для беременных", "Для кормящих", "Безопасные лакомства"];

export const MainSliderUniversal: SwiperOptions = {
	slidesPerView: 1,
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
	effect: "creative",
	pagination: {
		el: ".main-slider__pagination",
		clickable: true,
		bulletActiveClass: "main-slider__pagination-item--state--active",
		renderBullet: function (index, className) {
			return `
				<li class="main-slider__pagination-item ${className}" tabindex=0>
					<div class="main-slider__pagination-item-${index}">
						<p class="main-slider__pagination-text">${sliderSlideNames[index]}</p>
					</div>
				</li>
			`;
		}
	},
	creativeEffect: {
		prev: {
			translate: ["100%", "-100%", -600],
			opacity: 0,
			origin: "center center",
			rotate: [0, 0, 100],
			scale: 0
		},
		next: {
			translate: ["100%", "100%", -600],
			opacity: 0,
			origin: "center center",
			rotate: [0, 0, -100],
			scale: 0
		}
	}
};
