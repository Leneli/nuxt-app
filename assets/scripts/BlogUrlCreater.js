export default function(params = { limit: 1000 }) {
	var url = process.env.BLOG_URL;

	// FIXME: need "no-cors" for "development"
	if(params instanceof Object && process.env.NODE_ENV !== "development") {
		for(const key in params) {
			if(params.hasOwnProperty(key)) {
				const value = params[key];
				
				url += `&${key}=${value}`;
			}
		}
	}

	return url;
}