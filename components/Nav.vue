<template lang="pug">
	//-nav(v-if="menu")
		template(v-for="(item, index) in menu")
			router-link(v-if="item.link.type === type.route" :to="item.link.path" :key="index") {{ item.link.title }}
			a(v-else :href="item.link.url" :target="item.link.target" :key="index") {{ item.link.title }}
</template>


<script>
/* import { FetchData } from "~assets/scripts/FetchData.js";

export default {
	name: "Nav",

	data () {
		return {
			menu: null,
			type: {
				route: "route",
				link : "link"
			}
		};
	},

	created () {
		this.createNav();
	},

	watch: {
		"$route"(to, from) {
			if(to.path === "/blog" && !from.params.hasOwnProperty("post")) this.reloadBlog(to.path);
		}
	},

	methods: {
		createNav() {
			var menuRequest = FetchData.request(process.env.MENU_URL);

			menuRequest
				.then(data => {
					var menu;

					if(data.hasOwnProperty("acf") && data.acf.hasOwnProperty("menu")) menu = data.acf.menu;

					return menu;
				})
				.then(menu => {
					if(menu !== undefined && typeof menu === "object") {
						for (let k = 0; k < menu.length; k++) {
							let link = menu[k].link;
							let url  = link.url;
							let type;

							let http  = new RegExp("http://", "i");
							let https = new RegExp("https://", "i");
							let www   = new RegExp("www.", "i");
							let home  = "/";

							for (let r = 0; r < this.$router.options.routes.length; r++) {
								const route = this.$router.options.routes[r];
								let regular;

								if(route.path !== home && route.path !== "*") regular = new RegExp(route.path, "i");
								else regular = false;
									
								if(regular) {
									if(regular.test(url) && !http.test(url) && !https.test(url) && !www.test(url)) {
										type      = this.type.route;
										link.path = route.path;

										break;
									} else type = this.type.link;
								} else if(url === home) type = this.type.route;
								else type = this.type.link;
							}

							link.type = type;
						}
						this.menu = menu;
					}
				})
				.catch(err => console.error(err));
		},

		reloadBlog(path) {
			this.$store.commit("setBlogOffset",   0);
			this.$store.commit("setBlogCategory", 0);
		}
	}
}; */
</script>
