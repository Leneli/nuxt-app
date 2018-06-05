export default function() {
	document.addEventListener("change", function(event) {
		event = event || window.event;
		var target = event.target;
		var label;
		var span;
		var files;

		if(target instanceof HTMLInputElement && target.type === "file") {
			files = target.files;
			label = target.parentElement;

			if(label instanceof HTMLLabelElement) {
				span = label.getElementsByClassName("file-text")[0];
				let value = "<b>Upload:</b> ";

				for (const i in files) {
					if (files.hasOwnProperty(i)) {
						const f = files[i];
						
						value += f.name;

						if(files.length > 1 && +i !== (files.length - 1)) value += ", ";
					}
				}

				if(span) span.innerHTML = value;
			}
		}
	});
}