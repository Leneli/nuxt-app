<template lang="pug">
	section.section.wrap-content(:id="blockData.id || ''")

		.content_form-section(v-if="blockData.content || blockData.img")
			div
				h2.h2_section(v-if="blockData.title") {{ blockData.title }}
				.content(v-if="blockData.content" v-html="blockData.content")

			div(v-if="blockData.img && isImage()")
				img(:src="blockData.img", :alt="blockData.title || ''")

		h2.h2_section(v-else-if="blockData.title") {{ blockData.title }}

		CustomForm(v-if="blockData.formData" :formData="blockData.formData")
</template>

<script>
import CustomForm from "@/components/blocks/CustomForm";

export default {
	name: "SectionFormInPage",
	props: ["blockData"],
	components: {
		CustomForm
	},
	methods: {
		isImage() {
			return (window.innerWidth > 767);
		}
	}
};
</script>
