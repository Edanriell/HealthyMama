import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

import { FallingElementsController } from "./FallingElementsController";
import { Elements } from "./FallingElementsTypes";

gsap.registerPlugin(MotionPathPlugin);

export class FallingElementsView {
	public root: HTMLElement;
	public controller: FallingElementsController;

	private elements: Elements;

	constructor({
		root,
		controller,
		elements
	}: {
		root: HTMLElement;
		controller: FallingElementsController;
		elements: Elements;
	}) {
		this.root = root;
		this.controller = controller;
		this.elements = elements;
	}

	private createSvgPath(): HTMLElement {
		const svgPathWrapper = document.createElement("div");
		svgPathWrapper.classList.add("svg-path__wrapper"); // svg-path-${number}__wrapper
		svgPathWrapper.style.cssText = `
			position: absolute;
			z-index: 200;
			top: 0;
			left: ${this.controller.randomizePosition({ minValue: 1, maxValue: 100 })};
			width: 100%;
			height: 100%;
		`;
		// svg-path-${number}
		// svg-path-${number}__path
		// svgPathWrapper.innerHTML = `
		// 	<svg class="svg-path-1" width="268" height="100%" viewBox="0 0 268 1075" fill="none" xmlns="http://www.w3.org/2000/svg">
		// 		<path class="svg-path-1__path" d="M163 1C163 1 211 167 163 263.5C115 360 -13.4395 376.797 2.00002 481.5C19.2242 598.306 239.33 516.145 264.5 631.5C292.875 761.546 12.4223 742.039 25.5 874.5C37.1514 992.515 254 1074.5 254 1074.5" stroke="black"/>
		// 	</svg>
		// `;
		svgPathWrapper.innerHTML = this.controller.randomizeSvgPath();
		return svgPathWrapper;
	}

	// 5 delete
	// 2 delete
	// 8 delete
	private falling(): void {
		gsap.to((this.elements[0] as HTMLElement[])[0], {
			duration: 20,
			repeat: 20,
			repeatDelay: 3,
			// yoyo: true,
			opacity: 0,
			ease: "power2.out",
			motionPath: {
				path: ".svg-path-1__path",
				align: ".svg-path-1__path",
				autoRotate: true,
				alignOrigin: [0.5, 0.5]
			}
		});

		// for (const elements of this.elements) {
		// 	for (const element of (elements as HTMLElement[])) {
		// 		gsap.to(element, {
		// 			duration: 5,
		// 			repeat: 12,
		// 			repeatDelay: 3,
		// 			yoyo: true,
		// 			ease: "power1.inOut",
		// 			motionPath: {
		// 				path: "M9,100c0,0,18-41,49-65",
		// 				// align: "M9,100c0,0,18-41,49-65",
		// 				autoRotate: true,
		// 				alignOrigin: [0.5, 0.5]
		// 			}
		// 		});
		// 	}
		// }
	}

	public mount(): void {
		const svgPath1 = this.createSvgPath();
		this.root.append(svgPath1);
		this.falling();
	}
}
