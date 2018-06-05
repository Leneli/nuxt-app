<template lang="pug">
	.contacts__form
		form.form.form_cols
			.form__field
				input.input_color(type="text" required placeholder="First Name*")
				.form__error()

			.form__field
				input.input_color(type="text" required placeholder="Last Name*")
				.form__error()

			.form__field
				input.input_color(type="email" v-model="email" required placeholder="Email*")     
				.form__error(v-show="email && !isEmailValid")
					span E-mail is not valid

			.form__field
				input.input_color(type="tel" placeholder="Phone")     
				.form__error()

			.form__field.form__field_full
				textarea.textarea_color(placeholder="Your message")
				.form__error()

			.form__field.form__field_full
				button.button.button_standart.ml_auto(:class='{ "valid" : isEmailValid }') Send

				.form__message
</template>

<script>
export default {
	name: "FormContactUs",
	props: ["formData"],
	data () {
		return {
			email: "",
			name: ""
		};
	},
	computed: {
		isEmailValid() {
			return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
		}
	}
};
</script>
