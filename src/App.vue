<template>
    <div id="app">
        <board :items="items" :lanes="lanes" :hasUsers="true" :users="users" v-on:item-updated="handleItemUpdated" v-on:item-clicked="handleItemClicked" v-on:item-created="handleItemCreated">
            <template scope="props">
                <div class="kb-card-header">
                    <p class="kb-card-title">{{ props.data.summary }}</p>
                    <img class="kb-card-image" src="./assets/logo.jpg">
                </div>
                <p class="kb-card-description">{{ props.data.description }}</p>
                <div class="kb-card-footer">
                    <span class="left"><img src="./assets/check.svg">2/5</span>
                    <span class="left"><img src="./assets/bubble.svg">5</span>
                    <span class="right"><img src="./assets/clock.svg">Tomorrow</span>
                </div>
            </template>
        </board>
    </div>
</template>

<script>
import Board from './components/kanban-board.vue'

export default {
	name: 'app',
	components: {
		Board
	},
	data() {
		return {
			lanes: [{ name: 'Todo', slug: 'todo' }, { name: 'In progress', slug: 'in-progress' }, { name: 'Done', slug: 'done' }],
			items: [
				{ status: 'todo', summary: 'This is a TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' },
				{ status: 'todo', summary: 'This is a longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' },
				{ status: 'todo', summary: 'This is an even longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' }
			],
			users: [{ id: 1, image: './logo.jpg', name: 'Default user 1' }, { id: 2, image: './logo.jpg', name: 'Default user 2' }, { id: 3, image: './logo.jpg', name: 'Default user 3' }]
		}
	},
	methods: {
		handleItemUpdated() {
			// console.log('block updated')
		},
		handleItemClicked() {
			// console.log('block clicked')
		},
		handleItemCreated() {
			// console.log('item created')
		}
	}
}
</script>
