import components from './components'
import Store from './store'

function registerComponent(Vue, key, component) {
    Vue.component(key, component)
}

export default function install(Vue, options) {
    if(install.installed) return

    // Levi-specific requirement
    // She's embedding in a page instead of a vue-generated template
    // Thus, the browser lowercases all html elements, ruining things
    // like 'ActionTooltip' -> 'actiontooltip'
    const webTemplateOnly = options.webTemplateOnly || false

    for (const key in components) {
        const keystr = webTemplateOnly ? key.toLowerCase() : key
        registerComponent(Vue, keystr, components[key])
    }

    // add the store in as a custom name
    Vue.prototype.$TTStore = Store
}