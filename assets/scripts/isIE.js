export default function isIE() {
	var userAgent = window.navigator.userAgent.toLowerCase();

	return ((/trident/gi).test(userAgent) || (/msie/gi).test(userAgent) || (/edge/gi).test(userAgent));
}