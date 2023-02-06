import { BurgerMenuModel } from "./BurgerMenuModel";
import { IBurgerMenuController } from "./BurgerMenuTypes";

export class BurgerMenuController implements IBurgerMenuController {
	model: BurgerMenuModel;

	constructor(model: BurgerMenuModel) {
		this.model = model;
	}

	public handleToggle(event: any): void {
		console.log(event);
			// this.trigger?.addEventListener("click", event => {
				const menu: unknown = event;
				const menuState: string | null = (menu as HTMLElement).getAttribute("data-menu-open");
				// console.log(menuState);
				switch (menuState) {
					case "false":
						this.model.openMenu(menuState);
						this.model.animateMenuContent();
						(menu as HTMLElement).setAttribute("data-menu-open", "true");
						break;
					case "true":
						this.model.closeMenu(menuState);
						(menu as HTMLElement).setAttribute("data-menu-open", "false");
						break;
					default:
						throw new Error("Unknown menu state, should be true or false.");
				}
			// });
	}
}
