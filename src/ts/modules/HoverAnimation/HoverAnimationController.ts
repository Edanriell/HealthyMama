import { IHoverAnimationController } from "./HoverAnimationTypes";
import { HoverAnimationModel } from "./HoverAnimationModel";

export class HoverAnimationController implements IHoverAnimationController {
	public model: HoverAnimationModel;

	constructor(model: HoverAnimationModel) {
		this.model = model;
	}

	public handleMouseEnterAnimation(event: unknown): void {
		this.model.mouseEnterAnimation(event);
	}

	public handleMouseLeaveAnimation(event: unknown): void {
		this.model.mouseLeaveAnimation(event);
	}
}
