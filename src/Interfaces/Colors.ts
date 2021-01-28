export interface IRGB {
	str: string;
	r: number;
	g: number;
	b: number;
	bgColor?: boolean;
}

export interface I4bitColors {
	str: string;
	bright?: boolean;
	bgColor?: boolean;
}

export interface I8bitColors {
	str: string;
	color: number;
	bgColor?: boolean;
}
