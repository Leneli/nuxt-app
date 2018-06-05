<template lang="pug">
	.locations
		h3.h2 {{ blockData.section_title }}

		.locations__list
			.locations__item(v-for="loc in blockData.loc")
				.locations__col
					img(v-if="loc.img" :src="loc.img" class="locations__map" alt="loc.city")
				.locations__col
					.h3(v-if="loc.city") {{ loc.city }}

					.p(v-if="loc.address") {{ loc.address}}

					.p(v-if="loc.mail")
						MailLink(class="link_inherit link_underline" :mail="loc.mail")

					.p(v-if="loc.phone")
						b Phone: 
						PhoneLink(class="link_inherit" :number="loc.phone")

					.p(v-if="loc.fax")
						b Fax: 
						| {{ loc.fax }}
</template>

<script>
import PhoneLink from "@/components/elements/PhoneLink";
import MailLink  from "@/components/elements/MailLink";

export default {
	name: "SectionLocations",
	props: ["blockData"],
	components: {
		PhoneLink,
		MailLink
	}
};
</script>
