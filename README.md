# Vue kanban board

### Features & characteristics:

-   Customizable card content
-   Customizable board lanes

## Install & basic usage

```bash
npm install @salamander.be/vue-kanban-board
```

```vue
<template>
  <div>
    <kanban-board :lanes="lanes" :items="items" >
    
    <!-- Dynamic content goes here -->
    <template scope="props">
        <div class="card-header">
            <p class="card-title">{{ props.data.summary }}</p>
            <img class="card-image" src="./assets/logo.jpg">
        </div>
        <p class="card-description">{{ props.data.description }}</p>
    </template>

    </kanban-board>
  </div>
</template>

<script>
import KanbanBoard from '@salamander.be/vue-kanban-board'
import '@salamander.be/vue-kanban-board/dist/vue-kanban-board.css'

export default {
	components: { KanbanBoard },
	data() {
		return {
			lanes: [{ name: 'Todo', slug: 'todo' }, { name: 'In progress', slug: 'in-progress' }, { name: 'Done', slug: 'done' }],
			items: [
				{ status: 'todo', summary: 'This is a TODO task', description: 'Quisque non tellus orci ac auctor augue mauris.' },
				{ status: 'todo', summary: 'This is a longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris.' },
				{ status: 'todo', summary: 'This is an even longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris.' }
			]
		}
	}
}
</script>
```

## Configuration

### Props

```js
lanes: [
	{
		name: 'Lane name', // The display name of the lane
		slug: 'lane-slug', // required unique slug
		hidden: true // IF the lane has a create task option
	}
]
items: [{ status: 'lane-slug' /* ... */ }] // the items shown on the board
placeholder: 'Add a new task... ' // The placeholder of the create option
gap: 30 // The gap between lanes
hasUsers: true // wether or not users should be added to an item
users: [{ id: 1, image: '...', name: '...' }] // The available users that can be added to a item
```

### Events

```vue
<template>
    <kanban-board v-on:item-updated="handleItemUpdated" v-on:item-clicked="handleItemClicked" v-on:item-created="handleItemCreated"><kanban-board>
</template>

<script>
export default {
	methods: {
		handleItemUpdated(itemId, status, index) {
			// Update code
		},
		handleItemClicked(item) {
			// Clicked code
		},
		handleItemCreated(item) {
			// Created code
		}
	}
}
</script>
```
