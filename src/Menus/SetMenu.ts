import { Menu } from "../Classes/Menu";
import readline from "readline";
import { Application } from "./Npio";
import { Command } from "../Classes/Command";
import Colors from "../Classes/Colors";
import { Parser } from "../Classes/Parser";

export class SetMenu extends Menu {
	constructor(parent: Menu | Application, rl: readline.Interface, parser: Parser) {
		super({
			title: "Set menu",
			name: "Set menu",
			description: "The set menu",
			parent: parent,
			readline: rl,
			parser: parser,
		});

		this.addOption(new GetOptions(this, parser));
		this.addOption(new SetCurrentEnv(this, rl, parser));
		this.addOption(new GetPossibleEnv(this, parser));
	}

	public onSuccess(opts: number[], msg: string) {
		this.render("main");
		console.log(Colors.green({ str: msg, bright: true }));
		this.read(opts);
	}
}

class GetPossibleEnv extends Command {
	constructor(parent: SetMenu, parser: Parser) {
		super({
			name: "get possible env",
			description: "print all possible env of your config file",
			parent: parent,
			parser: parser,
		});

		this.parent = parent;
	}

	public onLoad(opts: number[]) {
		let config = this.parser.getConfig();
		let possibleEnv = Object.keys(config);

		possibleEnv.map((env) => {
			if (env !== "npio") {
				console.log(Colors.magenta({ str: env, bright: true }));
			}
		});

		this.parent.onLoad(opts, "main");
	}
}

class SetCurrentEnv extends Command {
	protected rl: readline.Interface;

	constructor(parent: SetMenu, rl: readline.Interface, parser: Parser) {
		super({
			name: "set current env",
			description: "set the env to use",
			parent: parent,
			parser: parser,
		});

		this.rl = rl;
	}

	public onLoad(opts: number[]) {
		let config = this.parser.getConfig();
		let possibleEnv = Object.keys(config);

		this.rl.question("Env name : ", (answer) => {
			if (answer === "npio") {
				this.parent.onError(new Error(answer + " cannot be set as your env"));
			} else if (possibleEnv.includes(answer)) {
				if (!this.parser.setOption("npio", "currentEnv", answer)) {
					this.parent.onError(new Error("Error while seting the current env"));
				} else {
					this.parent.onSuccess(opts, "Successfully set the current env to " + answer);
				}
			} else {
				this.parent.onError(new Error(answer + " is not a env in your config"));
			}
		});
	}
}

class GetOptions extends Command {
	constructor(parent: Menu | Application, parser: Parser) {
		super({
			name: "print options",
			description: "print current option for current env",
			parent: parent,
			parser: parser,
		});
	}

	onLoad(opts: number[]) {
		let config = this.parser.getConfig();
		let currentEnv = config.npio.currentEnv;
		let possibleEnv = Object.keys(config);

		if (possibleEnv.includes(currentEnv)) {
			Object.keys(config[currentEnv]).map((key, id) => {
				console.log(key + " = " + config[currentEnv][key]);
			});
			this.parent.onLoad(opts, "main");
		} else {
			this.parent.onError(new Error(currentEnv + " is not a env in your project config"));
		}
	}
}
