//import "whatwg-fetch";

/* const head = new Headers({
	"Access-Control-Allow-Origin": "*",
	"Content-Type": "application/json"
});

var init = {
	method: "GET",
	headers: head,
	credentials: "include",
	mode: "no-cors"
} */

const FetchData = {
	request(url) {

		/* console.log("------------------------------------");
		console.log("Fetch Data URL Request: " + url);
		console.log("------------------------------------"); */

		return fetch(url, new Headers({
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		}))
			.then(this.status)
			.then(this.json)
			.then(data => data)
			.catch(err => {
				console.log("Request failed:", err);

				return false;
			});
	},

	status(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		} 
	},

	json(response) {
		return response.json();
	}
};

export { FetchData };