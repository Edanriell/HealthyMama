import { ModalController } from "./ModalController";
import "./modal.scss";

export class ModalView {
	root: HTMLElement;
	controller: ModalController;

	private modal!: HTMLDivElement;
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

	private bindListeners(): void {
		this.modalTrigger.forEach(trigger => {
			trigger.addEventListener("click", this.onOpenClick);
		});
	}

	private createModal(): void {
		this.modal = document.createElement("div");
		this.modal.classList.add("modal__underlay");
		this.modal.setAttribute("data-modal-underlay", "true");
		this.modal.innerHTML = `
		<div class="modal" data-modal>
			<header class="modal__header">
				<h2 class="modal__title">Оформление заказа</h2>
			</header>
			<div class="modal__content">
				<form
					class="modal__modal-form modal-form"
					action="#"
					method="POST"
					data-modal-form
				>
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
				</form>
			</div>
		</div>
		`;
	}

	public mount(): void {
		this.root.appendChild(this.modal);
	}
}
