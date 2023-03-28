import { TooltipModel } from "./TooltipModel";
import { TooltipDirection } from "./TooltipTypes";

export class TooltipController {
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
