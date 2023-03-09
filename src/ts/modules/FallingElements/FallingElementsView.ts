import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

import { FallingElementsController } from "./FallingElementsController";
import { Elements } from "./FallingElementsTypes";

gsap.registerPlugin(MotionPathPlugin);

export class FallingElementsView {
	public root: HTMLElement;
	public controller: FallingElementsController;

	private htmlElements: Array<Elements>;
	private svgElements: Array<HTMLElement> = [];

	constructor({
		root,
		controller,
		htmlElements
	}: {
		root: HTMLElement;
		controller: FallingElementsController;
		htmlElements: Array<Elements>;
	}) {
		this.root = root;
		this.controller = controller;
		this.htmlElements = htmlElements;

		this.createSvgElements();
	}

	private createSvgElements(): void {
		for (const { elementsSize, elements } of this.htmlElements) {
			for (let index = 0; index < elements.length; index++) {
				const svgPathWrapper = document.createElement("div");
				svgPathWrapper.classList.add(`svg-path-${elementsSize}-${index}__wrapper`); // svg-path-${number}__wrapper
				svgPathWrapper.style.cssText = `
					position: absolute;
					z-index: 200;
					top: 0;
					left: 50%;
					width: 100%;
					height: 100%;
				`;
				svgPathWrapper.innerHTML = this.controller.handleSvgPathCreation({
					elementsSize,
					index
				});
				this.svgElements.push(svgPathWrapper);
			}
		}
	}

	private animateElements(): void {
		for (const { elementsSize, elements } of this.htmlElements) {
			for (let index = 0; index < elements.length; index++) {
				console.log(elements);
				gsap.to(elements[index].element, {
					duration: `${elements[index].timeToFall}`,
					repeat: -1,
					repeatDelay: 0.25,
					ease: `${elements[index].easeType}`,
					// onStart: () => {
					// 	gsap.fromTo(
					// 		elements[index].element,
					// 		{ opacity: 0 },
					// 		{ opacity: 0.3, duration: 0.25, ease: `${elements[index].easeType}` }
					// 	);
					// },
					opacity: 0,
					motionPath: {
						path: `.svg-path-${elementsSize}-${index}__path`,
						align: `.svg-path-${elementsSize}-${index}__path`,
						alignOrigin: [0.5, 0.5]
					}
				});
			}
		}
	}

	public mount(): void {
		for (const svgElement of this.svgElements) {
			this.root.append(svgElement);
		}
		this.animateElements();
	}
}
