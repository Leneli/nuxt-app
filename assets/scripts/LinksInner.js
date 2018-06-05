export default function(link) {
	if(link.indexOf(window.location.hostname) === -1) {
		window.open(link, "_blank");
	} else {
		let host = window.location.host;
		let inner = link.split(host)[1];
		this.push(inner);
	}
}