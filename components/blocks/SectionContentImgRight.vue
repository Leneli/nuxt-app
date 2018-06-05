<template lang="pug">
	.section.section_pics.wrap-content.grid_flexible
		div
			h2.h2(v-if="blockData.title") {{ blockData.title }}
			.content(v-if="blockData.text" v-html="blockData.text")

		div(v-if="blockData.img")
			img(:src="`${blockData.img}`", :alt="blockData.title || ''")
</template>

<script>
export default {
	name: "SectionContentImgRight",
	props: ["blockData"]
};
</script>
