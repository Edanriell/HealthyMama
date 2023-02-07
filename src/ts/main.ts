import "../scss/style.scss";
import "./helpers/WebpCheck.ts";

import { BurgerMenuView } from "./modules/BurgerMenu";
import { BurgerMenuController } from "./modules/BurgerMenu";
import { BurgerMenuModel } from "./modules/BurgerMenu";
import { BurgerMenu } from "./components/BurgerMenu";

window.addEventListener("DOMContentLoaded", () => {
	const burgerMenuModel = new BurgerMenuModel();
	const burgerMenuController = new BurgerMenuController(burgerMenuModel);
	const burgerMenuView = new BurgerMenuView(
		document.querySelector(".navigation")!,
		burgerMenuController
	);

	burgerMenuView.mount();

	// const burgerMenu = new BurgerMenu({
	// 	triggerSelector: ".navigation__mobile-navigation-burger",
	// 	burgerMenuContentSelector: ".mobile-navigation__content",
	// 	burgerMenuElementSelectors: [
	// 		".mobile-navigation__menu-item",
	// 		".mobile-navigation__contact-phone"
	// 	],
	// 	burgerMenuUnderlaySelector: ".mobile-navigation__underlay",
	// 	toggleOverflow: true
	// });

	// burgerMenu.init();
});
