import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'

import ThemeSwitcher from './ThemeSwitcher.vue'

// https://cypress-testing-handbook.netlify.app/pinia.html

describe('<ThemeSwitcher />', () => {
  beforeEach(() => {
    const app = createApp({})
    app.directive('ripple', Ripple)
    app.directive('tooltip', Tooltip)
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
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ThemeSwitcher)
  })
})
