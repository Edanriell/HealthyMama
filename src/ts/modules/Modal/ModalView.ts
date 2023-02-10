import { IModalView } from "./ModalTypes";
import { ModalController } from "./ModalController";
import "./modal.scss";

export class ModalView implements IModalView {
	root: HTMLElement;
	controller: ModalController;

	private modal!: HTMLDivElement;
	private modalUnderlay!: HTMLDivElement;
	private modalHeader!: HTMLHeadElement;
	private modalCloseButton!: HTMLButtonElement;
	private modalMainContent!: HTMLDivElement;
	private modalForm!: HTMLFormElement;
	private modalTrigger!: NodeListOf<Element>;

	constructor({
		root,
		controller,
		modalTriggerSelector
	}: {
		root: HTMLElement;
		controller: ModalController;
		modalTriggerSelector: string;
	}) {
		this.root = root;
		this.controller = controller;
		this.modalTrigger = document.querySelectorAll(modalTriggerSelector);

		this.createModal();

		this.bindListeners();
	}

	private onOpenClick = (): void => {
		this.controller.handleOpenModal();
	};

	private onCloseClick = (): void => {
		this.controller.handleCloseModal();
	};

	private bindListeners(): void {
		this.modalTrigger.forEach(trigger => {
			trigger.addEventListener("click", this.onOpenClick);
		});
		this.modalCloseButton.addEventListener("click", this.onCloseClick);
		this.modalUnderlay.addEventListener("click", event => {
			if (event.currentTarget === event.target) this.onCloseClick();
		});
	}

	private createModal(): void {
		this.createModalUnderlay();
		this.createModalContent();

		this.modalUnderlay.append(this.modal);
	}

	private createModalUnderlay(): void {
		this.modalUnderlay = document.createElement("div");
		this.modalUnderlay.classList.add("modal__underlay");
		this.modalUnderlay.setAttribute("data-modal-underlay", "true");
	}

	private createModalContent(): void {
		this.modal = document.createElement("div");
		this.modal.classList.add("modal");
		this.modal.setAttribute("data-modal", "true");

		this.createModalHeader();
		this.createModalCloseButton();
		this.createModalMainContent();

		this.modal.append(this.modalHeader, this.modalCloseButton, this.modalMainContent);
	}

	private createModalHeader(): void {
		this.modalHeader = document.createElement("header");
		this.modalHeader.classList.add("modal__header");
		this.modalHeader.innerHTML = `
			<h2 class="modal__title">Оформление заказа</h2>
		`;
	}

	private createModalCloseButton(): void {
		this.modalCloseButton = document.createElement("button");
		this.modalCloseButton.type = "button";
		this.modalCloseButton.classList.add("modal__close-button");
		this.modalCloseButton.innerHTML = `
		<svg class="modal__close-button-icon">
			<use xlink:href="#xmark-solid" x="0" y="0"></use>
		</svg>
		`;
	}

	private createModalMainContent(): void {
		this.modalMainContent = document.createElement("div");
		this.modalMainContent.classList.add("modal__content");

		this.createModalForm();

		this.modalMainContent.append(this.modalForm);
	}

	private createModalForm(): void {
		this.modalForm = document.createElement("form");
		this.modalForm.classList.add("modal__modal-form", "modal-form");
		this.modalForm.action = "#";
		this.modalForm.method = "POST";
		this.modalForm.setAttribute("data-modal-form", "true");
		this.modalForm.innerHTML = `
		<div class="modal-form__field request-form__form-field">
			<label class="request-form__input-label request-form__person-name-input-label visually-hidden" for="person-name">Ваше имя</label>
			<input
				type="text"
				autocomplete="on"
				required
				name="person-name"
				placeholder="Ваше имя"
				class="request-form__input request-form__person-name-input modal-form__input"
				id="person-name"
			/>
		</div>
		<div class="modal-form__field request-form__form-field">
			<label class="request-form__input-label request-form__person-phone-number-input-label visually-hidden" for="person-phone-number">Ваш телефон</label>
			<input
				type="text"
				autocomplete="on"
				required
				name="person-phone-number"
				placeholder="Ваш телефон"
				class="request-form__input request-form__person-phone-number-input modal-form__input"
				id="person-phone-number"
			/>
		</div>
		<button class="request-form__button button modal-form__submit-button" type="submit">
			<span class="button__text text__regular-text--text-weight--bold text__regular-text--text-color--white">Оформить заказ</span>
			<span class="button__arrow-icon-wrapper">
				<svg class="button__arrow-icon">
					<use xlink:href="#button-arrow" x="0" y="0"></use>
				</svg>
			</span>
		</button>
		`;
	}

	public mount(): void {
		this.root.appendChild(this.modalUnderlay);
	}
}
