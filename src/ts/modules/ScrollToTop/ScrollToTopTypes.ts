import { ScrollToTopController } from "./ScrollToTopController";
import { ScrollToTopModel } from "./ScrollToTopModel";

export interface IScrollToTopView {
	root: HTMLElement;
	controller: ScrollToTopController;

	mount(): void;
}

export interface IScrollToTopController {
	model: ScrollToTopModel;

	handleScroll(event: unknown): void;
}

export interface IScrollToTopModel {
	calculateScroll(event: unknown): void;
}
