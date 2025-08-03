import { defineClientConfig } from 'vuepress/client';
import VueQueryBuilder from '../../src/VueQueryBuilder.vue';

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.component('VueQueryBuilder', VueQueryBuilder);
    },
});