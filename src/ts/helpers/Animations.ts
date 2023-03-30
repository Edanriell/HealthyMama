import { HoverAnimationView } from "../modules/HoverAnimation";
import { HoverAnimationController } from "../modules/HoverAnimation";
import { HoverAnimationModel } from "../modules/HoverAnimation";

export function InitializeHoverAnimations() {
	const burgerMenuElementsHoverEffectModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--navigation-link-opacity",
				variableValue: {
					start: 1,
					end: 0
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--navigation-link-transform",
				variableValue: {
					start: "translateY(5px)",
					end: "translateY(10px)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const burgerMenuElementsHoverEffectController: HoverAnimationController =
		new HoverAnimationController(burgerMenuElementsHoverEffectModel);
	const burgerMenuElementsHoverEffectView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelectorAll(".mobile-navigation__link")!,
		controller: burgerMenuElementsHoverEffectController
	});

	const mainButtonHoverEffectModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--button-background-color",
				variableValue: {
					start: "hsl(0, 0%, 100%)",
					end: "hsl(145, 63%, 42%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--button-border-color",
				variableValue: {
					start: "hsl(145, 63%, 42%)",
					end: "hsl(0, 0%, 100%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--button-box-shadow",
				variableValue: {
					start: "none",
					end: "0 0 0 0.1rem hsla(202, 77%, 42%, 0.11)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--button-text-color",
				variableValue: {
					start: "hsl(145, 63%, 42%)",
					end: "hsl(0, 0%, 100%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--button-icon-background-color",
				variableValue: {
					start: "hsl(145, 56%, 66%)",
					end: "hsl(145, 55%, 46%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const mainButtonHoverEffectController: HoverAnimationController = new HoverAnimationController(
		mainButtonHoverEffectModel
	);
	const mainButtonHoverEffectView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelectorAll(".button")!,
		controller: mainButtonHoverEffectController
	});

	const mainSliderPreviousSlideButtonHoverEffectModel: HoverAnimationModel =
		new HoverAnimationModel({
			cssVariables: [
				{
					variableName: "--previous-slide-button-background-color",
					variableValue: {
						start: "hsl(0, 0%, 100%)",
						end: "hsl(145, 63%, 42%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				},
				{
					variableName: "--previous-slide-button-border-color",
					variableValue: {
						start: "hsl(145, 63%, 42%)",
						end: "hsl(0, 0%, 100%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				},
				{
					variableName: "--previous-slide-button-icon-color",
					variableValue: {
						start: "hsl(145, 63%, 42%)",
						end: "hsl(0, 0%, 100%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				}
			]
		});
	const mainSliderPreviousSlideButtonHoverEffectController: HoverAnimationController =
		new HoverAnimationController(mainSliderPreviousSlideButtonHoverEffectModel);
	const mainSliderPreviousSlideButtonHoverEffectView: HoverAnimationView = new HoverAnimationView(
		{
			root: document.querySelector(".main-slider__previous-slide-button")!,
			controller: mainSliderPreviousSlideButtonHoverEffectController
		}
	);

	const mainSliderNextSlideButtonHoverEffectModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--next-slide-button-background-color",
				variableValue: {
					start: "hsl(0, 0%, 100%)",
					end: "hsl(145, 63%, 42%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--next-slide-button-border-color",
				variableValue: {
					start: "hsl(145, 63%, 42%)",
					end: "hsl(0, 0%, 100%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--next-slide-button-icon-color",
				variableValue: {
					start: "hsl(145, 63%, 42%)",
					end: "hsl(0, 0%, 100%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const mainSliderNextSlideButtonHoverEffectController: HoverAnimationController =
		new HoverAnimationController(mainSliderNextSlideButtonHoverEffectModel);
	const mainSliderNextSlideButtonHoverEffectView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelector(".main-slider__next-slide-button")!,
		controller: mainSliderNextSlideButtonHoverEffectController
	});

	const productsSliderPreviousSlideButtonHoverEffectModel: HoverAnimationModel =
		new HoverAnimationModel({
			cssVariables: [
				{
					variableName: "--products-slider-previous-slide-button-transform",
					variableValue: {
						start: "scale(1.4)",
						end: "scale(1)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				}
			]
		});
	const productsSliderPreviousSlideButtonHoverEffectController: HoverAnimationController =
		new HoverAnimationController(productsSliderPreviousSlideButtonHoverEffectModel);
	const productsSliderPreviousSlideButtonHoverEffectView: HoverAnimationView =
		new HoverAnimationView({
			root: document.querySelector(".products-slider__previous-slide-button-mobile")!,
			controller: productsSliderPreviousSlideButtonHoverEffectController
		});

	const productsSliderNextSlideButtonHoverEffectModel: HoverAnimationModel =
		new HoverAnimationModel({
			cssVariables: [
				{
					variableName: "--products-slider-next-slide-button-transform",
					variableValue: {
						start: "scale(1.4)",
						end: "scale(1)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				}
			]
		});
	const productsSliderNextSlideButtonHoverEffectController: HoverAnimationController =
		new HoverAnimationController(productsSliderNextSlideButtonHoverEffectModel);
	const productsSliderNextSlideButtonHoverEffectView: HoverAnimationView = new HoverAnimationView(
		{
			root: document.querySelector(".products-slider__next-slide-button-mobile")!,
			controller: productsSliderNextSlideButtonHoverEffectController
		}
	);

	const requestFormInputHoverEffectModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--request-form-input-background-color",
				variableValue: {
					start: "hsl(0, 0%, 100%)",
					end: "hsl(144, 48%, 94%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--request-form-input-border-color",
				variableValue: {
					start: "hsl(145, 63%, 42%)",
					end: "hsl(0, 0%, 100%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const requestFormInputHoverEffectController: HoverAnimationController =
		new HoverAnimationController(requestFormInputHoverEffectModel);
	const requestFormInputHoverEffectView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelectorAll(".request-form__input")!,
		controller: requestFormInputHoverEffectController
	});

	const scrollToTopButtonHoverEffectModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--scroll-to-top-button-background-color",
				variableValue: {
					start: "hsl(0, 0%, 100%)",
					end: "hsl(145, 63%, 42%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--scroll-to-top-button-border-color",
				variableValue: {
					start: "hsl(145, 63%, 42%)",
					end: "hsl(0, 0%, 100%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--scroll-to-top-button-icon-color",
				variableValue: {
					start: "hsl(145, 63%, 42%)",
					end: "hsl(0, 0%, 100%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const scrollToTopButtonHoverEffectController: HoverAnimationController =
		new HoverAnimationController(scrollToTopButtonHoverEffectModel);
	const scrollToTopButtonHoverEffectView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelector(".scroll-to-top__button")!,
		controller: scrollToTopButtonHoverEffectController
	});

	const secondaryNavigationItemHoverEffectModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--secondary-navigation-link-opacity",
				variableValue: {
					start: 1,
					end: 0
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--secondary-navigation-link-transform",
				variableValue: {
					start: "translateY(5px)",
					end: "translateY(10px)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const secondaryNavigationItemHoverEffectController: HoverAnimationController =
		new HoverAnimationController(secondaryNavigationItemHoverEffectModel);
	const secondaryNavigationItemHoverEffectView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelectorAll(".secondary-navigation__item")!,
		controller: secondaryNavigationItemHoverEffectController
	});

	const politicsAndAgreementItemHoverEffectModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--politics-and-agreement-item-opacity",
				variableValue: {
					start: "100%",
					end: "45%"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const politicsAndAgreementItemHoverEffectController: HoverAnimationController =
		new HoverAnimationController(politicsAndAgreementItemHoverEffectModel);
	const politicsAndAgreementItemHoverEffectView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelectorAll(".politics-and-agreement__item")!,
		controller: politicsAndAgreementItemHoverEffectController
	});

	const mainNavigationLinkHoverEffectModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--main-navigation-link-text-color",
				variableValue: {
					start: "hsl(145, 63%, 42%)",
					end: "hsl(0, 0%, 0%)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--main-navigation-link-opacity",
				variableValue: {
					start: 1,
					end: 0
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			},
			{
				variableName: "--main-navigation-link-transform",
				variableValue: {
					start: "translateY(5px)",
					end: "translateY(10px)"
				},
				animationProperties: {
					start: {
						duration: 0.5,
						ease: "power2.out"
					},
					end: {
						duration: 0.5,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const mainNavigationLinkHoverEffectController: HoverAnimationController =
		new HoverAnimationController(mainNavigationLinkHoverEffectModel);
	const mainNavigationLinkHoverEffectView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelectorAll(".main-navigation__link")!,
		controller: mainNavigationLinkHoverEffectController
	});

	const productsSliderPreviousSlideButtonUniversalHoverEffectModel: HoverAnimationModel =
		new HoverAnimationModel({
			cssVariables: [
				{
					variableName: "--products-slider-previous-slide-button-background-color",
					variableValue: {
						start: "hsl(0, 0%, 100%)",
						end: "hsl(145, 63%, 42%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				},
				{
					variableName: "--products-slider-previous-slide-button-border-color",
					variableValue: {
						start: "hsl(145, 63%, 42%)",
						end: "hsl(145, 63%, 42%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				},
				{
					variableName: "--products-slider-previous-slide-button-icon-color",
					variableValue: {
						start: "hsl(145, 63%, 42%)",
						end: "hsl(0, 0%, 100%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				}
			]
		});
	const productsSliderPreviousSlideButtonUniversalHoverEffectController: HoverAnimationController =
		new HoverAnimationController(productsSliderPreviousSlideButtonUniversalHoverEffectModel);
	const productsSliderPreviousSlideButtonUniversalHoverEffectView: HoverAnimationView =
		new HoverAnimationView({
			root: document.querySelectorAll(".products-slider__previous-slide-button-universal")!,
			controller: productsSliderPreviousSlideButtonUniversalHoverEffectController
		});

	const productsSliderNextSlideButtonUniversalHoverEffectModel: HoverAnimationModel =
		new HoverAnimationModel({
			cssVariables: [
				{
					variableName: "--products-slider-next-slide-button-background-color",
					variableValue: {
						start: "hsl(0, 0%, 100%)",
						end: "hsl(145, 63%, 42%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				},
				{
					variableName: "--products-slider-next-slide-button-border-color",
					variableValue: {
						start: "hsl(145, 63%, 42%)",
						end: "hsl(145, 63%, 42%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				},
				{
					variableName: "--products-slider-next-slide-button-icon-color",
					variableValue: {
						start: "hsl(145, 63%, 42%)",
						end: "hsl(0, 0%, 100%)"
					},
					animationProperties: {
						start: {
							duration: 0.5,
							ease: "power2.out"
						},
						end: {
							duration: 0.5,
							ease: "power2.out"
						}
					}
				}
			]
		});
	const productsSliderNextSlideButtonUniversalHoverEffectController: HoverAnimationController =
		new HoverAnimationController(productsSliderNextSlideButtonUniversalHoverEffectModel);
	const productsSliderNextSlideButtonUniversalHoverEffectView: HoverAnimationView =
		new HoverAnimationView({
			root: document.querySelectorAll(".products-slider__next-slide-button-universal")!,
			controller: productsSliderNextSlideButtonUniversalHoverEffectController
		});

	const modalCloseButtonIconModel: HoverAnimationModel = new HoverAnimationModel({
		cssVariables: [
			{
				variableName: "--modal-close-button-icon-background-color",
				variableValue: {
					start: "rgb(172, 10, 10)",
					end: "rgba(0,0,0,0.15)"
				},
				animationProperties: {
					start: {
						duration: 1.5,
						rotate: "90deg",
						scale: 1.2,
						ease: "elastic.out(1, 0.3)"
					},
					end: {
						duration: 1.5,
						rotate: "0deg",
						scale: 1,
						ease: "power2.out"
					}
				}
			}
		]
	});
	const modalCloseButtonIconController: HoverAnimationController = new HoverAnimationController(
		modalCloseButtonIconModel
	);
	const modalCloseButtonIconView: HoverAnimationView = new HoverAnimationView({
		root: document.querySelectorAll(".modal__close-button-icon")!,
		controller: modalCloseButtonIconController
	});

	burgerMenuElementsHoverEffectView.mount();
	mainButtonHoverEffectView.mount();
	mainSliderPreviousSlideButtonHoverEffectView.mount();
	mainSliderNextSlideButtonHoverEffectView.mount();
	productsSliderPreviousSlideButtonHoverEffectView.mount();
	productsSliderNextSlideButtonHoverEffectView.mount();
	requestFormInputHoverEffectView.mount();
	scrollToTopButtonHoverEffectView.mount();
	secondaryNavigationItemHoverEffectView.mount();
	politicsAndAgreementItemHoverEffectView.mount();
	mainNavigationLinkHoverEffectView.mount();
	productsSliderPreviousSlideButtonUniversalHoverEffectView.mount();
	productsSliderNextSlideButtonUniversalHoverEffectView.mount();
	modalCloseButtonIconView.mount();
}
