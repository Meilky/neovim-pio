import { Menu } from "../Classes/Menu";
import { Application } from "../Menus/Npio";

export class Exit {
	public name: string;
	public description: string;
	protected parent: Menu | Application;

	constructor(parent: Menu | Application) {
		this.name = "exit";
		this.description = "quit this menu";
		this.parent = parent;
	}

	onLoad(opts: number[]) {
		if (this.parent) this.parent.onExit(opts);
		else process.exit();
	}
}
