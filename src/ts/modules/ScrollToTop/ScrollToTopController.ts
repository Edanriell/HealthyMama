import { ScrollToTopModel } from "./ScrollToTopModel";

export class ScrollToTopController {
	public model: ScrollToTopModel;

	constructor(model: ScrollToTopModel) {
		this.model = model;
	}

	public handleScroll(event: unknown): void {
		this.model.scrollToTop(event);
	}
}
