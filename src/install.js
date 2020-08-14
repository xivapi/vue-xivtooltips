import components from './components'
import Store from './store'

export default function install(Vue, options) {
    if(install.installed) return

    // Levi-specific requirement
    // She's embedding in a page instead of a vue-generated template
    // Thus, the browser lowercases all html elements, ruining things
    // like 'ActionTooltip' -> 'actiontooltip'
    const webTemplateOnly = options.webTemplateOnly || false

    for (const key in components) {
        const keystr = webTemplateOnly ? key.toLowerCase() : key
        Vue.component(keystr, components[key])
    }

    // add the store in as a custom name
    Vue.prototype.$TTStore = Store

    // Set timeout in seconds – defaults to 6 hours
    const cacheTimeout = options.cacheTimeout || 21600
    Vue.prototype.$TTStore.dispatch('setDefaultTimeout', cacheTimeout)
}