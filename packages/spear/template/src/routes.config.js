import Demo from './demo'
import Layout from './layout'

const routes = [
    {
        path: '/',
        exact: true,
        layout: Layout,
        component: Demo,
    },
]

export default routes
