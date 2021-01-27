import { ITableChars } from "./../Interfaces/Table";
import { IOption } from "./../Interfaces/Menu";

export class CTable {
	/*
	 * ┌───────────┐
	 * │ Main menu │
	 * ├───┬───────┤
	 * │ 1 │ get   │
	 * │ 2 │ set   │
	 * │ 0 │ exit  │
	 * └───┴───────┘
	 */

	protected tableChars: ITableChars = {
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

	protected renderedString: string = "";

	protected name: string;
	protected options: IOption[];

	protected idColMaxWidth: number = 0;
	protected nameColMaxWidth: number = 0;

	protected width: number = 0;

	protected top: string[][] = [];
	protected middle: string[][] = [];
	protected bottom: string[][] = [];

	constructor(name: string, options: IOption[]) {
		this.name = name;
		this.options = options;

		this.calculate();
	}

	/*
	 * Calculate everything for the table
	 */
	private calculate(): void {
		this.options.map((option: IOption, id: number) => {
			let nameLength = option.name.length;
			let idLength = (id++).toString().length;

			if (this.idColMaxWidth < idLength) this.idColMaxWidth = idLength;
			if (this.nameColMaxWidth < nameLength) this.nameColMaxWidth = nameLength;
		});

		let titleLength =
			this.tableChars.left.length + this.tableChars.right.length + this.name.length;
		let rowLength =
			this.tableChars.left.length +
			this.tableChars.right.length +
			this.tableChars.middle.length +
			this.nameColMaxWidth +
			this.idColMaxWidth;

		if (titleLength >= rowLength) this.width = titleLength;
		else this.width = rowLength;
	}

	public render(): void {
		if (this.renderedString) console.log(this.renderedString);
		else {
			this.renderTop();
			this.renderMiddle();
			this.renderBottom();

			this.top.map((t, id) => {
				this.renderedString += t.join("") + "\n";
			});

			this.middle.map((m, id) => {
				this.renderedString += m.join("") + "\n";
			});

			this.bottom.map((b, id) => {
				this.renderedString += b.join("") + "\n";
			});

			console.log(this.renderedString);
		}
	}

	protected renderMiddle(): void {
		this.options.map((option: IOption, id: number) => {
			if (id + 1 === this.options.length) {
				this.middle[id] = [this.tableChars.left, (0).toString()];
				for (let i = 0; i < this.idColMaxWidth - (0).toString().length; i++) {
					this.middle[id].push(" ");
				}
			} else {
				this.middle[id] = [this.tableChars.left, (id + 1).toString()];
				for (let i = 0; i < this.idColMaxWidth - (id + 1).toString().length; i++) {
					this.middle[id].push(" ");
				}
			}

			this.middle[id].push(this.tableChars.middle, option.name);
			for (
				let i = 0;
				i <=
				this.width -
					(this.idColMaxWidth +
						option.name.length +
						this.tableChars.middle.length +
						this.tableChars.left.length +
						this.tableChars.right.length);
				i++
			) {
				this.middle[id].push(" ");
			}
			this.middle[id].push(this.tableChars.right);
		});
	}

	protected renderBottom(): void {
		this.bottom[0] = this.top[2];

		this.bottom[0] = this.bottom[0]
			.join("")
			.split(this.tableChars.leftMiddle)
			.join(this.tableChars.bottomLeft)
			.split("");

		this.bottom[0] = this.bottom[0]
			.join("")
			.split(this.tableChars.rightMiddle)
			.join(this.tableChars.bottomRight)
			.split("");

		this.bottom[0] = this.bottom[0]
			.join("")
			.split(this.tableChars.topMiddle)
			.join(this.tableChars.bottomMiddle)
			.split("");
	}

	protected renderTop(): void {
		this.top[0] = [this.tableChars.topLeft];
		this.top[1] = [this.tableChars.left, this.name];
		this.top[2] = [this.tableChars.leftMiddle];

		for (let i = 0; i <= this.width; i++) {
			if (
				i <=
				this.width - (this.tableChars.topLeft.length + this.tableChars.topRight.length)
			) {
				this.top[0].push(this.tableChars.middleMiddle);
			}

			if (
				i <=
				this.width -
					(this.tableChars.left.length + this.tableChars.right.length + this.name.length)
			) {
				this.top[1].push(" ");
			}

			if (i < this.tableChars.left.length + this.idColMaxWidth) {
				this.top[2].push(this.tableChars.middleMiddle);
			} else if (i === this.tableChars.left.length + this.idColMaxWidth) {
				this.top[2].push(this.tableChars.topMiddle);
			} else if (i < this.width - 1) {
				this.top[2].push(this.tableChars.middleMiddle);
			}
		}

		this.top[0].push(this.tableChars.topRight);
		this.top[1].push(this.tableChars.right);
		this.top[2].push(this.tableChars.rightMiddle);
	}
}
