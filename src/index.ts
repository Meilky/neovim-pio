import { CMenu } from "./Classes/Menu";
import child_process from "child_process";
import Colors from "./Classes/Colors";
import readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

class MainMenu extends Cmenu {}

const MainMenu = new CMenu("Main menu", rl, [
	{
		name: "Upload and monitor",
		handler: () => {
			child_process.execSync("pio run", { stdio: "inherit" });
			MainMenu.render();
			MainMenu.read();
		},
	},
	{
		name: "Set Menu",
		handler: () => {
			SetMenu.render();
			SetMenu.read();
		},
	},
	{
		name: "exit",
		handler: () => {
			process.exit();
		},
	},
]);

class SetMenu extends CMenu {
	constructor() {
		super({
			name: "Second Menu",
			readline: rl,
			options: [{ name: "print ok", handler: this.handleOk }],
		});
	}

	handleOk(): boolean {
		return true;
	}
}
const SetMenu = new CMenu("Set menu", rl, [
	{
		name: "ok",
		handler: () => {
			console.log("ok");
			SetMenu.render();
			SetMenu.read();
		},
	},
	{
		name: "exit",
		handler: () => {
			MainMenu.render();
			MainMenu.read();
		},
	},
]);

MainMenu.render();

MainMenu.read();
