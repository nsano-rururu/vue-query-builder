export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/runner/work/vue-query-builder/vue-query-builder/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Vue Query Builder"} }],
  ["/about.html", { loader: () => import(/* webpackChunkName: "about.html" */"/home/runner/work/vue-query-builder/vue-query-builder/docs/.vuepress/.temp/pages/about.html.js"), meta: {"title":"About"} }],
  ["/configuration.html", { loader: () => import(/* webpackChunkName: "configuration.html" */"/home/runner/work/vue-query-builder/vue-query-builder/docs/.vuepress/.temp/pages/configuration.html.js"), meta: {"title":"Configuration"} }],
  ["/contributing.html", { loader: () => import(/* webpackChunkName: "contributing.html" */"/home/runner/work/vue-query-builder/vue-query-builder/docs/.vuepress/.temp/pages/contributing.html.js"), meta: {"title":"Contributing"} }],
  ["/demos.html", { loader: () => import(/* webpackChunkName: "demos.html" */"/home/runner/work/vue-query-builder/vue-query-builder/docs/.vuepress/.temp/pages/demos.html.js"), meta: {"title":"Demos"} }],
  ["/getting-started.html", { loader: () => import(/* webpackChunkName: "getting-started.html" */"/home/runner/work/vue-query-builder/vue-query-builder/docs/.vuepress/.temp/pages/getting-started.html.js"), meta: {"title":"Getting Started"} }],
  ["/roadmap.html", { loader: () => import(/* webpackChunkName: "roadmap.html" */"/home/runner/work/vue-query-builder/vue-query-builder/docs/.vuepress/.temp/pages/roadmap.html.js"), meta: {"title":"Roadmap"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/home/runner/work/vue-query-builder/vue-query-builder/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
