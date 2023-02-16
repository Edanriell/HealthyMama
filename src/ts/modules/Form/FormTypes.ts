import { FormController } from "./FormController";
import { InputController } from "./InputController";
import { FormModel } from "./FormModel";

export type Response = {
	status: string;
	message: string;
};

export type InputsProperties = Array<InputProperties>;

export type InputProperties = {
	inputNode: HTMLInputElement;
	regExp: RegExp;
	errorMessage: string;
	inputName: string;
};

export type InputsValidationResults = Array<InputValidationResult>;

export type InputValidationResult = {
	isInputValid: boolean;
	inputIndex: number;
	validationResultMessage: string | null;
};

export interface IFormView {
	formController: FormController;
	inputController: InputController;
	root: HTMLFormElement;

	mount(): void;
}

export interface IFormController {
	model: FormModel;

	handleSubmit({ form }: { form: HTMLFormElement }): Promise<void>;
	handleResponseReport(): Promise<Response>;
	lockForm({
		isFormLocked,
		submitButton
	}: {
		isFormLocked: boolean;
		submitButton: HTMLButtonElement;
	}): boolean;
	unlockForm({
		isFormLocked,
		submitButton
	}: {
		isFormLocked: boolean;
		submitButton: HTMLButtonElement;
	}): boolean;
}

export interface IInputController {
	model: FormModel;

	handleInputChange({
		value,
		index,
		inputProperties
	}: {
		value: string;
		index: number;
		inputProperties: InputsProperties;
	}): { isInputValid: boolean; inputIndex: number; validationResultMessage: string | null };
	checkInputsValidationResults(inputsValidationResults: InputsValidationResults): boolean;
	clearInputsValidationResults({
		formInputsCount,
		formProperties
	}: {
		formInputsCount: number;
		formProperties: InputsProperties;
	}): InputsValidationResults;
}

export interface IFormModel {
	sendData({ form }: { form: HTMLFormElement }): Promise<void>;
	getResponseReport(): Promise<Response>;
	validateInput({
		value,
		index,
		inputProperties
	}: {
		value: string;
		index: number;
		inputProperties: InputsProperties;
	}): InputValidationResult;
	checkValidationResults(inputsValidationResults: InputsValidationResults): boolean;
	clearValidationResults(
		formInputsCount: number,
		formProperties: InputsProperties
	): InputsValidationResults;
	toggleIsFormLocked(isFormLocked: boolean): boolean;
}
