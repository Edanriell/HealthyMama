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
