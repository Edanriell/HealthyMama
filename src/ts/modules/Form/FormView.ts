import gsap from "gsap";

import { IFormView } from "./FormTypes";
import { FormController } from "./FormController";
import { InputController } from "./InputController";

import "./Form.scss";

export class FormView implements IFormView {
	formController: FormController;
	inputController: InputController;
	root: HTMLFormElement;

	private isFormLocked!: boolean;
	private formSubmitButton: HTMLButtonElement;
	private formInputs: Array<HTMLInputElement>;
	private inputsValidationResults: Array<{ isInputValid: boolean; inputIndex: number }> = [
		{ isInputValid: false, inputIndex: 0 }
	];
	private spinner!: HTMLDivElement;

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

		this.bindListeners();
	}

	private onSubmitClick = async (event: unknown): Promise<void> => {
		(event as Event).preventDefault();

		const isAllInputsValid = this.inputController.checkInputsValidationResults(
			this.inputsValidationResults
		);

		this.renderInvalidInputs(this.inputsValidationResults);

		if (!isAllInputsValid) return;

		if (this.isFormLocked) return;
		// another formController method !
		this.isFormLocked = true;
		this.formSubmitButton.style.pointerEvents = "none";

		console.log("start");

		this.mountSpinner();

		await this.formController.handleSubmit({
			form: this.root
		});

		const responseReport = await this.formController.handleResponseReport();

		console.log(responseReport);
		console.log("end");

		// another inputController method
		this.inputsValidationResults[0] = { isInputValid: false, inputIndex: 0 };

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
									this.isFormLocked = false;
									this.formSubmitButton.style.pointerEvents = "auto";
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

	public mount(): void {}
}
