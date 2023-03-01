import { ScrollToTopController } from "./ScrollToTopController";
import "./scrollToTop.scss";

export class ScrollToTopView {
	public root: HTMLElement;
	public controller: ScrollToTopController;

	private button!: HTMLAnchorElement;

	constructor({ root, controller }: { root: HTMLElement; controller: ScrollToTopController }) {
		this.root = root;
		this.controller = controller;

		this.createButton();

		this.bindListeners();
	}

	private onScrollClick = (event: unknown): void => {
		this.controller.handleScroll(event);
		// console.log(this);
		// console.log((this as unknown as HTMLAnchorElement).hash);
	};

	private bindListeners(): void {
		this.button.addEventListener("click", this.onScrollClick);
	}

	private createButton(): void {
		this.button = document.createElement("a");
		this.button.classList.add("scroll-to-top");
		this.button.href = "#up"
		this.button.innerHTML = `
			<div class="scroll-to-top__button">
				<svg class="scroll-to-top__icon">
					<use xlink:href="#arrow-up" x="0" y="0"></use>
				</svg>
				<span class="visually-hidden">Вернуться в начало<span>
			</div>
		`;
	}

	public mount(): void {
		this.root.appendChild(this.button);
	}
}
