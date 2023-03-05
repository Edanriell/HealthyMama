export class FallingElementsModel {
	private paths: Array<string>;

	constructor({ paths }: { paths: Array<string> }) {
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

	// chooseRandomSvgPath(): string
	// for const path of paths
	// return svg path

	public generateRandomSvgPath(): string {

		return `
			<svg class="svg-path-1" width="268" height="100%" viewBox="0 0 268 1075" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="svg-path-1__path" d="M163 1C163 1 211 167 163 263.5C115 360 -13.4395 376.797 2.00002 481.5C19.2242 598.306 239.33 516.145 264.5 631.5C292.875 761.546 12.4223 742.039 25.5 874.5C37.1514 992.515 254 1074.5 254 1074.5" stroke="black"/>
			</svg>
		`;
	}
}
