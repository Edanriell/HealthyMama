export type Elements = {
	elementsSize: ElementSize;
	elements: Array<{
		timeToFall: number;
		easeType: string;
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
