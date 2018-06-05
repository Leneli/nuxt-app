<template lang="pug">
	.banner.wrap-content(:style="`background-image: url('${bannerData.bgImageURL}');`")
		.banner__item
			.banner__slogan(v-if="bannerData.slogan") {{ bannerData.slogan }}

			ToBottomArr

		.banner__item.banner__item_last(v-if="bannerData.desc.text")
			.banner__desc
				.banner__text {{ bannerData.desc.text }}
				.banner__buttons
					SimpleLink(v-for="link in bannerData.desc.links" :path="link.path" :target="link.target" :text="link.name" :key="link.name" class="button")
</template>


<script>
import ToBottomArr from "@/components/elements/ToBottomArr";
import SimpleLink  from "@/components/elements/SimpleLink";

export default {
	name: "MainBanner",
	props: ["bannerData"],
	components: {
		ToBottomArr,
		SimpleLink
	}
};
</script>


<DOC>
	BLOCK DESCRIPTION

	Banner in top the page, with background-image. Section has 2 column: slogan and block with short text and links / buttons.
	In bottom this section is ToBobbom button - scroll to next section, in hard code.
	
	DATA FROM SERVER:
	
	bannerData: {
		slogan: String,     // text of slogan
		bgImageURL: String, // url to background image
		desc: {             // data for right block
			text: String,   // text
			links: [		// array winth paths for links (buttons)
				{
					name: String,
					path: String,
				}
			]       
		}
	}
	
</DOC>