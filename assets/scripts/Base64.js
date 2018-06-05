export default function(file, callback) {
	var reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = function () {
			// return reader.result;
			callback(reader.result);
		};

		reader.onerror = function (error) {
			console.log("File Reader Error: ", error);
		};
}