import readline from "readline";
import { Parser } from "../Classes/Parser";
import { Exit } from "../Commands/Exit";
import { Application } from "../Menus/Npio";
import { Command } from "./../Classes/Command";
import { Menu } from "./../Classes/Menu";

export interface IMenu {
	title: string;
	description: string;

	addOption(option: Menu | Command | Exit): void;
	onLoad(opts: number[], table: "main" | "help"): void;
	onExit(opts: number[]): void;
	onError(error: Error): void;
}

export interface IMenuOptions {
	title: string;
	name: string;
	description: string;
	parent: Menu | Application;
	readline: readline.Interface;
	parser: Parser;
}
