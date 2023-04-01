import { TooltipController } from "./TooltipController";
import { Tooltips, ITooltipView } from "./TooltipTypes";
import "./Tooltip.scss";

export class TooltipView implements ITooltipView {
	public controller: TooltipController;
	public root: NodeListOf<Element>;

	private tooltipsData: Tooltips;
	private tooltips: Array<HTMLSpanElement> = [];
	private tooltipDataAttribute: string = "data-tooltip-id";

	constructor({
		root,
		controller,
		tooltipsData
	}: {
		root: NodeListOf<Element>;
		controller: TooltipController;
		tooltipsData: Tooltips;
	}) {
		this.root = root;
		this.controller = controller;
		this.tooltipsData = tooltipsData;

		this.createTooltips();

		this.setRootStyles();

		this.bindListeners();
	}

	private showOnMouseEnter = (event: unknown): void => {
		const triggerElement = (event as Event).currentTarget;
		const targetTooltip = this.tooltips.filter(tooltip => {
			const tooltipDataId = tooltip.getAttribute(this.tooltipDataAttribute);
			const triggerElementDataId = (triggerElement as HTMLSpanElement)?.getAttribute(
				this.tooltipDataAttribute
			);
			return tooltipDataId === triggerElementDataId;
		});
		const targetTooltipData = this.tooltipsData.filter(tooltipData => {
			return (
				tooltipData.tooltipDataId ===
				Number((triggerElement as HTMLSpanElement).getAttribute(this.tooltipDataAttribute))
			);
		});
		this.controller.handleShowOnMouseEnter(targetTooltip[0], targetTooltipData[0].direction);
	};

	private hideOnMouseLeave = (event: unknown): void => {
		const triggerElement = (event as Event).currentTarget;
		const targetTooltip = this.tooltips.filter(tooltip => {
			const tooltipDataId = tooltip.getAttribute(this.tooltipDataAttribute);
			const triggerElementDataId = (triggerElement as HTMLSpanElement)?.getAttribute(
				this.tooltipDataAttribute
			);
			return tooltipDataId === triggerElementDataId;
		});
		const targetTooltipData = this.tooltipsData.filter(tooltipData => {
			return (
				tooltipData.tooltipDataId ===
				Number((triggerElement as HTMLSpanElement).getAttribute(this.tooltipDataAttribute))
			);
		});
		this.controller.handleHideOnMouseLeave(targetTooltip[0], targetTooltipData[0].direction);
	};

	private bindListeners(): void {
		this.root.forEach(rootElement => {
			rootElement.addEventListener("mouseenter", this.showOnMouseEnter, true);
		});
		this.root.forEach(rootElement => {
			rootElement.addEventListener("mouseleave", this.hideOnMouseLeave, true);
		});
	}

	private setRootStyles(): void {
		for (const rootElement of this.root) {
			(rootElement as HTMLElement).style.cssText = `
				position: relative;
				width: auto;
				height: auto;
				display: inline-block;
			`;
		}
	}

	private createTooltips(): void {
		for (const tooltip of this.tooltipsData) {
			const newTooltip = this.createTooltip(tooltip.tooltipText, tooltip.tooltipDataId);
			this.tooltips.push(newTooltip);
		}
	}

	private createTooltip(text: string, dataAttributeValue: number): HTMLSpanElement {
		const tooltip = document.createElement("span");
		tooltip.classList.add("tooltip");
		tooltip.setAttribute(this.tooltipDataAttribute, `${dataAttributeValue}`);
		tooltip.innerText = text;
		return tooltip;
	}

	public mount(): void {
		this.root.forEach(rootElement => {
			const targetTooltipDataId = rootElement.getAttribute(this.tooltipDataAttribute);
			const targetTooltip = this.tooltips.filter(tooltip => {
				const tooltipDataId = tooltip.getAttribute(this.tooltipDataAttribute);
				return tooltipDataId === targetTooltipDataId;
			});
			if (!targetTooltip) return;
			rootElement.append(targetTooltip[0]);
		});
	}
}
