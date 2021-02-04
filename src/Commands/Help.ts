import { Command } from "../Classes/Command";
import { Menu } from "../Classes/Menu";
import { Parser } from "../Classes/Parser";
import { Application } from "../Menus/Npio";

export class Help extends Command {
	constructor(parent: Menu | Application, parser: Parser) {
		super({
			name: "help",
			description: "help command",
			parent: parent,
			parser: parser,
		});
	}

	onLoad(opts: number[]) {
		this.parent.onLoad(opts, "help");
	}
}
