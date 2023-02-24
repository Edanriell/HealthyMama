import { ScrollParallaxOptions, ISimpleParallaxController } from "./SimpleParallaxTypes";
import { SimpleParallaxModel } from "./SimpleParallaxModel";

export class SimpleParallaxController implements ISimpleParallaxController {
	model!: SimpleParallaxModel;

	constructor(model: SimpleParallaxModel) {
		this.model = model;
	}

	public handleMovement({
		options,
		root
	}: {
		root: HTMLElement;
		options: Array<ScrollParallaxOptions>;
	}): void {
		options.forEach(element => {
			this.model.scrollParallax({ root, element });
		});
	}
}
