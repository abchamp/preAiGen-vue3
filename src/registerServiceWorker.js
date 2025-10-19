import { register } from 'register-service-worker'
import { Workbox } from 'workbox-window'

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined) {
  register(`${import.meta.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('Service worker is ready')
    },
    registered() {
      console.log('Service worker has been registered')
      const wb = new Workbox('/service-worker.js')
      wb.addEventListener('activated', event => {
        console.log(`Service worker version ${event.target.active.scriptURL} activated.`)
      })
      wb.register()
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated() {
      console.log('New content is available; please refresh.')
      const answer = window.confirm('A new version of the app is available. Reload?')
      if (answer) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}