import debounce from 'lodash.debounce'
import axios from 'axios'

import {ADD_ACTIONS, ADD_PENDING_ACTION, CLEAR_PENDING_ACTIONS, SET_TIMEOUT} from './mutation-types'

const COLUMNS = [
    'Icon',
    'Name',
    'Cast100ms',
    'Recast100ms',
    'Description',
    'Range',
    'ClassJobLevel',
    'EffectRange',
    'PrimaryCostValue',
    'PrimaryCostType',
    'ActionCategory',
    'ClassJobCategory',
    'ID',
]

export const xivapi = axios.create({
    baseURL: 'https://xivapi.com'
})
/*
* https://xivapi.com/Action?ids=3569,16550,63&columns=Icon,Name,Cast100ms,Description,Range,ClassJobLevel,EffectRange,PrimaryCostValue,ActionCategory,ClassJobCategory,ID
*/
const fetchIds = debounce((ids, lang, cb) => {
    xivapi.get('Action', {
        params: {
            ids: ids.join(','),
            columns: COLUMNS.join(','),
            language: lang,
        }
    }).then(data => cb(data))
}, 20)

export default {
    fetchActionId({commit, getters, state}, {id, lang}) {
        const action = getters.getActionById(id, lang)
        const cacheTimeoutSec = getters.getTimeout()
        if (action) {
            const now = new Date().getTime() / 1000
            const actionCacheTime = new Date(action.cacheTime).getTime() / 1000
            if ((now - actionCacheTime) <= cacheTimeoutSec) {
                return
            }
        }

        const newCacheTime = new Date()
        commit(ADD_PENDING_ACTION, id)
        fetchIds(state.pendingActionIds, lang, (data) => {
            const reducedData = data.data.Results.reduce( (acc, value, index) => {
                value.cacheTime = newCacheTime
                if (index > 1) {
                    const range = value.Range
                    if (typeof range === 'string' || range instanceof String) {
                        value.Range = parseInt(range)
                    }
                    acc[value.ID] = value
                    return acc
                }
                acc.cacheTime = newCacheTime
                return {[acc.ID]: acc, [value.ID]: value}
            })
            commit(ADD_ACTIONS, reducedData, lang)
        })

        commit(CLEAR_PENDING_ACTIONS)
    },
    setDefaultTimeout({commit}, timeout) {
        commit(SET_TIMEOUT, timeout)
    }
}
