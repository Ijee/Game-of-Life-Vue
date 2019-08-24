import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'

library.add(fas)
library.add(fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)


dom.watch() 


Vue.config.productionTip = false 

new Vue({
  render: h => h(App),
}).$mount('#app')
