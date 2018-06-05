<template lang="pug">
	Paginate(
		:page-count="getCount()"
		:page-range="3"
		:margin-pages="marginPages()"
		:initial-page="initPage()"
		:prev-text="prevLinkText"
		:next-text="nextLinkText"
		:container-class="contClassName"
		:page-class="itemClassName"
		:prev-link-class="`${itemClassName} ${prevClassName}`"
		:next-link-class="`${itemClassName} ${nextClassName}`"
		:break-view-class="`${itemClassName} ${dotsClassName}`"
		:active-class="actv"
		:disabled-class="inav"
		:click-handler="clickCallback"
		ref="paginate"
	)
</template>

<script>
import Paginate from "vuejs-paginate";

export default {
	name: "Pagination",
	components: {
		Paginate
	},
	data () {
		return {
			media: 768,

			contClassName: "pagination",
			itemClassName: "pagination__item",
			numsClassName: "number",
			dotsClassName: "dots",
			prevClassName: "prev",
			nextClassName: "next",
			noneClassName: "d_none",

			actv: "is-active",
			inav: "is-inactive",

			prevLinkText: "prev",
			nextLinkText: "next",

			activeElIndex: 1,

			total : this.$store.getters.getPostsLenght,

			limit : this.$store.getters.getPostsLimit,
			offset: this.$store.getters.getPostsOffset
		};
	},
	watch: {
		"$store.getters.getBlogCurrentCategory": function() {
			this.reloadPagination();
		}
	},
	methods: {
		getCount() {
			var common = this.$store.getters.getPostsLenght / this.limit;

			if((common ^ 0) < common) common = (common ^ 0) + 1;

			return common;
		},

		marginPages() {
			if(window.innerWidth > this.media) return 3;
			else return 1;
		},

		initPage() {
			var initP = 0;

			initP = this.$store.getters.getPostsOffset / this.limit;

			return initP;
		},

		clickCallback(pageNum) {
			new Promise((resolve, reject) => {
				if(pageNum && !isNaN(pageNum)) resolve();
				else reject();
			})
				.then(() => this.activeElIndex = pageNum)
				.then(() => this.$store.commit("setBlogOffset", this.getOffset(pageNum)))
				.then(() => window.scrollTo(0, 0))
				.catch(() => false);
		},

		getOffset(pageNum) {
			return (this.limit * (pageNum - 1));
		},

		reloadPagination() {
			this.$refs.paginate.selected = 0;
		}
	}
};
</script>
