<template><div><h1 id="vue-query-builder" tabindex="-1"><a class="header-anchor" href="#vue-query-builder"><span>Vue Query Builder</span></a></h1>
<p>Vue Query Builder is a user interface that makes it easy for your users to create queries of any kind. It's useful if you need a tool for generating reports, filtering data, and more.</p>
<p>Each instance of Vue Query Builder consists of groups and rules. Groups can contain rules and other groups. Each group has a match type of either &quot;match all&quot; (AND) or &quot;match any&quot; (OR). The component outputs JSON which you can pass to your server to parse.</p>
<h3 id="basic-demo" tabindex="-1"><a class="header-anchor" href="#basic-demo"><span>Basic Demo</span></a></h3>
<br>
<vue-query-builder :rules="rules" v-model="query"></vue-query-builder></div></template>

<script>
export default {
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
      ],
      query: {
        "logicalOperator": "All",
        "children": [
          {
            "type": "query-builder-rule",
            "query": {
              "rule": "plan-type",
              "selectedOperand": "Plan Type",
              "value": "premium"
            }
          },
          {
            "type": "query-builder-group",
            "query": {
              "logicalOperator": "Any",
              "children": [
                {
                  "type": "query-builder-rule",
                  "query": {
                    "rule": "first-name",
                    "selectedOperator": "equals",
                    "selectedOperand": "First Name",
                    "value": "John"
                  }
                },
                {
                  "type": "query-builder-rule",
                  "query": {
                    "rule": "first-name",
                    "selectedOperator": "equals",
                    "selectedOperand": "First Name",
                    "value": "Sally"
                  }
                }
              ]
            }
          }
        ]
      },
    }
  }
}
</script>

<style lang="less">
.vue-query-builder, .vue-query-builder * {
  box-sizing: border-box;
}

/* Bootstrap 5 is loaded via CDN in the HTML template, so we don't need to import LESS files */
/* The component styling will rely on Bootstrap 5 classes */

</style>