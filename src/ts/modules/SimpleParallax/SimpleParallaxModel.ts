import { ScrollParallaxOptions, ISimpleParallaxModel } from "./SimpleParallaxTypes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export class SimpleParallaxModel implements ISimpleParallaxModel {
	public scrollParallax({
		element,
		root
	}: {
		element: ScrollParallaxOptions;
		root: HTMLElement;
	}): void {
		gsap.to(element.targetElement, {
			yPercent: element.yCoordinateValue,
			ease: element.easeType,
			scrollTrigger: {
				trigger: root,
				start: element.animationStartPosition,
				end: element.animationEndPosition,
				scrub: true,
				markers: element.markers
			}
		});
	}
}
