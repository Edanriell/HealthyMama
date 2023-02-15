import { FormModel } from "./FormModel";

export class InputController {
	model: FormModel;

	constructor(model: FormModel) {
		this.model = model;
	}

	public handleInputChange({
		value,
		index,
		inputProperties
	}: {
		value: string;
		index: number;
		inputProperties: Array<{
			inputNode: HTMLInputElement;
			regExp: RegExp;
			errorMessage: string;
		}>;
	}): { isInputValid: boolean; inputIndex: number; validationResultMessage: string | null } {
		return this.model.validateInput({ value, index, inputProperties });
	}

	public checkInputsValidationResults(
		inputsValidationResults: Array<{
			isInputValid: boolean;
			inputIndex: number;
			validationResultMessage: string | null;
		}>
	): boolean {
		return this.model.checkValidationResults(inputsValidationResults);
	}

	public clearInputsValidationResults({
		formInputsCount,
		formProperties
	}: {
		formInputsCount: number;
		formProperties: Array<{
			inputNode: HTMLInputElement;
			regExp: RegExp;
			errorMessage: string;
			inputName: string;
		}>;
	}): Array<{
		isInputValid: boolean;
		inputIndex: number;
		validationResultMessage: string | null;
	}> {
		return this.model.clearValidationResults(formInputsCount, formProperties);
	}
}
