<template lang="pug">
	router-link(v-if="isRoute(path)" :to="path") {{ text }}
	a(v-else :href="path" :target="getTarget(target)") {{ text }}
</template>

<script>
export default {
	name: "SimpleLink",
	props: ["path", "target", "text"],
	methods: {
		isRoute(link) {
			if(link && typeof link === "string" && link[0] === "/") return true;
			else return false;
		},

		getTarget(val) {
			if(typeof val === "string" && val === "_blank") return val;
			else return "_self";
		}
	}
};
</script>
