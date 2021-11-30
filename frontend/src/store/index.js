import Vue from "vue";
import Vuex from "vuex";
import state from './state';
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});
Vue.use(Vuex);

const store =  new Vuex.Store({
    state,
    plugins: [vuexLocal.plugin]
});

export default store;
