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
