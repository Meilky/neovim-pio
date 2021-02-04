import fs from "fs";
import ini from "ini";

interface IParserOptions {
	path: string;
}

interface IConfig {
	[key: string]: any;
}

interface IParser {
	setOption(key: string, propriety: string, value: any): void;
	saveConfig(): boolean;
	getConfig(): IConfig;
}

export class Parser implements IParser {
	protected currentEnv: string;
	protected config: IConfig;
	protected path: string;

	constructor({ path }: IParserOptions) {
		this.config = {};
		this.path = path;
		this.currentEnv = "null";
	}

	public parse(): boolean {
		let parsed: boolean;

		try {
			const fileData = fs.readFileSync(this.path, "utf-8");
			this.config = ini.parse(fileData);
			parsed = true;
		} catch (error) {
			if (error.code !== "ENOENT") console.error(error);
			parsed = false;
		}

		if (parsed && !Object.keys(this.config).includes("npio")) {
			this.setOption("npio", "currentEnv", "null");
		}

		return parsed;
	}

	public setOption(key: string, propriety: string, value: any): boolean {
		if (!Object.keys(this.config).includes(key)) {
			this.config[key] = {};
		}
		this.config[key][propriety] = ini.safe(value);
		return this.saveConfig();
	}

	public saveConfig(): boolean {
		let saved: boolean;

		try {
			fs.writeFileSync(this.path, ini.encode(this.config));
			let bool = this.parse();
			saved = true;
			if (!bool) saved = false;
		} catch (err) {
			saved = false;
		}

		return saved;
	}

	public getConfig(): IConfig {
		return this.config;
	}
}
