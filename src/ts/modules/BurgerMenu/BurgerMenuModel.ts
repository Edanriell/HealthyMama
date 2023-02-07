import { gsap } from "gsap";

export class BurgerMenuModel {
	trigger: HTMLElement | null;

	burgerMenuContent: HTMLElement | null;

	burgerMenuUnderlay: HTMLElement | null;

	burgerMenuElements: Array<string> | undefined;

	initialBurgerColor: string;

	activeBurgerColor: string; // ok

	overflow: boolean | undefined;

	timeline: gsap.core.Timeline;

	burgerSelector: string;

	constructor() {
		this.trigger = null;
		this.burgerMenuContent = null;
		this.burgerMenuUnderlay = null;
		this.burgerMenuElements = [".mobile-navigation__item"];
		this.initialBurgerColor = "rgb(40, 175, 96)"; // ok
		this.activeBurgerColor = "#FFF"; // ok
		this.burgerSelector = ".mobile-navigation-burger"; // ok
		this.overflow = true;
		this.timeline = gsap.timeline({ delay: 0.1 });

		this.configureBurgerMenu();
	}

	configureBurgerMenu() {
		setTimeout(() => {
			this.trigger = document.querySelector(".navigation__mobile-navigation-burger"); //
			this.burgerMenuContent = document.querySelector(".mobile-navigation__content");
			this.burgerMenuUnderlay = document.querySelector(".mobile-navigation__underlay"); //
			this.burgerMenuElements = [".mobile-navigation__item"];
			// this.initialBurgerColor = "#122659";
			// this.activeBurgerColor = "#A90E46";
			this.overflow = true;
			this.timeline = gsap.timeline({ delay: 0.1 });
		}, 0)
	}

	public openMenu(state: string): void {
		this.animateBurgerMenu(state);
		// const burgerMenuUnderlay = document.querySelector(".mobile-navigation__underlay");
		// work on underlay
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
		// const trigger = document.querySelector(".navigation__mobile-navigation-burger");
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
			this.closeBurgerMenuAnimation();
		} else {
			this.openBurgerMenuAnimation();
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
		// const burgerMenuUnderlay = document.querySelector(".mobile-navigation__underlay");
		// console.log(`${this.fuuuu} fuuuu`);
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
		// console.log(this.burgerMenuUnderlay);
		// const burgerMenuUnderlay = document.querySelector(".mobile-navigation__underlay");
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

	private closeBurgerMenuAnimation(): void { /////// ok
		const burger = document.querySelector(this.burgerSelector);
		const [burgerBar1, burgerBar2, burgerBar3] = burger?.children as unknown as Array<HTMLElement>;

		const rotateBars = (burgerBar: HTMLElement, rotateDegrees: number): void => {
			gsap.fromTo(
				burgerBar,
				{ rotate: 0 },
				{
					rotate: rotateDegrees,
					duration: 0.6,
					ease: "power4.out"
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
				ease: "power4.out",
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
				ease: "power4.out"
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
				ease: "power4.out",
				onComplete: () => {
					rotateBars(burgerBar3, -45);
				}
			}
		);
	}

	private openBurgerMenuAnimation(): void { ///////////// ok
		const burger = document.querySelector(this.burgerSelector);
		const [burgerBar1, burgerBar2, burgerBar3] = burger?.children as unknown as Array<HTMLElement>;

		const expandBars = (burgerBar: HTMLElement, yCoordinate: number): void => {
			gsap.fromTo(
				burgerBar,
				{ translateY: yCoordinate },
				{
					translateY: 0,
					duration: 0.6,
					ease: "power4.out"
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
				ease: "power4.out",
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
				ease: "power4.out"
			}
		);

		gsap.fromTo(
			burgerBar3,
			{ rotate: -45, color: this.activeBurgerColor },
			{
				rotate: 0,
				duration: 0.6,
				color: this.initialBurgerColor,
				ease: "power4.out",
				onComplete: () => {
					expandBars(burgerBar3, -6);
				}
			}
		);
	}

	#showBurgerMenu(state: string): void {
		// FIX
		// console.log(this.burgerMenuContent);
		// copy all styles and html structure from old project
		// triggers in constructor are not working or pass trigger from  upper
		// const burgerMenuContent = document.querySelector(".mobile-navigation__content");
		// console.log(burgerMenuContent);
		// (burgerMenuContent as HTMLElement).style.display = "block";
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

	animateMenuContent(): void {

		if (this.burgerMenuElements) this.#showMenuElements(this.burgerMenuElements);
		console.log(this.burgerMenuElements);
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
