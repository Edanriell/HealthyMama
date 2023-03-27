import { TooltipModel } from "./TooltipModel";

export class TooltipController {
  public model: TooltipModel;

  constructor(model: TooltipModel) {
    this.model = model;
  }

//   public handleShowOnMouseEnter(tooltip, direction): void {
//     this.model.showTooltip(tooltip, direction);
//   }

//   public handleHideOnMouseLeave(tooltip, direction): void {
//     this.model.hideTooltip(tooltip, direction);
//   }
}
