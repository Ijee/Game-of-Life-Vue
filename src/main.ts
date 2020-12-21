import Vue, { createApp } from 'vue';
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'

const app = createApp(App)

library.add(fas)
library.add(fab)
library.add(far)
app.component('font-awesome-icon', FontAwesomeIcon)


dom.watch()


app.mount('#app')
