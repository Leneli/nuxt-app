<template>
	<div class="share-buttons">
		<template v-for="(item, i) in shareButtonsListBefore" v-if="item.isShow">
			<social-sharing :url="config.url"
							:title="config.title"
							:description="config.description"
							:quote="config.quote"
							:hashtags="config.hashtags"
							:twitter-user="config.twitter_user"
							network-tag="div"
							inline-template
							:key="i">
				<network :network="item.network" :class="`share-button share-button__${item.classPostfix}`">
					<span v-if="item.title">{{ item.title }}</span>
				</network>
			</social-sharing>
		</template>

		<div class="share-button share-button__more" v-if="shareButtonsListAfter && !isMore" @click="showButtons($event)">
			<span>More</span>
		</div>

		<template v-for="(item, i) in shareButtonsListAfter" v-if="shareButtonsListAfter && item.isShow && isMore">
			<social-sharing :url="config.url"
							:title="config.title"
							:description="config.description"
							:quote="config.quote"
							:hashtags="config.hashtags"
							:twitter-user="config.twitter_user"
							network-tag="div"
							inline-template
							:key="i">
				<network :network="item.network" :class="`share-button share-button__${item.classPostfix}`">
					<span v-if="item.title">{{ item.title }}</span>
				</network>
			</social-sharing>
		</template>

		<div class="share-button share-button__hidde" v-if="shareButtonsListAfter && isMore" @click="hiddeButtons($event)">
			<span>Hidden</span>
		</div>
	</div>
		
</template>


<script>
import SocialSharing from "vue-social-sharing";

export default {
	name: "ShareButtons",
	props: ["config"],
	data () {
		return {
			shareButtonsListBefore: [
				{
					title: "Facebook",
					network: "facebook",
					classPostfix: "fb",
					isShow: true
				},
				{
					title: "Twitter",
					network: "twitter",
					classPostfix: "tw",
					isShow: true
				},
				{
					title: "Linkedin",
					network: "linkedin",
					classPostfix: "in",
					isShow: true
				},
				{
					title: "",
					network: "googleplus",
					classPostfix: "gp",
					isShow: true
				},
				{
					title: "Email",
					network: "email",
					classPostfix: "email",
					isShow: true
				},
			],

			shareButtonsListAfter: [
				{
					title: "Pinterest",
					network: "pinterest",
					classPostfix: "pin",
					isShow: true
				},
				{
					title: "Skype",
					network: "skype",
					classPostfix: "sk",
					isShow: true
				},
				{
					title: "Telegram",
					network: "telegram",
					classPostfix: "tele",
					isShow: true
				},
				{
					title: "Viber",
					network: "viber",
					classPostfix: "vi",
					isShow: true
				},
				/* {
					title: "Whatsapp",
					network: "whatsapp",
					classPostfix: "wapp",
					isShow: true
				},
				{
					title: "Sms",
					network: "sms",
					classPostfix: "sms",
					isShow: true
				} */
			],

			isMore: false
		};
	},
	methods: {
		showButtons(event) {
			this.isMore = true;
		},

		hiddeButtons(event) {
			this.isMore = false;
		}
	}
};
</script>
