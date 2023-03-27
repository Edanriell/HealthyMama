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
