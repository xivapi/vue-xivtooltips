import Vuex from 'vuex'
import {mutations} from './mutations'
import actions from './actions'
import getters from './getters'
import plugins from './plugins'


export default new Vuex.Store({
    state: {
        actions: {},
        pendingActionIds: [],
        defaultTimeout: 21600,
    },
    mutations,
    actions,
    getters,
    plugins,
})
