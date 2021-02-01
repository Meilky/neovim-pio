import { Menu } from "../Classes/Menu";
import readline from "readline";

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
