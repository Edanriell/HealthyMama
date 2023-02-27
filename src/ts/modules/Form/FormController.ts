import { IFormController } from "./FormTypes";

import { Response } from "./FormTypes";
import { FormModel } from "./FormModel";

export class FormController implements IFormController {
	public model: FormModel;

	constructor(model: FormModel) {
		this.model = model;
	}

	public async handleSubmit({ form }: { form: HTMLFormElement }): Promise<void> {
		await this.model.sendData({ form });
	}

	public async handleResponseReport(): Promise<Response> {
		return await this.model.getResponseReport();
	}

	public lockForm({
		isFormLocked,
		submitButton
	}: {
		isFormLocked: boolean;
		submitButton: HTMLButtonElement;
	}): boolean {
		submitButton.style.pointerEvents = "none";
		return this.model.toggleIsFormLocked(isFormLocked);
	}

	public unlockForm({
		isFormLocked,
		submitButton
	}: {
		isFormLocked: boolean;
		submitButton: HTMLButtonElement;
	}): boolean {
		submitButton.style.pointerEvents = "auto";
		return this.model.toggleIsFormLocked(isFormLocked);
	}
}
