import { IHoverAnimationView } from "./HoverAnimationTypes";
import { HoverAnimationController } from "./HoverAnimationController";

export class HoverAnimationView implements IHoverAnimationView {
	public root: Element | NodeListOf<Element>;
	public controller: HoverAnimationController;

	constructor({
		root,
		controller
	}: {
		root: Element | NodeListOf<Element>;
		controller: HoverAnimationController;
	}) {
		this.root = root;
		this.controller = controller;

		this.bindListeners();
	}

	private onMouseEnterAnimation = (event: unknown): void => {
		this.controller.handleMouseEnterAnimation(event);
	};

	private onMouseLeaveAnimation = (event: unknown): void => {
		this.controller.handleMouseLeaveAnimation(event);
	};

	private bindListeners(): void {
		if ((this.root as NodeListOf<Element>).length > 0) {
			for (const element of Object.values(this.root)) {
				element.addEventListener("mouseenter", this.onMouseEnterAnimation);
				element.addEventListener("mouseleave", this.onMouseLeaveAnimation);
			}
		} else {
			(this.root as Element).addEventListener("mouseenter", this.onMouseEnterAnimation);
			(this.root as Element).addEventListener("mouseleave", this.onMouseLeaveAnimation);
		}
	}

	public mount(): void {}
}
