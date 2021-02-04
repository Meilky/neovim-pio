import { Application } from "../Menus/Npio";
import { ICommand, ICommandOptions } from "./../Interfaces/Command";
import { Menu } from "./Menu";
import { Parser } from "./Parser";

export abstract class Command implements ICommand {
	public description: string;
	public name: string;
	protected parent: Menu | Application;
	protected parser: Parser;

	constructor({ name, description, parent, parser }: ICommandOptions) {
		this.name = name;
		this.description = description;

		this.parent = parent;
		this.parser = parser;
	}

	public abstract onLoad(opts: number[]): void;
}
