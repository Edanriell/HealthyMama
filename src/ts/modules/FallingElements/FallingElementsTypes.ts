export type Elements = Array<HTMLElement> | Array<Array<HTMLElement>>;

export type Path = {
	pathSize: string;
	pathProps?: PathProps;
	path: string;
};

export type PathProps = {
	easeType?: string;
	timeToFall?: number;
	pathWidth?: number;
	pathHeight?: number;
};

export type ElementSize = "desktop" | "tablet" | "mobile";
