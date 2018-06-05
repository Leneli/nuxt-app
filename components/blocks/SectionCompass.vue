<template lang="pug">
	.compass.wrap-content
		.compass__anchor(id="compassAnchor")
		.compass__animate
			.compass__arrow(:id="arrID")

		h1.h1.h1_mob.aligncenter(v-if="h1") {{ h1 }}
		.compass__desc(v-html="sectionData")
</template>

<script>
export default {
	name: "SectionCompass",
	props: ["sectionData", "h1"],
	mounted () {
		this.animate(this.arrID);
	},
	methods: {
		animate(ID) {
			var arrow = document.getElementById(ID);
			var top = 0;
			var deg = 0;

			if(arrow instanceof HTMLElement) top = arrow.getBoundingClientRect().top;
			
			document.addEventListener("scroll", function() {

				if(arrow instanceof HTMLElement) {
					deg = getDeg(deg);

					arrow.style.transform = `rotate3d(0, 0, 1, ${deg}deg)`;
				}
				
			}, true);


			function getDeg(oldDeg) {
				var newDeg = oldDeg || 0;
				var step   = 5;

				if(top > arrow.getBoundingClientRect().top) newDeg -= step;
				else if(top < arrow.getBoundingClientRect().top) newDeg += step;

				top = arrow.getBoundingClientRect().top;

				return newDeg;
			}
		}
	},
	data () {
		return {
			arrID: "compassArr"
		};
	}
};
</script>


<DOC>
	BLOCK DESCRIPTION

	Section with animated compass image. Contains SVG image (compass) and simple text.

	DATA FROM SERVER:

	sectionData: String || HTML  // Content after the compass image. Should be a simple text string or HTML
</DOC>