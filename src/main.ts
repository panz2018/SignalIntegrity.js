import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'

import App from '@/App.vue'
import { favicon } from '@/logo/favicon'

const app = createApp(App)
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)
app.use(createPinia())
app.use(ToastService)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false
    }
  }
})
app.config.errorHandler = (err, vm, info) => {
  console.error('Error:', err)
  console.error('Vue component:', vm)
  console.error('Additional info:', info)
}
app.mount('#app')
favicon()
