import { Menu } from "../Classes/Menu";
import readline from "readline";
import { Application } from "./Npio";
import { Command } from "../Classes/Command";
import Colors from "../Classes/Colors";
import { Parser } from "../Classes/Parser";

export class Setings extends Menu {
	constructor(parent: Menu | Application, rl: readline.Interface, parser: Parser) {
		super({
			title: "Set menu",
			name: "Set menu",
			description: "The set menu",
			parent: parent,
			readline: rl,
			parser: parser,
		});

		this.addOption(new PrintEnvs(this, parser));
		this.addOption(new SetCurrentEnv(this, rl, parser));
		this.addOption(new PrintOptions(this, parser));
		this.addOption(new SetOption(this, parser, rl));
		this.addOption(new DeleteOption(this, parser, rl));
	}

	public onSuccess(opts: number[], msg: string) {
		this.render("main");
		console.log(Colors.green({ str: msg, bright: true }));
		this.read(opts);
	}
}

class PrintEnvs extends Command {
	constructor(parent: Setings, parser: Parser) {
		super({
			name: "print envs",
			description: "print all possible env of your config file",
			parent: parent,
			parser: parser,
		});

		this.parent = parent;
	}

	public onLoad(opts: number[]) {
		let config = this.parser.getConfig();
		let possibleEnv = Object.keys(config);

		let str = "";
		possibleEnv.map((env) => {
			if (env !== "npio") {
				str += Colors.magenta({ str: env, bright: true }) + "\n";
			}
		});

		if (str.length > 0) this.parent.onSuccess(opts, str);
		else this.parent.onError(new Error("There is no env"));
	}
}

class SetCurrentEnv extends Command {
	protected rl: readline.Interface;

	constructor(parent: Setings, rl: readline.Interface, parser: Parser) {
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

class PrintOptions extends Command {
	constructor(parent: Setings, parser: Parser) {
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
			let str = "";
			Object.keys(config[currentEnv]).map((key, id) => {
				str +=
					Colors.cyan({ str: key, bright: true }) +
					" = " +
					Colors.yellow({ str: config[currentEnv][key], bright: true }) +
					"\n";
			});
			this.parent.onSuccess(opts, str);
		} else {
			this.parent.onError(new Error(currentEnv + " is not a env in your project config"));
		}
	}
}

class SetOption extends Command {
	protected rl: readline.Interface;

	constructor(parent: Setings, parser: Parser, rl: readline.Interface) {
		super({
			name: "set option",
			description: "set the value of a given option",
			parent: parent,
			parser: parser,
		});
		this.rl = rl;
	}

	onLoad(opts: number[]) {
		let config = this.parser.getConfig();
		let currentEnv = config.npio.currentEnv;

		this.rl.question("option name : ", (answer) => {
			this.rl.question(answer + " value : ", (value) => {
				let bool = this.parser.setOption(currentEnv, answer, value);
				if (bool) {
					this.parent.onSuccess(
						opts,
						answer + " as been set to " + value + " in this env " + currentEnv,
					);
				} else {
					this.parent.onError(
						new Error(
							"Failed to set " +
								answer +
								" to " +
								value +
								" in this env " +
								currentEnv,
						),
					);
				}
			});
		});
	}
}

class DeleteOption extends Command {
	protected rl: readline.Interface;

	constructor(parent: Setings, parser: Parser, rl: readline.Interface) {
		super({
			name: "delete option",
			description: "delete the given option",
			parent: parent,
			parser: parser,
		});
		this.rl = rl;
	}

	public onLoad(opts: number[]) {
		let config = this.parser.getConfig();
		let currentEnv = config.npio.currentEnv;

		this.rl.question("Option name : ", (answer) => {
			let bool = this.parser.deleteOption(currentEnv, answer);
			if (bool) {
				this.parent.onSuccess(opts, answer + " as been delete");
			} else {
				this.parent.onError(
					new Error("Failed to delete option" + answer + " in this env " + currentEnv),
				);
			}
		});
	}
}
