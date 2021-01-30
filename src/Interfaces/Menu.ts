import readline from "readline";
import { Command } from "./../Classes/Command";
import { Menu } from "./../Classes/Menu";

export interface IMenu {
	title: string;
	description: string;

	addOption(option: Menu | Command): void;
	createTables(): void;
	run(opts: number[], table: "main" | "help"): void;
}

export interface IMenuOptions {
	title: string;
	name: string;
	description: string;
	parent: Menu | null;
	readline: readline.Interface;
}
