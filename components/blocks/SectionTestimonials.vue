<template lang="pug">
	section.wrap-content.testimonials
		h2.h2_section {{ blockData.title }}

		#sliderTestimonials.testimonials-slider
			TestimonialsSlider(:slidesData="blockData.slider")
		
		.testimonials-social-networks(v-if="blockData.socials")
			.testimonials-social-networks__item(v-for="soc in blockData.socials")
				.testimonials-social-networks__logo(:style="`background-image: url('${soc.logo}');`")
				.testimonials-social-networks__note(v-if="soc.note") {{ soc.note }}
				.testimonials-social-networks__star(v-if="soc.note" v-html="getStars(soc.note)")

				SimpleLink(:path="soc.link.url" :target="soc.link.target" :text="soc.text" :class="getLinkClass(soc.stars)")
</template>

<script>
import TestimonialsSlider	from "@/components/elements/sliders/TestimonialsSlider.vue";
import SimpleLink			from "@/components/elements/SimpleLink";

import { Stars } from "@/scripts/Stars.js";

export default {
	name: "SectionTestimonials",
	props: ["blockData"],
	components: {
		TestimonialsSlider,
		SimpleLink
	},
	methods: {
		getTarget(val) {
			if(typeof val === "string" && val === "_blank") return val;
			else return "_self";
		},

		getLinkClass(key) {
			if(key) return "testimonials-social-networks__link";
			else return "testimonials-social-networks__link full";
		},

		getStars(note) {
			return Stars.create(note);
		}
	}
};
</script>


<DOC>

</DOC>