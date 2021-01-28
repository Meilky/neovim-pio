import { I4bitColors, I8bitColors, IRGB } from "./../Interfaces/Colors";

class Colors {
	protected get4BitColor(
		color: number,
		{ str, bright = false, bgColor = false }: I4bitColors,
	): string {
		const prefix: string = "\x1b[";
		const end: string = "\x1b[0m";

		if (bgColor) color += 10;
		if (bright) color += 60;

		return prefix + color + "m" + str + end;
	}

	black(options: I4bitColors): string {
		return this.get4BitColor(30, options);
	}

	red(options: I4bitColors): string {
		return this.get4BitColor(31, options);
	}

	green(options: I4bitColors): string {
		return this.get4BitColor(32, options);
	}

	yellow(options: I4bitColors): string {
		return this.get4BitColor(33, options);
	}

	blue(options: I4bitColors): string {
		return this.get4BitColor(34, options);
	}

	magenta(options: I4bitColors): string {
		return this.get4BitColor(35, options);
	}

	cyan(options: I4bitColors): string {
		return this.get4BitColor(36, options);
	}

	white(options: I4bitColors): string {
		return this.get4BitColor(37, options);
	}

	termColor({ str, color, bgColor = false }: I8bitColors): string {
		const prefix: string = bgColor ? "\x1b[48;5;" : "\x1b[38;5;";
		const end: string = "\x1b[0m";
		return prefix + color.toString() + "m" + str + end;
	}

	rgb({ str, r, g, b, bgColor = false }: IRGB): string {
		const prefix: string = bgColor ? "\x1b[48;2;" : "\x1b[38;2;";
		const rgb: string = r.toString() + ";" + b.toString() + ";" + g.toString() + "m";
		const end: string = "\x1b[0m";

		return prefix + rgb + str + end;
	}
}

export default new Colors();
