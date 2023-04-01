import { TooltipModel } from "./TooltipModel";
import { TooltipController } from "./TooltipController";

export type Tooltips = Array<Tooltip>;

export type Tooltip = {
	tooltipDataId: number;
	tooltipText: string;
	direction: TooltipDirection;
	isSelectable: boolean;
};

export enum TooltipDirection {
	Top = "Top",
	Left = "Left",
	Bottom = "Bottom",
	Right = "Right"
}

export interface ITooltipController {
	model: TooltipModel;

	handleShowOnMouseEnter(tooltip: HTMLSpanElement, direction: TooltipDirection): void;
	handleHideOnMouseLeave(tooltip: HTMLSpanElement, direction: TooltipDirection): void;
}

export interface ITooltipModel {
	showTooltip(tooltip: HTMLSpanElement, direction: TooltipDirection): void;
	hideTooltip(tooltip: HTMLSpanElement, direction: TooltipDirection): void;
}

export interface ITooltipView {
	controller: TooltipController;
	root: NodeListOf<Element>;

	mount(): void;
}
