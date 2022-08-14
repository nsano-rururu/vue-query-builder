import * as Vue from 'vue';
import VueQueryBuilder from './VueQueryBuilder.vue'

let rules = [
    {
      type: "text",
      id: "first-name",
      label: "First Name",
    },
    {
      type: "text",
      id: "last-name",
      label: "Last Name",
    },
    {
      type: "radio",
      id: "plan-type",
      label: "Plan Type",
      choices: [
        {label: "Standard", value: "standard"},
        {label: "Premium", value: "premium"}
      ]
    },
    {
      type: "select",
      id: 'select',
      label: 'Color',
      operators: ['=', '<>'],
      choices: [
        {label: "red", value: 'Red'},
        {label: "orange", value: 'Orange'},
        {label: "yellow", value: 'Yellow'},
        {label: "green", value: 'Green'},
        {label: "blue", value: 'Blue'},
        {label: "indigo", value: 'Indigo'},
        {label: "violet", value: 'Violet'},
      ]
    },
  ];

const app = Vue.createApp({
  el: '#app',

  components: { VueQueryBuilder },

  data: function() {
    return {
        rules: rules,
        output: {},
      };
  },

  computed: {
    outputFormatted: function() {
      return JSON.stringify(this.output, null, 2);
    }
  },

  methods: {
    updateQuery: function(value){
      this.output = value;
    }
  },
});
app.config.compilerOptions.whitespace = 'preserve';
app.mount('#app');
