<style lang="scss">
$ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
$primary-c: #464957;
$secondary-c: #3d3d3d;
$highlight-c: #f4435a;

// The outer container for the Kanban board
.board-container {
	margin-left: 0 auto;
	box-sizing: border-box;
	font-weight: 400;
	color: $secondary-c;

	// Basic reset
	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	// The container containing all draggable elements
	.drag-list {
		display: flex;
		align-items: flex-start;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;

		// The dragable column
		.drag-column {
			flex: 1;
			position: relative;
			max-width: 280px;

			.board-header {
				.stage-title {
					font-size: 14px;
					font-weight: 600;
					margin-bottom: 20px;
					margin-top: 0;
					user-select: none;
				}
				.add-task-container {
					display: flex;
					box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
					background-color: #fff;
					width: 100%;
					padding: 15px 20px;
					margin-bottom: 20px;
					.stage-input {
						font-size: 14px;
						border: none;
						box-shadow: none;
						flex: 1;
						color: $primary-c;
						user-select: none;
						&:focus {
							outline: none;
							box-shadow: none !important;
						}
						&::-webkit-input-placeholder {
							color: rgba($primary-c, 0.4);
						}
						&:-moz-placeholder {
							color: rgba($primary-c, 0.4);
						}
						&::-moz-placeholder {
							color: rgba($primary-c, 0.4);
						}
						&:-ms-input-placeholder {
							color: rgba($primary-c, 0.4);
						}
					}
					.add-cta {
						background: #f9fafb;
						box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
						width: 30px;
						height: 30px;
						border-radius: 50%;
						text-align: center;
						line-height: 31px;
						font-size: 20px;
						color: $primary-c;
						cursor: pointer;
						transition: 0.3s background, 0.3s color;
						user-select: none;
						&:hover {
							background: $highlight-c;
							color: #fff;
						}
					}
				}
			}
			.board-locked-header {
				height: 39px;
			}
		}
	}

	.drag-inner-list {
		min-height: 500px;
		margin: 0;
		padding: 0;
		&:hover {
		}
	}
}

/* Dragula CSS  */
.gu-mirror {
	position: fixed !important;
	margin: 0 !important;
	z-index: 9999 !important;
	opacity: 1;
	list-style-type: none;
}

.gu-hide {
	display: none !important;
}

.gu-unselectable {
	-webkit-user-select: none !important;
	-moz-user-select: none !important;
	-ms-user-select: none !important;
	user-select: none !important;
}

.gu-transit {
	opacity: 0.5;
}
</style>


<template>

    <div class="board-container">
        <ul class="drag-list">
            <li v-for="lane in lanes" :style="{ margin: '0 '+ gap  / 2 +'px'} " class="drag-column" :class="{['drag-column-' + lane.slug]: true}" :key="lane.slug">

                <!-- Kanban stage header-->
                <div v-if="!lane.hidden" class="board-header">
                    <p class="stage-title">{{ lane.name }}</p>
                    <div class="add-task-container">
                        <input v-model="taskSummary[lane.slug]" @keyup.enter="createNewTask(lane.slug)" type="text" class="stage-input" :placeholder="placeholder">
                        <div class="add-cta">+</div>
                    </div>
                </div>

                <div v-else class="board-locked-header">

                </div>

                <!-- Kanban stage cards -->
                <ul class="drag-inner-list" ref="list" :data-status="lane.slug">
                    <card v-on:block-clicked="cardClicked" class="drag-item" v-for="item in getBlocks(lane.slug)" :data-block-id="item.id" :key="item.id" :task="item">
                        <template>
                            <slot :data="item"></slot>
                        </template>
                    </card>
                </ul>

            </li>
        </ul>
    </div>

</template>

<script>
import dragula from 'dragula'
import Card from './kanban-card'

export default {
	name: 'kanban-board',
	props: {
		/**
		 * Array that lists all lanes of the kanban
		 * @default '{...}'
		 * @type {Array}
		 */
		lanes: {
			required: false,
			default: () => {
				return [{ name: 'Todo', slug: 'todo' }, { name: 'In progress', slug: 'in-progress' }, { name: 'Done', slug: 'done' }]
			}
		},
		/**
		 * Array that lists all the kanban items
		 * @default '[]'
		 * @type {Array}
		 */
		items: {
			required: false,
			default: () => {
				return []
			}
		},
		/**
		 * String to show as placeholder text
		 * @default 'Add a new task ...'
		 * @type {String}
		 */
		placeholder: {
			type: String,
			default: 'Add a new task...'
		},
		/**
		 * Number to define the gutter width
		 * @default '15px'
		 * @type {Number}
		 */
		gap: {
			type: Number,
			default: 40
		}
	},
	components: { Card },
	data() {
		return {
			taskSummary: {}
		}
	},
	mounted() {
		dragula(this.$refs.list)
			/* 
            | Event will be triggerd when a 
            | card is beeing dragged
            */
			.on('drag', el => {
				el.classList.add('is-moving')
			})

			/* 
            | Event will be triggerd when a 
            | card is beeing dropped on a lane
            */
			.on('drop', (item, list) => {
				let index = 0
				for (index = 0; index < list.children.length; index += 1) {
					if (list.children[index].classList.contains('is-moving')) break
				}
				this.$emit('item-updated', item.dataset.blockId, list.dataset.status, index)
			})

			/* 
            | Event will be triggerd when a 
            | card is finished dropping on a lane
            */
			.on('dragend', el => {
				el.classList.remove('is-moving')
				window.setTimeout(() => {
					el.classList.add('is-moved')
					window.setTimeout(() => {
						el.classList.remove('is-moved')
					}, 600)
				}, 100)
			})
	},
	methods: {
		getBlocks(status) {
			return this.localBlocks.filter(item => item.status === status)
		},
		cardClicked(item) {
			this.$emit('item-clicked', item)
		}
	},
	computed: {
		localBlocks() {
			return this.items
		}
	}
}
</script>