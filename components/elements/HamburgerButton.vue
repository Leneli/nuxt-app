<template lang="pug">
	.header__button(:data-menu-id="menuID", @click="open")
		.toggle
			.toggle__line

</template>

<script>
export default {
	name: "HamburgerButton",

	props: ["menuID"],
	
	methods: {
		open() {
			var menuID = this.$el.dataset.menuId;
			var menu   = document.getElementById(menuID);
			var openClass = "open";
			var stopScrollClass = "no-scroll";
			var media = 575;

			if(menu instanceof HTMLElement) {
				this.$el.classList.toggle(openClass);
				menu.classList.toggle(openClass);

				if(window.innerWidth <= media) {
					document.getElementsByTagName("html")[0].classList.toggle(stopScrollClass);
				}
			}
		}
	}
};
</script>
