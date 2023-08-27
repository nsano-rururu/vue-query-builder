<template>
  <div
    class="vqb-group"
    :class="classObject"
  >
    <div
      class="vqb-group-heading"
      :class="{ 'card-header': styled }"
    >
      <div
        class="match-type-container"
        :class="{ 'form-inline': styled }"
      >
        <label
          class="mr-2"
          for="vqb-match-type"
        >{{ labels.matchType }}</label>
        <select
          id="vqb-match-type"
          v-model="query.logicalOperator"
          :class="{ 'form-control': styled }"
        >
          <option>{{ labels.matchTypeAll }}</option>
          <option>{{ labels.matchTypeAny }}</option>
        </select>
        <!-- eslint-disable vue/no-v-html -->
        <button
          v-if="depth > 1"
          type="button"
          :class="{ 'close ml-auto': styled }"
          @click="remove"
          v-html="labels.removeGroup"
        />
      </div>
    </div>

    <div
      class="vqb-group-body"
      :class="{ 'card-body': styled }"
    >
      <div
        class="rule-actions"
        :class="{ 'form-inline': styled }"
      >
        <div :class="{ 'form-group': styled }">
          <select
            v-model="selectedRule"
            :class="{ 'form-control mr-2': styled }"
          >
            <option
              v-for="(rule, option_index) in rules"
              :key="option_index"
              :value="rule"
            >
              {{ rule.label }}
            </option>
          </select>
          <!-- eslint-disable vue/no-v-html -->
          <button
            type="button"
            :class="{ 'btn btn-secondary mr-2': styled }"
            @click="addRule"
            v-html="labels.addRule"
          />
          <!-- eslint-disable vue/no-v-html -->
          <button
            v-if="depth < maxDepth"
            type="button"
            :class="{ 'btn btn-secondary': styled }"
            @click="addGroup"
            v-html="labels.addGroup"
          />
        </div>
      </div>

      <div class="children">
        <component
          :is="child.type"
          v-for="(child, child_index) in query.children"
          :key="child_index"
          v-model:query="child.query"
          :type="child.type"
          :rule-types="ruleTypes"
          :rules="rules"
          :rule="ruleById(child.query.rule)"
          :index="index"
          :max-depth="maxDepth"
          :depth="depth + 1"
          :styled="styled"
          :labels="labels"
          @child-deletion-requested="removeChild"
        />
      </div>
    </div>
  </div>
</template>

<script>
import QueryBuilderRule from './QueryBuilderRule.vue';
import deepClone from '../utilities.js';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "QueryBuilderGroup",

  components: {
    QueryBuilderRule
  },

  props: ['ruleTypes', 'type', 'query', 'rules', 'index', 'maxDepth', 'depth', 'styled', 'labels'],

  emits: ['update:query', 'child-deletion-requested'],
  
  data () {
    return {
      selectedRule: this.rules[0]
    }
  },

  computed: {
    classObject () {
      let classObject = {
        'card card-default': this.styled,
      }

      classObject['depth-' + this.depth.toString()] = this.styled;

      return classObject;
    }
  },

  methods: {
    ruleById (ruleId) {
      let rule = null;

      this.rules.forEach(function(value){
        if ( value.id === ruleId ) {
          rule = value;
          return false;
        }
      });

      return rule;
    },

    addRule () {
      let updated_query = deepClone(this.query);
      let child = {
        type: 'query-builder-rule',
        query: {
          rule: this.selectedRule.id,
          selectedOperator: this.selectedRule.operators[0],
          selectedOperand: typeof this.selectedRule.operands === "undefined" ? this.selectedRule.label : this.selectedRule.operands[0],
          value: null
        }
      };
      // A bit hacky, but `v-model` on `select` requires an array.
      if (this.ruleById(child.query.rule).type === 'multi-select') {
        child.query.value = [];
      }
      updated_query.children.push(child);
      this.$emit('update:query', updated_query);
    },

    addGroup () {
      let updated_query = deepClone(this.query);
      if ( this.depth < this.maxDepth ) {
        updated_query.children.push({
          type: 'query-builder-group',
          query: {
            logicalOperator: "All",
            children: []
          }
        });
        this.$emit('update:query', updated_query);
      }
    },

    remove () {
      this.$emit('child-deletion-requested', this.index);
    },

    removeChild (index) {
      let updated_query = deepClone(this.query);
      updated_query.children.splice(index, 1);
      this.$emit('update:query', updated_query);
    }
  }
});
</script>
