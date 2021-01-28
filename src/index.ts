import { Menu } from "./Classes/Menu";
import child_process from "child_process";
import readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const MainMenu = new Menu({
	name: "Main menu",
	readline: rl,
	options: [
		{
			name: "Upload and monitor",
			description: "Upload to arduino and monitor it",
			handler: () => {
				child_process.execSync("pio run", { stdio: "inherit" });
				MainMenu.render("main");
				MainMenu.read();
			},
		},
		{
			name: "Set Menu",
			description: "menu to set some value",
			handler: () => {
				SetMenu.render("main");
				SetMenu.read();
			},
		},
		{
			name: "exit",
			description: "exit the menu",
			handler: () => {
				process.exit();
			},
		},
	],
});

const SetMenu = new Menu({
	name: "Set menu",
	readline: rl,
	options: [
		{
			name: "ok",
			description: "print ok",
			handler: () => {
				console.log("ok");
				SetMenu.render("main");
				SetMenu.read();
			},
		},
		{
			name: "go back",
			description: "return to main menu",
			handler: () => {
				MainMenu.render("main");
				MainMenu.read();
			},
		},
	],
});

MainMenu.render("main");

MainMenu.read();
