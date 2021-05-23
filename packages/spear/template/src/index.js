import Launcher from '@morax/shield'
import routes from './routes.config'

if (module && module.hot) {
    module.hot.accept()
}

const app = new Launcher({
    routes
})

app.start()

