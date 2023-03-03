import { gsap } from "gsap";

import { ScrollToTopController } from "./ScrollToTopController";
import "./scrollToTop.scss";

export class ScrollToTopView {
	public root: HTMLElement;
	public controller: ScrollToTopController;

	private button!: HTMLAnchorElement;
	private buttonTriggerHeight: number;

	#isLocked: boolean = false;
	#isShowed: boolean = false;

	constructor({
		root,
		controller,
		buttonTriggerHeight
	}: {
		root: HTMLElement;
		controller: ScrollToTopController;
		buttonTriggerHeight: number;
	}) {
		this.root = root;
		this.controller = controller;
		this.buttonTriggerHeight = buttonTriggerHeight;

		this.createButton();

		this.bindListeners();
	}

	private onScrollClick = (event: unknown): void => {
		if (!this.#isLocked) {
			this.#isLocked = true;
			this.button.style.pointerEvents = "none";
			this.controller.handleScroll(event);
		}
	};

	private bindListeners(): void {
		this.button.addEventListener("click", this.onScrollClick);
		document.addEventListener("scroll", () => {
			if (this.buttonTriggerHeight <= window.scrollY) {
				this.displayButton();
			} else {
				this.hideButton();
			}
		});
	}

	private createButton(): void {
		this.button = document.createElement("a");
		this.button.classList.add("scroll-to-top");
		this.button.href = "#up";
		this.button.innerHTML = `
			<div class="scroll-to-top__button">
				<svg class="scroll-to-top__icon">
					<use xlink:href="#arrow-up" x="0" y="0"></use>
				</svg>
				<span class="visually-hidden">Вернуться в начало<span>
			</div>
		`;
		this.button.style.display = "none";
	}

	private displayButton(): void {
		if (!this.#isShowed) {
			this.#isShowed = true;
			gsap.fromTo(
				this.button,
				{ opacity: 0, translateY: 60, display: "none" },
				{ opacity: 1, translateY: 0, display: "block", duration: 0.5, ease: "power2.out" }
			);
		}
	}

	private hideButton(): void {
		if (this.#isShowed) {
			this.#isShowed = false;
			gsap.fromTo(
				this.button,
				{ opacity: 1, translateY: 0, display: "block" },
				{
					opacity: 0,
					translateY: 60,
					display: "none",
					duration: 0.5,
					ease: "power2.out",
					onComplete: () => {
						if (this.#isLocked) {
							this.#isLocked = false;
							this.button.style.pointerEvents = "auto";
						}
					}
				}
			);
		}
	}

	public mount(): void {
		this.root.appendChild(this.button);
	}
}
