import child_process from "child_process";
import readline from "readline";

import { Menu } from "./Classes/Menu";
import { Command } from "./Classes/Command";
import { Parser } from "./Classes/Parser";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

class RunMonitor extends Command {
	constructor(parent: Menu) {
		super({
			name: "Upload and monitor",
			description: "Will upload to the device and monitor the output",
			parent: parent,
		});
	}

	public run(): void {
		console.log("monitor");
		this.parent?.run([], "main");
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

const FirstMenu = new MainMenu();

const parser = new Parser({ path: "./platforio.ini" });

let parsed = parser.parse();

if (parsed) {
	console.log(parser.getConfig());
	FirstMenu.run([], "main");
} else process.exit();
