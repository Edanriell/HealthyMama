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
				pathWidth: 268,
				pathHeight: 1075,
				path: `
					M163 1
					C163 1 211 167 163 263.5
					C115 360 -13.4395 376.797 2.00002 481.5
					C19.2242 598.306 239.33 516.145 264.5 631.5
					C292.875 761.546 12.4223 742.039 25.5 874.5
					C37.1514 992.515 254 1074.5 254 1074.5
				`
			},
			{
				pathWidth: 539,
				pathHeight: 1077,
				path: `
					M285 1
					C17.2266 164.096 -13.9999 375.5 5.99999 495.5
					C25.9999 615.5 297.939 693.58 485 820.5
					C672.061 947.42 304.5 1076 304.5 1076
				`
			},
			{
				pathWidth: 350,
				pathHeight: 1070,
				path: `
					M157 1
					C157 1 194.5 110 128.5 206.5
					C62.4996 303 281.411 331.913 148 440.5
					C14.5879 549.087 62.4996 637 62.4996 637
					C62.4996 637 119.491 783.977 183.5 753
					C385.38 683.656 373.056 615.698 301.5 483
					C200.456 341.061 101.644 362.45 62.4996 426
					C-105.993 867.869 102.358 947.693 301.5 1069
				`
			},
			{
				pathWidth: 255,
				pathHeight: 1073,
				path: `
					M47.4999 1
					C141.353 198.594 135 349.5 126 469
					C117 588.5 -16.5003 611.5 2.99988 733
					C22.5001 854.5 108.365 973.494 254.5 1072.5
				`
			},
			{
				pathWidth: 379,
				pathHeight: 1071,
				path: `
					M243.5 1
					C306.229 98.2472 465.13 157.592 317 263.5
					C168.87 369.408 -119 787 55.9999 913.5
					C231 1040 223.18 1025.25 317 1070.5
				`
			},
			{
				pathWidth: 246,
				pathHeight: 1073,
				path: `
					M145.5 1
					C220.73 82.8516 203.39 188.144 145.5 243.5
					C47.8588 332.791 13.0001 347.5 11.5001 422.5
					C10.0001 497.5 58.8599 555.162 124 581
					C189.14 606.838 226.254 508.658 236.5 438.5
					C249.204 351.506 267 215 124 243.5
					C-18.9999 272 170.5 527.5 215.5 668.5
					C260.5 809.5 101.665 929.043 1.00006 1072.5
				`
			},
			{
				pathWidth: 325,
				pathHeight: 1078,
				path: `
					M132.5 0.5
					C67.3854 96.1359 29.5 148.5 81 257.5
					C132.5 366.5 281.705 363.13 282.5 480.5
					C283.422 616.626 8.56455 568.023 15 704
					C21.6793 845.13 322.511 751.715 323.5 893
					C324.517 1038.17 0.5 1077 0.5 1077
				`
			},
			{
				pathWidth: 266,
				pathHeight: 1074,
				path: `
					M158 0.5
					C158 0.5 301.865 291.142 233 459
					C207.901 520.178 141.465 534.39 140 600.5
					C138.273 678.473 242.347 683.396 261.5 759
					C300.695 913.718 0.5 1073.5 0.5 1073.5
				`
			},
			{
				pathWidth: 492,
				pathHeight: 1074,
				path: `
					M138 1
					C138 1 13.9194 154.731 14.4999 270.5
					C15.1258 395.294 200.377 436.08 161 554.5
					C134.359 634.619 -10.5 617 1.99995 701
					C14.4999 785 138 726.5 138 812
					C138 897.5 46.5868 864.895 14.4999 920.5
					C-83.2166 1089.84 491.5 1072.5 491.5 1072.5
				`
			},
			{
				pathWidth: 404,
				pathHeight: 1074,
				path: `
					M305 0.5
					C387.942 103.668 358.615 180.43 342.5 288
					C326.385 395.57 321 534 196 618
					C71.0001 702 16.0566 550.554 3.00002 452
					C-10.0519 353.481 48.4081 260.267 146 241.5
					C239.034 223.61 289.563 297.636 353 368
					C548.252 584.569 108.5 1073.5 108.5 1073.5
				`
			},
		]
	});
	const fallingLeafsHeroController: FallingElementsController = new FallingElementsController(
		fallingLeafsHeroModel
	);
	const fallingLeafsHeroView: FallingElementsView = new FallingElementsView({
		root: document.querySelector(".hero")!,
		controller: fallingLeafsHeroController,
		elements: [
			[
				document.querySelector(".animated-dropping-leafs__desktop-leaf-1")!,
				document.querySelector(".animated-dropping-leafs__desktop-leaf-2")!,
				document.querySelector(".animated-dropping-leafs__desktop-leaf-3")!,
				document.querySelector(".animated-dropping-leafs__desktop-leaf-4")!,
				document.querySelector(".animated-dropping-leafs__desktop-leaf-5")!,
				document.querySelector(".animated-dropping-leafs__desktop-leaf-6")!
			],
			[
				document.querySelector(".animated-dropping-leafs__tablet-leaf-1")!,
				document.querySelector(".animated-dropping-leafs__tablet-leaf-2")!,
				document.querySelector(".animated-dropping-leafs__tablet-leaf-3")!,
				document.querySelector(".animated-dropping-leafs__tablet-leaf-4")!
			],
			[
				document.querySelector(".animated-dropping-leafs__mobile-leaf-1")!,
				document.querySelector(".animated-dropping-leafs__mobile-leaf-2")!,
				document.querySelector(".animated-dropping-leafs__mobile-leaf-3")!
			]
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
