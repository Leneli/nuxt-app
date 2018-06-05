<template lang="pug">
	a(:href="`tel:${getHref(number)}`") {{ number }}
</template>

<script>
export default {
	name: "PhoneLink",

	props: ["number", "telAsText", "telInHref"],
	
	methods: {
		getHref(String) {
			var code = "+1";
			var href = "";

			if(String.indexOf(code, 0) == -1) href += code;

			for (let i = 0; i < String.length; i++) {
				const char = String[i];

				if(!isNaN(char) && char !== " ") href += char;
			}

			return href;
		}
	}
};
</script>
