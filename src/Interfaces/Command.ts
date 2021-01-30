import { Menu } from "../Classes/Menu";

export interface ICommand {
	name: string;
	description: string;
	run(): void;
}

export interface ICommandOptions {
	name: string;
	description: string;
	parent: Menu | null;
}
