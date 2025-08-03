import { GitContributors } from "/home/runner/work/vue-query-builder/vue-query-builder/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
  },
};
