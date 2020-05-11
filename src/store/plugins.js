import VuexPersistence from 'vuex-persist'
import { LOCAL_STORAGE_KEY } from "./mutations";

const LocalStore = new VuexPersistence({
    storage: window.localStorage,
    key: LOCAL_STORAGE_KEY,
})

export default [LocalStore.plugin]