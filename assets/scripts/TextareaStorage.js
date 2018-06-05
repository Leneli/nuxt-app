export default function() {
	var storageName = "FormsStorage";

	// Set value
	document.addEventListener("input", function(event) {
		event = event || window.event;
		var target = event.target;

		new Promise((resolve, reject) => {
			if(target instanceof HTMLTextAreaElement && target.id) resolve(target.id);
			else reject();
		})
			.then(name => {
				var storage;
				var removeDate = new Date();
				removeDate = removeDate.setDate(removeDate.getDate() + 1); // +1 day

				if(localStorage.getItem(storageName) === null) storage = {};
				else storage = JSON.parse(localStorage.getItem(storageName));

				storage[name] = {};
				storage[name]["value"]  = target.value;
				storage[name]["remove"] = removeDate;
				storage = JSON.stringify(storage);

				localStorage.setItem(storageName, storage);
			})
			.catch(() => false);
	});

	// Get value
	let storage = JSON.parse(localStorage.getItem(storageName));

	for (const key in storage) {
		if (storage.hasOwnProperty(key)) {
			let value = storage[key]["value"];
			let date  = storage[key]["remove"];
			let elem  = document.getElementById(key);

			if(new Date() > date) {
				storage[key]["value"] = "";
				value = "";
			}

			if(elem instanceof HTMLTextAreaElement) {
				elem.value = value;
				elem.textContent = value;
			}
		}
	}
}