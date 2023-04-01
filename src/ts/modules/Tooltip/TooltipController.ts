import { TooltipModel } from "./TooltipModel";
import { TooltipDirection, ITooltipController } from "./TooltipTypes";

export class TooltipController implements ITooltipController {
	public model: TooltipModel;

	constructor(model: TooltipModel) {
		this.model = model;
	}

	public handleShowOnMouseEnter(tooltip: HTMLSpanElement, direction: TooltipDirection): void {
		this.model.showTooltip(tooltip, direction);
	}

	public handleHideOnMouseLeave(tooltip: HTMLSpanElement, direction: TooltipDirection): void {
		this.model.hideTooltip(tooltip, direction);
	}
}
