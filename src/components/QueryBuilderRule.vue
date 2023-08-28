<template>
  <div
    class="vqb-rule card"
  >
    <div class="row gy-2 gx-3 align-items-center">
      <label class="col-auto">{{ rule.label }}</label>
      <div class="col-auto">
        <select
          v-if="typeof rule.operands !== 'undefined'"
          v-model="query.selectedOperand"
          :class="{ 'form-select me-2': styled }"
        >
          <!-- eslint-disable vue/no-template-shadow -->
          <option
            v-for="(operand, index) in rule.operands"
            :key="index"
          >
            {{ operand }}
          </option>
          <!-- eslint-enable vue/no-template-shadow -->
        </select>
      </div>
      <div class="col-auto">
        <select
          v-if="! isMultipleChoice"
          v-model="query.selectedOperator"
          :class="{ 'form-select me-2': styled }"
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
          v-model="query.value"
          :class="{ 'form-control': styled }"
          type="text"
          :placeholder="labels.textInputPlaceholder"
        >
      </div>
      <div class="col-auto">
        <input
          v-if="rule.inputType === 'number'"
          v-model="query.value"
          :class="{ 'form-control': styled }"
          type="number"
        >
      </div>
      
      <template v-if="isCustomComponent">
        <div class="col-auto">
          <component
            :is="rule.component"
            :model-value="query.value"
            @update:model-value="updateQuery"
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
              v-model="query.value"
              type="checkbox"
              :value="choice.value"
              class="form-check-input"
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
              v-model="query.value"
              type="radio"
              :value="choice.value"
              class="form-check-input"
            > {{ choice.label }}
          </div>
        </div>
        <!-- eslint-enable vue/no-template-shadow -->
      </template>
      <!-- eslint-disable vue/no-template-shadow -->
      <div class="col-auto">
        <select
          v-if="rule.inputType === 'select'"
          v-model="query.value"
          :class="{ 'form-select': styled }"
          :multiple="rule.type === 'multi-select'"
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

  beforeMount () {
    if (this.rule.type === 'custom-component') {
      this.$options.components[this.id] = this.rule.component;
    }
  },

  mounted () {
    let updated_query = deepClone(this.query);

    // Set a default value for these types if one isn't provided already
    if(this.query.value === null){
      if (this.rule.inputType === 'checkbox') {
          updated_query.value = [];
      }
      if (this.rule.type === 'select') {
          updated_query.value = this.rule.choices[0].value;
      }
      if (this.rule.type === 'custom-component') {
          updated_query.value = this.rule.default || null;
      }

      this.$emit('update:query', updated_query);
    }
  },

  methods: {
    remove: function() {
      this.$emit('child-deletion-requested', this.index);
    },
    updateQuery(value) {
      let updated_query = deepClone(this.query);
      updated_query.value = value;
      this.$emit('update:query', updated_query);
    },
  }
});
</script>
