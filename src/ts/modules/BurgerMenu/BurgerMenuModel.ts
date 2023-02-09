import { gsap } from "gsap";
import { IBurgerMenuModel } from "./BurgerMenuTypes";

export class BurgerMenuModel implements IBurgerMenuModel {
	burgerMenuElements:
		| Array<{ selector: string; initialColor: string; activeColor: string }>
		| undefined;

	initialBurgerColor: string;

	activeBurgerColor: string;

	toggleOverflow: boolean | undefined;

	timeline: gsap.core.Timeline;

	burgerSelector: string;

	burgerMenuUnderlaySelector: string;

	websiteLogotypeSelector: string;

	toggleElementsZIndex: boolean;

	burgerMenuContentSelector: string;

	easeType: string;

	isBurgerMenuLocked: boolean;

	constructor({
		burgerMenuElements,
		initialBurgerColor,
		activeBurgerColor,
		burgerSelector,
		burgerMenuUnderlaySelector,
		toggleElementsZIndex,
		websiteLogotypeSelector,
		burgerMenuContentSelector,
		toggleOverflow,
		timeline,
		easeType
	}: {
		burgerMenuElements?: Array<{ selector: string; initialColor: string; activeColor: string }>; //
		initialBurgerColor?: string;
		activeBurgerColor?: string;
		burgerSelector?: string;
		burgerMenuUnderlaySelector?: string;
		toggleElementsZIndex?: boolean;
		websiteLogotypeSelector?: string;
		burgerMenuContentSelector?: string;
		toggleOverflow?: boolean;
		timeline?: gsap.core.Timeline;
		easeType?: string;
	}) {
		this.burgerMenuElements = burgerMenuElements || [
			{
				selector: ".logotype__text-content",
				initialColor: "black",
				activeColor: "white"
			}
		];
		this.initialBurgerColor = initialBurgerColor || "rgb(40, 175, 96)";
		this.activeBurgerColor = activeBurgerColor || "#FFF";
		this.burgerSelector = burgerSelector || ".mobile-navigation-burger";
		this.burgerMenuUnderlaySelector =
			burgerMenuUnderlaySelector || ".mobile-navigation__underlay";
		this.toggleElementsZIndex = toggleElementsZIndex || false;
		this.websiteLogotypeSelector = websiteLogotypeSelector || ".logotype";
		this.burgerMenuContentSelector = burgerMenuContentSelector || ".mobile-navigation__content";
		this.toggleOverflow = toggleOverflow || true;
		this.timeline = timeline || gsap.timeline({ delay: 0.1 });
		this.easeType = easeType || "power2.out";
		this.isBurgerMenuLocked = false;
	}

	public openMenu(state: string): this | undefined {
		if (this.isBurgerMenuLocked) {
			return;
		}

		this.isBurgerMenuLocked = true;

		const burgerMenuUnderlay = document.querySelector(this.burgerMenuUnderlaySelector);
		const burger = document.querySelector(this.burgerSelector);
		const websiteLogotype = document.querySelector(this.websiteLogotypeSelector);

		if (this.toggleElementsZIndex) {
			this.toggleZIndex("false", [burger as HTMLElement, websiteLogotype as HTMLElement]);
		}

		if (this.burgerMenuElements) {
			this.toggleBurgerMenuElementsColor(state, this.burgerMenuElements);
		}

		this.animateBurgerMenu(state);
		if (burgerMenuUnderlay) {
			this.toggleBurgerMenuUnderlay(state);
		}
		this.toggleBurgerMenuContent(state);

		setTimeout(() => {
			this.#changeMenuState();
			this.isBurgerMenuLocked = false;
		}, 1900);

		return this;
	}

	public closeMenu(state: string): this | undefined {
		if (this.isBurgerMenuLocked) {
			return;
		}

		this.isBurgerMenuLocked = true;

		const burgerMenuUnderlay = document.querySelector(this.burgerMenuUnderlaySelector);
		const burger = document.querySelector(this.burgerSelector);
		const websiteLogotype = document.querySelector(this.websiteLogotypeSelector);

		if (this.burgerMenuElements) {
			this.toggleBurgerMenuElementsColor(state, this.burgerMenuElements);
		}

		this.animateBurgerMenu(state);
		this.toggleBurgerMenuContent(state);
		if (burgerMenuUnderlay) {
			this.toggleBurgerMenuUnderlay(state);
		}

		if (this.toggleElementsZIndex) {
			this.toggleZIndex("true", [burger as HTMLElement, websiteLogotype as HTMLElement]);
		}

		setTimeout(() => {
			this.#changeMenuState();
			this.isBurgerMenuLocked = false;
		}, 1200);

		return this;
	}

	private toggleBurgerMenuUnderlay(burgerMenuState: string): void {
		if (burgerMenuState === "false") {
			this.showBurgerMenuUnderlay();
		} else {
			this.hideBurgerMenuUnderlay();
		}
	}

	private animateBurgerMenu(burgerMenuState: string): void {
		if (burgerMenuState === "false") {
			this.closeBurgerMenuAnimation();
		} else {
			this.openBurgerMenuAnimation();
		}
	}

	private toggleBurgerMenuContent(burgerMenuState: string): void {
		if (burgerMenuState === "false") {
			this.showBurgerMenuContent(burgerMenuState);
		} else {
			this.hideBurgerMenuContent(burgerMenuState);
		}
	}

	private showBurgerMenuUnderlay(): void {
		const burgerMenuUnderlay = document.querySelector(this.burgerMenuUnderlaySelector);

		this.timeline.fromTo(
			burgerMenuUnderlay,
			{ opacity: 1, translateX: 600, display: "none" },
			{
				opacity: 1,
				display: "block",
				duration: 0.5,
				translateX: 0,
				ease: this.easeType
			}
		);
	}

	private hideBurgerMenuUnderlay(): void {
		const burgerMenuUnderlay = document.querySelector(this.burgerMenuUnderlaySelector);

		this.timeline.fromTo(
			burgerMenuUnderlay,
			{ opacity: 1, translateX: 0, display: "block" },
			{
				opacity: 1,
				display: "none",
				duration: 1.2,
				translateX: 600,
				ease: this.easeType
			}
		);
	}

	private closeBurgerMenuAnimation(): void {
		const burger = document.querySelector(this.burgerSelector);
		const [burgerBar1, burgerBar2, burgerBar3] =
			burger?.children as unknown as Array<HTMLElement>;

		const rotateBars = (burgerBar: HTMLElement, rotateDegrees: number): void => {
			gsap.fromTo(
				burgerBar,
				{ rotate: 0 },
				{
					rotate: rotateDegrees,
					duration: 0.6,
					ease: this.easeType
				}
			);
		};

		gsap.fromTo(
			burgerBar1,
			{ rotate: 0, translateY: 0 },
			{
				rotate: 0,
				translateY: 11,
				color: this.activeBurgerColor,
				duration: 0.6,
				ease: this.easeType,
				onComplete: () => {
					rotateBars(burgerBar1, 45);
				}
			}
		);

		gsap.fromTo(
			burgerBar2,
			{ opacity: 1, scale: 1 },
			{
				opacity: 0,
				scale: 1,
				duration: 0.6,
				ease: this.easeType
			}
		);

		gsap.fromTo(
			burgerBar3,
			{ rotate: 0, translateY: 0 },
			{
				rotate: 0,
				translateY: -11,
				color: this.activeBurgerColor,
				duration: 0.6,
				ease: this.easeType,
				onComplete: () => {
					rotateBars(burgerBar3, -45);
				}
			}
		);
	}

	private openBurgerMenuAnimation(): void {
		const burger = document.querySelector(this.burgerSelector);
		const [burgerBar1, burgerBar2, burgerBar3] =
			burger?.children as unknown as Array<HTMLElement>;

		const expandBars = (burgerBar: HTMLElement, yCoordinate: number): void => {
			gsap.fromTo(
				burgerBar,
				{ translateY: yCoordinate },
				{
					translateY: 0,
					duration: 0.6,
					ease: this.easeType
				}
			);
		};

		gsap.fromTo(
			burgerBar1,
			{ rotate: 45, color: this.activeBurgerColor },
			{
				rotate: 0,
				duration: 0.6,
				color: this.initialBurgerColor,
				ease: this.easeType,
				onComplete: () => {
					expandBars(burgerBar1, 6);
				}
			}
		);

		gsap.fromTo(
			burgerBar2,
			{ opacity: 0, scale: 1, color: this.initialBurgerColor },
			{
				opacity: 1,
				scale: 1,
				duration: 0.6,
				color: this.initialBurgerColor,
				ease: this.easeType
			}
		);

		gsap.fromTo(
			burgerBar3,
			{ rotate: -45, color: this.activeBurgerColor },
			{
				rotate: 0,
				duration: 0.6,
				color: this.initialBurgerColor,
				ease: this.easeType,
				onComplete: () => {
					expandBars(burgerBar3, -6);
				}
			}
		);
	}

	private showBurgerMenuContent(state: string): void {
		const burgerMenuContent = document.querySelector(this.burgerMenuContentSelector);

		this.timeline.fromTo(
			burgerMenuContent,
			{ display: "none" },
			{
				display: "block",
				duration: 0.1,
				ease: this.easeType,
				onStart: () => {
					this.toggleBodyOverflow(state);
				},
			}
		);
	}

	private hideBurgerMenuContent(state: string): void {
		const burgerMenuContent = document.querySelector(this.burgerMenuContentSelector);

		this.timeline.fromTo(
			burgerMenuContent,
			{ display: "block" },
			{
				display: "none",
				duration: 0.1,
				ease: this.easeType,
				onComplete: () => {
					this.toggleBodyOverflow(state);
				}
			}
		);
	}

	private toggleBodyOverflow(burgerMenuState: string): void {
		if (!this.toggleOverflow) return;
		const body = document.querySelector("body");
		const scrollbarWidth = this.calculateScrollBarWidth();

		if (burgerMenuState === "false") {
			(body as HTMLElement).style.cssText = `
				overflow: hidden;
				padding-right: ${scrollbarWidth}px;
			`;
		} else {
			(body as HTMLElement).style.cssText = `
				overflow-x: hidden;
				padding-right: 0px;
			`;
		}
	}

	private calculateScrollBarWidth(): number {
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

	private toggleZIndex(state: string, elements: (HTMLElement | null)[]): void {
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

	private toggleBurgerMenuElementsColor(
		state: string,
		menuElements: Array<{ selector: string; initialColor: string; activeColor: string }>
	): void {
		if (state === "false") {
			menuElements.forEach(element => {
				gsap.fromTo(
					element.selector,
					{ color: element.initialColor },
					{ color: element.activeColor, duration: 1, ease: this.easeType }
				);
			});
		} else {
			menuElements.forEach(element => {
				gsap.fromTo(
					element.selector,
					{ color: element.activeColor },
					{ color: element.initialColor, duration: 1, ease: this.easeType }
				);
			});
		}
	}

	#changeMenuState(): this | undefined {
		const menu = document.querySelector(".navigation__mobile-navigation-burger");
		const state: string | null = (menu as HTMLElement).getAttribute("data-menu-open");

			if (state === "false") {
				(menu as HTMLElement).setAttribute("data-menu-open", "true");
			} else {
				(menu as HTMLElement).setAttribute("data-menu-open", "false");
			}
			return this;
	}

	public animateMenuContent(burgerMenuElementsSelectors: Array<string>): this {
		this.showMenuElements(burgerMenuElementsSelectors);
		return this;
	}

	private showMenuElements(menuElements: Array<string>): void {
		menuElements.forEach(element => {
			this.timeline.fromTo(
				element,
				{ opacity: 0, translateX: 50 },
				{ opacity: 1, translateX: 0, duration: 1, ease: this.easeType, stagger: 0.2 }
			);
		});
	}
}
