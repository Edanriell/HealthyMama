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
					},
					{
						pathProps: {
							pathWidth: 262,
							pathHeight: 1063
						},
						path: `
							M116 0.5
							C116 0.5 74.2999 222.103 116 353.5
							C148.141 454.777 234.301 482.59 256.5 586.5
							C300.542 792.652 1 1062 1 1062
						`
					},
					{
						pathProps: {
							pathWidth: 433,
							pathHeight: 1069
						},
						path: `
							M432 1
							C432 1 190.359 258.83 183 464
							C177.431 619.278 353.17 696.616 302.5 843.5
							C254.589 982.384 1 1068.5 1 1068.5
						`
					},
					{
						pathProps: {
							pathWidth: 491,
							pathHeight: 1072
						},
						path: `
							M126 0.5
							C126 0.5 154.978 185.193 126 297.5
							C100.254 397.282 23.8242 430.683 5 532
							C-46.7517 810.541 490 1071.5 490 1071.5
						`
					},
					{
						pathProps: {
							pathWidth: 420,
							pathHeight: 1072
						},
						path: `
							M92.5 0.5
							C92.5 0.5 168.295 210.407 167.5 350
							C166.393 544.39 -55.7894 643.15 15.5 824
							C83.3163 996.039 419.5 1071 419.5 1071
						`
					},
					{
						pathProps: {
							pathWidth: 422,
							pathHeight: 1069
						},
						path: `
							M86.5 1
							C86.5 1 -5.38143 194.571 38.5 307.5
							C77.296 407.341 202.4 392.582 241 492.5
							C307.656 665.044 -58.8784 734.331 9.99997 906
							C74.3375 1066.35 421.5 1068.5 421.5 1068.5
						`
					},
					{
						pathProps: {
							pathWidth: 645,
							pathHeight: 1078
						},
						path: `
							M229 0.5
							C142.499 135.231 -0.51659 185.592 7.5 345.5
							C17.8953 552.856 466.464 470.465 425.5 674
							C389.422 853.263 64.9497 711.402 7.5 885
							C-73.8265 1130.75 644 1070 644 1070
						`
					},
					{
						pathProps: {
							pathWidth: 385,
							pathHeight: 1066
						},
						path: `
							M1 1
							C1 1 282.567 183.68 283.5 363
							C284.354 527.036 46.0876 548.521 50.5 712.5
							C55.6013 902.08 384 1065.5 384 1065.5
						`
					},
					{
						pathProps: {
							pathWidth: 755,
							pathHeight: 1068
						},
						path: `
							M181.5 0.5
							C181.5 0.5 13.984 162.119 1.5 297
							C-19.557 524.507 516.915 535.952 395.5 729.5
							C324.932 841.992 169.04 764.593 84.5 867
							C-89.3015 1077.53 754.5 1066.5 754.5 1066.5
						`
					},
					{
						pathProps: {
							pathWidth: 245,
							pathHeight: 1065
						},
						path: `
							M124.5 0.5
							C124.5 0.5 62.6973 167.424 73.4999 276.5
							C87.5369 418.233 278.548 465.467 238 602
							C205.657 710.906 83 624.5 15.9999 790
							C-51.0001 955.5 124.5 1064.5 124.5 1064.5
						`
					},
					{
						pathProps: {
							pathWidth: 478,
							pathHeight: 1067
						},
						path: `
							M159.5 0.5
							C98.3828 94.0306 -13.0002 101 2.99982 240
							C18.9998 379 259.752 267.594 309.5 391.5
							C372.432 548.24 49.2842 574.298 57.4998 743
							C67.5627 949.634 477 1066.5 477 1066.5
						`
					},
					{
						pathProps: {
							pathWidth: 876,
							pathHeight: 1069
						},
						path: `
							M0.5 0.5
							C0.5 0.5 336.721 209.165 337.5 419
							C338.018 558.477 188.66 605.035 190.5 744.5
							C194.401 1040.22 875 1068.5 875 1068.5
						`
					},
					{
						pathProps: {
							pathWidth: 656,
							pathHeight: 1067
						},
						path: `
							M655.5 0.5
							C655.5 0.5 297.288 197.809 301 409
							C304.289 596.077 601.483 603.16 591.5 790
							C577.914 1044.27 1 1066.5 1 1066.5
						`
					},
					{
						pathProps: {
							pathWidth: 573,
							pathHeight: 1067
						},
						path: `
							M178 1
							C178 1 361.22 173.451 344 309
							C322.935 474.819 40.422 405.865 4.00002 569
							C-50.6081 813.591 609.515 622.942 570.5 870.5
							C534.372 1099.74 12 1073.5 12 1073.5
						`
					},
					{
						pathProps: {
							pathWidth: 506,
							pathHeight: 1069
						},
						path: `
							M346 0.5
							C346 0.5 452.057 148.232 457.5 257.5
							C469.468 497.739 -1.30219 430.474 0.999994 671
							C3.40066 921.815 505.5 1068.5 505.5 1068.5
						`
					},
					{
						pathProps: {
							pathWidth: 698,
							pathHeight: 1072
						},
						path: `
							M331.5 0.5
							C331.5 0.5 559.659 190.409 534 344
							C514.779 459.051 340.2 462.187 349 578.5
							C359.972 723.533 599.895 630.986 677.5 754
							C833.214 1000.83 1 1071.5 1 1071.5
						`
					},
					{
						pathProps: {
							pathWidth: 216,
							pathHeight: 1069
						},
						path: `
							M94.5 0.5
							C94.5 0.5 30.4005 203.73 56.5 331
							C81.7337 454.048 194.444 487.769 213 612
							C242.05 806.485 0.5 1068.5 0.5 1068.5
						`
					},
					{
						pathProps: {
							pathWidth: 629,
							pathHeight: 1062
						},
						path: `
							M240.5 0.5
							C240.5 0.5 409.714 274.967 347.5 440.5
							C288.777 596.744 57.0999 540.125 7.50002 699.5
							C-75.9155 967.532 628.5 1061.5 628.5 1061.5
						`
					},
					{
						pathProps: {
							pathWidth: 435,
							pathHeight: 1067
						},
						path: `
							M372.5 0.5
							C372.5 0.5 151.715 256.245 173 445.5
							C192.825 621.776 462.066 644.266 431.5 819
							C398.055 1010.19 0.5 1066.5 0.5 1066.5
						`
					},
					{
						pathProps: {
							pathWidth: 286,
							pathHeight: 1071
						},
						path: `
							M132.5 0.5
							C132.5 0.5 -36.1149 237.443 8 391.5
							C48.2634 532.107 240.495 508.901 279 650
							C326.309 823.363 91 1070 91 1070
						`
					},
					{
						pathProps: {
							pathWidth: 605,
							pathHeight: 1073
						},
						path: `
							M0.5 1
							C0.5 1 358.611 147.178 365 342
							C370.459 508.453 123.326 523.528 118.5 690
							C111.505 931.272 604 1072.5 604 1072.5
						`
					}
				]
			},
			{
				pathSize: "tablet",
				svgPaths: [
					{
						pathProps: {
							pathWidth: 577,
							pathHeight: 1193
						},
						path: `
							M107 0.5
							C107 0.5 -15.9478 153.744 3.00011 262
							C20.0721 359.538 145.931 363.413 159.5 461.5
							C176.132 581.722 21.6064 610.067 3.00011 730
							C-41.0858 1014.17 576 1192.5 576 1192.5
						`
					},
					{
						pathProps: {
							pathWidth: 355,
							pathHeight: 1182
						},
						path: `
							M1 0.5
							C1 0.5 203.558 159.836 200.5 300.5
							C198.025 414.343 61.9953 442.147 60 556
							C57.0389 724.96 356.485 704.533 354 873.5
							C351.378 1051.77 17 1181.5 17 1181.5
						`
					},
					{
						pathProps: {
							pathWidth: 350,
							pathHeight: 1189
						},
						path: `
							M299.5 1
							C299.5 1 111.359 158.043 114.5 293
							C117.531 423.21 290.906 440.539 299.5 570.5
							C311.417 750.713 -23.4512 746.268 2.50008 925
							C26.9102 1093.12 349 1188 349 1188
						`
					},
					{
						pathProps: {
							pathWidth: 198,
							pathHeight: 1190
						},
						path: `
							M128.5 0.5
							C128.5 0.5 -33.8428 234.031 7.50008 386.5
							C37.3494 496.582 174.023 503.242 187.5 616.5
							C203.506 751.009 2.15515 777.648 7.50008 913
							C12.659 1043.64 197 1189 197 1189
						`
					},
					{
						pathProps: {
							pathWidth: 353,
							pathHeight: 1189
						},
						path: `
							M195.5 0.5
							C195.5 0.5 225.83 106.285 229.5 176
							C238.424 345.53 66.1121 427.249 105 592.5
							C139.66 739.782 352.661 739.696 352 891
							C351.215 1070.56 1 1188 1 1188
						`
					},
					{
						pathProps: {
							pathWidth: 350,
							pathHeight: 1188
						},
						path: `
							M55.0001 0.5
							C55.0001 0.5 4.07377 99.3406 1.00006 168
							C-5.227 307.097 208.044 341.543 178 477.5
							C160.284 557.668 84.102 571.228 55.0001 648
							C-30.0494 872.362 349 1187.5 349 1187.5
						`
					},
					{
						pathProps: {
							pathWidth: 213,
							pathHeight: 1189
						},
						path: `
							M61.4998 0.5
							C61.4998 0.5 2.44829 115.78 0.999785 195.5
							C-1.82522 350.977 206.14 378.09 211.5 533.5
							C217.177 698.118 7.07387 734.396 0.999785 899
							C-3.36355 1017.24 91.9998 1188 91.9998 1188
						`
					},
					{
						pathProps: {
							pathWidth: 257,
							pathHeight: 1190
						},
						path: `
							M210 0.5
							C210 0.5 245.118 185.188 210 294.5
							C178.643 392.104 80.8344 411.792 64.5 513
							C40.0563 664.453 263.7 702.781 256 856
							C247.765 1019.86 0.5 1189.5 0.5 1189.5
						`
					},
					{
						pathProps: {
							pathWidth: 270,
							pathHeight: 1189
						},
						path: `
							M162.5 0.5
							C162.5 0.5 302.257 179.199 261.5 292.5
							C221.772 402.941 51.3855 346.052 9.00011 455.5
							C-49.9458 607.711 221.067 641.435 240.5 803.5
							C259.431 961.383 106.5 1188 106.5 1188
						`
					},
					{
						pathProps: {
							pathWidth: 370,
							pathHeight: 1190
						},
						path: `
							M223.5 0.5
							C223.5 0.5 381.702 193.558 368.5 335.5
							C350.295 531.229 -4.79029 483.527 1.50007 680
							C7.50172 867.456 411.722 824.917 356 1004
							C316.966 1129.45 75.0001 1189 75.0001 1189
						`
					},
					{
						pathProps: {
							pathWidth: 349,
							pathHeight: 1192
						},
						path: `
							M179 0.5
							C179 0.5 343.184 173.357 348 311.5
							C355.272 520.116 17.0436 510.337 1.49985 718.5
							C-15.4025 944.858 340 1191 340 1191
						`
					},
					{
						pathProps: {
							pathWidth: 385,
							pathHeight: 1192
						},
						path: `
							M384 0.5
							C384 0.5 74.6169 141.836 101.5 300.5
							C121.996 421.463 303.573 395.034 331.5 514.5
							C373.651 694.811 3.77509 669.349 1.00024 854.5
							C-1.4443 1017.61 248.5 1191 248.5 1191
						`
					},
					{
						pathProps: {
							pathWidth: 283,
							pathHeight: 1189
						},
						path: `
							M142 1
							C142 1 284.531 107.177 272.5 199
							C258.126 308.705 69.1985 242.034 30.0001 345.5
							C-24.9278 490.485 308.203 500.954 280.5 653.5
							C256.13 787.694 32.828 709.25 4.50015 867.5
							C-23.8277 1025.75 123.083 1072.62 261.5 1188
						`
					},
					{
						pathProps: {
							pathWidth: 508,
							pathHeight: 1194
						},
						path: `
							M194 0.5
							C194 0.5 574.352 240.847 497 431.5
							C428.158 601.179 134.946 423.262 55 588
							C-50.1898 804.756 571.44 832.855 465 1049
							C381.282 1219 1 1191 1 1191
						`
					},
					{
						pathProps: {
							pathWidth: 384,
							pathHeight: 1192
						},
						path: `
							M203 0.5
							C203 0.5 -56.5236 247.378 12.9999 409
							C59.4647 517.017 210.492 480.258 254 589.5
							C318.722 752.005 -17.051 813.661 35.4999 980.5
							C83.2172 1131.99 383.5 1191 383.5 1191
						`
					}
				]
			},
			{
				pathSize: "mobile",
				svgPaths: [
					{
						pathProps: {
							pathWidth: 157,
							pathHeight: 931
						},
						path: `
							M154 0.5
							C154 0.5 67.9307 110.432 55 194.5
							C36.2726 316.254 171.612 372.079 154 494
							C137.967 604.989 5.11279 624.934 1 737
							C-1.91911 816.54 66.5 930 66.5 930
						`
					},
					{
						pathProps: {
							pathWidth: 166,
							pathHeight: 930
						},
						path: `
							M68 1
							C68 1 28.5042 136.639 68 206.5
							C90.6301 246.529 129.947 248.428 152.5 288.5
							C218.029 404.935 5.76857 461.96 1.50001 595.5
							C-3.06756 738.395 152.5 929 152.5 929
						`
					},
					{
						pathProps: {
							pathWidth: 214,
							pathHeight: 934
						},
						path: `
							M58.0004 0.5
							C58.0004 0.5 140.2 114.488 140 198
							C139.744 305.413 -18.0309 331.166 3.00041 436.5
							C23.09 537.117 169.68 508.168 205 604.5
							C252.875 735.072 67.5004 933 67.5004 933
						`
					},
					{
						pathProps: {
							pathWidth: 178,
							pathHeight: 934
						},
						path: `
							M114 0.5
							C114 0.5 18.2888 119.216 22.5001 207.5
							C26.7456 296.502 123.046 317.702 135 406
							C151.967 531.327 -15.7577 576.355 2.50008 701.5
							C18.8441 813.527 177 933 177 933
						`
					},
					{
						pathProps: {
							pathWidth: 199,
							pathHeight: 931
						},
						path: `
							M111.5 0.5
							C111.5 92.2732 111.5 143.727 111.5 235.5
							C111.5 327.273 201.391 330.762 198 405
							C193.209 509.886 13.3865 484.18 1.49983 588.5
							C-11.378 701.519 267 699.5 181.5 817.5
							C95.9996 935.5 133.961 886.066 103.5 930
						`
					},
					{
						pathProps: {
							pathWidth: 246,
							pathHeight: 931
						},
						path: `
							M173 0.5
							C173 0.5 155.295 77.7417 155.5 128
							C155.947 237.419 263.011 287.116 242 394.5
							C217.019 522.178 -7.72238 494.694 1.00025 624.5
							C8.38784 734.438 228.833 720.071 198.5 826
							C183.644 877.882 107.5 930 107.5 930
						`
					},
					{
						pathProps: {
							pathWidth: 270,
							pathHeight: 931
						},
						path: `
							M269 1
							C269 1 -18.1158 213.421 2.49976 399.5
							C18.4249 543.243 229.442 554.124 221 698.5
							C214.844 803.771 81.9998 930 81.9998 930
						`
					},
					{
						pathProps: {
							pathWidth: 193,
							pathHeight: 936
						},
						path: `
							M128.5 0.5
							C128.5 0.5 55.6596 81.3661 55.0002 144.5
							C54.0895 231.702 177.37 235.787 190.5 322
							C209.608 447.462 -9.79551 459.551 1.00025 586
							C10.0544 692.05 166.055 694.592 168.5 801
							C169.759 855.785 128.5 935.5 128.5 935.5
						`
					},
					{
						pathProps: {
							pathWidth: 234,
							pathHeight: 933
						},
						path: `
							M176 0.5
							C176 0.5 169.371 100.494 176 164
							C185.006 250.291 248.323 294.697 230 379.5
							C205.058 494.932 -6.14967 459.121 0.999641 577
							C7.5003 684.184 207.908 647.164 211 754.5
							C213.396 837.703 92.9996 932 92.9996 932
						`
					},
					{
						pathProps: {
							pathWidth: 145,
							pathHeight: 935
						},
						path: `
							M142.5 0.5
							C142.5 0.5 68.6732 84.2058 68.5 149
							C68.3258 214.144 133.41 233.993 142.5 298.5
							C157.868 407.555 28.7074 445.874 27.5 556
							C26.3674 659.301 154.7 704.017 123.5 802.5
							C102.26 869.543 1 934.5 1 934.5
						`
					},
					{
						pathProps: {
							pathWidth: 255,
							pathHeight: 933
						},
						path: `
							M68.9998 1
							C68.9998 1 77.2935 118.176 68.9998 192.5
							C58.3271 288.142 -21.7706 339.165 6.99976 431
							C40.7901 538.858 206.555 487.766 246.5 593.5
							C301.572 739.278 35.9998 932.5 35.9998 932.5
						`
					},
					{
						pathProps: {
							pathWidth: 170,
							pathHeight: 931
						},
						path: `
							M94.5 0.5
							C94.5 0.5 17.4529 92.2641 14 163
							C10.0336 244.253 91.3828 271.663 100.5 352.5
							C113.423 467.084 -4.74524 515.333 0.999951 630.5
							C7.68642 764.535 169.5 930 169.5 930
						`
					},
					{
						pathProps: {
							pathWidth: 196,
							pathHeight: 936
						},
						path: `
							M0.5 0.5
							C0.5 0.5 137.155 117.085 150 220
							C164.455 335.817 10.2572 378.382 29.5 493.5
							C46.5438 595.463 187.25 597.377 194.5 700.5
							C202.15 809.317 43.5 935.5 43.5 935.5
						`
					},
					{
						pathProps: {
							pathWidth: 159,
							pathHeight: 935
						},
						path: `
							M70.4997 0.5
							C70.4997 0.5 -8.3046 134.43 1.49973 226
							C11.1006 315.67 111.76 338.32 112.5 428.5
							C113.251 520.052 10.7661 543.915 1.49973 635
							C-11.8568 766.29 158 934.5 158 934.5
						`
					},
					{
						pathProps: {
							pathWidth: 259,
							pathHeight: 932
						},
						path: `
							M33.5002 0.5
							C33.5002 0.5 1.69118 167.316 33.5002 266
							C71.7966 384.811 230.876 387.82 237 512.5
							C243.932 653.609 -38.7408 656.326 5.50023 790.5
							C40.8372 897.669 258 931 258 931
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
