import { CMenu } from "./Classes/Menu";
import child_process from "child_process";

const MainMenu = new CMenu("Main menu", [
	{
		name: "Upload and monitor",
		handler: () => {
			child_process.execSync("pio run", { stdio: "inherit" });
			MainMenu.render();
		},
	},
	{
		name: "exit",
		handler: () => {
			process.exit();
		},
	},
]);

MainMenu.render();

MainMenu.read();
