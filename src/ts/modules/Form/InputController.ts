import {
	IInputController,
	InputsProperties,
	InputsValidationResults,
	InputValidationResult
} from "./FormTypes";

import { FormModel } from "./FormModel";

export class InputController implements IInputController {
	public model: FormModel;

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
		inputProperties: InputsProperties;
	}): InputValidationResult {
		return this.model.validateInput({ value, index, inputProperties });
	}

	public checkInputsValidationResults(inputsValidationResults: InputsValidationResults): boolean {
		return this.model.checkValidationResults(inputsValidationResults);
	}

	public clearInputsValidationResults({
		formInputsCount,
		formProperties
	}: {
		formInputsCount: number;
		formProperties: InputsProperties;
	}): InputsValidationResults {
		return this.model.clearValidationResults(formInputsCount, formProperties);
	}
}
