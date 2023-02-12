import "../scss/style.scss";
import "swiper/css";

import "./helpers/WebpCheck.ts";

import Swiper, { Navigation, Autoplay, Keyboard, Mousewheel, EffectCreative } from "swiper";

import { BurgerMenuView } from "./modules/BurgerMenu";
import { BurgerMenuController } from "./modules/BurgerMenu";
import { BurgerMenuModel } from "./modules/BurgerMenu";

import { ModalView } from "./modules/Modal";
import { ModalController } from "./modules/Modal";
import { ModalModel } from "./modules/Modal";

import { FormView } from "./modules/Form";
import { FormController } from "./modules/Form";
import { FormModel } from "./modules/Form";

import { MainSliderMobile } from "./modules/MainSlider";
import { ProductsSliderMobile } from "./modules/ProductsSlider";

Swiper.use([Navigation, Autoplay, Keyboard, Mousewheel, EffectCreative]);

window.addEventListener("DOMContentLoaded", () => {
	const burgerMenuModel: BurgerMenuModel = new BurgerMenuModel({});
	const burgerMenuController: BurgerMenuController = new BurgerMenuController(burgerMenuModel);
	const burgerMenuView: BurgerMenuView = new BurgerMenuView({
		root: document.querySelector(".navigation")!,
		controller: burgerMenuController
	});

	const modalModel: ModalModel = new ModalModel();
	const modalController: ModalController = new ModalController(modalModel);
	const modalView: ModalView = new ModalView({
		root: document.querySelector("body")!,
		controller: modalController,
		modalTriggerSelector: "[data-modal-trigger]"
	});

	const formModel: FormModel = new FormModel({
		databaseName: "personalized-menu-request"
	});
	const formController: FormController = new FormController(formModel);
	const formView: FormView = new FormView({
		root: document.querySelector(".request-form")!,
		controller: formController,
		formSubmitButton: document.querySelector(".request-form__button")!
	});

	burgerMenuView.mount();
	modalView.mount();

	formView.mount();
});

window.addEventListener("load", () => {
	const mainSliderMobile = new Swiper(".main-slider--type--mobile", MainSliderMobile);
	const productsSliderMobile = new Swiper(".products-slider--type--mobile", ProductsSliderMobile);

	mainSliderMobile.init();
	productsSliderMobile.init();
});
