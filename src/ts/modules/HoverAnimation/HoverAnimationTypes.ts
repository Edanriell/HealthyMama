import { gsap } from "gsap";

import { HoverAnimationController } from "./HoverAnimationController";
import { HoverAnimationModel } from "./HoverAnimationModel";

export type CssVariables = Array<CssVariable>;

export type CssVariable = {
	variableName: gsap.TweenTarget;
	variableValue: {
		start: number | string;
		end: number | string;
	};
	animationProperties: {
		start: gsap.TweenVars;
		end: gsap.TweenVars;
	};
};

export interface IHoverAnimationView {
	root: Element | NodeListOf<Element>;
	controller: HoverAnimationController;

	mount(): void;
}

export interface IHoverAnimationController {
	model: HoverAnimationModel;

	handleMouseEnterAnimation(event: unknown): void;
	handleMouseLeaveAnimation(event: unknown): void;
	handleFocusAnimation(event: unknown): void;
	handleBlurAnimation(event: unknown): void;
}

export interface IHoverAnimationModel {
	cssVariables: CssVariables;

	mouseEnterAnimation(event: unknown): void;
	mouseLeaveAnimation(event: unknown): void;
}
