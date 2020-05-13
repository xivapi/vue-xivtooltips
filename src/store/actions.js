import debounce from 'lodash.debounce'
import axios from 'axios'

import {ADD_MULTIPLE_ACTIONS, ADD_PENDING_ACTION, CLEAR_PENDING_ACTIONS, ADD_ACTION} from './mutation-types'

const COLUMNS = [
    'Icon',
    'Name_en',
    'Cast100ms',
    'Recast100ms',
    'Description_en',
    'Range',
    'ClassJobLevel',
    'EffectRange',
    'PrimaryCostValue',
    'ActionCategory',
    'ClassJobCategory',
    'ID',
]

export const xivapi = axios.create({
    baseURL: 'https://xivapi.com'
})
/*
* https://xivapi.com/Action?ids=3569,16550,63&columns=Icon,Name_en,Cast100ms,Description_en,Range,ClassJobLevel,EffectRange,PrimaryCostValue,ActionCategory,ClassJobCategory,ID
*/
const fetchIds = debounce((ids, cb) => {
    xivapi.get('Action', {
        params: {
            ids: ids.join(','),
            columns: COLUMNS.join(','),
        }
    }).then(data => cb(data))
}, 20)

export default {
    fetchActionId({commit, getters, state}, id) {
        if (getters.getActionById(id)) {
            return
        }
        commit(ADD_PENDING_ACTION, id)
        fetchIds(state.pendingActionIds, (data) => {
            if (data.data.Results.length == 1) {
                const one = data.data.Results[0]
                commit(ADD_ACTION, {[one.ID]: one})
            } else {
                const reducedData = data.data.Results.reduce( (acc, value, index) => {
                    if (index > 1) {
                        acc[value.ID] = value
                        return acc
                    }
                    return {[acc.ID]: acc, [value.ID]: value}
                })
                commit(ADD_MULTIPLE_ACTIONS, reducedData)
            }
                
            commit(CLEAR_PENDING_ACTIONS)
        })
    }
}