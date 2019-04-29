<style lang="scss" scoped>
.tour-preview {
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 432px;
    height: 492px;
    background: #fff;
    box-shadow: -6px 0 12px rgba(0, 0, 0, 0.06);
    .close,
    .scale {
        position: absolute;
        top: 30px;
        width: 12px;
        height: 12px;
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
        padding: 30px;
        .title {
            font-family: inherit;
            font-size: 30px;
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
            }
        }
    }
}
</style>

<template>
    <div class="tour-preview" v-if="open" :style="{ 'border-radius': theme.radius }">
        <template v-for="(step, key) in steps">
            <div v-if="currentStep === key" class="step" :key="key">

                <svg @click="scale" class="scale" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <path fill="#255fff" d="M2.36 8.712l-.65-.649a.562.562 0 0 0-.96.398v2.227c0 .31.252.562.563.562h2.226a.563.563 0 0 0 .398-.96l-.65-.65 2.514-2.513a.281.281 0 0 0 0-.398l-.53-.53a.281.281 0 0 0-.398 0zM10.688.75H8.46a.562.562 0 0 0-.398.96l.65.65-2.514 2.513a.281.281 0 0 0 0 .398l.53.53c.11.11.288.11.398 0L9.64 3.288l.65.649c.354.354.96.103.96-.398V1.313a.563.563 0 0 0-.563-.563z" />
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

                <div class="teaser">
                    <img :src="step.preview" :alt="step.title">
                </div>
                <div class="content">
                    <p class="title" :style="{ color: theme.color }">{{ step.title }}</p>
                    <p class="description">{{ step.description }}</p>
                    <div class="footer">
                        <div class="footer-dots">
                            <div v-for="dot in stepCount" :key="dot" class="dot" :style="{ background: ((dot - 1 === currentStep) ? theme.color : '#e6eaee') }"></div>
                        </div>
                        <div class="footer-link" @click="prev()">{{ text.prev_cta }}</div>
                        <div class="footer-btn" @click="next()" :style="{ background: theme.color, 'border-radius': theme.radius }">{{ text.next_cta }}</div>
                    </div>
                </div>
            </div>
        </template>
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
                        description: 'I am an example step, click in the top right corner to enlarge me. Click next if you no longer want to see me. '
                    },
                    {
                        preview: '/example-1.png',
                        title: 'Step 2',
                        description: 'Congratz, I am the second step in this 2 step tuturial. If you reached me that means you have reached the end.'
                    },
                ]
            }
        },
        text: {
            type: Object,
            default: () => {
                return {
                    next_cta: 'Next',
                    prev_cta: 'Previous'
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
        }
    },

    data: () => ({
        currentStep: 0,
        open: true
    }),

    mounted() {

    },

    methods: {
        next() {
            if (this.currentStep < this.steps.length - 1) this.currentStep++
            else this.currentStep = 0
        },

        prev() {
            if (this.currentStep > 0) this.currentStep--
            else this.currentStep = this.steps.length - 1
        },

        close() {
            this.open = false
        },

        scale() {

        }
    },

    computed: {
        stepCount() {
            return this.steps.length
        }
    }
}
</script>
