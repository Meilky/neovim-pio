import fs from "fs";
import ini from "ini";
import Colors from "./Colors";

interface IParserOptions {
	path: string;
}

interface IConfig {
	[key: string]: any;
}

interface IParser {
	setOption(key: string, value: any): void;
	saveConfig(): boolean;
	getConfig(): IConfig;
}

export class Parser implements IParser {
	protected config: IConfig;
	protected path: string;

	constructor({ path }: IParserOptions) {
		this.config = {};
		this.path = path;
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

		return parsed;
	}

	public setOption(key: string, value: any) {
		this.config[key] = ini.safe(value);
	}

	public saveConfig(): boolean {
		let saved: boolean;
		try {
			fs.writeFileSync("path", ini.encode(this.config));
			saved = true;
		} catch (err) {
			console.error(err);
			saved = false;
		}

		return saved;
	}

	public getConfig(): IConfig {
		return this.config;
	}
}
