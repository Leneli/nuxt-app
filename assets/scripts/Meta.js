export default function(data) {
	var map = {
		title: "meta_title",
		desc : "meta_description",
		keys : "meta_keywords",
		auth : "meta_author"
	};
	var meta = {};

	if(typeof data === "object") {
		for (const k in map) {
			if (map.hasOwnProperty(k)) {
				const key = map[k];
				
				if(data.hasOwnProperty(key)) meta[key] = data[key];
			}
		}
	}

	return meta;
}