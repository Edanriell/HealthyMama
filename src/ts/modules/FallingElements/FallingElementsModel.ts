import { Paths, Path, ElementsSize, IFallingElementsModel } from "./FallingElementsTypes";

export class FallingElementsModel implements IFallingElementsModel {
	private desktopPaths: Array<Path>;
	private tabletPaths: Array<Path>;
	private mobilePaths: Array<Path>;
	private chooseUniquePathsOnly?: boolean;

	constructor({
		paths,
		uniquePathsOnly = false
	}: {
		paths: Array<Paths>;
		uniquePathsOnly?: boolean;
	}) {
		this.desktopPaths = paths.filter(path => path.pathSize === "desktop")[0].svgPaths || [];
		this.tabletPaths = paths.filter(path => path.pathSize === "tablet")[0].svgPaths || [];
		this.mobilePaths = paths.filter(path => path.pathSize === "mobile")[0].svgPaths || [];
		this.chooseUniquePathsOnly = uniquePathsOnly;
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
		elementsSize: ElementsSize;
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

		const randomNumber: number = Math.floor(Math.random() * svgPaths.length);
		const currentPath: Path = svgPaths[randomNumber];

		const newPath: string = `
			<svg class="svg-path-${elementsSize}-${index}" width="${currentPath.pathProps?.pathWidth}" height="100%" viewBox="0 0 ${currentPath.pathProps?.pathWidth} ${currentPath.pathProps?.pathHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="svg-path-${elementsSize}-${index}__path" d="${currentPath.path}" stroke="black"/>
			</svg>
		`;

		if (this.chooseUniquePathsOnly) {
			if (svgSize === "desktop") {
				this.desktopPaths = svgPaths.filter(path => path.pathId !== currentPath.pathId);
			} else if (svgSize === "tablet") {
				this.tabletPaths = svgPaths.filter(path => path.pathId !== currentPath.pathId);
			} else if (svgSize === "mobile") {
				this.mobilePaths = svgPaths.filter(path => path.pathId !== currentPath.pathId);
			}
		}

		return newPath;
	}
}
