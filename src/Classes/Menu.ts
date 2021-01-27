import readline from "readline";
import { CTable } from "./Table";
import { IOption } from "./../Interfaces/Menu";

export class CMenu extends CTable {
	protected rl: readline.Interface;

	constructor(name: string, options: IOption[]) {
		super(name, options);
		this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	}

	public read(): void {}

	protected executer(): number {
		return 1;
	}
}
