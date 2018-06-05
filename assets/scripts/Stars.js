const Stars = {
	map: {
		full: "star",
		half: "star-h",
		null: "star-0"
	},
	common: 5,

	create(note) {
		var fullCounter = 0;
		var halfCoutner = 0;
		var nullCounter = 0;
		
		if(note.indexOf(".") !== -1) {
			fullCounter = +note.split(".")[0];
			halfCoutner = +note.split(".")[1];
		} else if(note.indexOf(",") !== -1) {
			fullCounter = +note.split(",")[0];
			halfCoutner = +note.split(",")[1];
		} else {
			fullCounter = +note;
		}

		if(fullCounter >= this.common) {
			fullCounter = this.common;
		} else {
			if(halfCoutner > 1) halfCoutner = 1;
			else halfCoutner = 0;
			nullCounter = this.common - fullCounter - halfCoutner;

			if(nullCounter < 0) nullCounter = 0;
		}

		if(isNaN(fullCounter)) fullCounter = this.common;

		return this.template(fullCounter, halfCoutner, nullCounter);
	},

	template(f, h, n) {
		var temp = "";

		if(f > 0) temp += this.star(f, this.map.full);
		if(h > 0) temp += this.star(h, this.map.half);
		if(n > 0) temp += this.star(n, this.map.null);

		return temp;
	},

	star(count, className) {
		var string = "";

		for (let i = 0; i < count; i++) {
			string += `<div class="${className}"></div>`;
		}

		return string;
	}
};

export { Stars };