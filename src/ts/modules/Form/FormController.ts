import { Response } from "./FormTypes";
import { FormModel } from "./FormModel";

export class FormController {
	model: FormModel;

	constructor(model: FormModel) {
		this.model = model;
	}

	public async handleSubmit({ form }: { form: HTMLFormElement }): Promise<void> {
		await this.model.sendData({ form });
	}

	public async handleResponseReport(): Promise<Response> {
		return await this.model.getResponseReport();
	}
}
