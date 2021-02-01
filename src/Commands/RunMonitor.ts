import Colors from "../Classes/Colors";
import { Command } from "../Classes/Command";
import { Menu } from "../Classes/Menu";

export class RunMonitor extends Command {
	protected parent: Menu;

	constructor(parent: Menu) {
		super({
			name: "Upload and monitor",
			description: "Will upload to the device and monitor the output",
			parent: parent,
		});
		this.parent = parent;
	}

	public onLoad(): void {
		try {
		} catch (error) {}
		console.log("monitor");
		this.parent.onLoad([], "main");
	}
}
