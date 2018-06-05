<template lang="pug">
	.the-best.wrap-content
		img(v-for="img in images" :src="img.src" class="the-best__img")

</template>

<script>
export default {
	name: "TheBest",
	props: ["images"]
};
</script>
