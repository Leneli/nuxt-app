<template lang="pug">
	.section.wrap-content.separate(v-if="blockData.columns || blockData.list_numbers")

		//- html
		.separate__col(v-if="blockData.columns" v-for="(col, i) in blockData.columns" :key="i")
			div(v-if="col.text" v-html="col.text" :class="{ 'aligncenter': isCenterClass(col) }")
			div(v-if="col.item" v-html="col.item" :class="{ 'aligncenter': isCenterClass(col) }")
			div(v-if="col.link" class="aligncenter")
				SimpleLink(:path="col.link.url" :text="col.link.title" :target="col.link.target" class="button")


		//- numbers list
		ul.num(v-if="blockData.list_numbers")
			li(v-for="(el, i) in blockData.list_numbers" :key="i")
				.num__first {{ el.num }}
				.num__sec   {{ el.txt }}
</template>

<script>
import SimpleLink from "@/components/elements/SimpleLink";

export default {
	name: "SectionSeparateLine",
	props: ["blockData"],
	components: {
		SimpleLink
	},
	methods: {
		isCenterClass(col) {
			var isClass = false;

			if(!col.link || col.link === "") isClass = true;

			return isClass;
		}
	}
};
</script>
