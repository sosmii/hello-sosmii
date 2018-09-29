import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/ja';
import locale from 'element-ui/lib/locale';
import { DatePicker, Input } from 'element-ui';

locale.use(lang);
Vue.use(DatePicker);
Vue.use(Input);
