import child_process from "child_process";
import readline from "readline";

import { MainMenu, Npio } from "./Menus";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: ">>",
});

let path = process.argv[2];

if (!path) {
	path = "";
}

const App = new Npio({ path: path, MainMenu: new MainMenu(rl), rl: rl });

App.run();
