// Example usage with Vue 2 and vue-demi
// This demonstrates how to use the vue-query-builder with Vue 2

// With Vue 2, users would install:
// npm install vue@^2.6.0 @vue/composition-api vue-query-builder

// Vue 2 + Composition API setup:
/*
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueQueryBuilder from 'vue-query-builder'

Vue.use(VueCompositionAPI)

new Vue({
  components: { VueQueryBuilder },
  data() {
    return {
      rules: [
        {
          type: "text",
          id: "first-name",
          label: "First Name",
        },
        {
          type: "text", 
          id: "last-name",
          label: "Last Name",
        }
      ],
      query: {}
    }
  },
  template: `
    <div>
      <vue-query-builder 
        :rules="rules" 
        v-model="query"
      />
      <pre>{{ JSON.stringify(query, null, 2) }}</pre>
    </div>
  `
}).$mount('#app')
*/

// With Vue 3, users would install:
// npm install vue@^3.0.0 vue-query-builder

// Vue 3 setup (current demo):
/*
import { createApp } from 'vue'
import VueQueryBuilder from 'vue-query-builder'

createApp({
  components: { VueQueryBuilder },
  data() {
    return {
      rules: [
        {
          type: "text",
          id: "first-name", 
          label: "First Name",
        }
      ],
      query: {}
    }
  },
  template: `
    <vue-query-builder 
      :rules="rules" 
      v-model="query"
    />
  `
}).mount('#app')
*/