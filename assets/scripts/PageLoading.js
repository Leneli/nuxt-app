export default function() {
	new Promise((resolve, reject) => {
		var hamburgerButton = document.querySelector("*[data-menu-id]");

		if(hamburgerButton instanceof HTMLElement) resolve(hamburgerButton);
		else reject("Don't Hamburger menu");
	})
		.then(button => {
			var menuID = button.dataset.menuId;
			var menu   = document.getElementById(menuID);

			var openClass = "open";
			var stopScrollClass = "no-scroll";

			button.classList.remove(openClass);
			if(menu) menu.classList.remove(openClass);

			document.getElementsByTagName("html")[0].classList.remove(stopScrollClass);
		})
		.then(() => this.loading = false)
		.then(() => window.scrollTo(0, 0))
		.catch(err => {
			console.info(err);
			this.loading = false;
		});
}