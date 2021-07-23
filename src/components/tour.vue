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
    .content {
        padding: 32px 40px 40px 40px;
        .title {
            font-family: inherit;
            font-size: 24px;
            font-weight: 700;
            line-height: 40px;
            margin-bottom: 6px;
            margin-top: 0px;
        }
        .description {
            color: #6e6e6e;
            font-family: inherit;
            font-size: 15px;
            font-weight: 400;
            line-height: 22px;
            margin-bottom: 0px;
            margin-top: 0px;
        }
        .footer {
            margin-top: auto;
            display: flex;
            flex-wrap: wrap;
            .footer-dots {
                margin: auto 0;
                display: flex;
                flex-wrap: wrap;
                .dot {
                    border-radius: 50%;
                    width: 6px;
                    height: 6px;
                    margin-right: 7px;
                }
            }
            .footer-link {
                color: #6e6e6e;
                margin: auto 15px auto auto;
                cursor: pointer;
                transition: 0.2s opacity;
                user-select: none;
                &:hover {
                    opacity: 0.7;
                }
            }
            .footer-btn {
                color: #fff;
                padding: 10px 15px;
                cursor: pointer;
                display: inline-block;
                transition: 0.2s opacity;
                user-select: none;
                &:hover {
                    opacity: 0.7;
                }
                &.ml-auto {
                    margin-left: auto;
                }
            }
        }
    }
}
.tour-popover {
    position: fixed;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.4);
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    display: flex;
    cursor: pointer;
}
</style>

<style lang="scss">
.tour-blurred {
    filter: blur(4px);
}
</style>


<template>
    <div v-if="open">
        <div v-if="scaled" @click="scale" class="tour-popover"></div>
        <div class="tour-preview" :style="{ 'border-radius': theme.radius }" :class="{ 'is-scaled' : scaled}">
            <template v-for="(step, key) in steps">
                <div v-if="currentStep === key" class="step" :key="key">

                    <svg @click="scale" class="scale" :class="{ 'is-scaled' : scaled }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <path fill="#333" d="M2.36 8.712l-.65-.649a.562.562 0 0 0-.96.398v2.227c0 .31.252.562.563.562h2.226a.563.563 0 0 0 .398-.96l-.65-.65 2.514-2.513a.281.281 0 0 0 0-.398l-.53-.53a.281.281 0 0 0-.398 0zM10.688.75H8.46a.562.562 0 0 0-.398.96l.65.65-2.514 2.513a.281.281 0 0 0 0 .398l.53.53c.11.11.288.11.398 0L9.64 3.288l.65.649c.354.354.96.103.96-.398V1.313a.563.563 0 0 0-.563-.563z" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>

                    <svg @click="close" class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                        <g>
                            <g>
                                <path fill="#333" d="M6-1.2c.374 0 .678.303.678.678v5.844h5.844a.678.678 0 1 1 0 1.356H6.678v5.844a.678.678 0 1 1-1.356 0V6.678H-.522a.678.678 0 1 1 0-1.356h5.844V-.522c0-.375.304-.678.678-.678z" />
                            </g>
                        </g>
                    </svg>

                    <div class="teaser" :style="{ 'border-top-left-radius': theme.radius, 'border-top-right-radius': theme.radius }">
                        <img :src="step.preview" :alt="step.title" :style="{ 'border-top-left-radius': theme.radius, 'border-top-right-radius': theme.radius }">
                    </div>
                    <div class="content">
                        <p class="title" :style="{ color: theme.color }">{{ step.title }}</p>
                        <p class="description" v-html="getDesc(step.description)"></p>
                        <slot v-if="scaled" :name="`step-${key + 1}`"></slot>
                        <div class="footer">
                            <div class="footer-dots">
                                <div v-for="dot in stepCount" :key="dot" class="dot" :style="{ background: ((dot - 1 === currentStep) ? theme.color : '#e6eaee') }"></div>
                            </div>
                            <div v-if="currentStep > 0" class="footer-link" @click="prev()">{{ step.prev_cta ? step.prev_cta : text.prev_cta }}</div>
                            <div class="footer-btn" :class="{ 'ml-auto': currentStep === 0 }" @click="next()" :style="{ background: theme.color, 'border-radius': theme.radius }">{{ (currentStep !== steps.length - 1) ? step.next_cta ? step.next_cta : text.next_cta : text.restart_cta }}</div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        steps: {
            type: Array,
            default: () => {
                return [
                    {
                        preview: '/example-1.png',
                        title: 'Step 1',
                        description: 'I am an example step, click in the top right corner to enlarge me. Click next if you no longer want to see me.',
                    },
                    {
                        preview: '/example-1.png',
                        title: 'Step 2',
                        description: 'Congratz, I am the second step in this 2 step tuturial. If you reached me that means you have reached the end.',
                    },
                ]
            }
        },

        text: {
            type: Object,
            default: () => {
                return {
                    next_cta: 'Next',
                    prev_cta: 'Previous',
                    restart_cta: 'Restart'
                }
            }
        },

        theme: {
            type: Object,
            default: () => {
                return {
                    color: '#009de0',
                    radius: '2px'
                }
            }
        },

        blurEl: {
            required: false,
            type: String,
            default: '.can-tour-blur'
        },

        debug: {
            type: Boolean,
            default: false
        },

        storage: {
            type: String,
            default: 'vue-tour-viewed'
        },

        startLarge: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        currentStep: 0,
        open: true,
        scaled: false
    }),

    mounted() {
        document.addEventListener("DOMContentLoaded", async function (event) {
            const watched = localStorage.getItem(this.storage);

            if (!this.debug && watched !== null && !!watched === true) this.open = false

            if (this.startLarge && !watched) {
                this.scaled = true
                document.querySelector(this.blurEl).classList.add('tour-blurred')
            } else {
                document.querySelector(this.blurEl).classList.remove('tour-blurred')
            }

            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            window.addEventListener('resize', () => {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            });
        });
    },

    methods: {
        next() {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++
            } 
            else {
                this.currentStep = 0
            }
            this.$emit('next',this.currentStep)
        },

        prev() {
            if (this.currentStep > 0) {
                this.currentStep--
            }
            else {
                this.currentStep = this.steps.length - 1
            }
            this.$emit('prev',this.currentStep)
        },

        close() {
            this.open = false
            document.addEventListener("DOMContentLoaded", async function (event) {
                document.querySelector(this.blurEl).classList.remove('tour-blurred')
            });
            localStorage.setItem('vue-tour-viewed', true);
             this.$emit('close')
        },

        scale() {
            this.scaled = !this.scaled
            document.addEventListener("DOMContentLoaded", async function (event) {
                if (this.scaled)
                    document.querySelector(this.blurEl).classList.add('tour-blurred')
                else
                    document.querySelector(this.blurEl).classList.remove('tour-blurred')
            });
        },

        getDesc(text) {
            let trim_count = 150

            return (text.length > trim_count && !this.scaled) ? text.replace(/(<([^>]+)>)/ig, "").substring(0, trim_count) + '...' : text
        }
    },

    computed: {
        stepCount() {
            return this.steps.length
        }
    }
}
</script>
