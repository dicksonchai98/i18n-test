import { createI18n } from 'vue-i18n'
import EN from '../locales/en.json'
import CH from '../locales/ch.json'

export default createI18n({
  locale: 'CH',
  messages: {
    EN: EN,
    CH: CH
  },
  globalInjection: true
})
