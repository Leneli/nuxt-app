/* export default function() {
	var __private = {
		getCookie(name) {
			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

			return matches ? decodeURIComponent(matches[1]) : undefined;
		},

		setCookie(name, value, options = {}) {
			var expires = options.expires;
		  
			if (typeof expires == "number" && expires) {
				var d = new Date();
				d.setTime(d.getTime() + expires * 1000);
				expires = options.expires = d;
			}
			if (expires && expires.toUTCString) {
			  	options.expires = expires.toUTCString();
			}
		  
			value = encodeURIComponent(value);
		  
			var updatedCookie = name + "=" + value;
		  
			for (var propName in options) {
				updatedCookie += "; " + propName;
				var propValue = options[propName];
				if (propValue !== true) {
					updatedCookie += "=" + propValue;
				}
			}
		  
			document.cookie = updatedCookie;
		}
	};

	return {
		get(name) {
			return __private.getCookie(name);
		},

		set(name, value, options) {
			__private.setCookie(name, value, options);
		},

		del(name) {
			__private.setCookie(name, "", { expires: -1 });
		}
	};
} */

export default function(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

	return matches ? decodeURIComponent(matches[1]) : undefined;
}