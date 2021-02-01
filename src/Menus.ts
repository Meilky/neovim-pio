import { Menu } from "./Classes/Menu";
import { Command } from "./Classes/Command";
import { Parser } from "./Classes/Parser";

import Colors from "./Classes/Colors";
import readline from "readline";

export class Npio {
	parser: Parser;
	rl: readline.Interface;
	MainMenu: Menu;
	path: string;

	constructor({ path, MainMenu, rl }: { path: string; MainMenu: Menu; rl: readline.Interface }) {
		this.rl = rl;

		this.parser = new Parser({ path: path });
		this.MainMenu = MainMenu;
		this.path = path;
	}

	public run() {
		if (this.parser.parse()) {
			this.MainMenu.onLoad([], "main");
		} else {
			console.log(Colors.red({ str: "No " + this.path + " file", bright: true }));
			process.exit();
		}
	}
}

export class RunMonitor extends Command {
	constructor(parent: Menu) {
		super({
			name: "Upload and monitor",
			description: "Will upload to the device and monitor the output",
			parent: parent,
		});
	}

	public onLoad(): void {
		console.log("monitor");
		this.parent?.onLoad([], "main");
	}
}

export class SetMenu extends Menu {
	constructor(parent: Menu, rl: readline.Interface) {
		super({
			title: "Set menu",
			name: "Set menu",
			description: "THe set menu",
			parent: parent,
			readline: rl,
		});
	}
}

export class MainMenu extends Menu {
	constructor(rl: readline.Interface) {
		super({
			title: "Main menu",
			description: "The main menu",
			name: "Main menu",
			parent: null,
			readline: rl,
		});

		this.addOption(new RunMonitor(this));
		this.addOption(new SetMenu(this, rl));
	}
}
