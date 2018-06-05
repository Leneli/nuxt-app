export default function() {
	var fixClassName = "fixVDOM";
	var fixElems     = this.$el.getElementsByClassName(fixClassName);

	if(fixElems.length > 0) {
		for (let i = 0; i < fixElems.length; i++) {
			new Promise((resolve, reject) => {
				const element = fixElems[i];

				if(element instanceof HTMLElement) resolve(element);
				else reject();
			})
				.then(element => {
					var mt = element.style.marginTop || "";

					element.style.marginTop = "0";

					return {
						element,
						mt
					};
				})
				.then(obj => obj.element.style.marginTop = `${obj.mt}`)
				.catch(() => false); 
		}
	}
}