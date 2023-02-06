import "../scss/style.scss";
import "./helpers/WebpCheck.ts";

import { BurgerMenuView } from "./modules/BurgerMenu";
import { BurgerMenuController } from "./modules/BurgerMenu";
import { BurgerMenuModel } from "./modules/BurgerMenu";

window.addEventListener("DOMContentLoaded", () => {
	const burgerMenuModel = new BurgerMenuModel();
	const burgerMenuController = new BurgerMenuController(burgerMenuModel);
	const burgerMenuView = new BurgerMenuView(
		document.querySelector(".navigation")!,
		burgerMenuController
	);

	burgerMenuView.mount();
});
