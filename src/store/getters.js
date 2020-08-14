export default {
    getActionById: (state) => (id) => {
        return state.actions[id]
    },
    getIconById: (state) => (id) => {
        return state.actions[id] && state.actions[id].Icon ? `https://xivapi.com${state.actions[id].Icon}` : ''
    },
    getTimeout: (state) => () => state.defaultTimeout,
}