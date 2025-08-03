import { defineUserConfig } from 'vuepress';
import { defaultTheme } from '@vuepress/theme-default';
import { viteBundler } from '@vuepress/bundler-vite';

export default defineUserConfig({
    title: 'Vue Query Builder',
    description: 'A UI component for building complex queries with nested conditionals.',
    base: '/vue-query-builder/',

    bundler: viteBundler({
        viteOptions: {
            define: {
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
                __VUE_PROD_DEVTOOLS__: false,
                __VUE_OPTIONS_API__: true
            }
        }
    }),

    theme: defaultTheme({
        navbar: [],
        
        repo: 'dabernathy89/vue-query-builder',
        docsDir: 'docs',
        docsBranch: 'gh-pages',
        editLink: true,

        sidebar: [
            {
                text: 'Guide',
                children: [
                    '/',
                    '/demos',
                    '/getting-started',
                    '/configuration',
                    '/roadmap',
                    '/contributing',
                    '/about',
                ]
            }
        ]
    }),
});