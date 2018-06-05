<template lang="pug">
	ul(v-if="socials" class="list_nomark list_icons")
		li(v-for="(soc, key) in socials" v-if="soc.url")
			SimpleLink(v-if="soc && soc.url && soc.url !== '#'" :path="soc.url" :target="soc.target" :class="key")
</template>

<script>
import SimpleLink from "@/components/elements/SimpleLink";

export default {
	name: "SocialIconsList",
	props: ["socials"],
	components: {
		SimpleLink
	}
};
</script>
