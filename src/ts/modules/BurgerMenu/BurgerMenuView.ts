import { BurgerMenuController } from "./BurgerMenuController";
import { IBurgerMenuView } from "./BurgerMenuTypes";

export class BurgerMenuView implements IBurgerMenuView {
	controller: BurgerMenuController;
	root: HTMLElement;

	private mobileNavigation!: HTMLDivElement;
	private mobileNavigationBurger!: HTMLDivElement;

	constructor({root, controller} : {root: HTMLElement, controller: BurgerMenuController}) {
		this.root = root;
		this.controller = controller;

		this.createMobileNavigation();
		this.createMobileNavigationBurger();

		this.bindListeners();
	}

	private onToggleClick = (event: { currentTarget: any; }) => {
		this.controller.handleToggle(event.currentTarget);
	};

	private bindListeners(): void {
		this.mobileNavigationBurger.addEventListener("click", this.onToggleClick);
	}

	private createMobileNavigationBurger(): void {
		this.mobileNavigationBurger = document.createElement("div");
		this.mobileNavigationBurger.classList.add("navigation__mobile-navigation-burger");
		this.mobileNavigationBurger.setAttribute("data-menu-open", "false");
		this.mobileNavigationBurger.innerHTML = `
		<div class="mobile-navigation-burger">
			<svg class="mobile-navigation-burger__bar">
				<use xlink:href="#burger-menu-bar" x="0" y="0"></use>
			</svg>
			<svg class="mobile-navigation-burger__bar">
				<use xlink:href="#burger-menu-bar" x="0" y="0"></use>
			</svg>
			<svg class="mobile-navigation-burger__bar">
				<use xlink:href="#burger-menu-bar" x="0" y="0"></use>
			</svg>
		</div>
		`;
	}

	private createMobileNavigation(): void {
		this.mobileNavigation = document.createElement("div");
		this.mobileNavigation.classList.add("navigation__mobile-navigation");
		this.mobileNavigation.innerHTML = `
			<div class="mobile-navigation__underlay">
				<div class="mobile-navigation__content container">
					<ul class="mobile-navigation">
						<li class="mobile-navigation__item">
							<a class="mobile-navigation__link text__regular-text--text-weight--semibold text__regular-text--text-color--white" href="#">Важность правильного питания</a>
						</li>
						<li class="mobile-navigation__item">
							<a class="mobile-navigation__link text__regular-text--text-weight--semibold text__regular-text--text-color--white" href="#">Почему мы?</a>
						</li>
						<li class="mobile-navigation__item">
							<a class="mobile-navigation__link text__regular-text--text-weight--semibold text__regular-text--text-color--white" href="#">Где заказать?</a>
						</li>
					</ul>
				</div>
			</div>
		`;
	}

	public mount(): void {
		this.root.appendChild(this.mobileNavigationBurger);
		this.root.appendChild(this.mobileNavigation);
	}
}
