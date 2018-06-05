import Base64 from "@/scripts/Base64.js";

export default function(form, page = {}) {
	var DATA  = { form: "" };
	var arr   = [];
	var files = [];

	var dataset = {
		file: "fileBase64"
	};

	if(form instanceof HTMLFormElement) {
		for (let i = 0; i < form.elements.length; i++) {
			const element = form.elements[i];
			let name = element.name;

			if(!element instanceof HTMLButtonElement || element.type !== "submit" || element.type !== "file") {
				let value = element.value;

				DATA.form += `&${name}=${encodeURIComponent(value)}`;
				// FIXME: checkbox & radio
			}

			// files
			if(element.type === "file" && element.dataset[dataset.file] !== undefined) {
				let value = element.dataset[dataset.file];
				let format= value.split("data:")[1];

				format = format.split(";")[0];
				format = format.split("/")[1];

				DATA.form += `&${name}=${value}`;
				DATA.form += `&format=${format}`;

				/* console.log('------------------------------------');
				console.log("File (in Base64):");
				console.log(value);
				console.log(format); */
			}
		}

		arr.push(DATA.form);
	}
	else arr = false;

	/* console.log('Form Data:');
	console.log(arr);
	console.log('------------------------------------'); */

	return arr;
}