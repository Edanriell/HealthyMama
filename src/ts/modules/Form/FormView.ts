import gsap from "gsap";

import { IFormView, InputsProperties, InputsValidationResults } from "./FormTypes";
import { FormController } from "./FormController";
import { InputController } from "./InputController";

import "./form.scss";

export class FormView implements IFormView {
	formController: FormController;
	inputController: InputController;
	root: HTMLFormElement;

	private isFormLocked: boolean = false;
	private formSubmitButton: HTMLButtonElement;
	private formInputs: InputsProperties;
	private inputsValidationResults: InputsValidationResults;
	private spinner!: HTMLDivElement;
	private toastsContainer!: HTMLDivElement;
	private removeToastTimeout: number | null;

	constructor({
		root,
		formController,
		inputController,
		formSubmitButton,
		formInputs,
		removeToastTimeout
	}: {
		root: HTMLFormElement;
		formController: FormController;
		inputController: InputController;
		formSubmitButton: HTMLButtonElement;
		formInputs: InputsProperties;
		removeToastTimeout?: number;
	}) {
		this.root = root;
		this.formController = formController;
		this.inputController = inputController;

		this.formSubmitButton = formSubmitButton;
		this.formInputs = formInputs;

		this.removeToastTimeout = removeToastTimeout ?? null;

		this.createSpinner();
		this.createToastsContainer();

		this.bindListeners();

		this.inputsValidationResults = this.inputController.clearInputsValidationResults({
			formInputsCount: this.formInputs.length,
			formProperties: this.formInputs
		});
	}

	private onSubmitClick = async (event: unknown): Promise<void> => {
		(event as Event).preventDefault();

		const isAllInputsValid = this.inputController.checkInputsValidationResults(
			this.inputsValidationResults
		);

		this.renderInvalidInputs(this.inputsValidationResults);

		for (const validationResult of this.inputsValidationResults) {
			if (!validationResult.isInputValid) {
				this.renderToasts({
					text: `${validationResult.validationResultMessage}`,
					toastType: "failure"
				});
				this.bindToastListeners();
			}
		}

		if (!isAllInputsValid || this.isFormLocked) return;

		this.isFormLocked = this.formController.lockForm({
			isFormLocked: this.isFormLocked,
			submitButton: this.formSubmitButton
		});

		this.mountSpinner();

		await this.formController.handleSubmit({
			form: this.root
		});

		const responseReport = await this.formController.handleResponseReport();

		this.renderToasts({
			text: `${responseReport.message}`,
			toastType: `${responseReport.status}`
		});
		this.bindToastListeners();

		// console.log(responseReport);

		this.inputsValidationResults = this.inputController.clearInputsValidationResults({
			formInputsCount: this.formInputs.length,
			formProperties: this.formInputs
		});

		this.unmountSpinner();
	};

	private onInputChange = (event: unknown, inputIndex: number): void => {
		const input = (event as Event).currentTarget;
		const inputValue = (input as HTMLInputElement).value;
		const validationResult = this.inputController.handleInputChange({
			value: inputValue,
			index: inputIndex,
			inputProperties: this.formInputs
		});
		this.inputsValidationResults[validationResult.inputIndex] = {
			isInputValid: validationResult.isInputValid,
			inputIndex: validationResult.inputIndex,
			validationResultMessage: validationResult.validationResultMessage
		};

		// console.log(this.inputsValidationResults);
	};

	private bindListeners(): void {
		this.formSubmitButton.addEventListener("click", this.onSubmitClick);
		this.formInputs.forEach((input, index) => {
			input.inputNode.addEventListener("input", event => {
				this.onInputChange(event, index);
			});
		});
	}

	private renderInvalidInputs(
		inputsValidationResults: Array<{ isInputValid: boolean; inputIndex: number }>
	): void {
		for (const validationResult of inputsValidationResults) {
			if (validationResult.isInputValid === false) {
				this.formInputs[validationResult.inputIndex].inputNode.classList.add(
					"invalid-input"
				);
			} else if (validationResult.isInputValid === true) {
				this.formInputs[validationResult.inputIndex].inputNode.classList.remove(
					"invalid-input"
				);
			}
		}
	}

	private mountSpinner(): void {
		for (const element of this.formSubmitButton.children) {
			gsap.fromTo(
				element,
				{ opacity: 1, scale: 1, translateY: 0 },
				{
					opacity: 0,
					scale: 1,
					translateY: 10,
					duration: 0.5,
					ease: "power2.out",
					onComplete: () => {
						(element as HTMLElement).style.display = "none";

						this.formSubmitButton.append(this.spinner);

						gsap.fromTo(
							this.spinner,
							{ opacity: 0, scale: 0.4 },
							{ opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
						);
					}
				}
			);
		}
	}

	private unmountSpinner(): void {
		gsap.fromTo(
			this.spinner,
			{ opacity: 1, scale: 1 },
			{
				opacity: 0,
				scale: 0.4,
				duration: 0.5,
				ease: "power2.out",
				onComplete: () => {
					this.spinner.remove();

					for (const element of this.formSubmitButton.children) {
						(element as HTMLElement).style.display = "flex";
						gsap.fromTo(
							element,
							{ opacity: 0, scale: 1, translateY: -10 },
							{
								opacity: 1,
								scale: 1,
								translateY: 0,
								duration: 0.5,
								ease: "power2.out",
								onComplete: () => {
									this.isFormLocked = this.formController.unlockForm({
										isFormLocked: true,
										submitButton: this.formSubmitButton
									});
								}
							}
						);
					}
				}
			}
		);
	}

	private createSpinner(): void {
		this.spinner = document.createElement("div");
		this.spinner.classList.add("spinner");
		this.spinner.innerHTML = `
		<span class="visually-hidden">Загрузка</span>
		<svg class="spinner__image">
			<use xlink:href="#spinner" x="0" y="0"></use>
		</svg>
		`;
	}

	private createToastsContainer(): void {
		this.toastsContainer = document.createElement("div");
		this.toastsContainer.classList.add("toasts", "toasts__container");
	}

	private renderToasts({ text, toastType }: { text: string; toastType: string }): void {
		const newToast = document.createElement("div");
		newToast.classList.add("toasts__toast", "toast");
		if (toastType === "failure") {
			newToast.classList.add("toast--style--error");
		} else if (toastType === "success") {
			newToast.classList.add("toast--style--success");
		}
		newToast.innerHTML = this.getNewToastContent({ index: 0, text });

		this.toastsContainer.prepend(newToast);
		gsap.fromTo(
			newToast,
			{ opacity: 0, translateY: 30 },
			{
				opacity: 1,
				translateY: 0,
				duration: 0.5,
				ease: "power2.out"
			}
		);
	}

	private getNewToastContent({ index, text }: { index: number; text: string }): string {
		return `
			<div class="toast__content" data-toast-index="${index}">
				<p class="toast__text">${text}</p>
				<div class="toast__close-button-wrapper">
					<svg class="toast__circles-wrapper" viewBox="0 0 100 100">
						<path class="toast__secondary-circle" d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="currentColor" stroke-width="8" fill-opacity="0"></path>
						<path class="toast__primary-circle" d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="currentColor" stroke-width="6" fill-opacity="0" style="stroke-dasharray: 295.416, 295.416; animation-duration: ${
							this.removeToastTimeout || 0
						}ms"></path>
					</svg>
					<button class="toast__close-button" type="button">
						<span class="visually-hidden">Закрыть окно</span>
						<svg class="toast__close-button-icon">
							<use xlink:href="#xmark-solid" x="0" y="0"></use>
						</svg>
					</button>
				</div>
			</div>
		`;
	}

	private bindToastListeners(): void {
		const toasts = document.querySelectorAll(".toast");

		if (!toasts) return;

		toasts.forEach(toast => {
			let timeout: NodeJS.Timeout | null = null;

			if (this.removeToastTimeout) {
				timeout = setTimeout(() => {
					this.removeToastAfterTimeout(toast);
					console.log("setTimeoutRuns");
				}, this.removeToastTimeout);
			}

			toast.addEventListener("click", event => {
				this.removeToastOnClick(event, toast, timeout);
				event = event;
			});
		});
	}

	private removeToastAfterTimeout(toast: Element): void {
		gsap.fromTo(
			toast,
			{ opacity: 1, scale: 1 },
			{
				opacity: 0,
				scale: 0.9,
				duration: 0.25,
				ease: "power2.out",
				onComplete: () => {
					toast?.remove();
				}
			}
		);
	}

	private removeToastOnClick(
		event: unknown,
		toast: Element,
		timeout?: NodeJS.Timeout | null
	): void {
		const toastCloseButton = toast.querySelector("button");

		if (timeout) clearTimeout(timeout);

		if ((event as Event).target === toastCloseButton) {
			gsap.fromTo(
				toast,
				{ opacity: 1, scale: 1 },
				{
					opacity: 0,
					scale: 0.9,
					duration: 0.25,
					ease: "power2.out",
					onComplete: () => {
						toast?.remove();
					}
				}
			);
		}
	}

	public mount(): void {
		document.body.append(this.toastsContainer);
	}
}
