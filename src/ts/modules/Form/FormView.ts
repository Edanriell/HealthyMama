import { IFormView } from "./FormTypes";
import { FormController } from "./FormController";

export class FormView implements IFormView {
	controller: FormController;
	root: HTMLFormElement;

	private formSubmitButton: HTMLButtonElement;
	private spinner!: HTMLDivElement;

	constructor({
		root,
		controller,
		formSubmitButton
	}: {
		root: HTMLFormElement;
		controller: FormController;
		formSubmitButton: HTMLButtonElement;
	}) {
		this.root = root;
		this.controller = controller;

		this.formSubmitButton = formSubmitButton;

		this.createSpinner();

		this.bindListeners();
	}

	private onSubmitClick = async (event: unknown): Promise<void> => {
		(event as Event).preventDefault();
		console.log("start");
		await this.controller.handleSubmit({
			form: this.root
		});
		const responseReport = await this.controller.handleResponseReport();
		console.log(responseReport);
		console.log("end");
	};

	private bindListeners(): void {
		this.formSubmitButton.addEventListener("click", this.onSubmitClick);
	}

	private createSpinner(): void {
		this.spinner = document.createElement("div");
		// this.spinner.classList.add(`${Spinner.spinnerSelector}`);
		// this.spinner.innerHTML = `
		// <span class="${Spinner.spinnerImageSelector}">
		//     <span class="visually-hidden">Загрузка</span>
		// </span>
		// `;
	}

	public mount(): void {}
}
