<template lang="pug">
	router-link(class="logo", :to="'/'")
</template>

<script>
export default {
	name: "LogoLink",
	props: ["imageUrl"]
};
</script>
