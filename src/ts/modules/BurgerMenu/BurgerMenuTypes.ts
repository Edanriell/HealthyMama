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
	openMenu(state: string): this | undefined;
	closeMenu(state: string): this | undefined;
	animateMenuContent(burgerMenuElementsSelectors: Array<string>): this;
}
