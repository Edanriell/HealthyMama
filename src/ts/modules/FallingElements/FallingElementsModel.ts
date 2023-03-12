import { Path, ElementSize } from "./FallingElementsTypes";

export class FallingElementsModel {
	private paths: Array<Path>;
	private desktopPaths: Array<Path>;
	private tabletPaths: Array<Path>;
	private mobilePaths: Array<Path>;

	constructor({ paths }: { paths: Array<Path> }) {
		this.paths = paths;
		this.desktopPaths = this.paths.filter(path => path.pathSize === "desktop");
		this.tabletPaths = this.paths.filter(path => path.pathSize === "tablet");
		this.mobilePaths = this.paths.filter(path => path.pathSize === "mobile");
	}

	public generateRandomNumberInRange({
		minimumValue,
		maximumValue
	}: {
		minimumValue: number;
		maximumValue: number;
	}): number {
		return Math.floor(Math.random() * (maximumValue - minimumValue) + minimumValue);
	}

	public createRandomSvgPath({
		elementsSize,
		index
	}: {
		elementsSize: ElementSize;
		index: number;
	}): string {
		let svgPaths: Array<Path> = [];
		let svgSize: string = "";

		if (elementsSize === "desktop") {
			svgPaths = this.desktopPaths;
			svgSize = "desktop";
		} else if (elementsSize === "tablet") {
			svgPaths = this.tabletPaths;
			svgSize = "tablet";
		} else if (elementsSize === "mobile") {
			svgPaths = this.mobilePaths;
			svgSize = "mobile";
		}

		const randomNumber: number = Math.floor(Math.random() * svgPaths[0].svgPaths.length);
		const currentPath = svgPaths[0].svgPaths[randomNumber]; // type missin

		const newPath: string = `
			<svg class="svg-path-${elementsSize}-${index}" width="${currentPath.pathProps?.pathWidth}" height="100%" viewBox="0 0 ${currentPath.pathProps?.pathWidth} ${currentPath.pathProps?.pathHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="svg-path-${elementsSize}-${index}__path" d="${currentPath.path}" stroke="black"/>
			</svg>
		`;

		return newPath;
	}
}
