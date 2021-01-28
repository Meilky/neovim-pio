import readline from "readline";

export interface IMenuOption {
	name: string;
	handler: Function;
}

export interface IOption {
	name: string;
	readline: readline.Interface;
	options: IMenuOption[];
}
