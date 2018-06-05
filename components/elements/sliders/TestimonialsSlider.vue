<template lang="pug">
	div
		swiper(:options="swiperOption")
			swiper-slide(v-for="slide in slidesData")
				.testimonials-slider__item
					.testimonials-slider__comment   {{ slide.comment }}
					.testimonials-slider__signature {{ slide.signature }}

			.swiper-pagination(slot="pagination")
			.swiper-button-prev(slot="button-prev")
			.swiper-button-next(slot="button-next")
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
	name: "TestimonialsSlider",
	props: ["slidesData", "options"],
	components: {
		swiper,
		swiperSlide
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		}
	},
	data () {
		return {
			swiperOption: {
				slidesPerView: 2,
				spaceBetween: 80,
				autoHeight: !(navigator.userAgent.search(/Safari/) > 0 && navigator.userAgent.search(/Chrome/) < 0), // not for Safari
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				},
				pagination: {
					el: ".swiper-pagination",
					type: "bullets",
					clickable: true
				},

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
				
				breakpoints: {
					768: {
						slidesPerView: 1,
						spaceBetween: 0
					}
				}
			}
		};
	}
};
</script>