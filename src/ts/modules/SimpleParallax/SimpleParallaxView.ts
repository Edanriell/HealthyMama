import { SimpleParallaxController } from "./SimpleParallaxController";

export class SimpleParallaxView {
	controller!: SimpleParallaxController;
	root!: HTMLElement;

	constructor(root: HTMLElement, controller: SimpleParallaxController) {
		this.root = root;
		this.controller = controller;
	}

	public mount(): void {}
}
