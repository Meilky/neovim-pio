import readline from "readline";
import Colors from "./Classes/Colors";
import { Parser } from "./Classes/Parser";
import { RunMonitor } from "./Commands/RunMonitor";

import { Application } from "./Menus/Npio";
import { SetMenu } from "./Menus/SetMenu";

const path = process.argv[2];
const filename = process.argv[3];
const rawOpts = process.argv.splice(4, process.argv.length);

let opts: number[] = [];

rawOpts.map((nb) => {
	const parsedNb = Number.parseInt(nb);

	if (!Number.isNaN(parsedNb)) opts.push(parsedNb);
	else {
		console.log(
			Colors.red({ str: nb + " is not assignable to the type number", bright: true }),
		);
		process.exit();
	}
});

if (!path) {
	console.log(Colors.red({ str: "No path to project specified" }));
	process.exit();
}

if (!filename) {
	console.log(Colors.red({ str: "No platformio config ini file specified specified" }));
	process.exit();
}

const filenameArr = filename.split(".");
const extention = filenameArr[filenameArr.length - 1];

if (extention !== "ini") {
	console.log(Colors.red({ str: "No ini config file specified" }));
	process.exit();
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: ">>",
});

const parser = new Parser({ path: path + "/" + filename });

if (!parser.parse()) {
	console.log(Colors.red({ str: "Error while parsing " + path + "/" + filename, bright: true }));
	process.exit();
}

const App = new Application({ rl: rl, parser: parser });

App.addOption(new RunMonitor(App, parser));
App.addOption(new SetMenu(App, rl, parser));

App.onLoad(opts, "main");
