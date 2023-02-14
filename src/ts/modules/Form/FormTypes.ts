import { FormController } from "./FormController";
import { InputController } from "./InputController";
export interface IFormView {
	formController: FormController;
	inputController: InputController;
	root: HTMLFormElement;

	mount(): void;
}

export type Response = {
	status: string,
	message: string
}

// create proper types for all type unions
