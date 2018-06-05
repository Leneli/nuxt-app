<template lang="pug">
	.link_tobott(@click="scroll")
</template>

<script>
import ScrollTo from "@/scripts/ScrollTo.js";

export default {
	name: "ToBottomArr",
	data () {
		return {
			anchorID: "compassAnchor"
		};
	},
	methods: {
		scroll() {
			ScrollTo(this.anchorID);
		}
	}
};
</script>
