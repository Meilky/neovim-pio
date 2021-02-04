import { Menu } from "../Classes/Menu";
import { Parser } from "../Classes/Parser";
import { Application } from "../Menus/Npio";

export interface ICommand {
	name: string;
	description: string;
	onLoad(opts: number[]): void;
}

export interface ICommandOptions {
	name: string;
	description: string;
	parent: Menu | Application;
	parser: Parser;
}
