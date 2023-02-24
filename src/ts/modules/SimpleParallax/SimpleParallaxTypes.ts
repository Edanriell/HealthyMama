import { SimpleParallaxController } from "./SimpleParallaxController";
import { SimpleParallaxModel } from "./SimpleParallaxModel";

export type Marker = {
	startColor: string;
	endColor: string;
	fontSize: string;
};

export type ScrollParallaxOptions = {
	targetElement: HTMLElement;
	yCoordinateValue: number;
	easeType?: string;
	animationStartPosition?: string;
	animationEndPosition?: string;
	markers?: Marker | undefined;
};

export interface ISimpleParallaxView {
	controller: SimpleParallaxController;
	root: HTMLElement;
	options: Array<ScrollParallaxOptions>;

	mount(): void;
}

export interface ISimpleParallaxController {
	model: SimpleParallaxModel;

	handleMovement({
		options,
		root
	}: {
		root: HTMLElement;
		options: Array<ScrollParallaxOptions>;
	}): void;
}

export interface ISimpleParallaxModel {
	scrollParallax({ element, root }: { element: ScrollParallaxOptions; root: HTMLElement }): void;
}
