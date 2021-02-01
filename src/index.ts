import child_process from "child_process";
import readline from "readline";

import { Menu } from "./Classes/Menu";
import { Command } from "./Classes/Command";
import { Parser } from "./Classes/Parser";
import Colors from "./Classes/Colors";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: ">>",
});

class Npio {
	parser: Parser;
	rl: readline.Interface;
	MainMenu: Menu;

	constructor({ pathToConfig, MainMenu }: { pathToConfig: string; MainMenu: Menu }) {
		this.rl = rl;

		this.parser = new Parser({ path: pathToConfig });
		this.MainMenu = MainMenu;
	}

	public run() {
		if (this.parser.parse()) {
			this.MainMenu.onLoad([], "main");
			console.log(this.parser.getConfig());
		} else {
			console.log(Colors.red({ str: "No platforio.ini file", bright: true }));
			process.exit();
		}
	}
}

class RunMonitor extends Command {
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

class SetMenu extends Menu {
	constructor(parent: Menu) {
		super({
			title: "Set menu",
			name: "Set menu",
			description: "THe set menu",
			parent: parent,
			readline: rl,
		});
		this.addOption(new RunMonitor(this));
	}
}

class MainMenu extends Menu {
	constructor() {
		super({
			title: "Main menu",
			description: "The main menu",
			name: "Main menu",
			parent: null,
			readline: rl,
		});

		this.addOption(new RunMonitor(this));
		this.addOption(new SetMenu(this));
	}
}

const App = new Npio({ pathToConfig: "./platforio.ini", MainMenu: new MainMenu() });

App.run();
