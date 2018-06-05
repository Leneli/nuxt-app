<template lang="pug">
	.persons__col
		transition(v-if="showAll")
			.persons__all(v-if="isAll()")
				div(v-for="(person, index) in persons")
					.persons__preview(@click="open($event)" :data-index="index")
						img(v-if="person.photo" :src="person.photo" :alt="person.name" :data-index="index")
						.persons__prev_hover(:data-index="index")
							.persons__name(:data-index="index") {{ person.name }}
							.persons__office(:data-index="index") {{ person.office }}
							.persons__link(:data-index="index") read more

		transition(v-if="showSingle")
			.persons__single
				swiper(:options="swiperSingleOption")
					swiper-slide(v-for="person in persons")
						.persons__card
							img(v-if="person.photo" :src="person.photo" :alt="person.name")
							.persons__preview_noimg(v-else)
						
							.flex_full
								.close(v-if="isAll()" @click="close()")
								.persons__name_big {{ person.name }}
								.persons__office {{ person.office }}
								.persons__text(v-html="person.text")

					.swiper-button-prev.persons__prev(slot="button-prev")
					.swiper-button-next.persons__next(slot="button-next")
</template>

<script>
import { swiper, swiperSlide } 	from "vue-awesome-swiper";
import { isMobile } 			from "@/scripts/isMobile.js";

export default {
	name: "SectionPersons",
	props: ["persons"],
	components: {
		swiper,
		swiperSlide
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		}
	},
	methods: {
		isAll() {
			var media = 768;

			if((isMobile.any() === null && window.innerWidth > media) || window.innerWidth > media) return true;
			else {
				this.showSingle = true;

				return false;
			}
		},

		close() {
			this.showAll    = true;
			this.showSingle = false;
		},

		open(event) {
			var index = event.target.dataset.index || 0;

			this.swiperSingleOption.initialSlide = index;

			this.showAll    = false;
			this.showSingle = true;
		}
	},
	data () {
		return {
			swiperSingleOption: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: !(navigator.userAgent.search(/Safari/) > 0 && navigator.userAgent.search(/Chrome/) < 0), // not for Safari

				on: {
					// fix autoHeight for Safari
					init() {
						if(navigator.userAgent.search(/Safari/) > 0 && navigator.userAgent.search(/Chrome/) < 0) {
							setTimeout(() => {
								this.$el[0].classList.add("swiper-container-autoheight");
								this.params.autoHeight = true;
								this.updateAutoHeight(300);
							}, 1000);
						}
					},
					slideChange() {
						if(navigator.userAgent.search(/Safari/) > 0 && navigator.userAgent.search(/Chrome/) < 0) {
							this.$el[0].classList.add("swiper-container-autoheight");
							this.params.autoHeight = true;
							this.updateAutoHeight(300);
						}
					}
				},
				
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}
			},

			showAll: true,
			showSingle: false
		};
	}
};
</script>
