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
				{ status: 'todo', summary: 'This is a TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' },
				{ status: 'todo', summary: 'This is a longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' },
				{ status: 'todo', summary: 'This is an even longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis vel.' }
			]
		}
	}
}
</script>
```

## Configuration

### Props

```js
lanes: [{ name: 'Lane name', slug: 'lane-slug', hidden: true }]
blocks: [
	/* Any object is fine */
]
```

### Events

```vue
<template>
    <kanban-board v-on:item-updated="handleBlockUpdated" v-on:item-clicked="handleBlockClicked"><kanban-board>
</template>

<script>
export default {
	methods: {
		handleBlockUpdated(itemId, status, index) {
			// Update code
		},
		handleBlockClicked(item) {
			// Clicked code
		}
	}
}
</script>
```
