import readline from "readline";
import Colors from "./Classes/Colors";

import { Npio } from "./Menus";

const path = process.argv[2];
const filename = process.argv[3];
console.log(path, filename);

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

const App = new Npio({ path: path + "/", filename: filename, rl: rl });

App.run([]);
