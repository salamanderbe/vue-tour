# Vue tour

### Features & characteristics:

-  Customizable steps
-  Customizable styles
-  Customizable text

### Example

![Vue-tour-example](https://github.com/salamanderbe/vue-tour/blob/master/public/Tour-example.gif)

### Demo

https://salamanderbe.github.io/vue-tour

## Install & basic usage

```bash
npm install @salamander.be/vue-tour
```

```vue
<template>
  <div id="app">
    <tour :steps="steps" :text="text" :theme="theme"></tour>
  </div>
</template>

<script>
import Tour from '@salamander.be/vue-tour'
import '@salamander.be/vue-tour/dist/vue-tour.css'

export default {
  name: 'app',
  components: { Tour },
  data: () => ({
    steps: [
      {
        preview: '/example-1.png',
        title: 'Step 1',
        description: 'I am an example step, click in the top right corner to enlarge me. Click next if you no longer want to see me. '
      },
      {
        preview: '/example-1.png',
        title: 'Step 2',
        description: 'Congratz, I am the second step in this 2 step tuturial. If you reached me that means you have reached the end.'
      }
    ],
    text: {
      next_cta: 'Next',
      prev_cta: 'Previous',
            restart_cta: 'Restart'
    },
    theme: {
      color: '#009de0',
      radius: '2px'
    },
    blurEl: '.can-tour-blur',
    debug: true
  })
}
</script>
```

## Configuration

### Props

```js
steps: [
  {
    preview: '/example-1.png', // The preview image shown for each step
    title: 'Step 1', // The title of the step
    description: 'Description for step 1' // The description of the step
  }
]
theme: { color: '#color', radius: 'px' } // the theme use while rendering the component
text: { next_cta: '', prev_cta: '', restart_cta: '' } // The fixed texts used in the component
```
