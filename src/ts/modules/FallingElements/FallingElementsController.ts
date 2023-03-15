import { FallingElementsModel } from "./FallingElementsModel";
import { ElementsSize } from "./FallingElementsTypes";

export class FallingElementsController {
	public model: FallingElementsModel;

	constructor(model: FallingElementsModel) {
		this.model = model;
	}

	public handleGenerateRandomNumberInRange({
		minimumValue,
		maximumValue
	}: {
		minimumValue: number;
		maximumValue: number;
	}): number {
		return this.model.generateRandomNumberInRange({ minimumValue, maximumValue });
	}

	public handleSvgPathCreation({
		elementsSize,
		index
	}: {
		elementsSize: ElementsSize;
		index: number;
	}): string {
		return this.model.createRandomSvgPath({
			elementsSize,
			index
		});
	}
}
