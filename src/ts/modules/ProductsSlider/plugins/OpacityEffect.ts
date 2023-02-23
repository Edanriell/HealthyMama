import { Swiper } from "swiper";
import { SwiperEvents } from "swiper/types/swiper-events";
import { gsap } from "gsap";

export default function EffectOpacity({
	swiper,
	on
}: {
	swiper: Swiper;
	on<E extends keyof SwiperEvents>(event: E, handler: SwiperEvents[E]): void;
}) {
	on("init", swiper => {
		const allSliderSlides = swiper.slides;
		const currentActiveSlide: Element = swiper.slides[swiper.activeIndex];

		allSliderSlides.forEach(slide => {
			gsap.to(slide, { opacity: 0.3, duration: 0.5, ease: "power2.out" });
		});

		gsap.to(currentActiveSlide, {
			opacity: 1,
			duration: 0.5,
			ease: "power2.out"
		});
	});

	on("slideChange", swiper => {
		const currentActiveSlide: Element = swiper.slides[swiper.activeIndex];
		const previousActiveSlide: Element = swiper.slides[swiper.previousIndex];

		gsap.fromTo(
			currentActiveSlide,
			{ opacity: 0.3 },
			{ opacity: 1, duration: 0, ease: "power2.out" }
		);

		gsap.fromTo(
			previousActiveSlide,
			{ opacity: 1 },
			{ opacity: 0.3, duration: 0.5, ease: "power2.out" }
		);
	});
}
