import gsap from "gsap";

import { IFormView } from "./FormTypes";
import { FormController } from "./FormController";

import "./Form.scss";

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
		this.mountSpinner();
		await this.controller.handleSubmit({
			form: this.root
		});
		const responseReport = await this.controller.handleResponseReport();
		console.log(responseReport);
		console.log("end");
		this.unmountSpinner();
	};

	private bindListeners(): void {
		this.formSubmitButton.addEventListener("click", this.onSubmitClick);
	}

	private mountSpinner(): void {
		for (const element of this.formSubmitButton.children) {
			(element as HTMLElement).style.display = "none";
		}

		this.formSubmitButton.append(this.spinner);

		gsap.fromTo(
			this.spinner,
			{ opacity: 0, scale: 0.4 },
			{ opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
		);
	}

	private unmountSpinner(): void {
		gsap.fromTo(
			this.spinner,
			{ opacity: 1, scale: 1 },
			{
				opacity: 0,
				scale: 0.4,
				duration: 1,
				ease: "power2.out",
				onComplete: () => {
					this.spinner.remove();

					for (const element of this.formSubmitButton.children) {
						(element as HTMLElement).style.display = "flex";
					}
				}
			}
		);
	}

	private createSpinner(): void {
		this.spinner = document.createElement("div");
		this.spinner.classList.add("spinner");
		this.spinner.innerHTML = `
		<span class="spinner__image">
		    <span class="visually-hidden">Загрузка</span>
		</span>
		`;
	}

	public mount(): void {}
}
