import { Command } from "../Classes/Command";
import { Menu } from "../Classes/Menu";
import { Parser } from "../Classes/Parser";
import { Application } from "../Menus/Npio";

export class RunMonitor extends Command {
	constructor(parent: Menu | Application, parser: Parser) {
		super({
			name: "Upload and monitor",
			description: "Will upload to the device and monitor the output",
			parser: parser,
			parent: parent,
		});
	}

	public onLoad(opts: number[]): void {
		let conf = this.parser.getConfig();
		try {
		} catch (error) {}
		if (conf.npio && conf.npio.currentEnv !== "null") {
			console.log(conf[conf.npio.currentEnv].platform);
			this.parent.onLoad(opts, "main");
		} else {
			this.parent.onError(new Error("The current env can't be null"));
		}
	}
}
