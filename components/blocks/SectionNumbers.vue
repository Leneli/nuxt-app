<template lang="pug">
	section.numberic.grid_col.wrap-content(:class="blockData.className" :style="`background-image: url('${blockData.bgImage}');`")
		.numberic__block.numberic__block_full
			.numberic__item
				h2.h2_section  {{ blockData.title }}
				.numberic__txt(v-html="blockData.content")
				.numberic__btn(v-if="blockData.link")
					SimpleLink(:path="blockData.link.url" :text="blockData.link.title" :target="blockData.link.target" class="button")

		.numberic__block
			ul(:class="ulClassName" class="numberic__list")
				template(v-for="item in blockData.numbers.list")
					li.numberic__li_num {{ item.num }}
					li.numberic__li_txt {{ item.txt }}
</template>

<script>
import SimpleLink from "@/components/elements/SimpleLink";

export default {
	name: "SectionNumbers",
	props: ["blockData", "ulClassName"],
	components: {
		SimpleLink
	}
};
</script>


<DOC>
	BLOCK DESCRIPTION

	Sections with 2 columns: text with link (button) and list with big numbers.

	DATA FROM SERVER:

	blockData: {
		title: String,					// title of section
		className: String || null,		// class for the entire section OR `null`
		content: String || HTML,		// text in the left colunt
		link: {							// data for link (button) under the text
			name: String,
			path: String
		},
		numbers: {						// data for the list in right column
			className: String || null,	// class for UL element
			list: [						// data for LI's OR `null`
				{
					num: String,
					txt: String
				}
			]
		},
		bgImage: String					// path to section's background image
	}

</DOC>