import { Exit } from "../Commands/Exit";
import { Application } from "../Menus/Npio";
import { ITableChars, ITable, IOption } from "./../Interfaces/Table";
import Colors from "./Colors";
import { Command } from "./Command";
import { Menu } from "./Menu";

export class Table implements ITable {
	/*
	 * ┌───────────┐
	 * │ Main menu │
	 * ├───┬───────┤
	 * │ 1 │ get   │
	 * │ 2 │ set   │
	 * │ 0 │ exit  │
	 * └───┴───────┘
	 */

	chars: ITableChars = {
		middleMiddle: "─",
		rowMiddle: "┼",
		topRight: "┐",
		topLeft: "┌",
		leftMiddle: "├",
		topMiddle: "┬",
		bottomRight: "┘",
		bottomLeft: "└",
		bottomMiddle: "┴",
		rightMiddle: "┤",
		left: "| ",
		right: " |",
		middle: " │ ",
	};

	title: string;
	options: (Menu | Command | Exit)[];

	protected idColMaxWidth: number;
	protected nameColMaxWidth: number;
	protected descColMaxWidth: number;

	protected widthMain: number;
	protected widthHelp: number;

	protected renderedMainTable: string;
	protected renderedHelpTable: string;

	constructor({ title, options }: IOption) {
		this.title = title;

		this.options = options;

		this.idColMaxWidth = 0;
		this.nameColMaxWidth = 0;
		this.descColMaxWidth = 0;

		this.renderedMainTable = "";
		this.renderedHelpTable = "";

		this.widthMain = 0;
		this.widthHelp = 0;

		this.calculate();
		this.renderMainTable();
		this.renderHelpTable();
	}

	private calculate(): void {
		this.options.map((option: Menu | Command | Exit, id: number) => {
			let nameLength = option.name.length;
			let idLength = id.toString().length;
			let descLength = option.description.length;

			if (this.idColMaxWidth < idLength) this.idColMaxWidth = idLength;
			if (this.nameColMaxWidth < nameLength) this.nameColMaxWidth = nameLength;
			if (this.descColMaxWidth < descLength) this.descColMaxWidth = descLength;
		});

		let titleLength = this.chars.left.length + this.chars.right.length + this.title.length;

		let rowMainLength =
			this.chars.left.length +
			this.idColMaxWidth +
			this.chars.middle.length +
			this.nameColMaxWidth +
			this.chars.right.length;

		let rowHelpLength =
			this.chars.left.length +
			this.idColMaxWidth +
			this.chars.middle.length +
			this.descColMaxWidth +
			this.chars.right.length;

		if (titleLength >= rowMainLength) {
			this.widthMain = titleLength;
			this.nameColMaxWidth += titleLength - rowMainLength;
		} else this.widthMain = rowMainLength;

		if (titleLength >= rowHelpLength) {
			this.widthHelp = titleLength;
			this.nameColMaxWidth += titleLength - rowHelpLength;
		} else this.widthHelp = rowHelpLength;
	}

	protected renderMainTable(): void {
		let rows: string[] = [];
		let lastRow: number = 0;

		rows[0] = this.chars.topLeft;
		rows[0] += this.chars.middleMiddle.repeat(
			this.widthMain - (this.chars.topLeft.length + this.chars.topRight.length),
		);
		rows[0] += this.chars.topRight;
		rows[0] = Colors.red({ str: rows[0], bright: true });

		rows[1] = Colors.red({ str: this.chars.left, bright: true });
		rows[1] += Colors.green({ str: this.title, bright: true });
		rows[1] += " ".repeat(
			this.widthMain - (this.chars.left.length + this.title.length + this.chars.right.length),
		);
		rows[1] += Colors.red({ str: this.chars.right, bright: true });

		rows[2] = this.chars.leftMiddle;
		rows[2] += this.chars.middleMiddle.repeat(
			this.chars.leftMiddle.length + this.idColMaxWidth + 1,
		);
		rows[2] += this.chars.topMiddle;
		rows[2] += this.chars.middleMiddle.repeat(
			1 + this.nameColMaxWidth + this.chars.rightMiddle.length,
		);
		rows[2] += this.chars.rightMiddle;
		rows[2] = Colors.red({ str: rows[2], bright: true });

		this.options.map((option: Menu | Command | Exit, id: number) => {
			rows[id + 3] = Colors.red({ str: this.chars.left, bright: true });
			rows[id + 3] += Colors.cyan({ str: id.toString(), bright: true });
			rows[id + 3] += " ".repeat(this.idColMaxWidth - id.toString().length);
			rows[id + 3] += Colors.red({ str: this.chars.middle, bright: true });
			rows[id + 3] += Colors.magenta({ str: option.name, bright: true });
			rows[id + 3] += " ".repeat(this.nameColMaxWidth - option.name.length);
			rows[id + 3] += Colors.red({ str: this.chars.right, bright: true });

			lastRow = id + 4;
		});

		rows[lastRow] = rows[2].replace(this.chars.topMiddle, this.chars.bottomMiddle);
		rows[lastRow] = rows[lastRow].replace(this.chars.leftMiddle, this.chars.bottomLeft);
		rows[lastRow] = rows[lastRow].replace(this.chars.rightMiddle, this.chars.bottomRight);
		rows[lastRow] = Colors.red({ str: rows[lastRow], bright: true });

		this.renderedMainTable = rows.join("\n");
	}

	protected renderHelpTable(): void {
		let rows: string[] = [];
		let lastRow: number = 0;

		rows[0] = this.chars.topLeft;
		rows[0] += this.chars.middleMiddle.repeat(
			this.widthHelp - (this.chars.topLeft.length + this.chars.topRight.length),
		);
		rows[0] += this.chars.topRight;
		rows[0] = Colors.red({ str: rows[0], bright: true });

		rows[1] = Colors.red({ str: this.chars.left, bright: true });
		rows[1] += Colors.green({ str: this.title, bright: true });
		rows[1] += " ".repeat(
			this.widthHelp - (this.chars.left.length + this.title.length + this.chars.right.length),
		);
		rows[1] += Colors.red({ str: this.chars.right, bright: true });

		rows[2] = this.chars.leftMiddle;
		rows[2] += this.chars.middleMiddle.repeat(
			this.chars.leftMiddle.length + this.idColMaxWidth + 1,
		);
		rows[2] += this.chars.topMiddle;
		rows[2] += this.chars.middleMiddle.repeat(
			1 + this.descColMaxWidth + this.chars.rightMiddle.length,
		);
		rows[2] += this.chars.rightMiddle;
		rows[2] = Colors.red({ str: rows[2], bright: true });

		this.options.map((option: Menu | Command | Exit, id: number) => {
			rows[id + 3] = Colors.red({ str: this.chars.left, bright: true });
			rows[id + 3] += Colors.cyan({ str: id.toString(), bright: true });
			rows[id + 3] += " ".repeat(this.idColMaxWidth - id.toString().length);
			rows[id + 3] += Colors.red({ str: this.chars.middle, bright: true });
			rows[id + 3] += Colors.magenta({ str: option.description, bright: true });
			rows[id + 3] += " ".repeat(this.descColMaxWidth - option.description.length);
			rows[id + 3] += Colors.red({ str: this.chars.right, bright: true });

			lastRow = id + 4;
		});

		rows[lastRow] = rows[2].replace(this.chars.topMiddle, this.chars.bottomMiddle);
		rows[lastRow] = rows[lastRow].replace(this.chars.leftMiddle, this.chars.bottomLeft);
		rows[lastRow] = rows[lastRow].replace(this.chars.rightMiddle, this.chars.bottomRight);
		rows[lastRow] = Colors.red({ str: rows[lastRow], bright: true });

		this.renderedHelpTable = rows.join("\n");
	}

	public getTable(table: "main" | "help"): string {
		if (table === "main") return this.renderedMainTable;
		else return this.renderedHelpTable;
	}
}
