<template>
  <div
    class="vue-query-builder"
    :class="{ 'vue-query-builder-styled': styled }"
  >
    <query-builder-group
      v-model:query="query"
      :index="0"
      :rule-types="ruleTypes"
      :rules="mergedRules"
      :max-depth="maxDepth"
      :depth="depth"
      :styled="styled"
      :labels="mergedLabels"
      type="query-builder-group"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import QueryBuilderGroup from './components/QueryBuilderGroup.vue';
import deepClone from './utilities.js';

let defaultLabels = {
  matchType: "Match Type",
  matchTypeAll: "All",
  matchTypeAny: "Any",
  addRule: "Add Rule",
  removeRule: "&times;",
  addGroup: "Add Group",
  removeGroup: "&times;",
  textInputPlaceholder: "value",
};

export default defineComponent({
  name: 'VueQueryBuilder',

  components: {
    QueryBuilderGroup
  },

  props: {
    rules: {
      type: Array,
      default: () => []
    },
    labels: {
      type: Object,
      default () {
        return defaultLabels;
      }
    },
    styled: {
      type: Boolean,
      default: true
    },
    maxDepth: {
      type: Number,
      default: 3,
      validator: function (value) {
        return value >= 1
      }
    },
    modelValue: {
      type: Object,
      default: () => {}
    },
  },

  emits: ['update:modelValue'],

  data () {
    return {
      depth: 1,
      query: {
        logicalOperator: "All",
        children: []
      },
      ruleTypes: {
        "text": {
          operators: ['equals','does not equal','contains','does not contain','is empty','is not empty','begins with','ends with'],
          inputType: "text",
          id: "text-field"
        },
        "numeric": {
          operators: ['=','<>','<','<=','>','>='],
          inputType: "number",
          id: "number-field"
        },
        "custom": {
          operators: [],
          inputType: "text",
          id: "custom-field"
        },
        "radio": {
          operators: [],
          choices: [],
          inputType: "radio",
          id: "radio-field"
        },
        "checkbox": {
          operators: [],
          choices: [],
          inputType: "checkbox",
          id: "checkbox-field"
        },
        "select": {
          operators: ['=','<>'],
          choices: [],
          inputType: "select",
          id: "select-field"
        },
        "multi-select": {
          operators: ['='],
          choices: [],
          inputType: "select",
          id: "multi-select-field"
        },
      }
    }
  },

  computed: {
    mergedLabels () {
      return Object.assign({}, defaultLabels, this.labels);
    },

    mergedRules () {
      let mergedRules = [];
      let vm = this;

      vm.rules.forEach(function(rule){
        if ( typeof vm.ruleTypes[rule.type] !== "undefined" ) {
          mergedRules.push( Object.assign({}, vm.ruleTypes[rule.type], rule) );
        } else {
          mergedRules.push( rule );
        }
      });

      return mergedRules;
    }
  },

  mounted () {
    this.$watch(
      'query',
      newQuery => {
        this.$emit('update:modelValue', deepClone(newQuery));
      }, {
      deep: true
    });

    if ( typeof this.$options.propsData !== "undefined" ) {
      this.query = Object.assign(this.query, this.$options.propsData.value);
    }
  }
});
</script>

<style>
  .vue-query-builder-styled .vqb-group .rule-actions {
    margin-bottom: 20px;
  }

  .vue-query-builder-styled .vqb-rule {
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: #f5f5f5;
    border-color: #ddd;
    padding: 15px;
  }

  .vue-query-builder-styled .vqb-group.depth-1 .vqb-rule,
  .vue-query-builder-styled .vqb-group.depth-2 {
    border-left: 2px solid #8bc34a;
  }

  .vue-query-builder-styled .vqb-group.depth-2 .vqb-rule,
  .vue-query-builder-styled .vqb-group.depth-3 {
    border-left: 2px solid #00bcd4;
  }

  .vue-query-builder-styled .vqb-group.depth-3 .vqb-rule,
  .vue-query-builder-styled .vqb-group.depth-4 {
    border-left: 2px solid #ff5722;
  }

  .vue-query-builder-styled .close {
    opacity: 1;
    color: rgb(150,150,150);
  }

  @media (min-width: 768px) {
    .vue-query-builder-styled .vqb-rule.form-inline .form-group {
      display: block;
    }
  }
</style>
