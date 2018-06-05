<template lang="pug">
	form.form(v-if="formFieldGroups" :id="formData.ID" :class="`${formData.className || ''}`")

		//- Hidden fields
		.d_none(v-if="formData.hidden")
			input(
				v-for="(hidden, index) in formData.hidden"
				type="hidden"
				:name="hidden.name"
				:value="hidden.value"
			)

		.form__group(v-for="(group, index) in formFieldGroups" :key="index")
			.form__field(v-if="group.fields" v-for="(item, i) in group.fields" :key="i")

				//- TEXTAREA
				div(v-if="item.fieldType === 'textarea'")
					textarea(
						@input="validate($event)" 
						:id="`${formData.ID}-${item.name}`" 
						:name="item.name" 
						:class="`textarea${formData.inputClassPostfix}`" 
						:required="item.required" 
						:placeholder="getPlaceholder(item.label, item.required)" 
						:data-validation-type="getValidationType(item)" 
					)
					.form__error(style="display: none;")
						span {{ getValidationMessage(item.validation.message) }}



				//- SELECT
				div(v-else-if="item.fieldType === 'select'")
					select(
						@change="validate($event)" 
						:name="item.name" 
						:class="`select${formData.inputClassPostfix}`" 
						:required="item.required" 
						:data-validation-type="getValidationType(item)" 
					)
						option(v-if="item.unselectedLabel" value="" selected)
							| {{ getPlaceholder(item.unselectedLabel, item.required) }}
						option(v-if="item.options" v-for="(opt, k) in item.options" :key="k" :value="opt.value")
							| {{ opt.label }}
					.form__error(style="display: none;")
						span {{ getValidationMessage(item.validation.message) }}



				//-INPUT
				div(v-else)
					//- check or radio
					label(
						v-if="item.fieldType === 'checkbox' || item.fieldType === 'radio'"
						@click="check($event)" 
						:class="`${item.fieldType} ${item.fieldType}${formData.inputClassPostfix}`"
					)
						span
							| {{ getPlaceholder(item.label, item.required) }}
							input(
								@click="validate($event)"
								:name="item.name" 
								:type="item.fieldType" 
								:required="item.required" 
								:data-validation-type="getValidationType(item)" 
							)
							//-.form__error(style="display: none;")
								span {{ getValidationMessage(item.validation.message) }}

					//- file
					label(
						v-else-if="item.fieldType === 'file'" 
						:class="`${item.fieldType}`" 
					)
						span.file-text {{ getPlaceholder(item.label, item.required) }}
						input(
							@input="validate($event)"
							:name="item.name" 
							:type="item.fieldType" 
							:class="`${item.fieldType}__input`" 
							:required="item.required" 
							:data-validation-type="getValidationType(item)" 
						)
						.form__error(style="display: none;")
							span {{ getValidationMessage(item.validation.message) }}

					//- other
					label(v-else)
						// phone
						MaskedInput(
							v-if="item.name.indexOf('phone') !== -1" 
							@input="validate($event)" 
							:name="item.name" 
							:type="item.fieldType" 
							:class="`input${formData.inputClassPostfix}`" 
							:required="item.required" 
							:placeholder="getPlaceholder(item.label, item.required)" 
							:data-validation-type="getValidationType(item)" 
							:mask="['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]" 
							:guide="false" 
						)

						// other...
						input(
							v-else  
							@input="validate($event)" 
							:name="item.name" 
							:type="item.fieldType" 
							:class="`input${formData.inputClassPostfix}`" 
							:required="item.required" 
							:placeholder="getPlaceholder(item.label, item.required)" 
							:data-validation-type="getValidationType(item)" 
						)

						.form__error(style="display: none;")
							span {{ getValidationMessage(item.validation.message) }}



		.form__group
			button.button.button_standart.ml_auto(@click.prevent="submit($event)") {{ submitText }}

		//- .form__text * - required

		.form__message(:id="`${formData.ID}${requestMsgIdPostfix}`")

</template>

<script>
import MaskedInput	from "vue-text-mask";

import Validator	from "@/scripts/Validator.js";
import FileInput	from "@/scripts/FileInput.js";
import TextStorage	from "@/scripts/TextareaStorage.js";
import HubFormData	from "@/scripts/FormDataHubspot.js";
import Base64		from "@/scripts/Base64.js";

import { SearchParent } from "@/scripts/SearchParent.js";

export default {
	name: "CustomForm",
	props: ["formData"],
	components: {
		MaskedInput
	},
	data () {
		return {
			method: "POST",
			submitText: "Send",

			requestMsgIdPostfix: "-request-message",

			formFieldGroups: null
		};
	},
	created () {
		if(this.$store.getters.getFormsStatus === 1 && this.formData.GUID) this.getGuid();
	},
	computed: {
		create() { 
			return this.$store.getters.getFormsStatus;
		}
	},
	watch: {
		create(val, oldVal) {
			if(oldVal === 0 && val === 1) this.getGuid();
		}
	},
	methods: {
		getGuid() {
			var DATA   = this.$store.getters.getForm(this.formData.GUID);
			var portID = DATA.portalId || false;

			this.formData.portalId = portID;

			this.formFieldGroups = DATA.formFieldGroups;
			this.method     = DATA.method;
			this.submitText = DATA.submitText;

			FileInput();
			setTimeout(TextStorage, 0); 
		},

		getPlaceholder(text, isRequired) {
			var postfix = "*";

			if(isRequired) return `${text} ${postfix}`;
			else return text;
		},

		getValidationMessage(msg) {
			if(!msg || msg === "") return "Please enter this field";
			else return msg;
		},

		getValidationType(itemData) {
			var type = itemData.validation.name;
			var name = itemData.name;
			var required = itemData.required;

			if(!type || type === "") {
				if(name.indexOf("email") !== -1) return "email";
				else return false;
			}
			else return `${type}`;
		},

		validate(event) {
			var elem = event.target;

			if(elem && elem.nextElementSibling instanceof HTMLElement) {
				if(Validator(elem)) elem.nextElementSibling.style.display = "none";
				else elem.nextElementSibling.style.display = "";
			}

			if(elem && (elem.type === "radio" || elem.type === "checkbox")) {
				Validator(elem);
			}

			// files
			/* if(elem && elem.type === "file") {
				let file = elem.files[0];

				Base64(file, getFB64);

				function getFB64(data) {
					elem.dataset.fileBase64 = data;
				};
			} */

			// for phone number
			if(typeof event === "string") {
				let phones = this.$el.querySelectorAll(`input[name*='phone']`);

				for (let i = 0; i < phones.length; i++) {
					const tel = phones[i];
					let next = null;

					if(tel.nextElementSibling instanceof HTMLElement) next = tel.nextElementSibling;

					if(Validator(tel)) next.style.display = "none";
					else next.style.display = "";
				}
			}
		},

		submit(event) {
			var target = event.target; // submit button

			new Promise((resolve, reject) => {
				if((target instanceof HTMLInputElement || target instanceof HTMLButtonElement) && target.form instanceof HTMLFormElement) {
					if(this.formData.portalId && this.formData.GUID) resolve(target.form);
					else reject("NOT FOUND: Form, Form GUID or Portal ID");
				}
			})
				.then(form => {
					var formIsValid = true;
					var data;

					for (let i = 0; i < form.elements.length; i++) {
						const element = form.elements[i];
						
						if(!Validator(element)) {
							formIsValid = false;
							if(element.nextElementSibling) element.nextElementSibling.style.display = "";
						} else if(element.nextElementSibling) element.nextElementSibling.style.display = "none";
					}

					if(formIsValid) {
						/* data = {};
						data.form_guid = this.formData.GUID;
						data.portal_id = this.formData.portalId;
						data.form_data = HubFormData(form, {
								url : window.location.href,
								name: this.$route.name
							});
						*/

						data = new FormData(form);

						return data;
					}
					else return false;
				})
				.then(data => {
					var URL = process.env.FORMS_POST;
					var xhr = new XMLHttpRequest();
					var successCode = 204;

					var formMessage = document.getElementById(`${this.formData.ID}${this.requestMsgIdPostfix}`);

					if(data) {
						// URL += `?form_guid=${data.form_guid}&portal_id=${data.portal_id}&pageUrl=${window.location.href}&pageName=${this.$store.getters.getPageTitle(this.$route.name)}`;

						URL += `?form_guid=${this.formData.GUID}&portal_id=${this.formData.portalId}&pageUrl=${window.location.href}&pageName=${this.$store.getters.getPageTitle(this.$route.name)}`;

						// disable Submit button
						target.disabled = true;

						xhr.open("POST", URL, true);
						// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						// xhr.setRequestHeader("Content-Type", "multipart/form-data");

						xhr.onreadystatechange = function() {
							if (this.readyState != 4) return;

							let resCode = null;
							let resMess = "Thank you for submitting the form";
							let errMess = "Sorry, request is failed";

							// enable Submit button
							target.disabled = false;

							if(this.responseText != "") {
								let response = JSON.parse(this.responseText);

								if(response.hasOwnProperty("status"))  resCode = +response.status;
								if(response.hasOwnProperty("message")) resMess = response.message;
							}

							if(this.status === 200) {
								if(resCode === successCode || resCode === null) {
									target.form.reset();
									getFormRequestMessage(resMess, "success");
								} else getFormRequestMessage(errMess, "error");

							} else getFormRequestMessage(errMess, "error");
						}

						// xhr.send(data.form_data);
						xhr.send(data);
					}

					function getFormRequestMessage(message, className) {
						if(formMessage instanceof HTMLElement) {
							formMessage.textContent = message;
							formMessage.classList = [];

							formMessage.classList.add("form__message");

							if(className) formMessage.classList.add(className);
						}
					}

				})
				.catch(err => console.info(err));
		},

		check(event) {
			var label = SearchParent.byTagName(event.target, "LABEL");
			var input;

			if(label instanceof HTMLLabelElement && (label.classList.contains("radio") || label.classList.contains("checkbox"))) {
				input = label.getElementsByTagName("input")[0];

				if(input && (input.type === "radio" || input.type === "checkbox"))
					if(input.checked) label.classList.add("checked");
					else label.classList.remove("checked");
			}
		}
	}
};
</script>