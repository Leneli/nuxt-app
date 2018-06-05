<template lang="pug">
	a(:href="`#${sectionID}`", :class="className", @click.prevent="talkLink") {{ name }}
</template>

<script>
export default {
	name: "TalkToUs",

	props: ["sectionID"],

	data () {
		return {
			name: "Talk to Us",
			className: "button_small_accent"
		};
	},
	
	watch: {
		getSection: function(val, oldVal) {
			console.log("Watch To Section...");
			
			console.log(val);
			console.log(oldVal);
		}
	},
	
	methods: {
		getSection() {
			var selector = this.$el.getAttribute("href");
			var section  = document.querySelector(selector);

			if(section instanceof HTMLElement) return section;
		},

		talkLink() {
			var selector = this.$el.getAttribute("href");
			var section  = document.querySelector(selector);

			if(section instanceof HTMLElement) section.scrollIntoView({ block: "start", behavior: "smooth" });
			else {
				this.$router.push("/");

				setTimeout(() => {
					let homeSection = document.querySelector(selector);
					if(homeSection instanceof HTMLElement) homeSection.scrollIntoView({ block: "start", behavior: "smooth" });
					else console.info("`Talk to us` section not found.");
				}, 500);
			}

			new Promise((resolve, reject) => {
				if(this.$el.getAttribute("href")) resolve(this.$el.getAttribute("href"));
				else reject("Don't 'href' attribute by link");
			})
				.then(selector => {
					var section = document.querySelector(selector);

					if(section instanceof HTMLElement) section.scrollIntoView({ block: "start", behavior: "smooth" });
					else {
						this.$router.push("/");

						new Promise((resolve, reject) => {
							
						})
					}
				})
				.catch(err => console.info(err));
		}
	}
};
</script>
