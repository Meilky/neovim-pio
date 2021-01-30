import readline from "readline";
import { Table } from "./Table";
import { IMenu, IMenuOptions } from "./../Interfaces/Menu";
import { Command } from "./Command";

export class Menu implements IMenu {
	public title: string;
	public name: string;
	public description: string;

	protected rl: readline.Interface;
	protected table: Table | null;
	protected options: (Menu | Command)[];

	constructor({ title, name, description, parent, readline }: IMenuOptions) {
		this.title = title;
		this.name = name;
		this.description = description;

		this.rl = readline;
		this.table = null;

		this.options = [];
		this.addOption(
			new Command({ name: "exit", description: "quit this menu", parent: parent }),
		);
		this.addOption(new help(this));
	}

	public addOption(option: Menu | Command): void {
		this.options.push(option);
	}

	public createTables(): void {
		this.table = new Table({ title: this.title, options: this.options });
	}

	protected read(opts: number[]): void {
		if (opts[0]) {
			let opt = opts[0];
			opts.shift();
			if (opt >= 0 && opt <= this.options.length) {
				this.options[opt].run(opts, "main");
			} else {
				this.render("main");
				console.log(opt, "is not a option");
				this.read([]);
			}
		} else {
			this.rl.question("Your choice : ", (answer) => {
				let num: number = Number.parseInt(answer);

				if (num >= 0 && num <= this.options.length) {
					this.options[num].run([], "main");
				} else {
					this.render("main");
					console.log(answer, "is not a option");
					this.read([]);
				}
			});
		}
	}

	protected render(table: "main" | "help"): void {
		if (this.table) {
			console.log(this.table.getTable(table));
		} else {
			this.createTables();
			this.render(table);
		}
	}

	public run(opts: number[], table: "main" | "help") {
		if (opts.length >= 1) {
			this.read(opts);
		} else {
			this.render(table);
			this.read([]);
		}
	}
}

class help extends Command {
	constructor(parent: Menu) {
		super({ name: "help", description: "help command", parent: parent });
	}

	run() {
		if (this.parent) {
			this.parent.run([], "help");
		} else {
			console.log("No parent");
			process.exit();
		}
	}
}
