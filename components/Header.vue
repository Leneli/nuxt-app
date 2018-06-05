<template lang="pug">
	header.header.wrap-content
		.header__block
			//-LogoLink(:class="logoClassName", :style="{ backgroundImage: getBgStyle(componentData.logoImg) }")

		.header__block.header__block_full
			Nav(:class="navClassName", :id="navID")

		.header__block_contacts
			//-PhoneLink(:class="phoneClassName", :number="contactData.phone.url")
			TalkToUs(:sectionID="talkID")
			
		HamburgerButton(:menuID="navID")
</template>


<script>
import Nav       		from "~/components/Nav.vue";
import PhoneLink 		from "~/components/elements/PhoneLink.vue";
import TalkToUs  		from "~/components/elements/Talk.vue";
import LogoLink  		from "~/components/elements/LogoLink.vue";
import HamburgerButton	from "~/components/elements/HamburgerButton.vue";

export default {
	name: "Header",

	props: ["componentData", "contactData", "talkID"],

	components: {
		Nav,
		PhoneLink,
		TalkToUs,
		LogoLink,
		HamburgerButton
	},

	data () {
		return {
			navClassName  : "header__nav",
			phoneClassName: "link_inherit i-tel",
			logoClassName : "header__logo",
			navID         : "mainMenu"
		};
	},

	mounted () {
		this.sticky();
	},

	methods: {
		getBgStyle(url) {
			var bg = `url('${url}')`;

			return bg;
		},

		sticky() {
			var header = this.$el;
			var step   = -10;
			var stickyClass = "sticky";

			document.addEventListener("scroll", function() {

				if(header.nextElementSibling.getBoundingClientRect().top < step)
					header.classList.add(stickyClass);
				else
					header.classList.remove(stickyClass);

			}, true);
		}
	}
};
</script>