export type Elements = {
	elementsSize: ElementSize;
	elements: Array<{
		timeToFall?: number;
		delay?: number,
		repeatDelay?: number,
		easeType?: string;
		showPath?: boolean;
		repeat?: "infinity" | number;
		element: HTMLElement;
	}>;
};

export type Path = {
	pathSize: ElementSize;
	svgPaths: Array<{
		pathProps?: PathProps;
		path: string;
	}>;
};

export type PathProps = {
	pathWidth?: number;
	pathHeight?: number;
};

export type ElementSize = "desktop" | "tablet" | "mobile";
