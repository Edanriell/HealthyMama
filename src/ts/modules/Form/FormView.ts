import gsap from "gsap";

import { IFormView } from "./FormTypes";
import { FormController } from "./FormController";
import { InputController } from "./InputController";

import "./Form.scss";

export class FormView implements IFormView {
	formController: FormController;
	inputController: InputController;
	root: HTMLFormElement;

	private isFormLocked: boolean = false;
	private formSubmitButton: HTMLButtonElement;
	private formInputs: Array<HTMLInputElement>;
	private inputsValidationResults: Array<{ isInputValid: boolean; inputIndex: number }>;
	private spinner!: HTMLDivElement;
	private snackBar!: HTMLDivElement;
	private snackBarToast!: HTMLDivElement;

	constructor({
		root,
		formController,
		inputController,
		formSubmitButton,
		formInputs
	}: {
		root: HTMLFormElement;
		formController: FormController;
		inputController: InputController;
		formSubmitButton: HTMLButtonElement;
		formInputs: Array<HTMLInputElement>;
	}) {
		this.root = root;
		this.formController = formController;
		this.inputController = inputController;

		this.formSubmitButton = formSubmitButton;
		this.formInputs = formInputs;

		this.createSpinner();
		this.createSnackBar();

		this.bindListeners();

		this.inputsValidationResults = this.inputController.clearInputsValidationResults(
			this.formInputs.length
		);
	}

	private onSubmitClick = async (event: unknown): Promise<void> => {
		(event as Event).preventDefault();

		const isAllInputsValid = this.inputController.checkInputsValidationResults(
			this.inputsValidationResults
		);

		this.renderInvalidInputs(this.inputsValidationResults);
		// Trash code here need to fix
		for (let i = 0; i < 3; i++) {
			this.renderToasts(`${i}`);
		}
		this.bindToastListeners();
		// Trash code here need to fix

		if (!isAllInputsValid || this.isFormLocked) return;

		this.isFormLocked = this.formController.lockForm({
			isFormLocked: this.isFormLocked,
			submitButton: this.formSubmitButton
		});

		console.log("start");

		this.mountSpinner();

		await this.formController.handleSubmit({
			form: this.root
		});

		const responseReport = await this.formController.handleResponseReport();

		console.log(responseReport);
		console.log("end");

		this.inputsValidationResults = this.inputController.clearInputsValidationResults(
			this.formInputs.length
		);

		this.unmountSpinner();
	};

	private onInputChange = (event: unknown, inputIndex: number): void => {
		const input = (event as Event).currentTarget;
		const inputValue = (input as HTMLInputElement).value;
		const validationResult = this.inputController.handleInputChange(inputValue, inputIndex);
		this.inputsValidationResults[validationResult.inputIndex] = {
			isInputValid: validationResult.isInputValid,
			inputIndex: validationResult.inputIndex
		};
		console.log(this.inputsValidationResults);
	};

	private bindListeners(): void {
		this.formSubmitButton.addEventListener("click", this.onSubmitClick);
		this.formInputs.forEach((input, index) => {
			input.addEventListener("input", event => {
				this.onInputChange(event, index);
			});
		});
	}

	private renderInvalidInputs(
		inputsValidationResults: Array<{ isInputValid: boolean; inputIndex: number }>
	): void {
		for (const validationResult of inputsValidationResults) {
			if (validationResult.isInputValid === false) {
				this.formInputs[validationResult.inputIndex].classList.add("invalid-input");
			} else if (validationResult.isInputValid === true) {
				this.formInputs[validationResult.inputIndex].classList.remove("invalid-input");
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

	// render method should be here somewhere
	private createSnackBar(): void {
		this.snackBar = document.createElement("div");
		this.snackBar.classList.add("snack-bar");
	}

	private createSnackBarToast({ index, text }: { index: number; text: string }): string {
		// this.snackBarToast = document.createElement("div");
		// this.snackBarToast.classList.add("snack-bar__toast");
		// this.snackBarToast.setAttribute("data-toast-index", `${index}`);
		return `
			<div class="snack-bar__toast" data-toast-index="${index}">
				<p>${text}</p>
				<button type="button">Close</button>
			</div>
		`;
	}

	private bindToastListeners(): void {
		const toasts = document.querySelectorAll(".snack-bar__toast");
		if (!toasts) return;
		toasts.forEach(toast => {
			toast.addEventListener("click", (event) => {
				this.removeToastOnClick(event, toast)
			})
		})
	}

	private removeToastOnClick(event: unknown, toast: Element) {
		console.log((event as Event).target);
		const toastParent = toast.parentElement;
		const toastCloseButton = toast.querySelector("button");
		if ((event as Event).target === toastCloseButton) {
			toastParent?.remove();
		}
	}

	// some parameters missing
	private renderToasts(text: string): void {
		const toastWrapper = document.createElement("div");
		toastWrapper.innerHTML = this.createSnackBarToast({ index: 0, text });

		this.snackBar.append(toastWrapper);
	}

	public mount(): void {
		document.body.append(this.snackBar);
	}
}
