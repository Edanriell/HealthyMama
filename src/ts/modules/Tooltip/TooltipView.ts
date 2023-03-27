import { TooltipController } from "./TooltipController";
import { Tooltips } from "./TooltipTypes";
import "./Tooltip.scss";

export class TooltipView {
	public controller: TooltipController;
	public root: NodeListOf<Element>;

	private tooltips: Tooltips;

	constructor({
		root,
		controller,
		tooltips
	}: {
		root: NodeListOf<Element>;
		controller: TooltipController;
		tooltips: Tooltips;
	}) {
		this.root = root;
		this.controller = controller;
		this.tooltips = tooltips;

		this.createTooltips();
		// this.setDataAttribute();

		// this.bindListeners();
	}

	// showOnMouseEnter = (): void => {
	// 	this.controller.handleShowOnMouseEnter(this.tooltip, this.direction);
	// };

	// hideOnMouseLeave = (): void => {
	// 	this.controller.handleHideOnMouseLeave(this.tooltip, this.direction);
	// };

	// bindListeners(): void {
	// 	this.root.addEventListener("mouseenter", this.showOnMouseEnter);
	// 	this.root.addEventListener("mouseleave", this.hideOnMouseLeave);
	// }

	// setDataAttribute(): void {
	// 	for (const elements of this.root) {
	// 		elements.element.setAttribute(dataId);
	// 	}
	// }

	createTooltips(): void {
		// filter root tooltips and get ids from this.tooltips
		// then create
		// let targetTooltip;
		// for (const elements of this.root) {
		// }
	}

	createTooltip(text: string): HTMLSpanElement {
		const tooltip = document.createElement("span");
		tooltip.classList.add("tooltip");
		tooltip.innerText = text;
		return tooltip;
	}

	mount(): void {
		// this.root.append(this.tooltip);
	}
}
