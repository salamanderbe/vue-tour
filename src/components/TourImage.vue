<template>
<div class="teaser">
    <img v-show="showImage" :src="step.preview" 
    :alt="step.title" :style="{ 'border-top-left-radius': theme.radius, 'border-top-right-radius': theme.radius }">
    <div v-show="!showImage" :style="{ 'border-top-left-radius': theme.radius, 'border-top-right-radius': theme.radius }">
    test wqjewqjew
    <slot name="image-preview"></slot>
    </div>
</div>
</template>

<script>
export default {
	name: 'TourImage',
	props: {
		step: {
			type: Object,
		},
        theme:{ 
            type: Object,
        }
	},
	components: {
	},
	data() {
		return {
            imageUrl:'',
            showImage:false,
		};
	},
    mounted() {
        const img = new Image();
        img.onload = () => {
            this.imageUrl = this.step.preview;
            this.showImage = true;
        }
        img.src = this.step.preview
    },
	
	methods: {
		
	},
	computed: {
		
	},
	watch: {
		
	},
};
</script>
