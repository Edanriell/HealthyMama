import { Path, ElementSize, PathProps } from "./FallingElementsTypes";

export class FallingElementsModel {
	private paths: Array<Path>;
	private desktopPaths: Array<{
		pathId: string;
		pathProps?: PathProps;
		path: string;
	}>;
	private tabletPaths: Array<{
		pathId: string;
		pathProps?: PathProps;
		path: string;
	}>;
	private mobilePaths: Array<{
		pathId: string;
		pathProps?: PathProps;
		path: string;
	}>;

	constructor({ paths }: { paths: Array<Path> }) {
		this.paths = paths;
		this.desktopPaths = this.paths.filter(path => path.pathSize === "desktop")[0].svgPaths;
		this.tabletPaths = this.paths.filter(path => path.pathSize === "tablet")[0].svgPaths;
		this.mobilePaths = this.paths.filter(path => path.pathSize === "mobile")[0].svgPaths;
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
		let svgPaths: Array<{
			pathId: string;
			pathProps?: PathProps;
			path: string;
		}> = [];
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

		const randomNumber: number = Math.floor(Math.random() * svgPaths.length);
		const currentPath = svgPaths[randomNumber]; // type missin

		const newPath: string = `
			<svg class="svg-path-${elementsSize}-${index}" width="${currentPath.pathProps?.pathWidth}" height="100%" viewBox="0 0 ${currentPath.pathProps?.pathWidth} ${currentPath.pathProps?.pathHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="svg-path-${elementsSize}-${index}__path" d="${currentPath.path}" stroke="black"/>
			</svg>
		`;

		if (svgSize === "desktop") {
			this.desktopPaths = svgPaths.filter(path => path.pathId !== currentPath.pathId);
		} else if (svgSize === "tablet") {
			this.tabletPaths = svgPaths.filter(path => path.pathId !== currentPath.pathId);
		} else if (svgSize === "mobile") {
			this.mobilePaths = svgPaths.filter(path => path.pathId !== currentPath.pathId);
		}

		console.log(svgPaths);

		return newPath;

		// check script logic and fix paths !

	}
}
