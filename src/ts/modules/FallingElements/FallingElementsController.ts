import { FallingElementsModel } from "./FallingElementsModel";
import { ElementsSize, IFallingElementsController } from "./FallingElementsTypes";

export class FallingElementsController implements IFallingElementsController {
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
		id
	}: {
		elementsSize: ElementsSize;
		id: string;
	}): string {
		return this.model.createRandomSvgPath({
			elementsSize,
			id
		});
	}
}
