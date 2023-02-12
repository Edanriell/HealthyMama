import { FormController } from "./FormController";

export interface IFormView {
	controller: FormController;
	root: HTMLFormElement;

	mount(): void;
}

export type Response = {
	status: string,
	message: string
}
