import { ScrollParallaxOptions, ISimpleParallaxView } from "./SimpleParallaxTypes";
import { SimpleParallaxController } from "./SimpleParallaxController";

export class SimpleParallaxView implements ISimpleParallaxView {
	controller!: SimpleParallaxController;
	root!: HTMLElement;
	options: Array<ScrollParallaxOptions>;

	constructor({
		root,
		controller,
		options
	}: {
		root: HTMLElement;
		controller: SimpleParallaxController;
		options: Array<ScrollParallaxOptions>;
	}) {
		this.root = root;
		this.controller = controller;
		this.options = options;
	}

	private onMovementScroll(): void {
		this.controller.handleMovement({ root: this.root, options: this.options });
	}

	public mount(): void {
		this.onMovementScroll();
	}
}
