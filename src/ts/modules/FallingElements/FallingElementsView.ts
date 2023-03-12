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
				const randomLeftCoordinates: number =
					this.controller.handleGenerateRandomNumberInRange({
						minimumValue: 0,
						maximumValue: 76
					});

				const svgPathWrapper = document.createElement("div");
				svgPathWrapper.classList.add(`svg-path-${elementsSize}-${index}__wrapper`);

				svgPathWrapper.style.cssText = `
					position: absolute;
					z-index: 200;
					top: 0;
					left: ${randomLeftCoordinates}%;
					width: 100%;
					height: 100%;
					visibility: ${elements[index].showPath ? "visible" : "hidden"};
					pointer-events: none;
					user-select: none;
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
				const randomDuration: number = this.controller.handleGenerateRandomNumberInRange({
					minimumValue: 20,
					maximumValue: 40
				});
				const randomDelay: number = this.controller.handleGenerateRandomNumberInRange({
					minimumValue: 1,
					maximumValue: 51
				});
				const randomRepeatDelay: number = this.controller.handleGenerateRandomNumberInRange(
					{
						minimumValue: 1,
						maximumValue: 2
					}
				);

				gsap.set(elements[index].element, { opacity: 0, display: "none" });

				gsap.fromTo(
					elements[index].element,
					{
						opacity: 1,
						scale: 0,
						display: "none"
					},
					{
						duration: elements[index].timeToFall ?? randomDuration,
						repeat: +`${
							elements[index].repeat === "infinity" ||
							elements[index].repeat === undefined
								? -1
								: elements[index].repeat
						}`,
						ease: `${elements[index].easeType}` || "none",
						delay: elements[index].delay ?? randomDelay,
						repeatDelay: elements[index].repeatDelay ?? randomRepeatDelay,
						opacity: 0,
						scale: 1,
						display: "block",
						motionPath: {
							path: `.svg-path-${elementsSize}-${index}__path`,
							align: `.svg-path-${elementsSize}-${index}__path`,
							alignOrigin: [0.5, 0.5],
							autoRotate: true,
							start: 0,
							end: 0.9
						}
					}
				);
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
