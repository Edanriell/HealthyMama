import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

import { FallingElementsController } from "./FallingElementsController";
import { Elements, Element, IFallingElementsView } from "./FallingElementsTypes";

gsap.registerPlugin(MotionPathPlugin);
export class FallingElementsView implements IFallingElementsView {
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
				const currentElement: Element = elements[index];

				const randomLeftCoordinate: number =
					this.controller.handleGenerateRandomNumberInRange({
						minimumValue: currentElement.leftCoordinates
							? currentElement.leftCoordinates[0]
							: -20,
						maximumValue: currentElement.leftCoordinates
							? currentElement.leftCoordinates[1]
							: 81
					});

				const svgPathWrapper = document.createElement("div");
				svgPathWrapper.classList.add(
					`svg-path-${elementsSize}-${currentElement.id}__wrapper`
				);

				svgPathWrapper.style.cssText = `
					position: absolute;
					z-index: 200;
					top: ${currentElement.topCoordinate ? currentElement.topCoordinate : 0}%;
					left: ${randomLeftCoordinate}%;
					width: auto !important;
					height: 100%;
					visibility: ${currentElement.showPath ? "visible" : "hidden"};
					pointer-events: none;
					user-select: none;
				`;

				svgPathWrapper.innerHTML = this.controller.handleSvgPathCreation({
					elementsSize,
					id: currentElement.id
				});
				this.svgElements.push(svgPathWrapper);
			}
		}
	}

	private animateElements(): void {
		for (const { elementsSize, elements } of this.htmlElements) {
			for (let index = 0; index < elements.length; index++) {
				const currentElement: Element = elements[index];

				const randomDuration: number = this.controller.handleGenerateRandomNumberInRange({
					minimumValue: 14,
					maximumValue: 54
				});
				const randomDelay: number = this.controller.handleGenerateRandomNumberInRange({
					minimumValue: 1,
					maximumValue: 41
				});
				const randomRepeatDelay: number = this.controller.handleGenerateRandomNumberInRange(
					{
						minimumValue: 1,
						maximumValue: 41
					}
				);

				gsap.set(currentElement.element, { opacity: 0, display: "none" });

				gsap.fromTo(
					currentElement.element,
					{
						opacity: 1,
						scale: 0,
						display: "none"
					},
					{
						duration: currentElement.timeToFall ?? randomDuration,
						repeat: +`${
							currentElement.repeat === "infinity" ||
							currentElement.repeat === undefined
								? -1
								: currentElement.repeat
						}`,
						ease: `${currentElement.easeType}` || "none",
						delay: currentElement.delay ?? randomDelay,
						repeatDelay: currentElement.repeatDelay ?? randomRepeatDelay,
						opacity: 0,
						scale: 1.2,
						display: "block",
						motionPath: {
							path: `.svg-path-${elementsSize}-${currentElement.id}__path`,
							align: `.svg-path-${elementsSize}-${currentElement.id}__path`,
							alignOrigin: [0.5, 0.5],
							autoRotate: true,
							start: +`${
								currentElement.pathAnimationStart
									? currentElement.pathAnimationStart
									: 0
							}`,
							end: +`${
								currentElement.pathAnimationEnd
									? currentElement.pathAnimationEnd
									: 0.8
							}`
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
