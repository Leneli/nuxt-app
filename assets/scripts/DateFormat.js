export default function(string) {
	var date = new Date(+string);
	var separator = ".";

	var dd = date.getDate();
	var mm = date.getMonth();
	var yy = date.getFullYear();

	mm++;

	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;
	
	return `${mm}${separator}${dd}${separator}${yy}`;
}