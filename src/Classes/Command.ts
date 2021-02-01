import { ICommand, ICommandOptions } from "./../Interfaces/Command";
import { Menu } from "./Menu";

export abstract class Command implements ICommand {
	public description: string;
	public name: string;
	protected parent: Menu | null;

	constructor({ name, description, parent }: ICommandOptions) {
		this.name = name;
		this.description = description;
		this.parent = parent;
	}

	public abstract onLoad(): void;
}
