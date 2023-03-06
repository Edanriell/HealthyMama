import { Path } from "./FallingElementsTypes";

export class FallingElementsModel {
	private paths: Array<Path>;

	constructor({ paths }: { paths: Array<Path> }) {
		this.paths = paths;
	}

	public generateRandomPosition({
		minValue,
		maxValue
	}: {
		minValue: number;
		maxValue: number;
	}): string {
		const randomNumber: number = Math.random() * (maxValue - minValue) + minValue;
		return `${randomNumber}%`;
	}

	public chooseRandomSvgPath(): string {
		const randomNumber: number = Math.floor(Math.random() * this.paths.length);
		console.log(randomNumber);
		console.log(this.paths[randomNumber]);
		return `
			<svg class="svg-path-1" width="${this.paths[randomNumber].pathProps?.pathWidth}" height="100%" viewBox="0 0 ${this.paths[randomNumber].pathProps?.pathWidth} ${this.paths[randomNumber].pathProps?.pathHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="svg-path-1__path" d="${this.paths[randomNumber].path}" stroke="black"/>
			</svg>
		`;
	}
}
