import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import messages from './lang';

Vue.use(VueI18n);
export const i18n = new VueI18n({
	locale: 'de',
	fallbackLocale: 'de',
	messages
});

Vue.config.productionTip = false;

import '@/assets/styles.css';
import '@/assets/responsive.css';

new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app');
