# Vue kanban board

### Features & characteristics:

-   Customizable card content
-   Customizable board lanes
-   Users that can be added to items

### Example

![Vue-kanban-board-example](https://github.com/salamanderbe/vue-kanban-board/blob/master/public/Kanban-example.gif)

The card content can be provided as a slot, content in the example above is not included in the library.

## Install & basic usage

```bash
npm install @salamander.be/vue-kanban-board
```

```vue
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
      <span class="left"><img src="/check.svg">2/5</span>
      <span class="left"><img src="/bubble.svg">5</span>
      <span class="right"><img src="/clock.svg">Tomorrow</span>
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
      { status: 'todo', summary: 'This is a TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis     vel.' },
      { status: 'todo', summary: 'This is a longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia     quis vel.' },
      { status: 'todo', summary: 'This is an even longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum     lacinia quis vel.' }
    ],
    users: [{ id: 1, image: '/logo.jpg', name: 'Default user 1' }, { id: 2, image: '/logo.jpg', name: 'Default user 2' }, { id: 3, image: '/logo.jpg', name: 'Default     user 3' }]
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
autoAdd: true // wether or not the items shhould be added automatically
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
