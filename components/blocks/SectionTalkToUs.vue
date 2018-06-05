<template lang="pug">
	section.section.wrap-content(:class="bgClassName")
		h2.h2_section {{ blockData.title }}
		.grid_col
			.grid_item_mrg
				div
					h3.paragraph(v-html="blockData.content")
					.li-icon-mark.i-map(v-if="!isMobile()")
						.paragraph(v-html="blockData.address")

			.grid_item_mrg
				div
					CustomForm(:formData="formData")

				.mt_inner.aligncenter(v-if="isMobile()")
					.paragraph(v-html="blockData.address")
</template>

<script>
import CustomForm from "@/components/blocks/CustomForm";

export default {
	name: "SectionTalkToUs",
	props: ["blockData", "formData"],
	components: {
		CustomForm
	},
	data () {
		return {
			bgClassName: "bg_grey",
		};
	},
	methods: {
		isMobile() {
			var media = 767;

			if(window.innerWidth <= media) return true;
			else return false;
		}
	}
};
</script>


<DOC>
	BLOCK DESCRIPTION

	Section with contact form and text contact info (without a map).

	DATA FROM SERVER:

	blockData: {
		title: String,				// title of section
		content: String || HTML,	// text in left column
		address: String || HTML,	// address, text string
		form: FIXME:
	}
</DOC>