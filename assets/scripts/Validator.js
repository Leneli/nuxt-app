import { SearchParent } from "@/scripts/SearchParent.js";

export default function(fieldNode) {
	var IS_VALID = true;

	var dataset = {
		type: "validationType"
	};
	var map = {
		email : isEmailValid
	};
	var invalidClass = {
		data: "invalid-data",
		required: "invalid-required"
	};

	if(fieldNode instanceof HTMLElement) {
		const value = fieldNode.value;
		
		// for special fields
		if(fieldNode.dataset[dataset.type] !== undefined) {
			let type = fieldNode.dataset[dataset.type];

			if(map.hasOwnProperty(type)) {
				if(map[type](value)) fieldNode.classList.remove(invalidClass.data);
				else {
					fieldNode.classList.add(invalidClass.data);
					IS_VALID = false;
				}
			}
		}

		// for checkboxes & roadiobuttons
		if(fieldNode.type === "checkbox" || fieldNode.type === "radio") {
			IS_VALID = isChecked(fieldNode);
		}

		// for required fields
		if(fieldNode.required) {
			if(isFieldRequired(value)) fieldNode.classList.remove(invalidClass.required);
			else {
				fieldNode.classList.add(invalidClass.required);
				IS_VALID = false;
			}
		}
	}

	function isEmailValid(Value) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Value);
	}

	function isFieldRequired(Value) {
		return (Value && Value !== "" && Value !== " ");
	}

	function isChecked(Node) {
		var form = Node.form;
		var name = Node.name;
		var type = Node.type;

		var isValid = false;

		if(form instanceof HTMLFormElement) {
			let group = form.querySelectorAll(`input[type='${type}'][name='${name}']`);

			for (let i = 0; i < group.length; i++) {
				const inp = group[i];
				
				if(inp.checked) isValid = true;
			}

			for (let i = 0; i < group.length; i++) {
				const inp = group[i];
				const label = SearchParent.byClassName(Node, Node.type);

				if(isValid) inp.classList.remove(invalidClass.data);
				else inp.classList.add(invalidClass.data);

				// label
				if(label) {
					if(isValid) label.classList.remove(invalidClass.data);
					else label.classList.add(invalidClass.data);
				}
			}
		}

		return isValid;
	}

	return IS_VALID;
}