import { Response } from "./FormTypes";
import { PostData } from "../../helpers/Requests";

export class FormModel {
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
					resolve({ status: "123", message: "2123" });
				});
			})
			.catch(() => {
				this.responseReport = new Promise(reject => {
					reject({ status: "00", message: "00" });
				});
			})
			.finally(() => {
				(form as HTMLFormElement).reset();
			});
	}

	public async getResponseReport(): Promise<Response> {
		return await this.responseReport;
	}

	public validateInput(
		inputValue: string,
		inputIndex: number
	): { isInputValid: boolean; inputIndex: number } {
		if (inputValue.length > 4) return { isInputValid: true, inputIndex: inputIndex };
		return { isInputValid: false, inputIndex: inputIndex };
	}

	public checkValidationResults(
		inputsValidationResults: Array<{ isInputValid: boolean; inputIndex: number }>
	): boolean {
		for (const validationResult of inputsValidationResults) {
			if (validationResult.isInputValid === false) return false;
		}
		return true;
	}
}
