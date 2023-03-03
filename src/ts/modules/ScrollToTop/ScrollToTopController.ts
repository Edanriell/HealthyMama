import { IScrollToTopController } from "./ScrollToTopTypes";
import { ScrollToTopModel } from "./ScrollToTopModel";

export class ScrollToTopController implements IScrollToTopController {
	public model: ScrollToTopModel;

	constructor(model: ScrollToTopModel) {
		this.model = model;
	}

	public handleScroll(event: unknown): void {
		this.model.calculateScroll(event);
	}
}
