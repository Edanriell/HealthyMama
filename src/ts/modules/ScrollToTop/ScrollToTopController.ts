import { ScrollToTopModel } from "./ScrollToTopModel";

export class ScrollToTopController {
	public model: ScrollToTopModel;

	constructor(model: ScrollToTopModel) {
		this.model = model;
	}

	public handleScroll(): void {
		this.model.scrollToTop();
	}
}
