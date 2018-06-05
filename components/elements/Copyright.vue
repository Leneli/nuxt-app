<template lang="pug">
	.copyright
		.copyright__exp {{ explanation }}
		.copyright__txt {{ copyright }}
</template>

<script>


export default {
	name: "Copyright",
	props: ["explanation", "copyright"],
	methods: {
		getCopy() {
			var today = new Date();
			var year  = today.getFullYear();
			var text  = `© Copyright Azimut ${year}, All Rights Reserved`;

			return text;
		}
	}
};
</script>
