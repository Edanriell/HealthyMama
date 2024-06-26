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

	private onFocusAnimation = (event: unknown): void => {
		this.controller.handleFocusAnimation(event);
	};

	private onBlurAnimation = (event: unknown): void => {
		this.controller.handleBlurAnimation(event);
	};

	private bindListeners(): void {
		if ((this.root as NodeListOf<Element>).length > 0) {
			for (const element of Object.values(this.root)) {
				element.addEventListener("mouseenter", this.onMouseEnterAnimation);
				element.addEventListener("mouseleave", this.onMouseLeaveAnimation);
				element.addEventListener("focus", this.onFocusAnimation);
				element.addEventListener("blur", this.onBlurAnimation);
			}
		} else {
			(this.root as Element).addEventListener("mouseenter", this.onMouseEnterAnimation);
			(this.root as Element).addEventListener("mouseleave", this.onMouseLeaveAnimation);
			(this.root as Element).addEventListener("focus", this.onFocusAnimation);
			(this.root as Element).addEventListener("blur", this.onBlurAnimation);
		}
	}

	public mount(): void {}
}
