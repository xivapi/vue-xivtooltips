import {
    ADD_ACTIONS,
    ADD_PENDING_ACTION,
    CLEAR_PENDING_ACTIONS,
    SET_TIMEOUT,
} from './mutation-types'

export const LOCAL_STORAGE_KEY = 'xivtooltips'

export const mutations = {
    [ADD_ACTIONS] (state, actions, lang) {
        state.actions = {...state.actions[lang], ...actions}
    },
    [ADD_PENDING_ACTION] (state, id) {
        if (! state.pendingActionIds.includes(id)) {
            state.pendingActionIds.push(id)
        }
    },
    [CLEAR_PENDING_ACTIONS] (state) {
        state.pendingActionIds = []
    },
    [SET_TIMEOUT] (state, timeout) {
        state.defaultTimeout = timeout
    },
}
