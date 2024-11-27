import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './style.css'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(VueQueryPlugin)  // Enable Vue Query plugin
app.use(router)          // Enable Vue Router for navigation
app.use(vuetify)         // Enable Vuetify for material design components

app.mount('#app')
