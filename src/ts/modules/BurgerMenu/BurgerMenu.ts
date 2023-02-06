import { gsap } from "gsap";

interface IBurgerMenu {
	trigger: HTMLElement | null;
	burgerMenuContent: HTMLElement | null;
	burgerMenuUnderlay: HTMLElement | null;
	burgerMenuElements: Array<string> | undefined;
	initialBurgerColor: string;
	activeBurgerColor: string;
	overflow: boolean | undefined;
	timeline: gsap.core.Timeline;
	init(): void;
	openMenu(state: string): void;
	closeMenu(state: string): void;
}

export class BurgerMenu implements IBurgerMenu {
	trigger: HTMLElement | null;

	burgerMenuContent: HTMLElement | null;

	burgerMenuUnderlay: HTMLElement | null;

	burgerMenuElements: Array<string> | undefined;

	initialBurgerColor: string;

	activeBurgerColor: string;

	overflow: boolean | undefined;

	timeline: gsap.core.Timeline;

	constructor({
		triggerSelector,
		burgerMenuContentSelector,
		burgerMenuUnderlaySelector,
		burgerMenuElementSelectors,
		initialBurgerMenuColor,
		activeBurgerMenuColor,
		toggleOverflow
	}: {
		triggerSelector: string;
		burgerMenuContentSelector: string;
		burgerMenuUnderlaySelector: string;
		burgerMenuElementSelectors?: Array<string> | undefined;
		initialBurgerMenuColor?: string;
		activeBurgerMenuColor?: string;
		toggleOverflow?: boolean;
	}) {
		this.trigger = document.querySelector(triggerSelector);
		this.burgerMenuContent = document.querySelector(burgerMenuContentSelector);
		this.burgerMenuUnderlay = document.querySelector(burgerMenuUnderlaySelector);
		this.burgerMenuElements = burgerMenuElementSelectors;
		this.initialBurgerColor = initialBurgerMenuColor || "#122659";
		this.activeBurgerColor = activeBurgerMenuColor || "#A90E46";
		this.overflow = toggleOverflow;
		this.timeline = gsap.timeline({ delay: 0.1 });
	}

	public init(): void {
		this.trigger?.addEventListener("click", event => {
			const menu: unknown = event.currentTarget;
			const menuState: string | null = (menu as HTMLElement).getAttribute("data-menu-open");

			switch (menuState) {
				case "false":
					this.openMenu(menuState);
					this.#animateMenuContent();
					(menu as HTMLElement).setAttribute("data-menu-open", "true");
					break;
				case "true":
					this.closeMenu(menuState);
					(menu as HTMLElement).setAttribute("data-menu-open", "false");
					break;
				default:
					throw new Error("Unknown menu state, should be true or false.");
			}
		});
	}

	public openMenu(state: string): void {
		this.animateBurgerMenu(state);
		if (this.burgerMenuUnderlay) {
			this.toggleBurgerMenuUnderlay(state);
		}
		this.toggleBurgerMenu(state);
	}

	public closeMenu(state: string): void {
		this.animateBurgerMenu(state);
		this.toggleBurgerMenu(state);
		if (this.burgerMenuUnderlay) {
			this.toggleBurgerMenuUnderlay(state);
		}
	}

	private toggleBurgerMenuUnderlay(burgerMenuState: string): void {
		if (burgerMenuState === "false") {
			this.#toggleZIndex(burgerMenuState, [
				this.trigger,
				document.querySelector(".logotype")
			]);
			this.#showBurgerMenuUnderlay();
		} else {
			this.#toggleZIndex(burgerMenuState, [
				this.trigger,
				document.querySelector(".logotype")
			]);
			this.#hideBurgerMenuUnderlay();
		}
	}

	private animateBurgerMenu(burgerMenuState: string): void {
		if (burgerMenuState === "false") {
			this.#closeBurgerMenuAnimation();
		} else {
			this.#openBurgerMenuAnimation();
		}
	}

	private toggleBurgerMenu(burgerMenuState: string): void {
		if (burgerMenuState === "false") {
			this.#showBurgerMenu(burgerMenuState);
		} else {
			this.#hideBurgerMenu(burgerMenuState);
		}
	}

	#showBurgerMenuUnderlay(): void {
		this.timeline.fromTo(
			this.burgerMenuUnderlay,
			{ opacity: 0, display: "none" },
			{
				opacity: 1,
				display: "block",
				duration: 0.3,
				ease: "power4.out"
			}
		);
	}

	#hideBurgerMenuUnderlay(): void {
		this.timeline.fromTo(
			this.burgerMenuUnderlay,
			{ opacity: 1, display: "block" },
			{
				opacity: 0,
				display: "none",
				duration: 0.3,
				ease: "power4.out"
			}
		);
	}

	#closeBurgerMenuAnimation(): void {
		const [bar1, bar2, bar3] = this.trigger?.children as unknown as Array<HTMLElement>;

		const rotateBars = (bar: HTMLElement, rotateDegrees: number): void => {
			gsap.fromTo(
				bar,
				{ rotate: 0, backgroundColor: this.initialBurgerColor },
				{
					rotate: rotateDegrees,
					backgroundColor: this.activeBurgerColor,
					duration: 0.6,
					ease: "power4.out"
				}
			);
		};

		gsap.fromTo(
			bar1,
			{ rotate: 0, translateY: 0 },
			{
				rotate: 0,
				translateY: 6,
				duration: 0.6,
				ease: "power4.out",
				onComplete: () => {
					rotateBars(bar1, 45);
				}
			}
		);
		gsap.fromTo(
			bar2,
			{ opacity: 1, scale: 1 },
			{
				opacity: 0,
				scale: 1,
				duration: 0.6,
				ease: "power4.out"
			}
		);
		gsap.fromTo(
			bar3,
			{ rotate: 0, translateY: 0 },
			{
				rotate: 0,
				translateY: -6,
				duration: 0.6,
				ease: "power4.out",
				onComplete: () => {
					rotateBars(bar3, -45);
				}
			}
		);
	}

	#openBurgerMenuAnimation(): void {
		const [bar1, bar2, bar3] = this.trigger?.children as unknown as Array<HTMLElement>;

		const expandBars = (bar: HTMLElement, yCoordinate: number): void => {
			gsap.fromTo(
				bar,
				{ translateY: yCoordinate },
				{
					translateY: 0,
					duration: 0.6,
					ease: "power4.out"
				}
			);
		};

		gsap.fromTo(
			bar1,
			{ rotate: 45, backgroundColor: this.activeBurgerColor },
			{
				rotate: 0,
				duration: 0.6,
				backgroundColor: this.initialBurgerColor,
				ease: "power4.out",
				onComplete: () => {
					expandBars(bar1, 6);
				}
			}
		);
		gsap.fromTo(
			bar2,
			{ opacity: 0, scale: 0, backgroundColor: this.initialBurgerColor },
			{
				opacity: 1,
				scale: 1,
				duration: 0.6,
				backgroundColor: this.initialBurgerColor,
				ease: "power4.out"
			}
		);
		gsap.fromTo(
			bar3,
			{ rotate: -45, backgroundColor: this.activeBurgerColor },
			{
				rotate: 0,
				duration: 0.6,
				backgroundColor: this.initialBurgerColor,
				ease: "power4.out",
				onComplete: () => {
					expandBars(bar3, -6);
				}
			}
		);
	}

	#showBurgerMenu(state: string): void {
		this.timeline.fromTo(
			this.burgerMenuContent,
			{ display: "none", translateY: "-100vw" },
			{
				display: "block",
				translateY: 0,
				duration: 0.6,
				ease: "power4.out",
				onStart: () => {
					this.#toggleBodyOverflow(state);
				}
			}
		);
	}

	#hideBurgerMenu(state: string): void {
		this.timeline.fromTo(
			this.burgerMenuContent,
			{ display: "block", translateY: 0 },
			{
				display: "none",
				translateY: "-112vw",
				duration: 0.6,
				ease: "power4.out",
				onComplete: () => {
					this.#toggleBodyOverflow(state);
				}
			}
		);
	}

	#toggleBodyOverflow(burgerMenuState: string): void {
		if (!this.overflow) return;
		const body = document.querySelector("body");
		const scrollbarWidth = this.#calculateScrollBarWidth();

		if (burgerMenuState === "false") {
			(body as HTMLElement).style.cssText = `
				overflow: hidden;
				padding-right: ${scrollbarWidth}px;
			`;
		} else {
			(body as HTMLElement).style.cssText = `
				overflow: auto;
				padding-right: 0px;
			`;
		}
	}

	#calculateScrollBarWidth(): number {
		const outerDiv = document.createElement("div");
		outerDiv.style.visibility = "hidden";
		outerDiv.style.overflow = "scroll";
		document.body.appendChild(outerDiv);

		const innerDiv = document.createElement("div");
		outerDiv.appendChild(innerDiv);

		const scrollbarWidth = outerDiv.offsetWidth - innerDiv.offsetWidth;

		outerDiv.parentNode?.removeChild(outerDiv);

		return scrollbarWidth;
	}

	#animateMenuContent(): void {
		if (this.burgerMenuElements) this.#showMenuElements(this.burgerMenuElements);
	}

	#showMenuElements(menuElements: Array<string>): void {
		menuElements.forEach(element => {
			this.timeline.fromTo(
				element,
				{ opacity: 0, translateX: 50 },
				{ opacity: 1, translateX: 0, duration: 1, ease: "power4.out", stagger: 0.2 }
			);
		});
	}

	#toggleZIndex(state: string, elements: (HTMLElement | null)[]): void {
		if (state === "false") {
			elements.forEach(element => {
				if (element) element.style.zIndex = "100";
			});
		} else {
			elements.forEach(element => {
				if (element) element.style.zIndex = "1";
			});
		}
	}
}
