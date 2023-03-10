import { Path, ElementSize } from "./FallingElementsTypes";

export class FallingElementsModel {
	private paths: Array<Path>;

	constructor({ paths }: { paths: Array<Path> }) {
		this.paths = paths;
	}

	public createRandomSvgPath({
		elementsSize,
		index
	}: {
		elementsSize: ElementSize;
		index: number;
	}): string {
		const svgPaths = this.paths.filter(path => path.pathSize === elementsSize); // filter out and re assign this.paths = paths
		for (const paths of svgPaths) {
			return `
				<svg class="svg-path-${elementsSize}-${index}" width="${paths.svgPaths[0].pathProps?.pathWidth}" height="100%" viewBox="0 0 ${paths.svgPaths[0].pathProps?.pathWidth} ${paths.svgPaths[0].pathProps?.pathHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path class="svg-path-${elementsSize}-${index}__path" d="${paths.svgPaths[0].path}" stroke="black"/>
				</svg>
			`;
		}
		return "";
	}
}
