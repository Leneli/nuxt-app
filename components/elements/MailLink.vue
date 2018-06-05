<template lang="pug">
	a(:href="`mailto:${mail}`" target="_blank") {{ mail }}
</template>


<script>
export default {
	name: "MailLink",
	props: ["mail"]
};
</script>
