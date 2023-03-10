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

	public createRandomSvgPath({
		elementsSize,
		index
	}: {
		elementsSize: ElementSize;
		index: number;
	}): string {
		let svgPaths: Array<Path> = [];
		let svgSize: string = "";

		console.log(this.desktopPaths[0].svgPaths);

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
		// console.log(randomNumber);
		// console.log(svgPaths[0].svgPaths[randomNumber]);
		const currentPath = svgPaths[0].svgPaths[randomNumber]; // type missin
		// console.log(currentPath);

		const newPath: string = `
			<svg class="svg-path-${elementsSize}-${index}" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="svg-path-${elementsSize}-${index}__path" d="${currentPath.path}" stroke="black"/>
			</svg>
		`;

		return newPath;
	}
}
