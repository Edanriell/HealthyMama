import { gsap } from "gsap";

import { CssVariables, IHoverAnimationModel } from "./HoverAnimationTypes";

export class HoverAnimationModel implements IHoverAnimationModel {
	public cssVariables: CssVariables;

	constructor({ cssVariables }: { cssVariables: CssVariables }) {
		this.cssVariables = cssVariables;
	}

	public mouseEnterAnimation(event: unknown): void {
		for (const variable of this.cssVariables) {
			const { variableName, variableValue, animationProperties } = variable;
			gsap.to((event as Event).currentTarget, {
				[variableName as string]: variableValue.start,
				...animationProperties.start
			});
		}
	}

	public mouseLeaveAnimation(event: unknown): void {
		for (const variable of this.cssVariables) {
			const { variableName, variableValue, animationProperties } = variable;
			gsap.to((event as Event).currentTarget, {
				[variableName as string]: variableValue.end,
				...animationProperties.end
			});
		}
	}
}
