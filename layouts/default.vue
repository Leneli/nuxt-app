<template lang="pug">
    .wrapper
        Header

</template>


<script>
import Header from "~/components/Header.vue";
/*import Footer from "~/components/Footer.vue";*/

import { FetchData } from "~/assets/scripts/FetchData.js";
import LinksInner    from "~/assets/scripts/LinksInner.js";
import Canonical     from "~/assets/scripts/Canonical.js";

export default {
    components: {
        Header
    },

    data () {
        return {
            loading: false,

			talkToUsID : "talkToUs",

			header     : null,
			footer     : null,
			contactInfo: null,
			socials    : null
        }
    },

    created () {
		this.fetchData();
		this.aToRoute();
		Canonical();
    },
    
    watch: {
		"$route"(to, from) {
			Canonical();
		}
    },
    
    methods: {
		fetchData() {
            console.log(process.env);
			/*var request = FetchData.request(process.env.GLOBAL_URL);

			this.loading   = true;

			request
				.then(data => {
					loading();
					success(data);
				})
				.catch(err => error(err));

			var loading = () => {
				this.loading = false;
			};

			var error = (err) => {
				console.log(err);
				this.$router.push("/error/500");
			};

			var success = (data) => {
				var DATA = data.acf.global;

				this.header      = DATA.header;
				this.footer      = DATA.footer;
				this.contactInfo = DATA.contactInfo;
				this.socials     = DATA.socials;
			};*/
		},

		aToRoute() {
			var router = this.$router;

			/* document.addEventListener("click", function(event) {
				event = event || window.event;
				var target = event.target;

				if(target instanceof HTMLAnchorElement && target.__vue__ === undefined && target.getAttribute("href") !== null) {
					if(target.getAttribute("href")[0] !== "#") {
						event.preventDefault();

						LinksInner.call(router, target.href);
					}
				}
			}); */
		}
	}
}
</script>

<style lang="scss">
// libs
// @import "normalize.css";
// @import "swiper/dist/css/swiper.min.css";

// helpers modules
@import "~assets/styles/_helpers/_variables";
@import "~assets/styles/_helpers/fonts";
@import "~assets/styles/_helpers/mixins";
@import "~assets/styles/_helpers/media";
@import "~assets/styles/_helpers/global";
@import "~assets/styles/_helpers/helpercls";
@import "~assets/styles/_helpers/fix";

// common styles
@import "~assets/styles/common/bg";
@import "~assets/styles/common/content";
@import "~assets/styles/common/form-elements";
@import "~assets/styles/common/grid";
@import "~assets/styles/common/links";
@import "~assets/styles/common/lists";
@import "~assets/styles/common/media-elements";
@import "~assets/styles/common/tables";
@import "~assets/styles/common/text";
@import "~assets/styles/common/titles";
@import "~assets/styles/common/wrapper";
@import "~assets/styles/common/icons";

// blocks
@import "~assets/styles/blocks/global/footer";
@import "~assets/styles/blocks/global/header";
@import "~assets/styles/blocks/global/page";
@import "~assets/styles/blocks/global/404";
@import "~assets/styles/blocks/sections";
@import "~assets/styles/blocks/banner";
@import "~assets/styles/blocks/compass";
@import "~assets/styles/blocks/numberic";
@import "~assets/styles/blocks/testimonials";
@import "~assets/styles/blocks/tabs";
@import "~assets/styles/blocks/the-best";
@import "~assets/styles/blocks/contacts";
@import "~assets/styles/blocks/locations";
@import "~assets/styles/blocks/persons";
@import "~assets/styles/blocks/toggle";
@import "~assets/styles/blocks/filter";
@import "~assets/styles/blocks/pagination";
@import "~assets/styles/blocks/separate";

// blog
@import "~assets/styles/blocks/blog/blog";
@import "~assets/styles/blocks/blog/blog-list";
@import "~assets/styles/blocks/blog/blog-preview";
</style>