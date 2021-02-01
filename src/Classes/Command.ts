import { ICommand, ICommandOptions } from "./../Interfaces/Command";
import { Menu } from "./Menu";

export class Command implements ICommand {
	public description: string;
	public name: string;
	protected parent: Menu | null;

	constructor({ name, description, parent }: ICommandOptions) {
		this.name = name;
		this.description = description;
		this.parent = parent;
	}

	public onLoad(): void {
		if (this.parent) {
			this.parent.onError(new Error("Nothing to do"));
		} else {
			process.exit();
		}
	}
}
