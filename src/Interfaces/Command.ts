import { Menu } from "../Classes/Menu";

export interface ICommand {
	name: string;
	description: string;
	onLoad(opts: number[]): void;
}

export interface ICommandOptions {
	name: string;
	description: string;
	parent: Menu | null;
}
