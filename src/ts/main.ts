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
			{
				pathSize: "desktop",
				svgPaths: [
					{
						pathProps: {
							pathWidth: 557,
							pathHeight: 1075
						},
						path: `
							M322.5 0.5
							C322.5 0.5 335.988 75.0281 322.5 119.5
							C293.528 215.024 143.66 169.833 112 264.5
							C59.3612 421.895 473.072 251.697 510 413.5
							C553.296 603.206 79.3007 427.699 57 621
							C32.3147 834.971 544.044 641.914 555.5 857
							C567.864 1089.14 1 1073.5 1 1073.5
						`
					}
				]
			},
			{
				pathSize: "tablet",
				svgPaths: [
					{
						pathProps: {
							pathWidth: 557,
							pathHeight: 1075
						},
						path: `
							M322.5 0.5
							C322.5 0.5 335.988 75.0281 322.5 119.5
							C293.528 215.024 143.66 169.833 112 264.5
							C59.3612 421.895 473.072 251.697 510 413.5
							C553.296 603.206 79.3007 427.699 57 621
							C32.3147 834.971 544.044 641.914 555.5 857
							C567.864 1089.14 1 1073.5 1 1073.5
						`
					}
				]
			},
			{
				pathSize: "mobile",
				svgPaths: [
					{
						pathProps: {
							pathWidth: 557,
							pathHeight: 1075
						},
						path: `
							M322.5 0.5
							C322.5 0.5 335.988 75.0281 322.5 119.5
							C293.528 215.024 143.66 169.833 112 264.5
							C59.3612 421.895 473.072 251.697 510 413.5
							C553.296 603.206 79.3007 427.699 57 621
							C32.3147 834.971 544.044 641.914 555.5 857
							C567.864 1089.14 1 1073.5 1 1073.5
						`
					}
				]
			}
		]
	});
	const fallingLeafsHeroController: FallingElementsController = new FallingElementsController(
		fallingLeafsHeroModel
	);
	const fallingLeafsHeroView: FallingElementsView = new FallingElementsView({
		root: document.querySelector(".hero")!,
		controller: fallingLeafsHeroController,
		htmlElements: [
			{
				elementsSize: "desktop",
				elements: [
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__desktop-leaf-1")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__desktop-leaf-2")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__desktop-leaf-3")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__desktop-leaf-4")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__desktop-leaf-5")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__desktop-leaf-6")!
					}
				]
			},
			{
				elementsSize: "tablet",
				elements: [
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__tablet-leaf-1")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__tablet-leaf-2")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__tablet-leaf-3")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__tablet-leaf-4")!
					}
				]
			},
			{
				elementsSize: "mobile",
				elements: [
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__mobile-leaf-1")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__mobile-leaf-2")!
					},
					{
						timeToFall: 50,
						easeType: "power2.out",
						element: document.querySelector(".animated-dropping-leafs__mobile-leaf-3")!
					}
				]
			}
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
