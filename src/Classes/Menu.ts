import readline from "readline";

import { Table } from "./Table";
import { IMenu, IMenuOptions } from "./../Interfaces/Menu";
import { Command } from "./Command";
import { Exit } from "../Commands/Exit";
import Colors from "./Colors";
import { Parser } from "./Parser";
import { Help } from "./../Commands/Help";
import { Application } from "../Menus/Npio";

export abstract class Menu implements IMenu {
	public title: string;
	public name: string;
	public description: string;

	protected rl: readline.Interface;
	protected table: Table | null;
	protected options: (Menu | Command | Exit)[];
	protected parent: Menu | Application;
	protected parser: Parser;

	constructor({ title, name, description, parent, readline, parser }: IMenuOptions) {
		this.title = title;
		this.name = name;
		this.description = description;
		this.parent = parent;
		this.parser = parser;

		this.rl = readline;
		this.table = null;

		this.options = [];

		this.addOption(new Exit(this));
		this.addOption(new Help(this, parser));
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

	public onExit(opts: number[]): void {
		if (this.parent) this.parent.onLoad(opts, "main");
		else process.exit();
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

import tty from "tty";

abstract class newMenu {
	protected rl: readline.Interface;

	constructor() {
		this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	}

	protected onKeyPress(): boolean {
		process.stdout.fd;
		return true;
	}

	protected onSelect(opt: number): boolean {
		return true;
	}

	public error(error: Error): boolean {
		return true;
	}

	public load(opts: number[]): boolean {
		return true;
	}

	abstract onLoad(): boolean;
}
