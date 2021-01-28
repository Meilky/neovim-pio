import readline from "readline";
import { Table } from "./Table";
import { IMenu, IOption, IRowOption } from "./../Interfaces/Menu";

export class Menu implements IMenu {
	protected rl: readline.Interface;
	protected table: Table;
	protected options: IRowOption[];

	constructor({ name, readline, options }: IOption) {
		this.table = new Table({ title: name, options: options });
		this.rl = readline;
		this.options = options;
	}

	public render(table: "main" | "help"): void {
		console.log(this.table.getTable(table));
	}

	public read(): void {
		this.rl.question("Your choice : ", (answer) => {
			let num: number = Number.parseInt(answer);

			if (num === 0) this.options[this.options.length - 1].handler();
			else if (num > 0 && num <= this.options.length) this.options[num - 1].handler();
			else {
				this.render("main");
				console.log(answer, "is not a option");
				this.read();
			}
		});
	}
}
