export default {
    getActionById: (state) => (id, lang) => {
        return state.actions[id][lang]
    },
    getIconById: (state) => (id, lang) => {
        return state.actions[id][lang] && state.actions[id][lang].Icon ? `https://xivapi.com${state.actions[id][lang].Icon}` : ''
    },
    getTimeout: (state) => () => state.defaultTimeout,
}
