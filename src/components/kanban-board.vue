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
					position: relative;
					transition: 0.1s border;
					&.errors {
						box-shadow: 0 0 0 0.5px #f4435a;
					}
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
						&:hover,
						&.active {
							background: $highlight-c;
							color: #fff;
						}
					}
					.add-users {
						position: absolute;
						background: #fff;
						box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
						right: 20px;
						top: 50px;
						min-width: 225px;
						.add-user-item {
							padding: 15px 20px;
							cursor: pointer;
							display: flex;
							transition: 0.3s background-color;
							.add-user-image {
								width: 30px;
								height: 30px;
								border-radius: 50%;
								margin-right: 20px;
							}
							.add-user-text {
								color: rgba($primary-c, 0.8);
								font-size: 14px;
								font-weight: 400;
								margin: auto 0;
							}
							&:hover {
								background-color: #f3f3f3;
							}
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
                    <div class="add-task-container" :class="{ errors : showLaneErrors === lane.slug }">
                        <input v-model="itemSummary[lane.slug]" @keyup.enter="maybeAddItem(lane.slug)" type="text" class="stage-input" :placeholder="placeholder">
                        <div class="add-cta" :class="{ active : showLaneUsers === lane.slug}" @click="maybeAddItem(lane.slug)">+</div>
                        <div v-show="showLaneUsers === lane.slug" class="add-users">
                            <div class="add-user-item" v-for="user in users" :key="user.id" @click="addItem(lane.slug, user)">
                                <img class="add-user-image" :src="user.image">
                                <span class="add-user-text">{{ user.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Kanban stage locked header-->
                <div v-else class="board-locked-header"></div>

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
		},

		/**
		 * Boolean to define if the add button should also add a user
		 * @default false
		 * @type {Boolean}
		 */
		hasUsers: {
			type: Boolean,
			default: false
		},

		/**
		 * Array of all assignable user objects
		 * @default false
		 * @type {Array}
		 */
		users: {
			type: Array,
			default: () => {
				return []
			}
		},

		/**
		 * Boolean to define if items should be added to the lane automatically
		 * @default false
		 * @type {Boolean}
		 */
		autoAdd: {
			type: Boolean,
			default: true
		}
	},
	components: { Card },
	data() {
		return {
			itemSummary: {},
			itemUser: {},
			showLaneUsers: '',
			showLaneErrors: '',
			unsavedItems: []
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
		/* 
        | Get a filtered list
        | of kanban items
        */
		getBlocks(status) {
			return this.localBlocks.filter(item => item.status === status)
		},

		/* 
        | Event to trigger when
        | An item has been clicked
        */
		cardClicked(item) {
			this.$emit('item-clicked', item)
		},

		/* 
        | Method triggered when we 'try' to
        | Add a new item to the Kanban board
        */
		maybeAddItem(lane) {
			// Check if the summary of the
			// given lane is not empty
			this.showLaneErrors = ''
			if (Object.keys(this.itemSummary).length === 0 || this.itemSummary[lane].length === 0) {
				this.showLaneErrors = lane
				return false
			}

			if (this.hasUsers) {
				this.showLaneUsers = lane
			} else {
				this.addItem(lane)
			}
		},

		/* 
        | Method triggered when we add the item to the 
        | Kanban board. Push the task on the unused
        | tasks array.
        */
		addItem(lane, user) {
			// Prep the item data
			let item = {
				summary: this.itemSummary[lane],
				status: lane
			}

			// If we have users add them to the item
			if (this.hasUsers && this.users.length > 0) item['user'] = user

			// Clear the current inputs
			this.showLaneUsers = ''
			this.itemSummary[lane] = ''

			// Add the item to the unsaved items if we are suppose to
			if (this.autoAdd) this.unsavedItems.push(item)

			// Send an event to inform an item has been added
			this.$emit('item-created', item)
		}
	},
	computed: {
		localBlocks() {
			return this.unsavedItems.concat(this.items)
		}
	}
}
</script>