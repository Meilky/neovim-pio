import { Command } from "../Classes/Command";
import { Menu } from "../Classes/Menu";
import { Exit } from "../Commands/Exit";

export interface ITableChars {
	middleMiddle: string;
	rowMiddle: string;
	topRight: string;
	topLeft: string;
	leftMiddle: string;
	topMiddle: string;
	bottomRight: string;
	bottomLeft: string;
	bottomMiddle: string;
	rightMiddle: string;
	left: string;
	right: string;
	middle: string;
}

export interface ITable {
	chars: ITableChars;
	title: string;
	options: (Menu | Command | Exit)[];

	getTable(table: "main" | "help"): string;
}

export interface IOption {
	title: string;
	options: (Menu | Command | Exit)[];
}
