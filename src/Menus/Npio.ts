import { Menu } from "../Classes/Menu";
import { Parser } from "../Classes/Parser";

import Colors from "../Classes/Colors";
import readline from "readline";

import { SetMenu } from "../Menus/SetMenu";
import { RunMonitor } from "../Commands/RunMonitor";
import { INpioOptions } from "../Interfaces/Npio";

export class Npio extends Menu {
	protected parser: Parser;
	protected rl: readline.Interface;
	protected path: string;
	protected filename: string;

	constructor({ path, filename, rl }: INpioOptions) {
		super({
			title: "Npio",
			description: "The main menu",
			name: "Npio",
			parent: null,
			readline: rl,
		});

		this.addOption(new RunMonitor(this));
		this.addOption(new SetMenu(this, rl));
		this.rl = rl;

		this.path = path + "/";
		this.filename = filename;

		this.parser = new Parser({ path: this.path + filename });
	}

	public run(opts: number[]) {
		if (this.parser.parse()) {
			this.onLoad(opts, "main");
		} else {
			console.log(
				Colors.red({
					str: "Error while parsing " + this.path + this.filename,
					bright: true,
				}),
			);
			process.exit();
		}
	}
}
