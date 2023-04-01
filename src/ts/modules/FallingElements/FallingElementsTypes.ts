import { FallingElementsController } from "./FallingElementsController";
import { FallingElementsModel } from "./FallingElementsModel";

export type Elements = {
	elementsSize: ElementsSize;
	elements: Array<Element>;
};

export type Element = {
	timeToFall?: number;
	delay?: number;
	repeatDelay?: number;
	easeType?: string;
	showPath?: boolean;
	topCoordinate?: number;
	pathAnimationStart?: number;
	pathAnimationEnd?: number;
	leftCoordinates?: Array<number>;
	repeat?: "infinity" | number;
	element: HTMLElement;
	id: string;
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
		id
	}: {
		elementsSize: ElementsSize;
		id: string;
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
		id
	}: {
		elementsSize: ElementsSize;
		id: string;
	}): string;
}
