import "../scss/style.scss";
import "swiper/css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

import "./helpers/WebpCheck.ts";

import Swiper, {
	Navigation,
	Autoplay,
	Keyboard,
	Mousewheel,
	EffectCreative,
	Pagination
} from "swiper";

import { BurgerMenuView } from "./modules/BurgerMenu";
import { BurgerMenuController } from "./modules/BurgerMenu";
import { BurgerMenuModel } from "./modules/BurgerMenu";

import { ModalView } from "./modules/Modal";
import { ModalController } from "./modules/Modal";
import { ModalModel } from "./modules/Modal";

import { FormView } from "./modules/Form";
import { FormController } from "./modules/Form";
import { InputController } from "./modules/Form";
import { FormModel } from "./modules/Form";

import { MainSliderMobile, MainSliderUniversal } from "./modules/MainSlider";
import { ProductsSliderMobile, ProductsSliderUniversal } from "./modules/ProductsSlider";

Swiper.use([Navigation, Autoplay, Keyboard, Mousewheel, EffectCreative, Pagination]);

window.addEventListener("DOMContentLoaded", () => {
	gsap.to(".mother-and-child-parallax-image__main-image-wrapper", {
		yPercent: -12,
		ease: "none",
		scrollTrigger: {
			trigger: ".delivery-advantages",
			start: "top center", // the default values
			end: "center center",
			scrub: true
			//   markers: {startColor: "green", endColor: "red", fontSize: "12px"}
		}
	});

	gsap.to(".mother-and-child-parallax-image__tree-image-wrapper", {
		yPercent: 10,
		ease: "none",
		scrollTrigger: {
			trigger: ".delivery-advantages",
			start: "center center", // the default values
			end: "bottom center",
			scrub: true,
			markers: { startColor: "blue", endColor: "pink", fontSize: "12px" }
		}
	});

	/*
		[
			{
				targetElementSelector: string,
				yCoordinateValue: number,
				easeType?: string = "none",
				triggerElementSelector: string,
				animationStartPosition?: string,
				animationEndPosition?: string,
				markers?: object = null
			}
		]
	*/

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
	const inputController: InputController = new InputController(formModel);
	const formView: FormView = new FormView({
		root: document.querySelector(".request-form")!,
		formController: formController,
		inputController: inputController,
		formSubmitButton: document.querySelector(".request-form__button")!,
		formInputs: [
			{
				inputNode: document.querySelector(".request-form__person-name-input")!,
				regExp: /^[a-zа-яё\s]+$/iu,
				inputName: "Имя",
				errorMessage: "Неверное имя"
			},
			{
				inputNode: document.querySelector(".request-form__person-phone-number-input")!,
				regExp: /^(\+)\d+$/,
				inputName: "Номер телефона",
				errorMessage: "Неверный номер телефона"
			}
		],
		removeToastTimeout: 5000
	});

	burgerMenuView.mount();
	modalView.mount();
	formView.mount();
});

window.addEventListener("load", () => {
	const mainSliderMobile = new Swiper(".main-slider--type--mobile", MainSliderMobile);
	const mainSliderUniversal = new Swiper(".main-slider--type--universal", MainSliderUniversal);
	const productsSliderMobile = new Swiper(".products-slider--type--mobile", ProductsSliderMobile);
	const productsSliderUniversal = new Swiper(
		".products-slider--type--universal",
		ProductsSliderUniversal
	);

	mainSliderMobile.init();
	mainSliderUniversal.init();
	productsSliderMobile.init();
	productsSliderUniversal.init();
});
