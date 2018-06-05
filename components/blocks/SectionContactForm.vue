<template lang="pug">
	.contacts
		.contacts__item
			.paragraph(v-html="blockData.welcome_text")
			
			div(v-if="blockData.businness_hours")
				.h4 Business Hours:
				.p(v-for="item in blockData.businness_hours" v-html="item.h")

		.contacts__item_large(v-if="formData")
			.contacts__form
				CustomForm(:formData="formData")
</template>

<script>
import CustomForm from "@/components/blocks/CustomForm";

export default {
	name: "SectionContacts",
	props: ["blockData", "formData"],
	components: {
		CustomForm
	}
};
</script>