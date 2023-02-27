import { ScrollToTopController } from "./ScrollToTopController";

export class ScrollToTopView {
	public root: HTMLElement;
	public controller: ScrollToTopController;

	private button!: HTMLDivElement;

	constructor({ root, controller }: { root: HTMLElement; controller: ScrollToTopController }) {
		this.root = root;
		this.controller = controller;

		this.createButton();
	}

	private createButton(): void {
		this.button = document.createElement("div");
		this.button.classList.add("scroll-to-top__button-wrapper");
		this.button.innerHTML = `
			<button class="scroll-to-top__button" type="button">
				// Icon
				<span class="visually-hidden">Вернуться в начало<span>
			</button>
		`
	}

	public mount(): void {}
}
