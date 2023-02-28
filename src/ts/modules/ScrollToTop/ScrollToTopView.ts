import { ScrollToTopController } from "./ScrollToTopController";
import "./scrollToTop.scss";

export class ScrollToTopView {
	public root: HTMLElement;
	public controller: ScrollToTopController;

	private button!: HTMLDivElement;

	constructor({ root, controller }: { root: HTMLElement; controller: ScrollToTopController }) {
		this.root = root;
		this.controller = controller;

		this.createButton();

		this.bindListeners();
	}

	private onScrollClick = (): void => {
		this.controller.handleScroll();
	}

	private bindListeners(): void {
		this.button.addEventListener("click", this.onScrollClick);
	}

	private createButton(): void {
		this.button = document.createElement("div");
		this.button.classList.add("scroll-to-top");
		this.button.innerHTML = `
			<button class="scroll-to-top__button" type="button">
				<svg class="scroll-to-top__icon">
					<use xlink:href="#arrow-up" x="0" y="0"></use>
				</svg>
				<span class="visually-hidden">Вернуться в начало<span>
			</button>
		`
	}

	public mount(): void {
		this.root.appendChild(this.button);
	}
}
