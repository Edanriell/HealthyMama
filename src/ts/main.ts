import "../scss/style.scss";
import "swiper/css";

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

import { SimpleParallaxView } from "./modules/SimpleParallax";
import { SimpleParallaxController } from "./modules/SimpleParallax";
import { SimpleParallaxModel } from "./modules/SimpleParallax";

import { ScrollToTopView } from "./modules/ScrollToTop/ScrollToTopView";
import { ScrollToTopController } from "./modules/ScrollToTop/ScrollToTopController";
import { ScrollToTopModel } from "./modules/ScrollToTop/ScrollToTopModel";

import { FallingElementsView } from "./modules/FallingElements/FallingElementsView";
import { FallingElementsController } from "./modules/FallingElements/FallingElementsController";
import { FallingElementsModel } from "./modules/FallingElements/FallingElementsModel";

import { MainSliderMobile, MainSliderUniversal } from "./modules/MainSlider";
import { ProductsSliderMobile, ProductsSliderUniversal } from "./modules/ProductsSlider";

import {
	leafsDesktop as heroSectionDesktopLeafs,
	leafsTablet as heroSectionTabletLeafs,
	leafsMobile as heroSectionMobileLeafs
} from "./helpers/HeroSectionLeafs";
import {
	desktopSvgPaths as heroSectionDesktopSvgPaths,
	tabletSvgPaths as heroSectionTabletSvgPaths,
	mobileSvgPaths as heroSectionMobileSvgPaths
} from "./helpers/HeroSectionSvgPaths";

import { Elements, Path } from "./modules/FallingElements/FallingElementsTypes";

Swiper.use([Navigation, Autoplay, Keyboard, Mousewheel, EffectCreative, Pagination]);

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

	const motherAndChildParallaxModel: SimpleParallaxModel = new SimpleParallaxModel();
	const motherAndChildParallaxController: SimpleParallaxController = new SimpleParallaxController(
		motherAndChildParallaxModel
	);
	const motherAndChildParallaxView: SimpleParallaxView = new SimpleParallaxView({
		root: document.querySelector(".delivery-advantages")!,
		controller: motherAndChildParallaxController,
		options: [
			{
				targetElement: document.querySelector(
					".mother-and-child-parallax-image__main-image-wrapper"
				)!,
				yCoordinateValue: -14,
				easeType: "none",
				animationStartPosition: "top center",
				animationEndPosition: "center center"
			},
			{
				targetElement: document.querySelector(
					".mother-and-child-parallax-image__tree-image-wrapper"
				)!,
				yCoordinateValue: 12,
				easeType: "none",
				animationStartPosition: "center center",
				animationEndPosition: "bottom center"
			}
		]
	});

	const imageGalleryParallaxModel: SimpleParallaxModel = new SimpleParallaxModel();
	const imageGalleryParallaxController: SimpleParallaxController = new SimpleParallaxController(
		imageGalleryParallaxModel
	);
	const imageGalleryParallaxView: SimpleParallaxView = new SimpleParallaxView({
		root: document.querySelector(".instagram-images")!,
		controller: imageGalleryParallaxController,
		options: [
			{
				targetElement: document.querySelectorAll(
					".image-gallery__parallax-effect--type--upwards"
				)!,
				yCoordinateValue: -25,
				easeType: "none",
				animationStartPosition: "center center",
				animationEndPosition: "bottom center"
			},
			{
				targetElement: document.querySelectorAll(
					".image-gallery__parallax-effect--type--downwards"
				)!,
				yCoordinateValue: 25,
				easeType: "none",
				animationStartPosition: "center center",
				animationEndPosition: "bottom center"
			}
		]
	});

	const scrollToTopModel: ScrollToTopModel = new ScrollToTopModel({
		smoothScrollSpeed: 45
	});
	const scrollToTopController: ScrollToTopController = new ScrollToTopController(
		scrollToTopModel
	);
	const scrollToTopView: ScrollToTopView = new ScrollToTopView({
		root: document.querySelector("body")!,
		controller: scrollToTopController,
		buttonTriggerHeight: 2000
	});

	const fallingLeafsHeroModel: FallingElementsModel = new FallingElementsModel({
		paths: [
			heroSectionDesktopSvgPaths as Path,
			heroSectionTabletSvgPaths as Path,
			heroSectionMobileSvgPaths as Path
		]
	});
	const fallingLeafsHeroController: FallingElementsController = new FallingElementsController(
		fallingLeafsHeroModel
	);
	const fallingLeafsHeroView: FallingElementsView = new FallingElementsView({
		root: document.querySelector(".hero")!,
		controller: fallingLeafsHeroController,
		htmlElements: [
			heroSectionDesktopLeafs as Elements,
			heroSectionTabletLeafs as Elements,
			heroSectionMobileLeafs as Elements
		]
	});

	burgerMenuView.mount();
	modalView.mount();
	formView.mount();
	motherAndChildParallaxView.mount();
	imageGalleryParallaxView.mount();
	scrollToTopView.mount();
	fallingLeafsHeroView.mount();
});

window.addEventListener("load", () => {
	const mainSliderMobile: Swiper = new Swiper(".main-slider--type--mobile", MainSliderMobile);
	const mainSliderUniversal: Swiper = new Swiper(
		".main-slider--type--universal",
		MainSliderUniversal
	);
	const productsSliderMobile: Swiper = new Swiper(
		".products-slider--type--mobile",
		ProductsSliderMobile
	);
	const productsSliderUniversal: Swiper = new Swiper(
		".products-slider--type--universal",
		ProductsSliderUniversal
	);

	mainSliderMobile.init();
	mainSliderUniversal.init();
	productsSliderMobile.init();
	productsSliderUniversal.init();
});
