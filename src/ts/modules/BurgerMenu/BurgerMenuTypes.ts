import { BurgerMenuController } from "./BurgerMenuController";
import { BurgerMenuModel } from "./BurgerMenuModel";

export interface IBurgerMenuView {
	controller: BurgerMenuController;
	root: HTMLElement;

	mount(): void;
}

export interface IBurgerMenuController {
	model: BurgerMenuModel;

	handleToggle(event: any): void;
}

export interface IBurgerMenuModel {
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

	openMenu(state: string): this | undefined;
	closeMenu(state: string): this | undefined;
	animateMenuContent(burgerMenuElementsSelectors: Array<string>): this;
}
