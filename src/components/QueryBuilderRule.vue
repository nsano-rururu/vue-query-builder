<template>
  <div
    class="vqb-rule card"
  >
    <div class="row gy-2 gx-3 align-items-center">
      <label class="col-auto">{{ rule.label }}</label>
      <div class="col-auto">
        <select
          v-if="typeof rule.operands !== 'undefined'"
          :value="localQuery.selectedOperand"
          :class="{ 'form-select me-2': styled }"
          @change="updateSelectedOperand"
        >
          <!-- eslint-disable vue/no-template-shadow -->
          <option
            v-for="(operand, index) in rule.operands"
            :key="index"
            :value="operand"
          >
            {{ operand }}
          </option>
          <!-- eslint-enable vue/no-template-shadow -->
        </select>
      </div>
      <div class="col-auto">
        <select
          v-if="! isMultipleChoice"
          :value="localQuery.selectedOperator"
          :class="{ 'form-select me-2': styled }"
          @change="updateSelectedOperator"
        >
          <!-- eslint-disable vue/no-template-shadow --> 
          <option
            v-for="(operator, index) in rule.operators"
            :key="index"
            :value="operator"
          >
            {{ operator }}
          </option>
          <!-- eslint-enable vue/no-template-shadow -->
        </select>
      </div>
      <div class="col-auto">
        <input
          v-if="rule.inputType === 'text'"
          :value="localQuery.value"
          :class="{ 'form-control': styled }"
          type="text"
          :placeholder="labels.textInputPlaceholder"
          @input="updateValue"
        >
      </div>
      <div class="col-auto">
        <input
          v-if="rule.inputType === 'number'"
          :value="localQuery.value"
          :class="{ 'form-control': styled }"
          type="number"
          @input="updateValue"
        >
      </div>
      
      <template v-if="isCustomComponent">
        <div class="col-auto">
          <component
            :is="rule.component"
            :model-value="localQuery.value"
            @update:model-value="updateValue"
          />
        </div>
      </template>

      <template
        v-if="rule.inputType === 'checkbox'"
      >
        <!-- eslint-disable vue/no-template-shadow -->
        <div class="col-auto">
          <div
            v-for="(choice, index) in rule.choices"
            :key="index"
            class="form-check form-check-inline"
          >
            <input
              :checked="localQuery.value && localQuery.value.includes(choice.value)"
              type="checkbox"
              :value="choice.value"
              class="form-check-input"
              @change="updateCheckboxValue"
            > {{ choice.label }}
          </div>
        </div>
        <!-- eslint-enable vue/no-template-shadow -->
      </template>

      <template
        v-if="rule.inputType === 'radio'"
      >
        <!-- eslint-disable vue/no-template-shadow -->
        <div class="col-auto">
          <div
            v-for="(choice, index) in rule.choices"
            :key="index"
            class="form-check form-check-inline"
          >
            <input
              :checked="localQuery.value === choice.value"
              type="radio"
              :name="`radio-${rule.id}-${index}`"
              :value="choice.value"
              class="form-check-input"
              @change="updateRadioValue"
            > {{ choice.label }}
          </div>
        </div>
        <!-- eslint-enable vue/no-template-shadow -->
      </template>
      <!-- eslint-disable vue/no-template-shadow -->
      <div class="col-auto">
        <select
          v-if="rule.inputType === 'select'"
          :value="localQuery.value"
          :class="{ 'form-select': styled }"
          :multiple="rule.type === 'multi-select'"
          @change="updateSelectValue"
        >
          <template
            v-for="(option, index) in selectOptions"
            :key="index"
          >
            <option
              v-if="!Array.isArray(option)"
              
              :value="option.value"
            >
              {{ option.label }}
            </option>
            <optgroup
              v-if="Array.isArray(option)"
              
              :label="index"
            >
              <option
                v-for="(sub_option, index) in option"
                :key="index"
                :value="sub_option.value"
              >
                {{ sub_option.label }}
              </option>
            </optgroup>
          </template>
        </select>
      </div>
      <!-- eslint-enable vue/no-template-shadow -->
      <!-- eslint-disable vue/no-v-html -->
      <div class="col-auto d-flex">
        <button
          type="button"
          :class="{ 'close ms-auto btn': styled }"
          @click="remove"
          v-html="labels.removeRule"
        />
      </div>
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </div>
</template>

<script>
import deepClone from '../utilities.js';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "QueryBuilderRule",

  props: ['query', 'index', 'rule', 'styled', 'labels'],

  emits: ['update:query', 'child-deletion-requested'],

  data() {
    return {
      localQuery: deepClone(this.query)
    };
  },

  computed: {
    isMultipleChoice () {
      return ['radio', 'checkbox', 'select'].indexOf(this.rule.inputType) >= 0;
    },

    isCustomComponent () {
      return this.rule.type === 'custom-component';
    },

    selectOptions () {
      if (typeof this.rule.choices === 'undefined') {
        return {};
      }

      return this.rule.choices.reduce(function(groups, item, index) {
        let key = item['group'];
        if (typeof key !== 'undefined') {
          groups[key] = groups[key] || [];
          groups[key].push(item);
        } else {
          groups[index] = item;
        }

        return groups;
      }, {});
    },
  },

  watch: {
    query: {
      handler(newQuery) {
        this.localQuery = deepClone(newQuery);
      },
      deep: true
    }
  },

  beforeMount () {
    if (this.rule.type === 'custom-component') {
      this.$options.components[this.id] = this.rule.component;
    }
  },

  mounted () {
    // Set a default value for these types if one isn't provided already
    if(this.localQuery.value === null){
      if (this.rule.inputType === 'checkbox') {
          this.localQuery.value = [];
      }
      if (this.rule.type === 'select') {
          this.localQuery.value = this.rule.choices[0].value;
      }
      if (this.rule.type === 'custom-component') {
          this.localQuery.value = this.rule.default || null;
      }

      this.emitQuery();
    }
  },

  methods: {
    emitQuery() {
      this.$emit('update:query', deepClone(this.localQuery));
    },
    
    updateSelectedOperand(event) {
      this.localQuery.selectedOperand = event.target.value;
      this.emitQuery();
    },
    
    updateSelectedOperator(event) {
      this.localQuery.selectedOperator = event.target.value;
      this.emitQuery();
    },
    
    updateValue(event) {
      const value = typeof event === 'object' && event.target ? event.target.value : event;
      this.localQuery.value = value;
      this.emitQuery();
    },
    
    updateCheckboxValue(event) {
      const value = event.target.value;
      const checked = event.target.checked;
      
      if (!Array.isArray(this.localQuery.value)) {
        this.localQuery.value = [];
      }
      
      if (checked) {
        this.localQuery.value = [...this.localQuery.value, value];
      } else {
        this.localQuery.value = this.localQuery.value.filter(v => v !== value);
      }
      
      this.emitQuery();
    },
    
    updateRadioValue(event) {
      this.localQuery.value = event.target.value;
      this.emitQuery();
    },
    
    updateSelectValue(event) {
      const select = event.target;
      if (select.multiple) {
        this.localQuery.value = Array.from(select.selectedOptions).map(option => option.value);
      } else {
        this.localQuery.value = select.value;
      }
      this.emitQuery();
    },
    
    remove: function() {
      this.$emit('child-deletion-requested', this.index);
    },
  }
});
</script>
