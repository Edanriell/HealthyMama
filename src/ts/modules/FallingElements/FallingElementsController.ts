import { FallingElementsModel } from "./FallingElementsModel";

export class FallingElementsController {
	public model: FallingElementsModel;

	constructor(model: FallingElementsModel) {
		this.model = model;
	}

	public randomizePosition({
		minValue,
		maxValue
	}: {
		minValue: number;
		maxValue: number;
	}): string {
		return this.model.generateRandomPosition({ minValue, maxValue });
	}

	public randomizeSvgPath(): string {
		return this.model.chooseRandomSvgPath();
	}
}
