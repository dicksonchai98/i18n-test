import './assets/main.css'
import EN from './locale/en.json'
import CH from './locale/ch.json'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import { useCounterStore } from './stores/counter'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')

const productsStore = useCounterStore()

const i18n = createI18n({
  // something vue-i18n options here ...
  locale: productsStore.locale,
  messages: {
    EN: EN,
    CH: CH
  }
})

app.use(i18n)
