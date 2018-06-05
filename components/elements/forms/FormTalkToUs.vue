<template lang="pug">
	div

		form.form.form-talk

			.form__field
				input.input(type="text" v-model="name" required placeholder="Name")
				.form__error()

			.form__field
				input.input(type="email" v-model="email" required placeholder="E-mail")     
				.form__error(v-show="email && !isEmailValid")
					span E-mail is not valid

			.form__field
				textarea.textarea(required placeholder="Message")
				.form__error()

			button.button.button_standart(:class='{ "valid" : isEmailValid }') Send

			.form__message

</template>

<script>
export default {
	name: "FormTalkToUs",
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


<DOC>

	BLOCK DESCRIPTION

	Simple contact form. This form has 4 fields:
		- Name: text input, required
		- E-mail: email input, requird, with validation
		- Message: textarea, required
		- Send: submit button
	
	DATA FROM SERVER:

</DOC>