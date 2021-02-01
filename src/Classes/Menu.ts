import readline from "readline";
import { Table } from "./Table";
import { IMenu, IMenuOptions } from "./../Interfaces/Menu";
import { Command } from "./Command";
import Colors from "./Colors";

export class Menu implements IMenu {
	public title: string;
	public name: string;
	public description: string;

	protected rl: readline.Interface;
	protected table: Table | null;
	protected options: (Menu | Command)[];
	protected parent: Menu | null;

	constructor({ title, name, description, parent, readline }: IMenuOptions) {
		this.title = title;
		this.name = name;
		this.description = description;
		this.parent = parent;

		this.rl = readline;
		this.table = null;

		this.options = [];
		this.addOption(new exit(parent));

		this.addOption(new help(this));
	}

	public onLoad(opts: number[], table: "main" | "help"): void {
		if (opts[0]) {
			this.read(opts);
		} else {
			this.render(table);
			this.read(opts);
		}
	}

	public onError(error: Error): void {
		this.onLoad([], "help");
		console.log(Colors.red({ str: error.message, bright: true }));
	}

	public onExit(msg?: string): void {
		if (msg) console.log(msg);

		if (this.parent) this.parent.onLoad([], "main");
		else process.exit();
	}

	public addOption(option: Menu | Command): void {
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
		if (opts[0]) {
			let opt = opts[0];
			opts.shift();
			if (opt >= 0 && opt <= this.options.length) {
				this.options[opt].onLoad(opts, "main");
			} else {
				this.onError(new Error(opt.toString() + " in not a option"));
				this.read([]);
			}
		} else {
			this.rl.question("Your choice : ", (answer) => {
				let opt: number = Number.parseInt(answer);

				if (opt >= 0 && opt <= this.options.length) {
					this.options[opt].onLoad(opts, "main");
				} else {
					this.onError(new Error(opt.toString() + " in not a option"));
					this.read([]);
				}
			});
		}
	}
}

class help extends Command {
	constructor(parent: Menu) {
		super({ name: "help", description: "help command", parent: parent });
	}

	onLoad() {
		if (this.parent) {
			this.parent.onLoad([], "help");
		} else {
			console.log(Colors.yellow({ str: "No parent", bright: true }));
			process.exit();
		}
	}
}

class exit extends Command {
	constructor(parent: Menu | null) {
		super({ name: "exit", description: "quit this menu", parent: parent });
	}

	onLoad() {
		if (this.parent) {
			this.parent.onLoad([], "main");
		} else {
			console.log(Colors.yellow({ str: "No parent", bright: true }));
			process.exit();
		}
	}
}
