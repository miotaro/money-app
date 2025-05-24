import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { getAuth, onAuthStateChanged } from "firebase/auth"

// Font Awesomeの読み込み
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faNoteSticky, faHouse, faPiggyBank, faChartPie, faCircleXmark, faBars } from '@fortawesome/free-solid-svg-icons' // ← 使いたいアイコンだけ追加
library.add(faPlus, faNoteSticky, faHouse, faPiggyBank, faChartPie, faCircleXmark, faBars)

let app
const auth = getAuth()

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    app.component('font-awesome-icon', FontAwesomeIcon)
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
  }
})

