import { FallingElementsController } from "./FallingElementsController";
import { FallingElementsModel } from "./FallingElementsModel";

export type Elements = {
	elementsSize: ElementsSize;
	elements: Array<{
		timeToFall?: number;
		delay?: number;
		repeatDelay?: number;
		easeType?: string;
		showPath?: boolean;
		repeat?: "infinity" | number;
		element: HTMLElement;
	}>;
};

export type Paths = {
	pathSize: ElementsSize;
	svgPaths: Array<Path>;
};

export type Path = {
	pathId: string;
	pathProps?: PathProps;
	path: string;
};

export type PathProps = {
	pathWidth?: number;
	pathHeight?: number;
};

export type ElementsSize = "desktop" | "tablet" | "mobile";

export interface IFallingElementsView {
	root: HTMLElement;
	controller: FallingElementsController;

	mount(): void;
}

export interface IFallingElementsController {
	model: FallingElementsModel;

	handleGenerateRandomNumberInRange({
		minimumValue,
		maximumValue
	}: {
		minimumValue: number;
		maximumValue: number;
	}): number;
	handleSvgPathCreation({
		elementsSize,
		index
	}: {
		elementsSize: ElementsSize;
		index: number;
	}): string;
}

export interface IFallingElementsModel {
	generateRandomNumberInRange({
		minimumValue,
		maximumValue
	}: {
		minimumValue: number;
		maximumValue: number;
	}): number;
	createRandomSvgPath({
		elementsSize,
		index
	}: {
		elementsSize: ElementsSize;
		index: number;
	}): string;
}
