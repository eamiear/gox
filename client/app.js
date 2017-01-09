import Vue from 'vue'
import App from './App.vue'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(MuseUI);
Vue.use(ElementUI);

import router from './router/index'

new Vue({
    el: '#root',
    router,
    render: (h) => h(App)
});
