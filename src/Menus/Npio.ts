import readline from "readline";

import { Table } from "./../Classes/Table";
import { Command } from "./../Classes/Command";
import { Exit } from "../Commands/Exit";
import Colors from "./../Classes/Colors";
import { Parser } from "./../Classes/Parser";
import { Help } from "./../Commands/Help";
import { Menu } from "../Classes/Menu";

interface IApplicationOptions {
	rl: readline.Interface;
	parser: Parser;
}

export class Application {
	public title: string;
	public name: string;
	public description: string;

	protected rl: readline.Interface;
	protected table: Table | null;
	protected options: (Menu | Command | Exit)[];
	protected parser: Parser;

	constructor({ rl, parser }: IApplicationOptions) {
		this.title = "Npio";
		this.name = "Npio";
		this.description = "Main menu";
		this.parser = parser;

		this.rl = rl;
		this.table = null;

		this.options = [];

		this.addOption(new Exit(this));
		this.addOption(new Help(this, this.parser));
	}

	public onLoad(opts: number[], table: "main" | "help"): void {
		if ((opts[0] || opts[0] === 0) && !Number.isNaN(opts[0])) {
			this.read(opts);
		} else {
			this.render(table);
			this.read(opts);
		}
	}

	public onSuccess(opts: number[], msg?: string) {
		this.render("main");
		if (msg) console.log(Colors.green({ str: msg, bright: true }));
		this.read(opts);
	}

	public onError(error: Error): void {
		this.render("help");
		console.log(Colors.red({ str: error.message, bright: true }));
		this.read([]);
	}

	public onExit(): void {
		process.exit();
	}

	public addOption(option: Menu | Command | Exit): void {
		this.options.push(option);
	}

	protected render(table: "main" | "help"): void {
		if (this.table) {
			console.log(this.table.getTable(table));
		} else {
			this.table = new Table({ title: this.title, options: this.options });
			this.render(table);
		}
	}

	protected read(opts: number[]): void {
		if ((opts[0] || opts[0] === 0) && !Number.isNaN(opts[0])) {
			let opt = opts[0];
			opts.shift();
			if (opt >= 0 && opt <= this.options.length - 1) {
				this.options[opt].onLoad(opts, "main");
			} else {
				this.onError(new Error(opt.toString() + " in not a option"));
			}
		} else {
			this.rl.question("Your choice : ", (answer) => {
				let opt: number = Number.parseInt(answer);

				if (opt >= 0 && opt <= this.options.length - 1) {
					this.options[opt].onLoad(opts, "main");
				} else {
					this.onError(new Error(opt.toString() + " in not a option"));
					this.read([]);
				}
			});
		}
	}
}
