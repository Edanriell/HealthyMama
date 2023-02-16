import {
	IFormModel,
	InputsProperties,
	InputsValidationResults,
	InputValidationResult
} from "./FormTypes";

import { Response } from "./FormTypes";
import { PostData } from "../../helpers/Requests";

export class FormModel implements IFormModel {
	private host: string;
	private port: number;
	private database: string;
	private responseReport!: Promise<Response>;

	constructor({
		hostName,
		databasePort,
		databaseName
	}: {
		hostName?: string;
		databasePort?: number;
		databaseName: string;
	}) {
		this.host = hostName || "localhost";
		this.port = databasePort || 3000;
		this.database = databaseName;
	}

	public async sendData({ form }: { form: HTMLFormElement }): Promise<void> {
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		await PostData({
			url: `http://${this.host}:${this.port}/${this.database}`,
			data
		})
			.then(() => {
				this.responseReport = new Promise(resolve => {
					resolve({ status: "success", message: "Данные успешно отправлены" });
				});
			})
			.catch(() => {
				this.responseReport = new Promise(reject => {
					reject({
						status: "failure",
						message: "Не удалось отправить данные. Попробуйте еще раз позже."
					});
				});
			})
			.finally(() => {
				(form as HTMLFormElement).reset();
			});
	}

	public async getResponseReport(): Promise<Response> {
		return await this.responseReport;
	}

	public validateInput({
		value,
		index,
		inputProperties
	}: {
		value: string;
		index: number;
		inputProperties: InputsProperties;
	}): InputValidationResult {
		const validationResult: boolean = inputProperties[index].regExp.test(value);
		if (validationResult)
			return {
				isInputValid: true,
				inputIndex: index,
				validationResultMessage: "Ошибок нет"
			};
		return {
			isInputValid: false,
			inputIndex: index,
			validationResultMessage: inputProperties[index].errorMessage
		};
	}

	public checkValidationResults(inputsValidationResults: InputsValidationResults): boolean {
		for (const validationResult of inputsValidationResults) {
			if (validationResult.isInputValid === false) return false;
		}
		return true;
	}

	public clearValidationResults(
		formInputsCount: number,
		formProperties: InputsProperties
	): InputsValidationResults {
		const validationResults = [];

		for (let i = 0; i < formInputsCount; i++) {
			validationResults.push({
				isInputValid: false,
				inputIndex: i,
				validationResultMessage: `Заполните поле: ${formProperties[i].inputName}`
			});
		}

		return validationResults;
	}

	public toggleIsFormLocked(isFormLocked: boolean): boolean {
		return !isFormLocked;
	}
}
