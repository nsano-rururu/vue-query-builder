<template>
  <div
    class="vqb-rule"
    :class="{ 'panel panel-default form-inline': styled }"
  >
    <div :class="{ 'form-group': styled }">
      <label>{{ rule.label }}</label>

      <select
        v-if="typeof rule.operands !== 'undefined'"
        v-model="query.selectedOperand"
        :class="{ 'form-control': styled }"
      >
        <option
          v-for="(operand, operand_index) in rule.operands"
          :key="operand_index"
        >
          {{ operand }}
        </option>
      </select>

      <select
        v-if="! isMultipleChoice"
        v-model="query.selectedOperator"
        :class="{ 'form-control': styled }"
      >
        <option
          v-for="(operator, operator_index) in rule.operators"
          :key="operator_index"
          :value="operator"
        >
          {{ operator }}
        </option>
      </select>

      <input
        v-if="rule.inputType === 'text'"
        v-model="query.value"
        :class="{ 'form-control': styled }"
        type="text"
        :placeholder="labels.textInputPlaceholder"
      >
      <input
        v-if="rule.inputType === 'number'"
        v-model="query.value"
        :class="{ 'form-control': styled }"
        type="number"
      >

      <template v-if="isCustomComponent">
        <component
          :is="rule.component"
          :value="query.value"
          @input="updateQuery"
        />
      </template>

      <div
        v-if="rule.inputType === 'checkbox'"
        class="checkbox"
      >
        <label
          v-for="(choice, choice_index) in rule.choices"
          :key="choice_index"
        >
          <input
            v-model="query.value"
            type="checkbox"
            :value="choice.value"
          > {{ choice.label }}
        </label>
      </div>

      <div
        v-if="rule.inputType === 'radio'"
        class="radio"
      >
        <label
          v-for="(choice, choice_index2) in rule.choices"
          :key="choice_index2"
        >
          <input
            v-model="query.value"
            type="radio"
            :value="choice.value"
          > {{ choice.label }}
        </label>
      </div>

      <select
        v-if="rule.inputType === 'select'"
        v-model="query.value"
        :class="{ 'form-control': styled }"
        :multiple="rule.type === 'multi-select'"
      >
        <template v-for="(option, option_key) in selectOptions">
          <option
            v-if="!Array.isArray(option)"
            :key="option_key"
            :value="option.value"
          >
            {{ option.label }}
          </option>
          <optgroup
            v-if="Array.isArray(option)"
            :key="option_key"
            :label="option_key"
          >
            <option
              v-for="(sub_option, sub_option_index) in option"
              :key="sub_option_index"
              :value="sub_option.value"
            >
              {{ sub_option.label }}
            </option>
          </optgroup>
        </template>
      </select>

      <button
        type="button"
        :class="{ 'close pull-right': styled }"
        @click="remove"
        v-html="labels.removeRule"
      />
    </div>
  </div>
</template>

<script>
import deepClone from '../utilities.js';

export default {
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
}
</script>
