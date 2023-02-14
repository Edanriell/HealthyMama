import { FormModel } from "./FormModel";

export class InputController {
	model: FormModel;

	constructor(model: FormModel) {
		this.model = model;
	}

	public handleInputChange(
		inputValue: string,
		inputIndex: number
	): { isInputValid: boolean; inputIndex: number } {
		return this.model.validateInput(inputValue, inputIndex);
	}

	public checkInputsValidationResults(
		inputsValidationResults: Array<{ isInputValid: boolean; inputIndex: number }>
	): boolean {
		return this.model.checkValidationResults(inputsValidationResults);
	}

	public clearInputsValidationResults(
		formInputsCount: number
	): Array<{ isInputValid: boolean; inputIndex: number }> {
		return this.model.clearValidationResults(formInputsCount);
	}
}
