<template lang="pug">
	footer.footer.wrap-content
		.footer__block.footer__block_narr
			Nav(:class="navClassName")

		.footer__block
			.footer__contact
				PhoneLink(:class="phoneClassName" :number="contactData.phone.url")
				MailLink(:class="mailClassName" :mail="contactData.email.url")
			SocialIconsList(:class="socialsClassName" :socials="socials")

		.footer__block_right
			LogoLink(:class="logoClassName" :style="{ backgroundImage: getBgStyle(componentData.logoImg) }")
			Copyright(:explanation="componentData.explanationText" :copyright="componentData.copyrightText")

</template>


<script>
import Nav             from "@/components/Nav";
import PhoneLink       from "@/components/elements/PhoneLink";
import MailLink        from "@/components/elements/MailLink";
import SocialIconsList from "@/components/elements/SocialLinks";
import Copyright       from "@/components/elements/Copyright";
import LogoLink        from "@/components/elements/LogoLink";

export default {
	name: "Footer",
	props: ["componentData", "contactData", "socials"],
	components: {
		Nav,
		PhoneLink,
		MailLink,
		SocialIconsList,
		Copyright,
		LogoLink
	},
	data () {
		return {
			navClassName    : "footer__nav",
			phoneClassName  : "link_inherit link_tel i-tel",
			mailClassName   : "link_inherit link_mail i-mail",
			socialsClassName: "footer__social",
			logoClassName   : "footer__logo"
		};
	},
	methods: {
		getBgStyle(url) {
			var bg = `url('${url}')`;

			return bg;
		},

		getTelHref(string) {
			var tel = `+1${string}`;
			/*  */
			return tel;
		}
	}
};
</script>