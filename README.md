Vue Query Builder
======


#### A UI component for building complex queries with nested conditionals.

Vue Query Builder is a user interface that makes it easy for your users to create queries of any kind. It's useful if you need an interface for generating reports, filtering data, and more.

## Vue 2 & Vue 3 Compatibility

This library supports both Vue 2 and Vue 3 through [vue-demi](https://github.com/vueuse/vue-demi).

### Vue 3 Installation
```bash
npm install vue-query-builder
```

### Vue 2 Installation  
```bash
npm install vue-query-builder vue@^2.6.0 @vue/composition-api
```

For Vue 2, you'll also need to install the Composition API plugin:
```js
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```


[Demo and documentation](https://dabernathy89.github.io/vue-query-builder/)

![Demo Screenshot](https://raw.githubusercontent.com/dabernathy89/vue-query-builder/master/public/demo-screenshot.png "Demo screenshot")