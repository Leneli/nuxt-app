<template lang="pug">
	section.section.wrap-content.grid_col.bg_compass.content
		div(v-for="(item, index) in blockData" :key="index")
			.section-col
				div(v-if="item.img_top")
					img(:src="`${item.img_top}`", :alt="`${item.title || ''}`")

				h2.h2(v-if="item.title") {{ item.title }}

				p.content(v-if="item.text_before" v-html="item.text_before")

				p.content(v-if="item.text" v-html="item.text")

				ol.ol_counter(v-if="item.ol")
					li(v-for="(p, i) in item.ol" :key="i")
						div(v-html="p.li")

				ul.list_nums(v-if="item.ul_nums")
					li(v-for="(p, i) in item.ul_nums" :key="i")
						.num__first {{ p.num }}
						.num__sec   {{ p.txt }}

				ul.ul_clients(v-if="item.ul_clients")
					li(v-for="(p, i) in item.ul_clients" :key="i" v-html="p.li")

				p.content(v-if="item.text_after" v-html="item.text_after")

				div(v-if="item.img_bottom")
					img(:src="`${item.img_bottom}`", :alt="`${item.title || ''}`")
</template>

<script>
export default {
	name: "SectionColumnsCompass",
	props: ["blockData"]
};
</script>

<DOC>
	BLOCK DESCRIPTION

	Data structure for this Component:

	{
		"left_column": {
			"img_top"    : SRC for first (top) image,
			"title"      : title of column (h3),
			"text_before": text block before list (ul / ol),

			"ol"         : ol with grey numbers,
			"ul_nums"    : ul with blue numbers,
			"ul_clients" : ul with icons,

			"text_after" : text block before list (ul / ol),
			"img_bottom" : SRC for last (bottom) image
		},

		"right_column": { /* --//-- */ }
	}
	
</DOC>