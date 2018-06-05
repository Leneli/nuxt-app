<template lang="pug">
	.filter(v-if="filterList" :class="{ fixIE: ifIEClass() }")
		.tabs-component-tab(v-for="item in filterList" :class="{ 'is-active': isActive(item.id), 'is-inactive': item.inactive }")
			.tabs-component-tab-a(@click="filterListener" :data-category="item.id || 'null'" :class="{ 'is-active': isActive(item.id), 'is-inactive': item.inactive }") {{ item.name }}
</template>

<script>
import isIE from "@/scripts/isIE.js";

export default {
	name: "FilterButtons",
	data () {
		return {
			activeClass: "is-active",
			inactiveClass: "is-inactive",
			tabsClass: "tabs-component-tab",

			filterList: null
		};
	},
	created () {
		this.filterList = this.createFilterList();
	},
	watch: {
		"$route"(to, from) {
			this.createFilterList();
		}
	},
	methods: {
		reloadFilter() {
			setTimeout(() => {
				var currentCategory = this.$store.getters.getBlogCurrentCategory;
				var buttons = this.$el.getElementsByClassName("tabs-component-tab-a");
				var currentCategoryId = null;
				var currentButton = null;

				if(currentCategory !== null && currentCategory.hasOwnProperty("id")) currentCategoryId = +currentCategory.id;

				currentButton = this.$el.querySelector(`.tabs-component-tab-a[data-category="${currentCategoryId}"]`);

				if(currentButton instanceof HTMLElement && !currentButton.classList.contains(this.activeClass)) {
					for (let i = 0; i < buttons.length; i++) {
						const element = buttons[i];
						const tab = element.parentElement;

						element.classList.remove(this.activeClass);
						tab.classList.remove(this.activeClass);
					}

					currentButton.classList.add(this.activeClass);
					currentButton.parentElement.classList.add(this.activeClass);
				}
			}, 100);
		},

		createFilterList() {
			var categories  = this.$store.getters.getBlogCategories;
			var allPosts    = {
				name: `All Posts`,
				id: null,
				total: this.$store.getters.getPostsLenght,
				inactive: false
			};
			var filterList = [];

			for (const ID in categories) {
				if (categories.hasOwnProperty(ID)) {
					const cat = categories[ID];

					let listItem = {
						name: `For ${cat.name}`,
						id: +ID,
						total: +cat.total,
						inactive: +cat.total <= 0
					};

					filterList.push(listItem);
				}
			}

			filterList.push(allPosts);

			this.reloadFilter();

			return filterList;
		},

		isActive(categoryID) {
			return this.$store.getters.getBlogCurrentCategory === categoryID;
		},

		filterListener($event) {
			var target = $event.target;

			new Promise((resolve, reject) => {
				if(target instanceof HTMLElement && !target.classList.contains(this.activeClass) && !target.classList.contains(this.inactiveClass)) resolve();
					
				else reject();
			})
				.then(() => {
					var items = this.$el.children;

					for (let i = 0; i < items.length; i++) {
						const element = items[i];

						if(element !== target.parentElement) {
							element.classList.remove(this.activeClass);
							element.children[0].classList.remove(this.activeClass);
						}
						else {
							element.classList.add(this.activeClass);
							target.classList.add(this.activeClass);
						}
					}
				})
				.then(() => {
					var category = +target.dataset.category || null;

					this.$store.commit("setBlogCategory", category);
					this.$store.commit("setBlogOffset", 0);
				})
				.catch(() => false);
		},

		ifIEClass() {
			return isIE();
		}
	}
};
</script>
