<template lang="pug">
	section.section-tabs.wrap-content(:class="blockData.className" :style="`background-image: url('${blockData.bgImage}');`")
		h2.h2_section {{ blockData.title }}

		.tabs-block(v-if="isTabs()")
			//- Tabs section, for desctops
			Tabs(:options="{ useUrlFragment: false }" class="tabs" :class="ifIEClass")
				Tab(v-for="tab in blockData.tabList" :name="tab.title")
					div(v-html="tab.content")
					div(v-if="tab.learnMore")
						SimpleLink(:path="tab.learnMore" :text="`Learn more`" :target="tab.target" class="button button__tab")

		.tabs-slider(v-else)
			//- Slider section, for mobile devices or for screen <= 767px width
			swiper(:options="swiperOption")

				swiper-slide(v-for="tab in blockData.tabList")
					.tabs-slider__name 
						.tabs-slider__h {{ tab.title }}
					.tabs-slider__content 
						div(v-html="tab.content")
						div(v-if="tab.learnMore")
							SimpleLink(:path="tab.learnMore" :text="`Learn more`" :target="tab.target" class="button button__tab")
				
				.swiper-pagination(slot="pagination")
</template>

<script>
import SimpleLink from "@/components/elements/SimpleLink";

import {Tabs, Tab} 				from "vue-tabs-component";
import { swiper, swiperSlide } 	from "vue-awesome-swiper";

import { isMobile } from "@/scripts/isMobile.js";
import isIE         from "@/scripts/isIE.js";

export default {
	name: "SectionTabs",
	props: ["blockData"],
	components: {
		Tabs,
		Tab,
		swiper,
		swiperSlide,
		SimpleLink
	},
	methods: {
		isTabs() {
			var media = 767;

			if((isMobile.any() === null && window.innerWidth > media) || window.innerWidth > media) return true;
			else return false;
		}
	},
	computed: {
		ifIEClass() {
			return {
				fixIE: isIE()
			};
		}
	},
	data () {
		return {
			tabsClass: "tabs_home",
			swiperOption: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
				pagination: {
					el: ".swiper-pagination",
					type: "bullets",
					clickable: true
				},
			}
		};
	}
};
</script>


<DOC>
	BLOCK DESCRIPTION

	Section with Tab's block and image background.

	DATA FROM SERVER:

	blockData: {
		title: String,		// section title
		"bgImage": String, 	// image url
		"tabList": [
			{
				"title": String,			// name of tab section
				"content": String || HTML,	// text or HTML
				"learnMore": String,		// url for button
				"order": Number				// counter (key for sorting)
			}
			...
		]
	}

</DOC>