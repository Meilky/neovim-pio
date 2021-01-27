import readline from "readline";
import { CTable } from "./Table";
import { IOption } from "./../Interfaces/Menu";

export class CMenu extends CTable {
	protected rl: readline.Interface;

	constructor(name: string, options: IOption[]) {
		super(name, options);
		this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	}

	public read(): void {
		this.rl.question("Your choice : ", (answer) => {
			let num: number = Number.parseInt(answer);

			if (num === 0) this.options[this.options.length - 1].handler();
			else if (num > 0 && num <= this.options.length) this.options[num - 1].handler();
			else {
				this.render();
				console.log(answer, "is not a option");
				this.read();
			}
		});
	}
}
