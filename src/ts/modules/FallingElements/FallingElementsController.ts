import { FallingElementsModel } from "./FallingElementsModel";
import { ElementSize } from "./FallingElementsTypes";
export class FallingElementsController {
	public model: FallingElementsModel;

	constructor(model: FallingElementsModel) {
		this.model = model;
	}

	public handleSvgPathCreation({
		elementsSize,
		index
	}: {
		elementsSize: ElementSize;
		index: number;
	}): string {
		return this.model.createRandomSvgPath({
			elementsSize,
			index
		});
	}
}
