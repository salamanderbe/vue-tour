<template>
    <div>
        <div v-show="showImage">
            <img :src="mediaSource" :alt="step.title" :style="{ 'border-top-left-radius': theme.radius, 'border-top-right-radius': theme.radius }">
        </div>
        <div v-show="!showImage" :style="{ 'border-top-left-radius': theme.radius, 'border-top-right-radius': theme.radius }">
            <slot name="image-preview"></slot>
        </div>
    </div>
</template>

<script>
import localforage from 'localforage';

export default {
	name: 'TourImage',
	props: {
		step: {
			type: Object,
		},
        theme:{ 
            type: Object,
        },
        index: {
            type: Number,
        },
        versioningCacheImage: {
            type: Number,
            default: 1
        }
	},
	components: {
	},
	data() {
		return {
            imageUrl:'',
            showImage:false,
			mediaSource: '',
		};
	},
    mounted() {
        const img = new Image();
        img.onload = () => {
            this.imageUrl = img.src;
            this.showImage = true;
        }
        img.src = this.step.preview
		this.asyncgetMediaSource();
    },
	
	methods: {
		asyncgetMediaSource() {
            const itemKey = `preview_tour_${this.index}_${this.step.index}_${this.versioningCacheImage}`;
			this.mediaSource = this.step && this.step.preview ? this.step.preview : '';
			localforage.getItem(itemKey).then((value) => {
				if (value) {
					this.mediaSource = URL.createObjectURL(value);
					return (this.mediaSource);
				}
				return (this.mediaSource);
			});
		},
	},
	computed: {

	},
	watch: {

	},
};
</script>

<style lang="scss" scoped>
.tour-preview {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: -6px 0 12px rgba(0, 0, 0, 0.06);
    z-index: 1001;
    transition: all 0.2s;
    @media screen and(min-width: 768px) {
        width: 432px;
        height: 492px;
        right: 30px;
        bottom: 30px;
    }
    &.is-scaled {
        height: 80vh;
        height: calc(var(--vh, 1vh) * 80);
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        @media screen and(min-width: 768px) {
            width: 650px;
        }
    }
    .close,
    .scale {
        position: absolute;
        top: 30px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        transition: 0.2s opacity;
        &:hover {
            opacity: 0.7;
        }
    }
    .close {
        right: 30px;
        transform: rotate(45deg);
    }
    .scale {
        right: 56px;
        display: none;
        @media screen and(min-width: 768px) {
            display: block;
        }
        &.is-scaled {
            path: {
                fill: #333;
            }
        }
    }
    .step {
        height: 100%;
    }
    .teaser,
    .content {
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        flex-flow: column;
    }
    .teaser {
        background-color: #f4f6f8;
        img {
            width: 100%;
            height: 100%;
            object-fit: scale-down;
        }
    }
}
</style>