import Launcher from '@mochen0505/launcher'
import routes from './routes.config'

if (module && module.hot) {
    module.hot.accept()
}

const app = new Launcher({
    routes
})

app.start()

