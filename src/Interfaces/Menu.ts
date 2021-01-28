import readline from "readline";

export interface IRowOption {
	name: string;
	description: string;
	handler: Function;
}

export interface IOption {
	name: string;
	readline: readline.Interface;
	options: IRowOption[];
}

export interface IMenu {
	render(table: "main" | "help"): void;
	read(): void;
}
