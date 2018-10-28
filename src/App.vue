<template>
    <div id="app">
        <board :items="items" :lanes="lanes" v-on:item-updated="handleBlockUpdated" v-on:item-clicked="handleBlockClicked">
            <template scope="props">
                <div class="card-header">
                    <p class="card-title">{{ props.data.summary }}</p>
                    <img class="card-image" src="./assets/logo.jpg">
                </div>
                <p class="card-description">{{ props.data.description }}</p>
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
			lanes: [{ name: 'Todo', slug: 'todo' }, { name: 'In progress', slug: 'in-progress' }, { name: 'Done', slug: 'done', hidden: true }],
			items: [
				{ status: 'todo', summary: 'This is a TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' },
				{ status: 'todo', summary: 'This is a longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' },
				{ status: 'todo', summary: 'This is an even longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' }
			]
		}
	},
	methods: {
		handleBlockUpdated() {
			console.log('block updated')
		},
		handleBlockClicked() {
			console.log('block clicked')
		}
	}
}
</script>
