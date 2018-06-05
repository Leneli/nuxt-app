<template lang="pug">
	.blog-preview(v-if="postdata")
		.blog-preview__image(:style="getImage(postdata)")

		.blog-preview__desc(:data-category="postdata.content_group_id")
			router-link(:to="postdata.slug" :data-post-id="postdata.id" class="h2_blog") {{ postdata.title }}

			.date {{ getDate(postdata) }}
			.content(v-html="getContent(postdata)")

			router-link(:to="postdata.slug" :data-post-id="postdata.id" class="link") read more
</template>

<script>
import DateFormat from "@/scripts/DateFormat.js";

export default {
	name: "BlogPreview",
	props: ["postdata"],
	data () {
		return {
			offset: this.$store.getters.getPostsOffset
		};
	},
	methods: {
		getDate(string) {
			return DateFormat(string.publish_date);
		},

		getImage(data) {
			var imgURL = data.featured_image;
			// var imgALT = data.featured_image_alt_text;

			return `background-image: url('${imgURL}');`;
		},

		getContent(data) {
			var content = data.post_summary;

			// remove images and style from HTML
			if(content) {
				content = content.replace(/<img[^>]+>/g, "");
				content = content.replace(/<a[^>]+>/g, "");
				content = content.replace(/<\/a>/g, "");
				content = content.replace(/style=\"[\s\S][^"]+"/g, "");

				return content;
			}
		}
	}
};
</script>